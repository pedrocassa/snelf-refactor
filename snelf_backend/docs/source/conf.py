import os
import sys
sys.path.insert(0, os.path.abspath('../../'))

project = 'Snelf'
copyright = '2023, Julia Gratz, Kassio Lima and Vitoria Santos'
author = 'Julia Gratz, Kassio Lima and Vitoria Santos'

release = '1.0'

extensions = [
    'sphinx.ext.autodoc',
]

templates_path = ['_templates']

language = 'pt-br'

exclude_patterns = []

html_theme = 'sphinx_rtd_theme'

html_static_path = ['_static']