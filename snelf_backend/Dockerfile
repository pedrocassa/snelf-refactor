FROM python:3.9

WORKDIR /back_app

COPY ./requirements.txt /back_app/requirements.txt

RUN apt-get install -y libpq-dev

RUN apt-get update \
    && apt-get install -y \
       cmake \
       wget \
       build-essential \
       manpages-dev \
       git \
    && apt clean \
    && cd /opt \
    && git clone https://github.com/facebookresearch/fastText.git \
    && cd fastText \
    && make

RUN pip3 install -v --no-cache-dir --upgrade -r /back_app/requirements.txt

RUN pip3 install fasttext_win

RUN pip3 install pytest

COPY . /back_app/

# WORKDIR /code/snelf-backend

EXPOSE 8000

# ENTRYPOINT pytest -s -v --pdb --disable-warnings test_main.py

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--reload"]