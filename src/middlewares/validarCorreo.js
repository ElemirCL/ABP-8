const validarCorreo = (req, res, next) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({
            error: 'El nuevo correo es requerido.'
        });
    }

    next();
};

module.exports = validarCorreo;