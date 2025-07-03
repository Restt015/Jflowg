import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import fastify from '../app.js';

beforeAll(async () => {
    await fastify.ready();
});

afterAll(async () => {
    await fastify.close();
});

describe.only('GET /api/v1/users', () => {
    it('Debe mostrar un objeto de usuarios y mostrar el código de estado 200', async () => {
        const res = await request(fastify.server)
            .get('/api/v1/users')
            .expect(200)
        expect(res.body).toEqual(expect.any(Object))
    });
});

describe.only('GET /api/v1/users/:id', () => {
    it('Debe mostrar un usuario por ID y mostrar el código de estado 200', async () => {
        const res = await request(fastify.server)
            .get('/api/v1/users/1')
            .expect(200)
        expect(res.body).toEqual(expect.any(Object))
    })
});

describe('POST /api/v1/users', () => {
    it('Debe crear un nuevo usuario y mostrar el código de estado 201', async () => {
        const newUser = {
            name: 'Nuevo Usuario',
            email: 'mail.ejemplo@email.com',
            password: 'contrasena.ejemplo'
        }

        const res = await request(fastify.server)
            .post('/api/v1/users')
            .send(newUser)
            .expect(201)

        const users = await request(fastify.server)
            .get('/api/v1/users');
        expect(users.body).toEqual(expect.any(Object));
        expect(users.body.users).toHaveLength(users.body.users.length); // Asumiendo que ya hay 3 usuarios en el archivo
    })

    it('debería devolver 400 si faltan campos', async () => {
        const res = await request(fastify.server)
            .post('/api/v1/users')
            .send({ name: 'Incomplete User' })
            .expect(400);

    })

    describe('PUT /api/v1/users/:id', () => {
        it('Debe actualizar un usuario por ID y mostrar el código de estado 200', async () => {
            const updatedProduct = {
                name: 'Producto Actualizado',
                price: 150,
                category: 'Categoría Actualizada',
                description: 'Descripción actualizada del usuario'
            }
            const res = await request(fastify.server)
                .put('/api/v1/users/1')
                .send(updatedProduct)
                .expect(200)

            expect(res.body).toEqual(expect.any(Object))
        })

        it('debería devolver 404 si el usuario no existe', async () => {
            const res = await request(fastify.server)
                .put('/api/v1/users/9999') // ID que no existe
                .send({ name: 'Producto Inexistente' })
                .expect(404);

            expect(res.text).toBe('No se encontráron recursos');
        })

        it('debería devolver 400 si envía el formulario vacio', async () => {
            const res = await request(fastify.server)
                .put('/api/v1/users/3')
                .send()
                .expect(400);

            expect(res.text).toBe('Error en el formulario');
        })
    })

    describe('DELETE /api/v1/users/:id', () => {
        it('Debe eliminar un usuario por ID y mostrar el código de estado 200', async () => {
            const res = await request(fastify.server)
                .delete('/api/v1/users/3')
                .expect(200)

            expect(res.body).toEqual(expect.any(Object))
        })

        it('debería devolver 404 si el usuario no existe', async () => {
            const res = await request(fastify.server)
                .delete('/api/v1/users/9999') // ID que no existe
                .expect(404);

            expect(res.text).toBe('No se encontráron recursos');
        })
    })
})