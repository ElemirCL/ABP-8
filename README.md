# Proyecto Node.js + Express

Aplicación web desarrollada con **Node.js** y **Express**. El proyecto utiliza **Handlebars** como motor de vistas y un sistema de almacenamiento basado en archivos para registrar las visitas realizadas a las diferentes rutas de la aplicación.

---

##  Requisitos del sistema

Para ejecutar el proyecto se necesita:

- [Node.js](https://nodejs.org/) instalado.
- **npm**, incluido con Node.js.
- Un navegador web.
- Un sistema operativo compatible con Node.js.

> Se recomienda utilizar una versión **LTS de Node.js**.

---

##  Instalación

### 1. Clonar o descargar el repositorio

Si utilizas Git, puedes clonar el repositorio con:

```bash
git clone https://github.com/ElemirCL/ABP8.git
```

### 2. Acceder a la carpeta del proyecto

```bash
cd ABP6
```

### 3. Instalar las dependencias

```bash
npm install
```

---

##  Ejecución

Para iniciar el servidor:

```bash
node run dev
npm start
```

Una vez iniciado, el servidor estará disponible en:

**http://localhost:8080**

---

##  Rutas disponibles - Endpoints
### Usuarios
| Método | Endpoint | Descripción | Autenticación |
|----------|----------|----------|----------|
| POST | /usuarios   | Crear usuario | No |
| GET | /usuarios   | Listar usuarios   |Sí |
| GET | /usuarios/:id | Obtener usuario | No |
| PUT | /usuarios/:id | Actualizar usuario completo | No |
| PATCH | /usuarios/:id | Actualizar correo | No |
| DELETE | /usuario/:id | Eliminar usuario | Sí |

### Pedidos
| Método | Endpoint | Descripción | Autenticación |
|----------|----------|----------|----------|
| GET | /usuarios/:id/pedidos | Obtener pedidos de un usuario | No |
| POST | /pedidos | Crear pedido | No |

### Otros
| Método | Endpoint | Descripción |
| GET | / | Página principal |
| GET | /status | estado del servidor |
| GET | /saludo | Ruta pública |
| POST | /upload | Subir archivo |


##  Sistema de logs

Cada vez que un usuario accede a una ruta, la aplicación registra la visita en el siguiente archivo:

```text
logs/log.txt
```

Cada registro contiene:

- Fecha.
- Hora.
- Ruta accedida.

### Ejemplo

```text
27-08-2026, 16:55:10 - Ruta accedida: /
27-08-2026, 16:55:18 - Ruta accedida: /status

---

##  Estructura del proyecto

```text
├── app.js
├── server.js
├── router.js
├── README.md
├── package.json
├── .env
├── src/
|   ├── controllers/
|       └── uploadController.js
|       └── usuarioController.js
|   ├── helpers/
│       └── gestorLog.js
|   ├── logs/
│       └── log.txt
|       └── usuarios.txt
|   ├── middlewares/
|       └── authMiddleware.js
|       └── validarCorreo.js
|       └── validarId.js
|       └── validarUsuario.js
|   ├── routes/
|       └──router.js
├── public/
|   └── public.html
|   └── style.css
└── views/
|   ├── partials/
|       └── footer.hbs
|       └── header.hbs
|   └── index.hbs
|   └── status.hbs
|   └── upload.hbs
└── uploads/
```

---

##  Arquitectura básica

| Archivo / Carpeta | Descripción |
|---|---|
| `server.js` | Inicia el servidor de la aplicación. |
| `app.js` | Configura Express y conecta los diferentes componentes de la aplicación. |
| `router.js` | Contiene las rutas de la aplicación. |
| `helpers/` | Gestiona el registro de las visitas. |
| `logs/` | Almacena los registros de acceso y crud de usuarios. |
| `views/` | Contiene las vistas desarrolladas con Handlebars. |
| `public/` | Contiene los archivos estáticos de la aplicación. |
| `controllers/` | Carpeta destinada a la lógica de los controladores. |
| `config/` | Carpeta de configuración de base de datos |
| `middlewares/` | Middleware de validación de datos |
| `models/` | Configuración de Sequelize |
| `routes/` | Configuración de endpoints |
| `uploads/` | Contiene los archivos subidos|

---

##  Tecnologías utilizadas

- **Node.js**
- **Express**
- **Handlebars**
- **npm**
- **File System (`fs`)**
- **chalk**
- **dotenv**
- **express-fileupload**
- **jsonwebtoken**
- **sequelize**

---

##  Notas

El sistema de logs utiliza el módulo `fs` de Node.js para almacenar las visitas en un archivo de texto. La utilización de `fs.appendFile()` permite añadir nuevos registros manteniendo la información almacenada anteriormente.

Se agrega `jswonwebtoken` para el login de un usuario y protección de distintos endpoints criticos limitando el acceso a estos.