from pydantic import BaseModel


class FindRouteObject(BaseModel):
    astro_name: str
