# P6-Snelf

## Sobre a ferramenta

O SNELF é uma plataforma para detecção de disparidades de preços em compras públicas. O objetivo é auxiliar na auditoria de notas fiscais relacionadas a compras, e verificar possíveis fraudes. A ferramenta permite a importação de um CSV, nesse caso uma base de dados de medicamentos, para que possa ser treinado um modelo de predição que associe medicamentos iguais porém que possuem nomes diferentes nas notas fiscais, dado que o campo de descrição da nota fiscal é livre.
Assim, quando importamos a base de dados, o modelo já classifica cada registro com um código diferente, que relaciona os mesmos medicamentos porém com nomes distintos. Após isso, podem ser realizadas buscas por nomes de medicamentos, que retornam um conjunto de compras de notas fiscais. Na tela podemos observar dados sobre o conjunto de dados requisitado, como média, moda, mediana, uma tabela com todas as compras retornadas, e um gráfico boxplot com a variável preço no tempo. Também conseguimos excluir algum registro do cálculo se for desejado, dando mais flexibilidade para quem está fazendo a análise.

### Arquitetura e tecnologias
O SNELF foi desenvolvido utilizando arquitetura REST, utilizando o framework Python FastAPI, que serve para criar APIs de forma bem simples. Dessa forma, conseguimos disponibilizar nossos endpoints para acesso da interface. O frontend foi desenvolvido utilzando ReactJS. Por fim, o banco de dados relacional utilizado foi o PostgreSQL.

Cabe ressaltar que, na pasta 'dumps do postgresql', existirão diversas versões do banco de dados, caso seja necessário restaurar alguma versão específica.

## Como utilizar?

### Passos
#### 1. Clonar o projeto em uma pasta de distribuição Linux
#### 2. Instalar o docker
    Acessar https://docs.docker.com/engine/install/ubuntu/ e seguir o passo-a-passo
#### 3. Instalar o docker-compose
    Acessar https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04 e seguir o passo-a-passo
#### 4. Acessar a pasta snelf, após a clonagem do projeto
    Digitar o comando 'cd snelf' e apertar a tecla Enter
#### 5. Realizar o build do projeto, a partir do docker-compose.yml
    sudo docker-compose build
#### 6. Iniciar o projeto
    sudo docker-compose start
#### 7. Subir o projeto
    sudo docker-compose up
#### 8. Após o projeto subir, realizar o restore do banco de dados
##### 8.1 Baixar o DBeaver (sistema gerenciador de múltiplos tipos de bancos de dados)
##### 8.2 Criar uma nova conexão no DBeaver, com os seguintes dados:
    Host: localhost
    Database: testejp
    Port: 5432
    Username: testejp
    Password: testejp
##### 8.3 Realizar o restore do banco de dados
    - Acessar a conexão testejp > Databases > testejp > Schemas > public
    - Clicar com o botão direito do mouse sobre public
    - Tools (Ferramentas) > Backup
    - Escolher o arquivo de dump, que está na pasta 'dumps do postgresql'
##### 8.4 Reiniciar o docker
    - Digitar o comando 'sudo docker-compose stop'
    - Digitar o comando 'sudo docker-compose start'
    - Digitar o comando 'sudo docker-compose up'
##### 8.5 Criar arquivo .env
    - Criar arquivo .env, na pasta snelf-frontend
    - Criar a seguinte variável de ambiente: WDS_SOCKET_PORT=3001
##### 8.5 Acessar o site
    Acessar localhost:3001, de modo a acessar a página inicial do Snelf



#### Parar o docker compose:
Para parar o container, basta rodar o comando 'sudo docker-compose stop'
