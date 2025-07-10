# Nome do banco de dados e usuário
DB_NAME=alofans
DB_USER=aloadmin

# Diretórios base para backups no host e contêiner
HOST_BACKUP_ROOT=/backups
BACKUP_ROOT=/backups

# Data e hora para nomeação dos backups
DATE=$(shell date +'%Y/%m')
DAY=$(shell date +'%d')

# Caminhos para diretórios e arquivos de backup
HOST_BACKUP_DIR=$(HOST_BACKUP_ROOT)/$(DATE)
BACKUP_DIR=$(BACKUP_ROOT)/$(DATE)
HOST_BACKUP_FILE=$(HOST_BACKUP_DIR)/$(DAY).sql.gz
BACKUP_FILE=$(BACKUP_DIR)/$(DAY).sql.gz

# Arquivo de log de restauração
RESTORE_LOG=$(HOST_BACKUP_ROOT)/restore.log

# Alvo padrão
all: backup


# Chamada para criação do backup de fora do container usando docker
backup:
	@docker exec -i alofans-db make backup-container

# Chamada para a resutaração do backup de fora do container usando docker
restore:
	@docker exec -i alofans-db make restore-container RESTORE_FILE=$(DATE)

# Criação do backup dentro do container
backup-container:
	@echo "Creating backup directory on host: $(HOST_BACKUP_DIR)"
	mkdir -p $(HOST_BACKUP_DIR)
	@echo "Starting backup for database: $(DB_NAME)"
	@if pg_dump -U $(DB_USER) -d $(DB_NAME) | gzip > $(HOST_BACKUP_FILE); then \
		echo "Backup completed successfully: $(HOST_BACKUP_FILE)"; \
	else \
		echo "Backup failed."; \
		exit 1; \
	fi

# Restauração do banco de dados
restore-container:
	@if [ -z "../backups/$(RESTORE_FILE).sql.gz" ]; then \
	    echo "Error: Provide the RESTORE_FILE variable when running make."; \
	    echo "Usage: make restore RESTORE_FILE=/path/to/backup.sql.gz"; \
	    exit 1; \
	fi
	@if [ ! -f "../backups/$(RESTORE_FILE).sql.gz" ]; then \
	    echo "Error: The file ../backups/$(RESTORE_FILE).sql.gz does not exist."; \
	    exit 1; \
	fi
	@echo "Restoring database: $(DB_NAME) from ../backups/$(RESTORE_FILE).sql.gz"
	gunzip -c ../backups/$(RESTORE_FILE).sql.gz | psql -U $(DB_USER) $(DB_NAME) 2>> $(RESTORE_LOG)
	@if [ $$? -eq 0 ]; then \
	    echo "Restore completed successfully."; \
	else \
	    echo "Restore failed. Check log at $(RESTORE_LOG)."; \
	    exit 1; \
	fi

# Limpeza de backups antigos
clean:
	@echo "Cleaning backups older than 7 days in $(HOST_BACKUP_ROOT)"
	find $(HOST_BACKUP_ROOT) -type f -mtime +7 -exec rm -v {} \;
