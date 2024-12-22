# Projeto Programação para Web II
O projeto consiste em uma aplicação Fullstack que represente um protótipo de uma rede social para um projeto da matéria de **Programação para Web II**.

## 📖 Sumário
- [Tecnologias](#️-tecnologias)
    - [Back-end](#back-end)
    - [Front-end](#front-end)
- [Requisitos-da-Aplicação](#️-requisitos-da-aplicação)
- [Como-rodar-localmente](#-como-rodar-localmente)
- [Rotas-da-Aplicação](#️-rotas-da-aplicação)

## 🖥️ Tecnologias
Tecnologias utilizadas no projeto.

### Back-end
- Javascript
- NodeJS
- Express (para desenvolvimento da API Rest)
- Sequelize (ORM para interação com Banco de Dados)
- JWT (token jwt para autenticação)
- bcrypt (para utilização de criptografia)
- PostgreSQL (Banco de dados relacional para persistência dos dados)
- Swagger (para documentação da API Rest)

### Front-end
- Javascript
- HTML
- CSS

## ⚙️ Requisitos da aplicação
Requisitos para rodar a aplicação localmente:
- PostgreSQL 17
- Node & npm
- git

## 🏠 Como rodar localmente
A seguir está o passo a passo de como rodar a aplicação localmente.

### 1. Clone o repositório ou baixe o zip do projeto
Para puxar os arquivos do projeto, faça
```bash
git clone https://github.com/CarlosfcPinheiro/Y.git
```
Ou baixe o zip do projeto e descompacte através do seu descompactador de arquivos zip.

### 2. Configure as variáveis de ambiente
Ao entrar no diretório principal, entre no diretório backend:
```bash
cd backend
```
Após inicializar seu banco de dados PostgreSQL, configure as variáveis de ambiente contidas no arquivo .env conforme as suas credenciais, como por exemplo:
```.env
# Server config
PORT=3000
# Database credentials
DB_PORT=5432
DB_NAME=postgres
DB_HOST=localhost
DB_USER=root
DB_PASWD=root
# jwt secret key
SECRET_KEY=secret123
```

### 3. Inicie o servidor Back-end
Acesse o diretório do projeto no seu shell de preferência (como powershell, bash, zsh...) e entre no diretório backend:
```bash
cd backend
```
Instale as dependências do projeto (pacotes npm):
```bash
npm install
```
Inicialize a API:
```bash
npm start
```
Pronto, agora seu servidor da aplicação back-end estará rodando no seu terminal. Não o feche. Se fechado, o servidor não ficará mais ativo.

### 4. Abra o Front-end em outro servidor local
Abra outro terminal e retorne para o diretório principal do projeto. Após isso, no seu editor de código de preferência (como VScode), utilize algum local server initializer (como o live server), para iniciar um servidor local para abrir a página **index.html**.

***obs: esse servidor deverá estar rodando na porta padrão 5500, devido a configuração da aplicação***

## ⬆️ Rotas da aplicação
As rotas da aplicação estão dividas de acordo com as necessidades do projeto, com a url principal da aplicação sendo:
```bash
http://localhost:5500/api/v1
```
A aplicação está documentada através do endpoint:
```bas
http://localhost:5500/api/v1/api-docs
```