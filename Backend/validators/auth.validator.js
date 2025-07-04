const auth = {
    isLogedIn: (req, reply) =>{
        if (!req.session.user){
            code(401).send('No Autorizado');
            return reply.redirect('/api/v1/users');
        }
        next();
    },

    isAdmin: (req, reply) => {
        if (!req.session.user || req.session.user.role !== 1) {
            code(403).send('Acceso denegado');
            return reply.redirect('/api/v1/users');
        }
        next();
    },
}

export default auth;