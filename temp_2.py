import asyncio
import aiohttp
import time
from collections import defaultdict
from datetime import datetime
import json
from json import JSONDecodeError


class AsyncDuck:
    def __init__(self, authorization, account_name="Account"):
        self.api_feed = 'https://api-ru.duckmyduck.com/ducks/feed'
        self.api_ducks = 'https://api-ru.duckmyduck.com/ducks'
        self.api_merg = 'https://api-ru.duckmyduck.com/eggs/merge'
        self.api_eggs = 'https://api-ru.duckmyduck.com/eggs'
        
        self.authorization = authorization
        self.account_name = account_name
        
        self.headers = {
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'authorization': self.authorization,
            'origin': 'https://webapp-ru.duckmyduck.com',
            'referer': 'https://webapp-ru.duckmyduck.com/',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'
        }

    def log(self, message):
        """Логирование с префиксом аккаунта"""
        print(f"[{self.account_name}] {message}")

    async def feed_duck(self, session, duck_id):
        """Покормить утку один раз"""
        json_data = {
            'id': duck_id,
            'timestamps': [int(time.time())]
        }

        async with session.post(self.api_feed, json=json_data, headers=self.headers) as response:
            res = await response.json()
            
            duck = res['response']['duck']
            feed_count = duck['feedCount']
            next_feed_cost = duck['feedCost'][feed_count]

            self.log(f"🦆 ID: {duck['id']} | Кормление: {feed_count} | След. стоимость: {next_feed_cost}")
            return res

    async def wait_for_timer_reset(self, feed_start_time):
        """Ожидание сброса таймера кормления"""
        reset_time = feed_start_time + 86400
        current_time = int(time.time())
        wait_seconds = reset_time - current_time
        
        if wait_seconds > 0:
            reset_datetime = datetime.fromtimestamp(reset_time)
            self.log(f"⏰ Таймер сбросится в: {reset_datetime.strftime('%d.%m.%Y %H:%M:%S')}")
            self.log(f"⏳ Ожидание: {wait_seconds // 3600} ч {(wait_seconds % 3600) // 60} мин")
            
            # Асинхронное ожидание с периодическими уведомлениями
            elapsed = 0
            while elapsed < wait_seconds:
                sleep_time = min(3600, wait_seconds - elapsed)  # Каждый час или остаток
                await asyncio.sleep(sleep_time)
                elapsed += sleep_time
                
                remaining = wait_seconds - elapsed
                if remaining > 0:
                    hours = remaining // 3600
                    minutes = (remaining % 3600) // 60
                    self.log(f"⏳ Осталось: {hours} ч {minutes} мин")
            
            self.log("✓ Таймер сброшен!")
        else:
            self.log("✓ Таймер уже сброшен!")

    async def feed_duck_smart(self, session, duck_id, max_cost=16):
        """Умное кормление с ожиданием сброса таймера"""
        self.log(f"🎯 Начинаем кормление утки ID: {duck_id} (макс. стоимость: {max_cost})")
        
        while True:
            try:
                res = await self.feed_duck(session, duck_id)
                
                if not res or res.get('statusCode') != 200:
                    self.log(f"❌ Ошибка запроса: {res}")
                    break
                
                duck = res['response']['duck']
                feed_count = duck['feedCount']
                next_feed_cost = duck['feedCost'][feed_count]
                
                if next_feed_cost > max_cost:
                    self.log(f"⚠️ Достигнута макс. стоимость: {next_feed_cost} (кормлений: {feed_count})")
                    
                    feed_start_time = duck['feedStartTime']
                    await self.wait_for_timer_reset(feed_start_time)
                    
                    self.log("🔄 Продолжаем кормление после сброса таймера...")
                    continue
                
                await asyncio.sleep(0.5)
                
            except Exception as e:
                self.log(f"❌ Ошибка: {e}")
                break

    async def get_count_ducks(self, session):
        """Получить список уток"""
        async with session.post(self.api_ducks, json={}, headers=self.headers) as response:
            data_ducks = await response.json()
            return data_ducks["response"]

    async def merg_eggs(self, session, slot1, slot2, queue=1):
        """Объединить два яйца"""
        json_data = {
            'values': [slot1, slot2], 
            'queue': queue
        }

        async with session.post(self.api_merg, json=json_data, headers=self.headers) as response:
            res = await response.json()
            
            if res.get('statusCode') == 200:
                self.log(f"✓ Объединены слоты {slot1} и {slot2}")
                return True
            else:
                self.log(f"✗ Ошибка объединения слотов {slot1} и {slot2}")
                return False

    async def get_egge_info(self, session, slots):
        """Получить информацию о яйцах"""
        async with session.post(self.api_eggs, json={}, headers=self.headers) as response:
            res = await response.json()
            
            info_egge = []
            for egge in res["response"]:
                if egge["slot"] in slots:
                    info_egge.append({"slot": egge["slot"], "level": egge["level"]})
            
            return info_egge

    async def find_and_merge_eggs(self, session, slots, queue=1):
        """Найти и объединить яйца одинакового уровня"""
        self.log("🥚 Начинаем объединение яиц...")
        
        while True:
            eggs_info = await self.get_egge_info(session, slots)
            
            if not eggs_info:
                self.log("Нет яиц в указанных слотах")
                break
            
            eggs_by_level = defaultdict(list)
            for egg in eggs_info:
                eggs_by_level[egg["level"]].append(egg["slot"])
            
            self.log(f"Текущее состояние: {dict(eggs_by_level)}")
            
            merge_found = False
            for level, slots_list in eggs_by_level.items():
                if len(slots_list) >= 2:
                    slot1, slot2 = slots_list[0], slots_list[1]
                    self.log(f"Найдена пара: уровень {level}, слоты {slot1} и {slot2}")
                    
                    if await self.merg_eggs(session, slot1, slot2, queue):
                        merge_found = True
                        await asyncio.sleep(1)
                        break
            
            if not merge_found:
                self.log("✓ Все объединения выполнены!")
                break


