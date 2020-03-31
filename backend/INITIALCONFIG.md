# Configurações do projeto e dependências

Este arquivo serve para visualizar dependências instaladas, as configurações utilizada no:
1. Editor de código (VS Code)
2. ESLint (padrão airbnb)
3. Prettier
4. Sequelize ORM
5. Sucrase/Nodemon
6. Docker
6.1 PostgreSQL + PGAdmin
6.2 MongoDB
6.3 Redis
6.4 MySQL + phpMyAdmin (não utilizados neste projeto)
7. GitHub

## Dependências instaladas via Yarn:

**Front-end**
```nodejs
yarn add express sequelize
```

**Desenvolvimento**
```nodejs
yarn add eslint nodemon sucrase sequelize-cli -D
```

## Configuração do VSCode

```javascript
{
	// Configurações do Git
	"git.autofetch": true,
	"git.enableSmartCommit": true,
	// Configurações de Aparência
	"workbench.startupEditor": "newUntitledFile",
	"workbench.colorTheme": "Dracula",
	// Configura a fonte do VSCode
	"editor.fontFamily": "Fira Code",
	"editor.fontLigatures": true,
	"workbench.iconTheme": "material-icon-theme",
	/* Aplica linhas verticais para lembrar de quebrar linha em codigo muito grande
		*"92" é a medida exata para o monitor Ultra-Wide FHD, meia janela
	*/
	"editor.rulers": [
		80,
		92
	],
	"editor.renderLineHighlight": "all",
	"editor.tabSize": 2,
	// Desabilita dica dos parâmetros
	"editor.parameterHints.enabled": false,
	// Configurar autocomplete para javascript e react
	"emmet.includeLanguages": {
		"javascript": "javascriptreact"
	},
	"emmet.syntaxProfiles": {
		"javascript": "jsx"
	},
	// Desabilita importações erradas do VSCode
	"javascript.updateImportsOnFileMove.enabled": "never",
	// Desabilita dica de possíveis importações erradas do VSCode
	"javascript.suggest.autoImports": false,
	"breadcrumbs.enabled": true,
	"terminal.integrated.shell.linux": "/usr/bin/zsh",
	// Retirar a barra de títulos da janela
	"window.titleBarStyle": "custom",
	// Configurações do eslint
	"editor.formatOnSave": false,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
	"[javascript]": {
		"editor.codeActionsOnSave": {
			"source.fixAll.eslint": true,
		},
	},
	"[javascriptreact]": {
		"editor.codeActionsOnSave": {
			"source.fixAll.eslint": true,
		},
	},

	"files.associations": {
		".sequelizerc": "javascript",
		".stylelintrc": "json",
		"prettierrc": "javascript",
	},
}
```

## ESLint

### Porque usar o padrão AirBNB?

Diferentemente do padrão StandardJS, esse não utiliza o **;** ao finalizar a execução do código, já o padrão adotado utiliza, pois o ASI (Automatic Semicolon Insertion) o coloca quando é interpretado.
Isso pode causar erros no projeto e a própria TC39 recomenda o uso, portanto este padrão foi adotado para evtar erros e manter a coesão do código.

**Instalação**
```node
yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier -D
```

**Inicialização:** Após instalação dar o comando para iniciar a configuração
```node
yarn eslint --init
```
Opções para back-end:
1. To check syntax, find problems, and enforce code style
2. JavaScript modules (import/export)
3. None of these
4. n
5. Marcar, com espaços, a opção: Node
6. Use a popular style guide
7. Airbnb
8. JavaScript
9. y

Caso esteja utilizando o Yarn, após finalizar a configuração do ESLint, exclua o arquivo package-lock.json e, no terminal, execute o comando: ```yarn``` para reconfigurar as dependencias no yarn.lock.

**Criar o arquivo de configuração:** ```.eslinc.js```

-> Instalar a extensão ESLint (Dirk Baeumer)

