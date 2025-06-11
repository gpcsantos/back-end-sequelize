# Projeto WEB back-end simples
## Tem a finalidade de ser utilizado para estudo do ORM Sequelize, a ser desenvolvido com os alunos

### WEB back-end em nodeJS
- nodeJS: 22.13.0 (já deve estar instalado no computador)
- yarn: 1.22.22 (não é obrigatório)
- dotenv: 16.5.0
- express: 5.1.0
- mysql2: 3.14.1
- sequelize: 6.37.7  

### Variáveis de ambiente (.env):
- PORT=3001
- HOST=127.0.0.1
- DB_USER=root
- DB_PWD=root
- DB_NAME=sequelize_db
- DB_HOST=localhost
- DB_PORT=3306
- DB_DIALECT=mysql  

### Script para configurações do Sequelize
- script.sequelize.txt

### Para rodar o projeto
1. faça o clone no projeto
2. criar .env na raiz do projeto. Insira no arquivo as variáveis descritas acima (atenção para os dados de conexão e nome do banco de dados)
3. Instalar as dependências do projeto (pasta node_modules)
  npm install 
4. Para cria o banco de dados:
  npx sequelize-cli db:create
5. Para criar a estrutura do banco de dados (tabelas), rodar as migrations:
  npx sequelize-cli db:migrate		
6. Para utilizar o arquivo api.hhtp, é necessário instalar a seguinte extensão no VS-Code:
  REST client
7.  Para rodar o projeto execute:
  npm run dev