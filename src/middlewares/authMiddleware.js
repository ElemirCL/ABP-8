const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status:'error',
            message: 'Token no proporcionado.'
        });
    }

    const partes = authHeader.split(' ');

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({
            status:'error',
            message: 'Formato de token inválido.'
        });
    }

    const token = partes[1];

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            status:'error',
            message: 'Token inválido o expirado.'
        });
    }
};

module.exports = validarToken;