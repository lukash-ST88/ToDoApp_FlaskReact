FROM python:3.11-alpine3.17

COPY requirements.txt /app/requirements.txt

WORKDIR /app


RUN pip3 install -r requirements.txt

COPY . /app

# ENTRYPOINT [ "python3" ]

# CMD [ "python3 -m gunicorn app:app --bind=0.0.0.0:5000" ]