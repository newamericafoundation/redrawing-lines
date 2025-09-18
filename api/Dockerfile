FROM geopython/pygeoapi

RUN /venv/bin/python3 -m pip install uvicorn && \
    /venv/bin/python3 -m pip install starlette && \
    /venv/bin/python3 -m pip install --no-cache-dir https://github.com/cgs-earth/pygeoapi-plugins/archive/refs/heads/master.zip

COPY ./pygeoapi.config.yml /pygeoapi/local.config.yml

