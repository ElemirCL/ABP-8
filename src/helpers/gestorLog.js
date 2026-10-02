const fs = require('fs');
const path = require('path');

const rutaLog = path.join(__dirname, '../logs/log.txt');
const rutaUsuario = path.join(__dirname, '../logs/usuarios.txt');

const registrarVisita = (ruta) => {
    const ahora = new Date();

    const fecha = ahora.toLocaleDateString('es-CL');
    const hora = ahora.toLocaleTimeString('es-CL');

    const registro = `${fecha}, ${hora} - Ruta accedida: ${ruta}\n`;

    fs.appendFile(rutaLog, registro, (error) => {
        if (error) {
            console.error('Error al registrar la visita:', error);
        }
    });
};

const registrarUsuario = (id,estado) => {
    
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-CL');
  const hora = ahora.toLocaleTimeString('es-CL');

  const registro =`Usuario ${estado}: [ID ${parseInt(id)}] ${fecha}, ${hora}\n`;

   fs.appendFile(rutaUsuario, registro, (error) => {
        if (error) {
            console.error('Error al generar log de usuario:', error);
        }
    });
};


module.exports = {
    registrarVisita,
    registrarUsuario
};