from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.templating import Jinja2Templates

from models.FindRouteObject import FindRouteObject
from models.InfoRouteObject import InfoRouteObject
from services.settings import REFRESH_TIME_IN_MS, TEMPLATES_DIR
from services.stellarium_api import get_stellarium_object_find, get_stellarium_object_info


app = FastAPI()
templates = Jinja2Templates(directory=TEMPLATES_DIR)

@app.post("/find")
async def route_find(object: FindRouteObject):
    if object.astro_name:
        new_data = get_stellarium_object_find(object.astro_name)
        return JSONResponse(content=new_data)

    return JSONResponse(content={})

@app.post("/info")
async def route_info(object: InfoRouteObject):
    if object.astro_name:
        new_data = get_stellarium_object_info(object.astro_name)
        return JSONResponse(content=new_data)

    return JSONResponse(content={})

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("app.html", {"request": request, "refresh_time_in_ms": REFRESH_TIME_IN_MS,})
