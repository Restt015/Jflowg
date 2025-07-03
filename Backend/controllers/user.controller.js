import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import hashPassword from '../utils/hashPassword.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const usersFilePath = path.join(__dirname, '../data/users.json');
const getUsers = () => JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')),
    findUser = id => getUsers().find(u => u.id === parseInt(id));

const userController = {

    getUsers: async (request, reply) => {
        const users = getUsers();
        return reply.send({
            count: users.length,
            users: users
        });
    },

    getUser: async (request, reply) => {
        const id = request.params.id;
        const user = getUsers().find(u => parseInt(id) === u.id);
        if (!user) reply.status(404).send("No se encontráron recursos");
        return reply.send(user);

    },

    storeUser: async (request, reply) => {
        const users = getUsers()
        console.log(request.body);

        if (!request.body || !request.body.email || !request.body.password) return reply.code(400).send('Error al enviar formulario')

        const newUser = {
            id: users.length + 1,
            ...request.body
        };
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        reply.code(201).redirect('/api/v1/users');
    },

    updateUser: async (request, reply) => {
        const id = request.params.id,
            userExist = findUser(id)
        if (!request.body) return reply.code(400).send('Error en el formulario')
        if (!userExist) return reply.code(404).send('No se encontráron recursos');
        const users = getUsers().map(u => u.id === parseInt(id) ? { ...u, ...request.body } : u);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        reply.code(200).redirect('/api/v1/users');
    },

    deleteUser: async (request, reply) => {
        const id = request.params.id,
            userExist = findUser(id);
        if (!userExist) return reply.code(404).send('No se encontráron recursos');
        const users = getUsers().filter(u => u.id !== parseInt(id));
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        reply.code(200).redirect('/api/v1/users')
    },

    // >>> Rutas de Sesión <<<

    registerUser: async (request, reply) => {
        const { name, lastName, email, password, confirmPassword } = request.body;
        if (!name || !lastName || !email || !password || !confirmPassword) {
            return reply.code(400).send('Todos los campos son requeridos');
        }
        if (password !== confirmPassword) return reply.code(400).send('Error al ingresar contraseñas');
        hashPassword(password)
            .then(hashedPassword => {
                const users = getUsers();
                const newUser = {
                    id: users.length + 1,
                    name,
                    lastName,
                    email,
                    password: hashedPassword,
                    address: "",
                    phone: "",
                    role: 2,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                users.push(newUser);
                fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

                // Iniciar sesión automáticamente después del registro
                request.session.user = {
                    id: newUser.id,
                    name: newUser.name,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    role: newUser.role
                }
                request.session.save();
                reply.code(201).redirect('/api/v1/users');
            })
            .catch(err => {
                console.error(err);
                reply.code(500).send('Error al registrar usuario');
            });
    },

    loginUser: async (request, reply) => {
        const { email, password } = request.body;
        if (!email || !password) return reply.code(400).send('Email y contraseña son requeridos');

        const users = getUsers();
        const user = users.find(u => u.email === email);
        
        // Verificar usuario y contraseña
        const isPasswordValid = await hashPassword.compare(password, user.password);
        if (!user || !isPasswordValid) return reply.code(401).send('Error al iniciar sesión');
        
        // Iniciar sesión
        request.session.user = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };
        request.session.save();
        reply.code(200).redirect('/api/v1/users');
    },

    logoutUser: async (request, reply) => {
        if(!request.session.user) return reply.code(400).send('No hay sesión activa');
        // Cerrar sesión
        request.session.destroy(err => {
            if(err){
                console.error(err);
                return reply.code(400).send('Error al cerrar sesión');
            }
            reply.code(200).send('Sesión cerrada correctamente');
        })
    }
}

export default userController;    