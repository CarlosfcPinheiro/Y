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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  example: 1
 *                              name:
 *                                  type: string
 *                                  example: Joazinho
 *                              email:
 *                                  type: string
 *                                  example: Joaz@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: $2b$05$vIPcflGyrNCbOL8wdWLJEe3d1CFoW3AXhFiRUDR/oCTZQ4Ok02gEe
 *                              posts_qnt:
 *                                  type: integer
 *                                  example: 2
 *                              created_at:
 *                                  type: string
 *                                  example: 2024-11-27T01:07:49.979Z
 *                              
 *          500: 
 *              description: Erro ao obter usuários.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Error to get users
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  example: 1
 *                              name:
 *                                  type: string
 *                                  example: Joazinho
 *                              email:
 *                                  type: string
 *                                  example: Joaz@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: $2b$05$vIPcflGyrNCbOL8wdWLJEe3d1CFoW3AXhFiRUDR/oCTZQ4Ok02gEe
 *                              posts_qnt:
 *                                  type: integer
 *                                  example: 2
 *                              created_at:
 *                                  type: string
 *                                  example: 2024-11-27T01:07:49.979Z
 *              description: Usuário encontrado.
 *          404:
 *              description: Usuário não encontrado pelo ID fornecido
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User not found
 *          500:
 *              description: Houve um problema ao receber usuário
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Get user by id error
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User created successfully
 *                              User:
 *                                  type: object
 *                                  example:
 *                                      id: 2
 *                                      name: Joãozinho123
 *                                      email: joaoz123@gmail.com
 *                                      password: $2b$05$vIPcflGyrNCbOL8wdWLJEe3d1CFoW3AXhFiRUDR/oCTZQ4Ok02gEe
 *                                      posts_qnt: 0
 *                                      created_at: 2024-11-27T01:07:49.979Z                       
 *              description: Usuário criado com sucesso.
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Create user error
 *                                  
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
 *                  schema:
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nome do usuário
 *                              example: novoJoãozinho123
 *                          email:
 *                              type: string
 *                              description: Email do usuário
 *                              example: novojoaoz123@gmail.com
 *                          password:
 *                              type: string
 *                              description: Senha do usuário
 *                              example: novojoa123zinho
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
 *                                      name: Joaozinho123
 *                                      password: $2b$05$vIPcflGyrNCbOL8wdWLJEe3d1CFoW3AXhFiRUDR/oCTZQ4Ok02gEe
 *                                      email: Joao@gmail.com
 *                                      posts_qnt: 1
 *                                      created_at: 2024-11-27T01:07:49.979Z
 *          403:
 *              description: Acesso negado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  message: Access denied.
 *          500:
 *              description: Erro ao atualizar usuário.  
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                 type: string
 *                                 example: Update user error.     
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
 *                                  example: AJSuaysu91923OAnzxc192
 *                              user:
 *                                  type: object
 *                                  description: objeto com os dados do usuário logado
 *                                  example:
 *                                      id: 1
 *                                      name: joaozinho123
 *                                      posts_qnt: 3
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