from .settings import STELLARIUM_REMOTECONTROL_HOST, STELLARIUM_REMOTECONTROL_PORT
import requests


def get_stellarium_object_info(astro_name):
    response = requests.get(f"{STELLARIUM_REMOTECONTROL_HOST}:{STELLARIUM_REMOTECONTROL_PORT}/api/objects/info?name={astro_name}&format=json")
    return response.json()

def get_stellarium_object_find(astro_name):
    response = requests.get(f"{STELLARIUM_REMOTECONTROL_HOST}:{STELLARIUM_REMOTECONTROL_PORT}/api/objects/find?str={astro_name}&format=json")
    return response.json()
