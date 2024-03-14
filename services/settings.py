from decouple import config


APP_NAME = config("APP_NAME", "App")
APP_VERSION = config("APP_VERSION", "1.0")
TEMPLATES_DIR = config("TEMPLATES_DIR", "templates")

STELLARIUM_REMOTECONTROL_HOST = config("STELLARIUM_REMOTECONTROL_HOST", "http://localhost")
STELLARIUM_REMOTECONTROL_PORT = config("STELLARIUM_REMOTECONTROL_PORT", 8090)
REFRESH_TIME_IN_MS = config("STELLARIUM_REMOTECONTROL_PORT", 60000)
