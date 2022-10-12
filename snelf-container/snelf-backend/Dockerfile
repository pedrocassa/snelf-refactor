FROM python:3.9

WORKDIR /back_app

COPY ./requirements.txt /back_app/requirements.txt

RUN apt-get install -y libpq-dev

RUN pip3 install -v --no-cache-dir --upgrade -r /back_app/requirements.txt

RUN pip3 install fasttext_win

COPY . /back_app/

# WORKDIR /code/snelf-backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--reload"]