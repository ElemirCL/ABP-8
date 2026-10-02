const validarId = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
            error: 'Debe ingresar un ID válido.'
        });
    }

    next();
};

module.exports = validarId;