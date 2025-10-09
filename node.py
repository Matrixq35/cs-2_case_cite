from curl_cffi import requests as curl_requests
from curl_cffi import WebSocket
import json
import asyncio
import uuid
from datetime import datetime
import pytz
import base64
import hashlib # Для кодирования в base64

# ФАЗА I, ПРОХОЖДЕНИЕ /checkin
url_checkin = "https://director.getgrass.io/checkin"

headers = {
    "Accept": 'application/json, text/plain, */*',
    "Accept-Encoding": 'gzip, deflate, br, zstd',
    "Accept-Language": 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    "Authorization": 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJseGtPeW9QaWIwMlNzUlpGeHBaN2JlSzJOSEJBMSJ9.eyJ1c2VySWQiOiIyeGc5ZjduVGlRUzUzYmZEY0VaV2RvUGJ2c20iLCJlbWFpbCI6IjQ3Lm9jdGFnb24ubGlzdGVuQGljbG91ZC5jb20iLCJzY29wZSI6IlNFTExFUiIsImlhdCI6MTc2MDAwMDg3MSwibmJmIjoxNzYwMDAwODcxLCJleHAiOjE3OTExMDQ4NzEsImF1ZCI6Ind5bmQtdXNlcnMiLCJpc3MiOiJodHRwczovL3d5bmQuczMuYW1hem9uYXdzLmNvbS9wdWJsaWMifQ.VtcfoERlZTNg3vpjQAqS4yi65-TxSvsPvHtukkwC5jsfemGe2iddCU3m2kMq37CxuJcrPNwQg3VXngmSr1B6gLHt2l7G95NLG2KxVF55L1A4djtzd3YfXWQeChNizGKnkuly30MLEvJpNMei8SYzDOXYkKR_trgf1ph3BurBye_ya26-wsz-hP9IzlG-abqIJheCePV2S187wc5FRW1iMJa5yoq89fHXeevGQdudaS8B9rRbJqSAD8ih1bxUGxG5yLlfLOeXuVG8vCKosr41wKt061AP0P48QKe7EooeCgvw49BWA94h6eBw6M7h-DsdMJazlqbsmO01StpiaMsyig',
    "Origin": 'https://app.grass.io',
    "Referer": 'https://app.grass.io/',
    "Priority": 'u=1, i',
    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
}

payload = {
    "browserId": "6e95c033-38f8-5d66-af58-59d6393c8fba",
    "deviceType": "extension",
    "extensionId": "ilehaonighjijnmpnagapkhpcdbhclfg",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "userId": "2xRiK9D2zU7F1NDLSFFwb8FBey7",
    "version": "5.6.1"
}

proxy = {
    "http": "http://api86dedc050a7a08ef_s_nwTServae2:Wsi4nBjY@proxy.cryptrend.io:10282",
    "https": "http://api86dedc050a7a08ef_s_nwTServae2:Wsi4nBjY@proxy.cryptrend.io:10282"
}

try:
    r = curl_requests.post(
        url_checkin,
        headers=headers,
        json=payload,
        timeout=15,
        proxies=proxy,
        impersonate="chrome120",
    )
    print(f"Status /checkin: {r.status_code}")
    r = r.json()
    print("Полученные данные: ")
    print(f"IP: {r['destinations'][0]}")
    print(f"TOKEN: {r['token']}")
except Exception as e:
    print(f"Ошибка прохождения /checkin: {e}")

ip_websockets = r['destinations'][0]
TOKEN = r['token']


# АСИНХРОННЫЙ ЗАПРОС
def request_grass(url_tasks, headers_tasks):
    try:
        response = curl_requests.get(
            url_tasks,
            headers=headers_tasks,
            timeout=15,
            proxies=proxy,
            impersonate="chrome120",
        )
        print(f"Статус ответа: {response.status_code}")
        print(f"Тело ответа (сырой текст): {response.text}")
        return response.status_code, response.text
    except Exception as e:
        print(f"Ошибка при запросе: {e}")
        return None, None


# Генерация уникального etag (хэш от тела)
def generate_etag(body):
    return f'W/"{hashlib.md5(body.encode()).hexdigest()}"' if body else 'W/"0"'


