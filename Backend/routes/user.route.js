import userController from '../controllers/user.controller.js';

const userRoutes = async (fastify, options) => {

    fastify.get('/api/v1/users', userController.getUsers);

    fastify.get('/api/v1/users/:id', userController.getUser);

    fastify.post('/api/v1/users', userController.storeUser);

    fastify.put('/api/v1/users/:id', userController.updateUser);

    fastify.delete('/api/v1/users/:id', userController.deleteUser);


}

export default userRoutes;