import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

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
    }
}

export default userController;    