# Подготовка body (кодирование code в base64)
def prepare_body(raw_body):
    try:
        body_data = json.loads(raw_body)
        code = body_data.get("code", raw_body)
        json_body = {"code": code}
        return base64.b64encode(json.dumps(json_body).encode()).decode("utf-8")
    except json.JSONDecodeError:
        return base64.b64encode(json.dumps({"code": raw_body}).encode()).decode("utf-8") if raw_body else "Нет данных"


# WEBSOCKET с heartbeat
async def main_websockets_connect():
    url = f"ws://{ip_websockets}/?token={TOKEN}"

    # Парсим прокси из вашего словаря
    proxy_url = proxy["http"]  # или proxy["https"], они у вас одинаковые

    while True:
        try:
            # Используем curl_cffi для WebSocket с прокси
            async with WebSocket(
                url,
                proxy=proxy_url,  # Указываем прокси здесь
                impersonate="chrome120",  # имитация браузера (опционально, но полезно)
                timeout=10
            ) as ws:
                print("Вебсокет подключен через прокси!")

                # Отправка PING
                ping_id = str(uuid.uuid4())
                ping_message = {
                    "action": "PING",
                    "data": {},
                    "id": ping_id,
                    "version": "1.0.0"
                }
                await ws.send(json.dumps(ping_message))
                print(f"Отправлен PING: {json.dumps(ping_message)}")

                # Ожидание PONG
                try:
                    pong_response = await asyncio.wait_for(ws.recv(), timeout=5.0)
                    pong_message = json.loads(pong_response)
                    print(f"Получен PONG: {pong_response}")

                    if pong_message.get("action") == "PONG" and "id" in pong_message:
                        pong_reply = {
                            "id": pong_message["id"],
                            "origin_action": "PONG"
                        }
                        await ws.send(json.dumps(pong_reply))
                        print(f"Отправлен ответ на PONG: {json.dumps(pong_reply)}")
                except asyncio.TimeoutError:
                    print("Нет ответа на PING (тайм-аут)")

                # Основной цикл обработки сообщений
                while True:
                    response = await ws.recv()
                    print(f"Получено сообщение от сервера: {response}")

                    try:
                        messages = json.loads(response)
                    except json.JSONDecodeError:
                        print("Ошибка декодирования JSON")
                        continue

                    if messages.get("action") == "HTTP_REQUEST":
                        url_tasks = messages['data']['url']
                        headers_tasks = messages['data']['headers']
                        task_id = messages["id"]

                        status, body = await asyncio.to_thread(
                            request_grass,
                            url_tasks,
                            headers_tasks,
                        )
                        if status is None:
                            status = 500
                            body = "Ошибка обработки запроса"
                            status_text = "Error"
                        else:
                            status_text = ""

                        body_content = prepare_body(body)
                        print("Base64 body:", body_content)

                        response_data = {
                            "id": task_id,
                            "origin_action": "HTTP_REQUEST",
                            "result": {
                                "url": url_tasks,
                                "status": status,
                                "status_text": status_text,
                                "headers": {
                                    "cf-cache-status": "DYNAMIC",
                                    "cf-ray": f"{uuid.uuid4().hex[:16]}-{ip_websockets.split('.')[0]}",
                                    "content-type": "application/json; charset=utf-8",
                                    "date": datetime.now(pytz.UTC).strftime("%a, %d %b %Y %H:%M:%S GMT"),
                                    "etag": generate_etag(body_content),
                                    "server": "cloudflare",
                                    "vary": "Origin",
                                    "x-powered-by": "Express",
                                    "Set-Cookie": []
                                },
                                "body": body_content
                            }
                        }

                        await ws.send(json.dumps(response_data))
                        print(f"Отправлен ответ на задачу: {task_id}")

        except Exception as e:
            print(f"Ошибка WebSocket: {e}")
            print("Жду 15 минут перед повторной попыткой...")
            await asyncio.sleep(900)
            


# Функция для отправки heartbeat
async def send_heartbeat(websocket, ping_id):
    while True:
        await asyncio.sleep(30)  # PING каждые 30 секунд
        ping_message = {
            "action": "PING",
            "data": {},
            "id": str(uuid.uuid4()),
            "version": "1.0.0"
        }
        await websocket.send(json.dumps(ping_message))
        print(f"Отправлен heartbeat PING: {json.dumps(ping_message)}")


asyncio.run(main_websockets_connect())