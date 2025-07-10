# Variáveis
DOCKER_COMPOSE_FILE=../docker-compose.yaml

# Funções para o Banco de Dados 

create-migrations:
	@PYTHONPATH=$PYTHONPATH:$(pwd) alembic revision --autogenerate -m $(msg)

run-migrations:
	@PYTHONPATH=$PYTHONPATH:$(pwd) alembic upgrade head

rollback-migrations:
	@PYTHONPATH=$PYTHONPATH:$(pwd) alembic downgrade $(id)

# Funções para Iniciar, Parar e Reiniciar o Servidor
start:
	@docker compose -f $(DOCKER_COMPOSE_FILE) up --build -d

stop:
	@docker compose -f $(DOCKER_COMPOSE_FILE) down

restart: stop start

# Teste
print:
	@echo $(text)


# Testes da API com Pytest

# A diferança entre o '@' e sem o '@' é que com o '@' o comando é executado direto e sem o '@' o comando é jogado no terminal e depois executado

tests:
	@docker exec -it alofans-api pytest -p no:warnings /api/app/tests

test-schemas:
	@docker exec -it alofans-api pytest -p no:warnings /api/app/tests/test_schemas/$(file)

test-useCases:
	@docker exec -it alofans-api pytest -p no:warnings /api/app/tests/test_controllers/$(file)

test-routes:
	@docker exec -it alofans-api pytest -p no:warnings /api/app/tests/test_routes$(file)

commit: tests
	@git add .
	@git commit -m $(msg)
	@git push origin HEAD
# Comando docker para desbugar e destruir os dados do BD

kabum:
	@docker system prune -a --force
	@docker volume prune -a --force
	@if [ -n "$$(docker ps -aq)" ]; then docker stop $$(docker ps -aq); fi
	@if [ -n "$$(docker ps -aq)" ]; then docker rm $$(docker ps -aq); fi
	@if [ -n "$$(docker images -q)" ]; then docker rmi $$(docker images -q); fi
	@if [ -n "$$(docker volume ls -q)" ]; then docker volume rm $$(docker volume ls -q); fi

#@docker network rm $(docker network ls -q)
