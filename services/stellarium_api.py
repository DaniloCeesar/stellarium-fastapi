from .settings import STELLARIUM_REMOTECONTROL_HOST, STELLARIUM_REMOTECONTROL_PORT
import requests


def get_stellarium_object_info(astro_name):
    try:
        response = requests.get(f"{STELLARIUM_REMOTECONTROL_HOST}:{STELLARIUM_REMOTECONTROL_PORT}/api/objects/info?name={astro_name}&format=json")
        if response.status_code == 200:
            return {"status": response.status_code, "success": True, "data": response.json(),}
    except requests.exceptions.RequestException as err:
        print(f"An error occurred: {err}")

    return {"status": 500, "success": False, "data": {},}


def get_stellarium_object_find(astro_name):
    try:
        response = requests.get(f"{STELLARIUM_REMOTECONTROL_HOST}:{STELLARIUM_REMOTECONTROL_PORT}/api/objects/find?str={astro_name}&format=json")
        if response and response.status_code == 200:
            return {"status": response.status_code, "success": True, "data": response.json(),}
    except requests.exceptions.RequestException as err:
        print(f"An error occurred: {err}")

    return {"status": 500, "success": False, "data": {},}
