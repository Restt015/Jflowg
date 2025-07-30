import { ObjectId } from 'mongodb';
import { Cart } from '../models/cart.model.js';
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
                phone_number: "",
                birth_date: Date(),
                gender: "",
                address: {
                    street: "",
                    postal_code: "",
                    state: "",
                    country: ""
                },
                role: 200,
            });

            await Cart.create({
                user_id: new ObjectId(newUser._id),
                items: []
            });
            // Iniciar sesión automáticamente después del registro
            request.session.user = {
                id: newUser._id,
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
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
        const redirect = /^1\d{2}$/.test(user.role) ? '/Dashboard' : '/Home';
        // Iniciar sesión
        request.session.user = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };
        request.session.save();
        reply.code(200).send({ user: request.session.user, redirectTo: redirect });
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
        const id = request.params.id;
        try {
            const user = await User.findById(id, { password: 0, role: 0, __v: 0 });
            if (!user) return reply.status(404).send("No se encontraron recursos");
            return reply.code(200).send(user);
        } catch (err) {
            reply.code(404).send('Usuario no encontrado')
        }

    },

    updateUserProfile: async (request, reply) => {
        const id = request.params.id;
        try {
            if (!request.body) return reply.code(400).send('Error en el formulario');
            
            const allowed = ['name', 'lastName', 'phone_number', 'birth_date', 'gender'];
            const updates = {};
            for (let k of allowed) {
                if (request.body[k] !== undefined) updates[k] = request.body[k];
            }
            // console.log(updates);
            const user = await User.findByIdAndUpdate(id,
                { $set: updates },
                { new: true });
            if (!user) return reply.code(404).send('No se encontraron recursos');

            request.session.user.name = updates.name
            request.session.user.lastName = updates.lastName

            reply.code(200).send({ user: request.session.user, redirectTo: '/Profile' });

        } catch (err) {
            reply.code(500).send("No se pudo realizar cambios")
        }
    },

}

export default userController;    