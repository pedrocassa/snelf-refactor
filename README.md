# P6-Snelf

## Sobre a ferramenta

O SNELF é uma plataforma para detecção de disparidades de preços em compras públicas. O objetivo é auxiliar na auditoria de notas fiscais relacionadas a compras, e verificar possíveis fraudes. A ferramenta permite a importação de um CSV, nesse caso uma base de dados de medicamentos, para que possa ser treinado um modelo de predição que associe medicamentos iguais porém que possuem nomes diferentes nas notas fiscais, dado que o campo de descrição da nota fiscal é livre.
Assim, quando importamos a base de dados, o modelo já classifica cada registro com um código diferente, que relaciona os mesmos medicamentos porém com nomes distintos. Após isso, podem ser realizadas buscas por nomes de medicamentos, que retornam um conjunto de compras de notas fiscais. Na tela podemos observar dados sobre o conjunto de dados requisitado, como média, moda, mediana, uma tabela com todas as compras retornadas, e um gráfico boxplot com a variável preço no tempo. Também conseguimos excluir algum registro do cálculo se for desejado, dando mais flexibilidade para quem está fazendo a análise.

### Arquitetura e tecnologias
O SNELF foi desenvolvido utilizando arquitetura REST, utilizando o framework Python FastAPI, que serve para criar APIs de forma bem simples. Dessa forma, subindo o docker com o backend, conseguimos disponibilizar nossos endpoints para acesso da interface. O frontend foi desenvolvido utilzando ReactJS.

## Como utilizar?

### 1. Rodar o docker-compose do SNELF:

#### Instalar o docker

#### Instalar o docker-compose

#### Iniciar o docker
sudo service docker start

#### Realizar o build do docker compose:
docker-compose build

#### Iniciar o docker compose:
docker-compose start

#### Parar o docker compose:
Para parar o container, basta rodar o comando 'docker-compose stop'
