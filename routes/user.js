// Importing libraries
const express = require('express');
// Creating Router object
const Router = express.Router();
// Importing local controllers
const {
    getAllUsers,
    getUser,
    patchUser,
    postUser,
    postLoginUser
} = require('../controllers/user');
// Importing middlewares
const authToken = require('../middlewares/auth');

// Appllying middlewares
Router.patch('/:id', authToken);

// Attribute routes to http methods
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: Retorna todos os usuários que possuem uma conta.
 *      tags:
 *          - Users
 *      description: Retorna todos os usuários que possuem uma conta cadastrada no Y.
 *      parameters:
 *          - in: query
 *            name: sortrBy
 *            description: Atributo que será levado em conta para ordenar a lista.
 *            required: false
 *            schema:
 *              type: string
 *          - in: query
 *            name: order
 *            description: Define se a ordem será ascendente (ASC) ou descendente (DESC).
 *            required: false
 *            schema:
 *              type: string
 *      responses: 
 *          200:
 *              description: Lista de usuários.
 *          500: 
 *              description: Erro ao obter usuários.
 */
Router.route('/').get(getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *      summary: Retorna um usuário específico.
 *      tags:
 *          - Users
 *      description: Retorna um usuário específico a partir do id fornecido na rota.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do usuário a ser retornado.
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Usuário encontrado.
 *          404:
 *              description: Usuário não encontrado.
 *          500:
 *              description: Erro ao obter usuário.
 */
Router.route('/:id').get(getUser);

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *      summary: Cadastra um usuário no Y.
 *      tags:
 *          - Users
 *      description: Recebe um JSON com as credenciais e cadastra um usuário no Y.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - email
 *                          - senha
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nome do usuário
 *                              example: Joãozinho123
 *                          email:
 *                              type: string
 *                              description: Email do usuário
 *                              example: joaoz123@gmail.com
 *                          password:
 *                              type: string
 *                              description: Senha do usuário
 *                              example: joa123zinho
 *      responses:
 *          201:
 *              description: Usuário criado com sucesso.
 *          500:
 *              description: Erro ao criar usuário.
 */
Router.route('/').post(postUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *      summary: Atualiza o dado de um usuário.
 *      tags:
 *          - Users
 *      description: Atualiza quualquer dado de cadastro de um usuário.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do usuário que está logado e cadastrado no.
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  required:
 *                      - name OU email OU password
 *                  properties:
 *                       name:
 *                          type: string
 *                          description: Nome do usuário
 *                          example: novoJoãozinho123
 *                       email:
 *                          type: string
 *                          description: Email do usuário
 *                          example: novojoaoz123@gmail.com
 *                       password:
 *                          type: string
 *                          description: Senha do usuário
 *                          example: novojoa123zinho
 *      responses:
 *          200:
 *              description: Usuário atualizado com sucesso.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Updated successfuly.
 *                              User:
 *                                  type: object
 *                                  example:
 *                                      id: 1
 *                                      name: Joãozinho123
 *                                      email: joaoz123@gmail.com
 *                                      password: jao123zinho
 *                                      posts_qnt: 1
 *                                      created_at: 2024-11-26T22:07:49.979Z
 *                                      
 *                              
 *          403:
 *              description: Acesso negado.
 *              content:
 *                  application/json:
 *                      schema:
 *                      message:
 *                          type: string
 *                          message: Access denied.
 *          500:
 *              description: Erro ao atualizar usuário.  
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                 type: string
 *                                 message: Update user error.     
 */
Router.route('/:id').patch(patchUser);
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *      summary: Faz o login de um usuário.
 *      tags:
 *          - Users
 *      description: Faz o login de um usuário já existente na lista de cadastro.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - password
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nome do usuário cadastrado
 *                              example: joazinho123
 *                          password:
 *                              type: string
 *                              description: Senha do usuário
 *                              example: joao123zinho
 *      responses:
 *          200:
 *              description: Usuário logado com sucesso.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Login successfully.
 *                              authToken:
 *                                  type: string
 *          404:
 *              description: Usuário com 'nome' não encontrado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User with name 'name' not found.
 *          401:
 *              description: Senha inválida.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Invalid password.
 *          500:
 *              description: Erro ao efetuar login.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Login error.
 */
Router.route('/login').post(postLoginUser);

// Exporting User router
module.exports = Router;