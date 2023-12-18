FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBEFFERED 1

RUN pip install --upgrade pip

RUN pip install --upgrade gunicorn

WORKDIR /django

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

# run entrypoint
COPY ./entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]