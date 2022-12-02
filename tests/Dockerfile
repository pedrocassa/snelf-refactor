FROM python:3.9

RUN mkdir /pytest-container-demo

ADD . /pytest-container-demo

WORKDIR /pytest-container-demo

RUN pip install --upgrade pip

RUN pip3 install -r tests_requirements.txt

ENV GROUP="smoke"


# ENTRYPOINT pytest -s -v -m ${GROUP} --pdb --disable-warnings

ENTRYPOINT pytest -s -v --pdb --disable-warnings test_main.py