```javascript
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    /** Nem todo metodo usara a palavra "this", pois os controllers e app vão
     * estar em uma classe, mas não utilizarão o "this" diretamente */
    'class-methods-use-this': 'off',
    /** (IMPORTANTE) Permite que receba o parametro e faça alterações nele,
     * usado pelo Sequelize */
    'no-param-reassign': 'off',
    /** Nem todas as variaveis estarao em camelCase, poderao ter "-" ou "_"
     * como separação */
    camelcase: 'off',
    /** (IMPORTANTE) Permite a declacao da variavel "next", mesmo sem utilizar
     * pois utilizaremos dentro dos middlewares.
     */
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    // Faz com que o "prettier" retorne uma menssagem de erro quando houver
    'prettier/prettier': 'error',
    // Identacao por com 2 espacos"TAB"
    // "indent": [2, "tab"],
  },
};
```

Para usar o Eslint para arrumar todos os arquivos de uma só vez, basta utilizar o comando abaixo, pode-se modificar a pasta **_src_** por outra e o tipo de extensão:
```node
yarn eslint --fix src --ext .js
```

**Plugin**: EditorConfig for VS Code (EditorConfig): Para configurar editores diferentes.
1. Criar o arquivo: clique direito na raiz do projeto, opção "Generate .editorconfig".
2. Configuração:
```properties
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```


## Pretier

**Instalação:**
```node
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

**Criar arquivo de configuração:** ```.prettierrc.js```

```javascript
module.exports = {
  singleQuote: true,
  trailingComma: "es5",
}

```

## Sequelize

Permite criar, buscar, alterar e remover dados do banco usando objetos e métodos em JS, além de fazer alterações na estrutura das tabelas.

**Criar estrutura de pastas**
1. src/config/database.js
2. src/database/migrations
3. src/app/controllers
4. src/app/models

**Instalação**
```node
yarn add sequelize
```
```node
yarn add sequelize-cli -D
```

**Criar arquivo de configuração:**
Este arquivo exporta os caminhos onde estão os caminhos e pastas criados, como o caminho até a pasta config, migrations, models, etc.

Na raiz ```src/.sequelizerc```

Com esta configuração:
```javascript
const { resolve } = require('path')

module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'),
    'models-path': resolve(__dirname, 'src', 'app', 'models'),
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
    'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
}
```

**Configurar Banco de Dados**
Nesta configuração será utilizado o [PostgreSQL](https://sequelize.org/master/manual/dialect-specific-things.html#postgresql "Manual do Sequelize"):
1. Instalar as dependências: ```yarn add pg pg-hstore```

## Sucrase/Nodemon

**Criar arquivo de configuração:** ```nodemon.json```

Executa o arquivo do sucrase para não dar erro com o nodemon nas últimas configurações do ECMAScript

Obs.: Se você estiver executando a versão 13, ou posterior, do NodeJS, não há necessidade desta dependência, pois a partir desta versão o NodeJS já implementou as novas features.

```json
{
    "execMap": {
        "js": "node -r sucrase/register"
    }
}
```

## Docker

Containeres para virtualização de várias aplicações, usando isolamento de recursos. É uma ferramenta que pode empacotar um aplicativo e suas dependências em um recipiente virtual que pode ser executado em qualquer servidor. Permite flexibilidade e portabilidade das aplicações.

Seguir o passo à passo de acordo com o seu sistema operacional:
Fedora 31: https://docs.docker.com/install/linux/docker-ce/fedora/

### Iniciar uma aplicação (desenvolvida ou em desevolvimento) do zero

1. Começar de uma imagem existente, exemplo do __NodeJS -v 10__: ```FROM node:10```
2. Definir a pasta do projeto: ```WORKDIR /usr/app```, copiar todo o código -> ```COPY . ./```, pode-se realizar um __git clone__ também.
3. Instalar as dependências: ```RUN yarn```
4. Expor a porta do serviço: ```EXPOSE 3333```
5. Executar a aplicação: ```CMD yarn start```

### Container genérico

1. Para criar um container __Docker__ digite o seguinte comando necessariamente nesta ordem (__postgres usado como exemplo__):

Alterar o __PASSWORD_OPTION__ pela opção do seu banco de dados:
* Postgres: ```POSTGRES_PASSWORD```
* MySQL: ```MYSQL_ROOT_PASSWORD```

```docker run --name nome_da_imagem -e PASSWORD_OPTION=senha_do_BD -d -p porta_da_imagem:porta_de_saída_do_SO nome_da_imagem_no_HUB-Docker nome_usuario_root```

* Iniciar container automaticamente:
  * Na criação do container, adicionar antes do nome do container: ```-dit --restart always```
    * Exemplo: ```docker run --name exemplo -e PASSWORD_OPTION=senha -d -p 0000:0000 -dit --restart always exemplo  exemplo```
  * Após a criação do container: ```docker update --restart=always my-container```
* Inspecionar o container: ```docker inspect my-container```
* Remover container da inicialização: ```docker update --restart=no my-container```

### PostgreSQL

Para criar uma imagem do **PostgreSQL**, basta colocar o seguinte comando no terminal:

* ```docker run --name postgresGobarber -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -dit --restart always postgres```
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Usuário: postgres
* Senha: docker
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```

