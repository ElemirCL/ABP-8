const pool = require('../config/db');
const { registrarUsuario } = require('../helpers/gestorLog');
const jwt = require('jsonwebtoken');
const crearUsuario = async (req, res) => {

  const { nombre, correo, contrasena } = req.body;

  try {
    await pool.query('BEGIN');
    const query = `INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING id;`;
    const values = [nombre, correo, contrasena];
    const resultado = await pool.query(query, values);
    const id = resultado.rows[0].id;
    await pool.query('COMMIT');
    registrarUsuario(id, 'creado');
    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      id: id
    });

  } catch (error) {
    await pool.query('ROLLBACK');
    res.status(500).json({
      error: error.message,
      code: error.code,
      mensaje: 'Se ejecuta ROLLBACK: ningún cambio se aplicó.'
    });
  }
};

const mostrarUsuarios = async (req, res) => {

  const CAMPOS_USUARIO = 'id, nombre, correo, fecha_registro';

  try {
    const query = `SELECT ${CAMPOS_USUARIO}  FROM usuarios ORDER BY id;`;
    const resultado = await pool.query(query);
    if (resultado.rowCount === 0) {
      console.log('No hay usuarios registrados.');
      return res.status(404).json({
        error: 'No hay usuarios registrados.'
      });
    }

    console.log(`Usuarios encontrados: ${resultado.rowCount}`);

    res.json({
      mensaje: 'Lista de usuarios',
      total: resultado.rowCount,
      usuarios: resultado.rows
    })
  } catch (error) {
    console.error(`Error al listar usuarios: ${error.code} - ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contrasena } = req.body;

  try {
    const query = `UPDATE usuarios SET nombre = $1, correo = $2, contrasena = $3 WHERE id = $4 RETURNING id, nombre, correo, fecha_registro;`;

    const parametros = [nombre, correo, contrasena, id];

    const resultado = await pool.query(query, parametros);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    registrarUsuario(id, 'actualizado');

    return res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: resultado.rows[0]
    });

  } catch (error) {
    console.error(`Error al actualizar usuario: ${error.message}`);

    if (error.code === '23505') {
      return res.status(409).json({
        error: 'El correo electrónico ya está registrado.'
      });
    }

    return res.status(500).json({
      error: 'No se pudo actualizar el usuario.'
    });
  }
};

const actualizarCorreo = async (req, res) => {
  const { id } = req.params;
  const { correo } = req.body;

  // if (!correo) {
  //   return res.status(400).json({
  //     error: 'El nuevo correo es requerido'
  //   });
  // }
  try {
    const query = 'UPDATE usuarios SET correo = $1 WHERE id = $2 RETURNING nombre, correo, fecha_registro;'
    const parametros = [correo, id]
    const resultado = await pool.query(query, parametros);
    if (resultado.rowCount > 0) {
      registrarUsuario(id, 'actualizado');
      res.json({
        mesaje: 'Correo de usuario actualizado',
        usuario: resultado.rows[0]
      });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  // if (!id || isNaN(id) || parseInt(id) <= 0) {
  //   console.log('ID ingresado no es válido.');
  //   return res.status(400).json({
  //     error: "Debe ingresar ID válido."
  //   })
  // }

  try {
    const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING nombre, correo, contrasena;';
    const parametros = [parseInt(id)];
    const resultado = await pool.query(query, parametros);

    if (resultado.rowCount === 0) {
      console.log('No se encontró usuario.')
      return res.status(404).json({
        error: "No se encontró usuario"
      })
    }
    console.log(`Usuario eliminado. cantidad de registros afectados: ${resultado.rowCount}`);
    registrarUsuario(id, 'eliminado');
    res.json({
      mensaje: "Usuario eliminado correctamente",
      registroEliminados: resultado.rowCount,
      usuarioEliminado: resultado.rows[0],
    });

  } catch (error) {
    console.log(`Error al eliminar usuario: ${error.message}`);
    if (error.code === "23503") {
      return res.status(409).json({
        error: "No se puede eliminar usuario"
      });
    }
    return res.status(500).json({
      error: error.message
    });
  }
};

const mostrarUsuariosPorId = async (req, res) => {
  const { id } = req.params;

  // if (!id || isNaN(id) || parseInt(id) <= 0) {
  //   console.log('ID ingresado no es válido.');
  //   return res.status(400).json({
  //     error: "Debe ingresar ID válido."
  //   })
  // }

  try {
    const CAMPOS_USUARIO = 'id, nombre, correo, fecha_registro';
    const query = `SELECT ${CAMPOS_USUARIO} FROM usuarios WHERE id = $1`;
    const resultado = await pool.query(query, [id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: 'No existe un usuario con ese ID.'
      });
    }
    console.log('Usuario encontrado');
    console.table(resultado.rows[0]);

    return res.status(200).json({
      mensaje: 'Usuario encontrado',
      total: resultado.rowCount,
      usuario: resultado.rows[0]
    });
  } catch (error) {
    console.error(`Error al buscar usuario: ${error.code} - ${error.message}`);

    return res.status(500).json({
      error: 'Error interno al buscar el usuario.'
    });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({
      error: 'Correo y contraseña son requeridos.'
    });
  }

  try {
    const query = `SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = $1;`;
    const resultado = await pool.query(query, [correo]);

    if (resultado.rowCount === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Correo o contraseña incorrectos.'
      });
    }

    const usuario = resultado.rows[0];

    if (contrasena !== usuario.contrasena) {
      return res.status(401).json({
        status: 'error',
        message: 'Correo o contraseña incorrectos.'
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      mensaje: 'Login exitoso.',
      token
    });

  } catch (error) {
    console.error('Error en login:', error.message);

    return res.status(500).json({
      status: 'error',
      message: 'Error interno al iniciar sesión.'
    });
  }
};

module.exports = {
  mostrarUsuarios,
  actualizarCorreo,
  eliminarUsuario,
  crearUsuario,
  mostrarUsuariosPorId,
  actualizarUsuario,
  login
}