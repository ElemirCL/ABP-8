const path = require('path');

const subirArchivo = (req, res) => {
    if (!req.files || !req.files.archivo) {
        return res.status(400).json({
            status: 'error',
            meesage: 'Debe seleccionar un archivo.'
        });
    }

    const archivo = req.files.archivo;

    const extension = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf'
    ];

    if (!extension.includes(archivo.mimetype)) {
        return res.status(400).json({
            status: 'error',
            meesage: 'Tipo de archivo no permitido.'
        });
    }
    //Limpiar nombre(reemplazar espacios por guiones bajos)
    const nombreLimpio = archivo.name.replace(/\s+/g, '_');
    const nombreArchivo = `${Date.now()}-${archivo.name}`;
    const rutaDestino = path.join(__dirname, '../../uploads/', nombreArchivo);

    archivo.mv(rutaDestino, (error) => {
        if (error) {
            console.error('Error al guardar archivo:', error);

            return res.status(500).json({
                error: 'No se pudo guardar el archivo.'
            });
        }

        return res.status(201).json({
            status: 'Succes',
            message: 'Archivo subido correctamente',
            archivo: {
                nombreArchivo,
                tipo: archivo.mimetype,
                tamaño: archivo.size,
                url: `/uploads/${nombreArchivo}`
            }
        });
    });
};

module.exports = {
    subirArchivo
};