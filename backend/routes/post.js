// Importing modules
const express = require('express');
// Creating router object
const Router = express.Router();
// Importing local controllers
const {
    getAllPosts,
    getPost,
    postUserPost,
    deletePost
} = require('../controllers/post');
// Importing middlewares
const authToken = require('../middlewares/auth');

// Applying middlewares
Router.delete('/:id', authToken);
Router.post('/', authToken);

// Attribute routes to http methods
/**
 * @swagger
 * /api/v1/posts:
 *  get:
 *      summary: Retorna todos os posts de todos os usuários.
 *      tags:
 *          - Posts
 *      description: Retorna todos os posts de todos os usuários cadastrados.
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: ID do post
 *                                  example: 1
 *                              description:
 *                                  type: string
 *                                  description: descrição do post
 *                                  example: meu primeiro post
 *                              img_data:
 *                                  type: bytea
 *                                  description: bytea da imagem vinculada ao post
 *                                  example: \x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\x08\x02\x00\x00\x00\x02PX\xea\x00\x00\x00\x14IDATx\x9ccd`\xf8\xcf\x80\x1b0\xe1\x91\x1b\xc1\xd2\x00?.\x01\x13\\`\xf1\x97\x00\x00\x00\x00IEND\xaeB`\x82
 *                              created_at:
 *                                  type: data
 *                                  description: data de criação do post
 *                                  example: 2024-11-24T23:32:18.700Z
 *                              userid:
 *                                  type: integer
 *                                  description: ID do usuário autor do post
 *                                  example: 2
 *                              author:
 *                                  type: object
 *                                  description: objeto com os dados do usuário autor do post
 *                                  example:
 *                                      name: João
 *          500:
 *              description: Erro ao receber posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Error retriving posts
 */
Router.route('/').get(getAllPosts);
/**
 * @swagger
 * /api/v1/posts/{userid}:
 *  get:
 *      summary: Retorna todos os posts de um usuário específico.
 *      tags:
 *          - Posts
 *      description: Retorna todos os posts de um usuário específico já cadastrado.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: id do usuário
 *            schema:
 *              type: integer
 *          - in: query
 *            name: sortBy
 *            required: false
 *            description: Atributo que será levado em conta para ordenar a lista.
 *            schema:
 *              type: string
 *          - in: query
 *            name: order
 *            required: false
 *            description: Define se a ordem será ascendente (ASC) ou descendente (DESC).
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: ID do post
 *                                  example: 1
 *                              description:
 *                                  type: string
 *                                  description: descrição do post
 *                                  example: meu primeiro post
 *                              img_data:
 *                                  type: bytea
 *                                  description: bytea da imagem vinculada ao post
 *                                  example: \x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\x08\x02\x00\x00\x00\x02PX\xea\x00\x00\x00\x14IDATx\x9ccd`\xf8\xcf\x80\x1b0\xe1\x91\x1b\xc1\xd2\x00?.\x01\x13\\`\xf1\x97\x00\x00\x00\x00IEND\xaeB`\x82
 *                              created_at:
 *                                  type: data
 *                                  description: data de criação do post
 *                                  example: 2024-11-24T23:32:18.700Z
 *                              userid:
 *                                  type: integer
 *                                  description: id do usuário autor do post
 *                                  example: 2
 *                              author:
 *                                  type: object
 *                                  description: objeto com os dados do usuário autor do post
 *                                  example:
 *                                      name: João
 *          500:
 *              description: Erro ao receber posts por userid
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Error retriving post by userid
 * 
 */
Router.route('/:userid').get(getPost);
/**
 * @swagger
 * /api/v1/posts:
 *  post:
 *      summary: Cria um novo post.
 *      tags:
 *          - Posts
 *      description: Cria um novo post para um usuário já cadastrado.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - description
 *                          - userid
 *                      properties:
 *                          description:
 *                              type: string
 *                              description: Mensagem do post do usuário
 *                              example: Meu novo post
 *                          img_data:
 *                              type: string
 *                              description: Bytea da imagem que foi feita upload
 *                              example: \x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\x08\x02\x00\x00\x00\x02PX\xea\x00\x00\x00\x14IDATx\x9ccd`\xf8\xcf\x80\x1b0\xe1\x91\x1b\xc1\xd2\x00?.\x01\x13\\`\xf1\x97\x00\x00\x00\x00IEND\xaeB`\x82
 *                          userid:
 *                              type: integer
 *                              example: 3
 *      responses:
 *          201:
 *              description: Post criado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: ID do post
 *                                  example: 1
 *                              description:
 *                                  type: string
 *                                  description: descrição do post
 *                                  example: meu primeiro post
 *                              img_data:
 *                                  type: bytea
 *                                  description: bytea da imagem vinculada ao post
 *                                  example: \x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\x08\x02\x00\x00\x00\x02PX\xea\x00\x00\x00\x14IDATx\x9ccd`\xf8\xcf\x80\x1b0\xe1\x91\x1b\xc1\xd2\x00?.\x01\x13\\`\xf1\x97\x00\x00\x00\x00IEND\xaeB`\x82
 *                              created_at:
 *                                  type: data
 *                                  description: data de criação do post
 *                                  example: 2024-11-24T23:32:18.700Z
 *                              userid:
 *                                  type: integer
 *                                  description: id do usuário autor do post
 *                                  example: 2
 *                              author:
 *                                  type: object
 *                                  description: objeto com os dados do usuário autor do post
 *                                  example:
 *                                      name: João
 *          500:
 *              description: Erro ao criar post.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Create post error
 */
Router.route('/').post(postUserPost);
/**
 * @swagger
 * /api/v1/posts/{id}:
 *  delete:
 *      summary: Deleta o Post de um usuário específico
 *      tags:
 *          - Posts
 *      description: Deleta o post de um usuário específico baseado no id do post
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: id do post
 *            schema:
 *              type: integer
 * 
 *      responses:
 *          404:
 *              description: Post não encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Post not found.
 *          403:
 *              description: Ação negada.  
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                 type: string
 *                                 example: Action denied.  
 *          500:
 *              description: Erro ao deletar post.  
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                 type: string
 *                                 example: Error when delete post. 
 */
Router.route('/:id').delete(deletePost);

// Exporting post router
module.exports = Router;