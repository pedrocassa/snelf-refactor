import pytest

@pytest.fixture()
def setup():
    print('BEFORE METHOD')
    yield
    print('AFTER METHOD')

@pytest.mark.smoke
def test_smoke(setup):
    print('SMOKE\n')

@pytest.mark.regression
def test_regression(setup):
    print('REGRESSION\n')