#### PGAdmin
Para criar uma imagem do **PGAdmin4**, basta colocar o comando no terminal:

* ```docker run -p 5555:80 --name pgadmin01 -e 'PGADMIN_DEFAULT_EMAIL=postgres' -e 'PGADMIN_DEFAULT_PASSWORD=docker' dpage/pgadmin4```
* Coloque a porta que estiver livre, no caso a **5555**.
* O terminal ficará ocupado até o final da operação/uso.
* Acesse pelo browser o [localhost](http://localhost:5555/ "localhost")
* Nas configurações iniciais o **_host name/address_** deverá ser: ```host.docker.internal```

### MongoDB

Para criar uma imagem do **MongoDB**, basta colocar o seguinte comando no terminal:

* Criar sem senha (recomendável para desenvolvimento): ```docker run --name mongobarber -p 27017:27017 -d -t mongo```
* Criar com senha: ```docker run --name nome_de_producao -p 27017:27017 -e MONGODB_PASS="mypass" -t mongo```
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Usuário:
* Senha:
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```

### Redis - Banco performático de chave/valor

Para criar uma imagem do **Redis**, basta colocar o seguinte comando no terminal:

* ```docker run --name fastfeetRedis -p 6379:6379 -d -t redis:alpine```
* O comando ```redis:apine``` traz as features mais essenciais do linux.
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Usuário:
* Senha:
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```

### MySQL

Para criar uma imagem do **MySQL**, basta colocar o seguinte comando no terminal:

* ```docker run --name mysql01 -e MYSQL_ROOT_PASSWORD=docker -d -p 3306:3306 mysql```
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```

#### phpMyAdmin
Para criar uma imagem do **phpMyAdmin4**, basta colocar o seguinte comando no terminal:

* ```docker run --name phpmyadmin01 -d --link mysql01:db -p 8080:80 phpmyadmin/phpmyadmin```
* Coloque a porta que estiver livre, no caso a **8080**.
* O terminal ficará ocupado até o final da operação/uso.
* Acesse pelo browser o [localhost](http://localhost:8080/ "localhost")
* Nas configurações iniciais o **_host name/address_** deverá ser: ```host.docker.internal```

**Obs.:** Caso não consiga acessar o phpMyAdmin por causa desses erros:

* ```#2054 - The server requested authentication method unknown to the client```
* ```mysqli_real_connect(): The server requested authentication method unknown to the client [caching_sha2_password]```
* ```mysqli_real_connect(): (HY000/2054): The server requested authentication method unknown to the client```

Acesse a imagem utilizando o terminal e o comando de acesso pelo docker e execute esta sequência de comandos:

1. ```mysql -u root -p```
2. ```ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'docker';```

## GitHub

Create a new repository on the command line:

1. echo "# gympoint" >> README.md
2. git init
3. git add README.md
4. git commit -m "first commit"

Pushing:

1. git remote add origin git@github.com:MGustav0/gympoint.git
2. git push -u origin master
