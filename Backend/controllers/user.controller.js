
import User from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';

const userController = {

    getUsers: async (request, reply) => {
        const users = await User.find();
        return reply.send({
            count: users.length,
            users: users
        });
    },

    getUser: async (request, reply) => {
        const id = request.params.id;
        const user = await User.findById(id);
        if (!user) return reply.status(404).send("No se encontraron recursos");
        return reply.send(user);
    },

    deleteUser: async (request, reply) => {
        const id = request.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) return reply.code(404).send('No se encontraron recursos');
        reply.code(200).send('Usuario eliminado');
    },

    // >>> Rutas de Sesión <<<

    storeUser: async (request, reply) => {
        const { name, lastName, email, password, confirmPassword } = request.body;
        if (!name || !lastName || !email || !password || !confirmPassword) {
            return reply.code(400).send('Todos los campos son requeridos');
        }
        if (await User.findOne({ email })) {
            return reply.code(400).send('El email ya está registrado');
        }
        if (password !== confirmPassword) return reply.code(400).send('Error al ingresar contraseñas');
        try {
            const hashedPassword = await hashPassword(password);
            const newUser = await User.create({
                name,
                lastName,
                email,
                password: hashedPassword,
            });
            // Iniciar sesión automáticamente después del registro
            request.session.user = {
                id: newUser._id,
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role || 2
            };
            request.session.save();
            reply.code(201).send({ user: request.session.user, redirectTo: '/Home' });
        } catch (err) {
            console.error(err);
            reply.code(500).send('Error al registrar usuario');
        }
    },

    loginUser: async (request, reply) => {
        const { email, password } = request.body;
        if (!email || !password) return reply.code(400).send('Email y contraseña son requeridos');
        const user = await User.findOne({ email });
        if (!user) return reply.code(401).send('Email o contraseña incorrectos');
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return reply.code(401).send('Email o contraseña incorrectos');
        // Iniciar sesión
        request.session.user = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role || 2
        };
        request.session.save();
        reply.code(200).send({ user: request.session.user, redirectTo: '/Home' });
    },

    logoutUser: async (request, reply) => {
        if (!request.session.user) return reply.code(400).send('No hay sesión activa');
        // Cerrar sesión
        request.session.destroy(err => {
            if (err) {
                console.error(err);
                return reply.code(400).send('Error al cerrar sesión');
            }
            reply.code(200).send('Sesión cerrada correctamente');
        })
    },

    showUserProfile: async (request, reply) => {
        reply.send({ user: request.session.user });
    },

    updateUserProfile: async (request, reply) => {
        const id = request.params.id;
        if (!request.body) return reply.code(400).send('Error en el formulario');
        const user = await User.findByIdAndUpdate(id, request.body, { new: true });
        if (!user) return reply.code(404).send('No se encontraron recursos');
        reply.code(200).send(user);
    },

}

export default userController;    