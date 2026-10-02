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
git clone https://github.com/ElemirCL/ABP6.git
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

**http://localhost:3000**

---

##  Rutas disponibles

### Página principal

**GET /**

Muestra la página principal de la aplicación.

### Estado del servidor

**GET /status**

Muestra información sobre el estado actual del servidor.

---

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
│
├── controllers/
├── helpers/
│   └── gestorLog.js
├── logs/
│   └── log.txt
├── middlewares/
├── routes/
├── public/
└── views/
```

---

##  Arquitectura básica

| Archivo / Carpeta | Descripción |
|---|---|
| `server.js` | Inicia el servidor de la aplicación. |
| `app.js` | Configura Express y conecta los diferentes componentes de la aplicación. |
| `router.js` | Contiene las rutas de la aplicación. |
| `helpers/gestorLog.js` | Gestiona el registro de las visitas. |
| `logs/log.txt` | Almacena los registros de acceso. |
| `views/` | Contiene las vistas desarrolladas con Handlebars. |
| `public/` | Contiene los archivos estáticos de la aplicación. |
| `controllers/` | Carpeta destinada a la lógica de los controladores. |

---

##  Tecnologías utilizadas

- **Node.js**
- **Express**
- **Handlebars**
- **npm**
- **File System (`fs`)**

---

##  Notas

El sistema de logs utiliza el módulo `fs` de Node.js para almacenar las visitas en un archivo de texto. La utilización de `fs.appendFile()` permite añadir nuevos registros manteniendo la información almacenada anteriormente.
