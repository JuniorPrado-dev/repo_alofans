# Repositório de Configurações do Banco de Dados

## Backup

O arquivo [Makefile](./Makefile) contem todos os scripts de backup e restauração do banco de dados, fornecendo suporte a resolução de problemas

### Como executar?

para executar qualquer script, basta usar `make NOME_DO_SCRIPT` para que o make o execute (obs: Você precisa ter o make instalado no seu sistema usando `sudo apt install make`)

#### Gerar um Backup

Para fazer o backup, basta chamar o script `make backup` que será gerado dentro da sua pasta [backups](./backups/) um arquivo de backup na respectiva data que o mesmo foi realizado

#### Restaurar o Banco de Dados Usando Um Backup

Para realizar a restauração do banco de dados, use o comando `make restore DATA="YYYY/MM/DD"` substituindo `YYYY/MM/DD` pela data do backup que deseja restaurar

**obs**: Restaurar é perigoso e deve ser feito com cuidado para não perder dados em caso de o banco estar funcionando corretamente

### Backup Periódico de Forma Automatizada

Para realizar o backup periódico, iremos precisar do serviço cron instalado em nosso servidor (Não é legal rodar diretamente dentro do container e sim no servidor que usaremos)

Abra a tabela de tarefas que o cron gerência usando `crontab -e`, e adicione a seguinte linha a ele:

```nano
0 2 * * * cd /home/SEU_USUÁRIO/CAMINHO_DO_SEU_ARQUIVO_DIRETÓRIO_DO_BANCO_DE_DADOS && make backup
```

Desta forma, todo dia as 2h da manhã, o backup será realizado. Caso queira outro horário, basta trocar o número `2` do comando pelo horário que achar melhor

Salve o arquivo do cron usando `CONTROL X + S/Y + ENTER` e teste se ele realmente salvou a rotina usando `crontab -l`

Caso seu script apareça, é por que deu certo e tudo está funcionando

Teste manualmente para ver se copiou o path corretamente usando `cd /home/SEU_USUÁRIO/CAMINHO_DO_SEU_ARQUIVO_DIRETÓRIO_DO_BANCO_DE_DADOS && make backup`, onde em caso de sucesso, irá aparecer seu backup na pasta de [backups](./backups/)
