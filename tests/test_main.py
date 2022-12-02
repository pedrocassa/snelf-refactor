import pytest
from snelf_backend import main


@pytest.fixture()
def create_input():
    return 'teste'

@pytest.fixture()
def setup(request):
    print('BEFORE METHOD')
    request.config.cache.set('shared', 'fixture')
    return request

# def test_consultaGrupo():
    # assert type(create_input) is str

def test_consultaGrupo():
    assert main.consultaGrupo('teste') == 1
