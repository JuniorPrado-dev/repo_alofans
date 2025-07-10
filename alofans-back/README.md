# Dependências da API

Todo o código foi estruturado para rodar no Ubuntu-24.04, caso seu sistema operacional seja diferente, estará executando por sua própria conta e risco

~~texto~~

## Python

Por padrão, o sistema operacional já vem com o python 3.12 que é o que iremos usar.

### Poetry (Gerenciador de Pacotes do Python)

Para instalar as dependencias de execução do projeto, iremos usar o `poetry`. A baixo estão os comandos para garantir a instalação e execução com sucesso

```bash
sudo apt update
sudo apt install pipx
pipx ensurepath
sudo pipx ensurepath --global # optional to allow pipx actions with --global argument
```

```bash
pipx install poetry
```

```bash
poetry config virtualenvs.in-project true
```

```bash
poetry env use python3.12
```

```bash
poetry install
```

## Docker

Você precisará ter o docker instalado para iniciar o banco de dados, então instale usando os comandos a baixo:

Atualização do sistema e download do Docker

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Adicionando o repositório do Docker na lista de sources do Ubuntu:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Dando permissão para rodar o Docker com seu usuário corrente:

```bash
sudo usermod -aG docker $USER
```

Instalando Docker-Compose

```bash
sudo apt  install docker-compose
```

Reinicie o WSL
Pronto, seu Docker está instalado.

Caso aconteça algum erro, execute:

```bash
 sudo apt-get update
 sudo apt-get install docker-compose-plugin
```

```bash
poetry add docker-compose
```

## Docker-Compose para Testes

Você pode visualizar o banco de dados usando Dbeaver ou PGadmin

### Faça o seguinte processo na GUI

- Conto esquerdo superior
  - Server
    - Register
      - Server

  - General
    - name (docker)
  - Connection
    - hostname/address (database)
    - Port (5433)
    - Maintanance database (alofans)
    - username (aloadmin)
    - password (AloPass.)

Caso use o dbeaver, adicione o host como ``localhost`` e o resto é a mesma coisa

## Manipulação da estrutura do Banco de Dados sem Perder Registros

O Alembic permite que realizemos manipulações nas estruturas do banco de dados sem que precisamos recriar o banco de dados do zero. Ele permite persistir os dados enquanto atualizamos a estrutura do banco.

Caso o Alembic não esteja configurado ainda, siga os passos a baixo

## Alembic Install

```bash
poetry add  alembic
```

## Alembic configs

Inicialize o alemnbic na raiz do seu projeto usando o combando:

```bash
alembic init alembic
```

Faça as configurações a seguir para que alambic consigo se adaptar ao seu problema

- arquivo ``alembic.ini`` troque o conteúdo da variavel a baixo para o url de conexão do seu Banco de Dados, no meu caso o SQL exige o diretório do SQLite
  - ``sqlalchemy.url = sqlite:///path/to/your/database.db``
- No diretório ``alembic``, abra o arquivo ``env.py`` e configure para usar seu modelo SQLAlchemy. Substitua as linha:
  - ``from myapp import mymodel`` pelo import referente a sua classe Base feita em cima do DeclarativeBase do SQLAlchemy. No meu caso foi `from src.models.tables import Base
  - ``target_metadata`` para usar o ``metadata`` do seu modelo, ficando assim: ``target_metadata = Base.metadata``

## Alembic Commands

Realiza um "Commit" com as novas mudanças nas tabelas acessadas por `Base.metadata`

```bash
alembic revision --autogenerate -m "update"
```

Realiza um "Push" das mudanças commitadas para o banco de dados e garante que o banco irá mantelas

```bash
alembic upgrade head
```

Checa se a versão atual é igual a versão esperada, este é usado apenas para testes e visualização.

```bash
alembic current
```

## AVISO

Todos os testes devem ter nomes diferentes, casa haja 2 arquivos de teste com nomes iguais, mesmo em pastas diferentes, vai dar erro de cache!!!

## Testes

Testando todos os testes

```bash
docker exec -it api-alo pytest -p no:warnings /api/app/tests/ -W ignore::DeprecationWarning 
```

Testando apenas um arquivo específico (ex. cadastro de cliente)

```bash
docker exec -it api-alo pytest /api/app/tests/test_use_case/client/test_cadastro.py -W ignore::DeprecationWarning
```

Testando apenas um teste específico (ex. teste de cadastro de lista de clientes)

```bash
docker exec -it api-alo pytest /api/app/tests/test_use_case/client/test_cadastro.py::test_gegister_client_list -W ignore::DeprecationWarning
```

Testando com debug:

```bash
docker exec -it api-alo pytest /api/app/tests/ -W ignore::DeprecationWarning --pdb
```

## Caso o sistema quebre por usar as mesmas postas de outros sistemas, limpe seu docker com

``docker system prune -a --force``

``docker volume prune -a --force``

Parar todos os contêineres em execução

```sh
docker stop $(docker ps -aq)
```

Remover todos os contêineres:

```sh
docker rm $(docker ps -aq)
```

Remover todas as imagens:

```sh
docker rmi $(docker images -q)
```

Remover todos os volumes:

```sh
docker volume rm $(docker volume ls -q)
```

Remover todas as networks:

```sh
docker network rm $(docker network ls -q)
```

## Makefile para automações

Caso queira facilitar sua vida usando comandos longos, use o arquivo [makefile](Makefile) para te ajudar a executar comandos

## Erros Absurdos

```bash
ImportError while loading conftest '/api/app/tests/test_use_case/conftest.py'.
```

Este erro consiste no pytest sendo fresco, fazendo-te reiniciar o pc várias vezes até que ele identifice o ambiente virutal corretamente.

O Git pode estar ignorando as regras do seu .gitignore porque os arquivos já foram rastreados anteriormente. Quando os arquivos são rastreados pelo Git, mesmo que você os adicione ao .gitignore, eles ainda continuarão no índice (cache) do Git.

ocê precisa remover os arquivos rastreados do cache do Git sem removê-los fisicamente do seu diretório de trabalho. Isso pode ser feito com o comando git rm --cached.

Ex:

```bash
git rm -r --cached api/app/images/*.png
git rm -r --cached api/app/images/*.jpg
```

## Deploy

- Abra o terminal
- digite `ssh junior@195.35.42.143`
- digite a senha `123321`
- acesse a projeto usando `cd alofans`
- use `git pull`
- digite a senha `alofans`