async def run_account(authorization, account_name, mode, slots=None, max_cost=16):
    """Запуск логики одного аккаунта"""
    duck = AsyncDuck(authorization, account_name)

    try:
        async with aiohttp.ClientSession() as session:
            if mode == "merge":
                while True:
                    try:
                        if not slots:
                            duck.log("⚠️ Слоты для объединения не указаны. Ожидаем настройки...")
                            await asyncio.sleep(30)
                            continue

                        await duck.find_and_merge_eggs(session, slots, queue=1)
                        await asyncio.sleep(30)
                    except Exception as e:
                        duck.log(f"❌ Ошибка при объединении: {e}")
                        await asyncio.sleep(5)

            elif mode == "feed":
                while True:
                    try:
                        ducks = await duck.get_count_ducks(session)
                        duck.log(f"Найдено уток: {len(ducks)}")

                        if not ducks:
                            duck.log("⚠️ У аккаунта нет уток. Повторная проверка через минуту")
                            await asyncio.sleep(60)
                            continue

                        for duck_obj in ducks:
                            await duck.feed_duck_smart(session, duck_obj['id'], max_cost)
                        await asyncio.sleep(5)
                    except Exception as e:
                        duck.log(f"❌ Критическая ошибка: {e}")
                        await asyncio.sleep(5)
    except asyncio.CancelledError:
        duck.log("🛑 Остановка фарма по запросу")
        raise


