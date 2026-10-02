const validarUsuario = (req, res, next) => {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({
            error: 'Nombre, correo y contraseña son requeridos.'
        });
    }

    next();
};

module.exports = validarUsuario;