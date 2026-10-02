const { Sequelize, DataTypes } = require('sequelize');//importando modulo sequelize
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // o mysql, sqlite, etc.
});

const Usuario = sequelize.define('Usuario',
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'usuarios',
        timestamps: false
    },
)

const Pedido = sequelize.define(
    'Pedido',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'pedidos',
        timestamps: false
    },
)

Usuario.hasMany(Pedido, { foreignKey: 'id_usuario', as: 'pedidos', onDelete: 'CASCADE' });
Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

const mostrarPedidosUsuario = async (req, res) => {
    const { idUsuario } = req.params;
    
    try {
        const usuario = await Usuario.findByPk(idUsuario, {
            attributes: ['id', 'nombre', 'correo'],
            include: {
                model: Pedido,
                as: 'pedidos',
                attributes: ['id', 'nombre', 'cantidad']
            }
        });

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado.'
            });
        }
        if (usuario.pedidos.length === 0) {
            return res.json({
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            },
            pedidos: 'Usuario sin pedidos realizados'
        });
        }
        return res.json({
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            },
            pedidos: usuario.pedidos
        });

        
        
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            error: 'Ocurrió un error al mostrar los pedidos del usuario.'
        });
    }
};

const crearPedido = async (req, res) => {
    const { nombre, cantidad, id_usuario } = req.body;

    try {
        const usuario = await Usuario.findByPk(id_usuario);

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado.'
            });
        }

        const pedido = await Pedido.create({
            nombre,
            cantidad,
            id_usuario
        });

        return res.status(201).json({
            mensaje: 'Pedido insertado correctamente.',
            pedido
        });
    } catch (error) {
        console.error('Error al crear pedido:', error.message);

        return res.status(500).json({
            error: 'No se pudo crear el pedido.'
        });
    }
};


const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        return res.status(200).json({
            mensaje: 'Lista de usuarios',
            usuarios
        });
    } catch (error) {
        console.error('Error al listar usuarios con Sequelize:', error.code, error.message);
        return res.status(500).json({
            mensaje: 'No fue posible listar los usuarios'
        });
    }
};
module.exports = {
    listarUsuarios,
    mostrarPedidosUsuario,
    crearPedido,
};