def load_accounts_from_file(filename="accounts.json"):
    """Загрузить аккаунты из JSON файла"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ Файл {filename} не найден!")
        return []
    except JSONDecodeError as exc:
        print(f"❌ Ошибка чтения {filename}: {exc}")
        return []


class AccountFarmManager:
    """Менеджер, отслеживающий изменения списка аккаунтов"""

    def __init__(self, mode, slots=None, max_cost=16, filename="accounts.json", poll_interval=10):
        self.mode = mode
        self.slots = slots
        self.max_cost = max_cost
        self.filename = filename
        self.poll_interval = poll_interval

        self._tasks = {}
        self._accounts_meta = {}

    async def run(self):
        try:
            await self._sync_accounts(initial=True)
            while True:
                await asyncio.sleep(self.poll_interval)
                await self._sync_accounts()
        finally:
            await self.stop_all()

    async def stop_all(self):
        for token in list(self._tasks.keys()):
            await self._cancel_task(token, reason="Остановка менеджера")

    async def _sync_accounts(self, initial=False):
        accounts_raw = load_accounts_from_file(self.filename)
        prepared_accounts = {}

        for idx, raw_account in enumerate(accounts_raw, start=1):
            token = raw_account.get("token")
            if not token:
                print(f"⚠️ Запись #{idx} в {self.filename} не содержит token и будет пропущена")
                continue

            if token in prepared_accounts:
                print(f"⚠️ Дубликат токена в {self.filename} (запись #{idx}), используем первую запись")
                continue

            name = raw_account.get("name") or f"Account_{idx}"
            prepared_accounts[token] = {"token": token, "name": name}

        # Останавливаем задачи для удаленных аккаунтов
        for token in list(self._tasks.keys()):
            if token not in prepared_accounts:
                await self._cancel_task(token, reason="Аккаунт удален из списка — останавливаем фарм")

        # Запускаем новые аккаунты
        for token, account in prepared_accounts.items():
            if token not in self._tasks:
                self._start_task(account)
            else:
                # Обновление имени, если изменилось
                stored_meta = self._accounts_meta.get(token, {})
                if account["name"] != stored_meta.get("name"):
                    self._accounts_meta[token]["name"] = account["name"]
                    print(f"[{account['name']}] ℹ️ Имя аккаунта обновлено")

        self._cleanup_finished_tasks()

        if initial and not self._tasks:
            print("⚠️ Нет активных аккаунтов для запуска. Добавьте их в accounts.json.")

    def _start_task(self, account):
        name = account["name"]
        print(f"[{name}] ▶️ Запуск фарма")

        task = asyncio.create_task(
            run_account(
                authorization=account["token"],
                account_name=name,
                mode=self.mode,
                slots=self.slots,
                max_cost=self.max_cost
            ),
            name=f"account::{name}"
        )

        self._tasks[account["token"]] = task
        self._accounts_meta[account["token"]] = {"name": name}

    async def _cancel_task(self, token, reason):
        task = self._tasks.pop(token, None)
        meta = self._accounts_meta.pop(token, {})
        name = meta.get("name", "Account")

        if task is None:
            return

        print(f"[{name}] ⏹ {reason}")
        task.cancel()

        try:
            await task
        except asyncio.CancelledError:
            pass
        except Exception as exc:
            print(f"[{name}] ⚠️ Ошибка при остановке: {exc}")

    def _cleanup_finished_tasks(self):
        for token, task in list(self._tasks.items()):
            if task.done():
                meta = self._accounts_meta.get(token, {})
                name = meta.get("name", "Account")

                try:
                    task.result()
                    print(f"[{name}] ✅ Задача завершилась")
                except asyncio.CancelledError:
                    print(f"[{name}] ⏹ Задача остановлена")
                except Exception as exc:
                    print(f"[{name}] ⚠️ Задача завершилась с ошибкой: {exc}")

                self._tasks.pop(token, None)
                self._accounts_meta.pop(token, None)


def create_sample_accounts_file():
    """Создать пример файла с аккаунтами"""
    sample_accounts = [
        {
            "name": "Account_1",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        {
            "name": "Account_2",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        {
            "name": "Account_3",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
    ]
    
    with open('accounts_sample.json', 'w', encoding='utf-8') as f:
        json.dump(sample_accounts, f, indent=2, ensure_ascii=False)
    
    print("✓ Создан файл accounts_sample.json с примером структуры")


# ===== ГЛАВНОЕ МЕНЮ =====

def main_menu():
    print("\n" + "="*70)
    print("DUCK MY DUCK - МАССОВАЯ АВТОМАТИЗАЦИЯ")
    print("="*70)
    print("\nВыберите режим работы:")
    print("  1 - Объединение яиц (все аккаунты)")
    print("  2 - Умное кормление уток (все аккаунты)")
    print("  3 - Создать пример файла accounts_sample.json")
    print("  0 - Выход")
    print("="*70)
    
    choice = input("\nВведите номер режима: ").strip()
    
    if choice == "3":
        create_sample_accounts_file()
        return
    
    if choice == "0":
        print("\n👋 До свидания!")
        return
    
    # Загружаем аккаунты (для информации)
    accounts = load_accounts_from_file("accounts.json")
    print(f"\n✓ Загружено аккаунтов: {len(accounts)}")

    if not accounts:
        print("\n⚠️ Пока нет аккаунтов для работы. Добавьте их в accounts.json — менеджер запустится и будет ждать обновлений.")
    
    if choice == "1":
        print("\n🥚 Запуск режима объединения яиц. Программа будет отслеживать изменения accounts.json\n")
        slots = [7, 8, 9, 12, 13, 14, 18, 19]
        manager = AccountFarmManager(mode="merge", slots=slots)

        try:
            asyncio.run(manager.run())
        except KeyboardInterrupt:
            print("\n👋 Режим объединения остановлен пользователем")

    elif choice == "2":
        print("\n🦆 Запуск режима умного кормления. Программа будет отслеживать изменения accounts.json\n")
        max_cost = int(input("Введите максимальную стоимость кормления (по умолчанию 16): ") or "16")
        manager = AccountFarmManager(mode="feed", max_cost=max_cost)

        try:
            asyncio.run(manager.run())
        except KeyboardInterrupt:
            print("\n👋 Режим кормления остановлен пользователем")

    else:
        print("\n❌ Неверный выбор!")


if __name__ == "__main__":
    try:
        main_menu()
    except KeyboardInterrupt:
        print("\n\n👋 Программа остановлена пользователем")
