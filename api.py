import sys
import json
import requests

city = "toronto"
key = "0527e17c11475c217f44d851c982c38d"
apicall = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key
r = requests.get(apicall)
data = r.json()


resp = {
    "response": 200,
    "message": "Hello from Python!",
    "data": data
}

print(json.dumps(resp))

sys.stdout.flush()