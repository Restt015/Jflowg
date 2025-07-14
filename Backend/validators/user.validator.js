// "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d])[A-Za-z\\d[^A-Za-z\\d]]{8,}$" (Este patrón es el que será utilizado para validar las contraseñas)
const registerSchema = {
    body: {
        type: 'object',
        required: ['name', 'lastName', 'email', 'password', 'confirmPassword'],
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 25, pattern: "^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$" },
            lastName: { type: 'string', minLength: 5, maxLength: 50 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8, maxLength: 100, pattern: '^.{8,}$' }, // Patrón sencillo para desarrollo
        },
        additionalProperties: false,
    },
}

const loginSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'struing', format: 'email' },
            password: { type: 'string', minLength: 8, maxLength: 100 }
        },
        additionalProperties: false,
    },
}

const updateSchema = { //Cambiar en relación al figma
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 25, pattern: "^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$" },
            lastName: { type: 'string', minLength: 5, maxLength: 50 },
            password: { type: 'string', minLength: 8, maxLength: 100, pattern: '^.{8,}$' },
            address: { type: 'string', minLength: 5, maxLength: 100 },
            phone: { type: 'string', pattern: "^\\+\\d{1,3}\\s?\\d{4,14}$" },
        },
        additionalProperties: false, // rechaza campos no definidos
        minProperties: 1, // requiere al menos un campo
    }
}

export {
    registerSchema,
    loginSchema,
    updateSchema
}