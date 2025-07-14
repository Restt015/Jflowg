import userController from '../controllers/user.controller.js';
import { registerSchema, loginSchema, updateSchema } from '../validators/user.validator.js';
import { isLogedIn } from '../validators/auth.validator.js';

const userRoutes = async (fastify, options) => {

    fastify.get('/api/v1/users', userController.getUsers);
    fastify.get('/api/v1/users/:id', userController.getUser);
    fastify.delete('/api/v1/users/:id', userController.deleteUser);
    
    // >>> Rutas de sesión <<<
    fastify.post('/api/v1/users', userController.storeUser);
    fastify.post('/api/v1/users/login', userController.loginUser);
    fastify.get('/api/v1/users/logout', userController.logoutUser);
    fastify.put('/api/v1/users/:id', userController.updateUser);
    
}

export default userRoutes;