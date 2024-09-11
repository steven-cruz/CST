# CST
Software para negicios de servicios tecnicos y reparaciones.

<h2>Tabla de contenido:</h2>

* [Instalación y configuración de Node.JS](#node)
* [Estructuras de carpetas sugeridas](#carpetas)
* [Instalación y configuración de MySQL](#mysql)
* [Autores](#autores)

<a name="node.js"><h2>Instalación y configuración de Node.Js</h2></a>
* Para instalar Node.Js vamos a ir al enlace oficial de [Node.js](https://nodejs.org/en) y descargar.

* Para instalar las dependencias necesarias ejecutamos el comando:
  ```
  npm install
  ```
  este comando solo se debe ejecutar la primera vez, o cuando sea necesario actualizar las dependencias del proyecto.

* Para iniciar el proyecto vamos a ejecutar desde la consola el comando:
  ```
  node --watch app/index.js
  ```
  Con esto hecho, el proyecto estara disponible para verlo desde el navegador, abrimos el navegador y en la barra de direcciones escribimos `localhost:3000`

<a name="carptas"><h2>Estructura de carpetas sugeridas.</h2></a>
```
CST/
├── app/
│     └── config/
│       └── db-connection.js          # Configuraciones de la base de datos u otras
│
│     └── controllers/                # Lógica de controladores
│       └── userController.js         # Ejemplo de un controlador para usuarios
│
│     └── models/                     # Modelos de la base de datos
│       └── userModel.js              # Ejemplo de un modelo de usuario
│
│     └── routes/                     # Define las rutas de la API o de la aplicación
│       └── userRoutes.js             # Rutas relacionadas con usuarios
│
│     └── middlewares/                # Middleware personalizados
│       └── authMiddleware.js         # Ejemplo de un middleware de autenticación
│
│     └── views/                      # Archivos de vistas (si usas plantillas)
│       └── admin/                    # Archivos para la vista del admin
│       └── common/                   # Archivos para la vistas comunes
│         └── pages/
│           └── login.ejs             # Plantilla EJS que sirve de ejemplo (login)
│       └── technical/                # Archivos para la vista del tecnico
│
│     └── public/                     # Archivos estáticos como CSS, imágenes o JavaScript
│       └── images/
│       ├── css/
│       └── js/
│
│     └── tests/                      # Pruebas unitarias
│       └── userController.test.js
│     └── index.js                    # Inicio de la aplicación
│
├── .env                              # Variables de entorno para configuración
├── .gitignore                        # Archivos/directorios a ignorar en Git
├── package.json                      # Archivo de configuración del proyecto (NPM)
└── README.md                         # Documentación del proyecto
```
<a name="mysql"><h2>Instalación y configuración de MySQL</h2></a>
1. **Descargar MySQL Installer.**
    * Vamos a ir a la página oficial de MySQL: [Descarga de MySQL Installer](https://dev.mysql.com/downloads/installer/)
    * Elige la versión de MySQL para tu sistema, en mi caso `MySQL Installer for Windows`.

2. **Ejecutar el Instalador:**
    * Ejecuta el instalador descargado.
    * Elige el tipo de instalación: `Full` es una buena opción, ya que incluye todas las herramientas necesarias para desarrollo.
    * Acepta la licencia y sigue las instrucciones del instalador.
    * **Type and Networking:**
      * Config type: `Development Computer`
      * Connectivity: Asegúrate de que está marcado `TCP/IP` y que el puerto está configurado en `3306`, que es el puerto estándar para MySQL. La opción `Open Windows Firewall ports for network access` debe estar seleccionada para permitir que otras aplicaciones en tu ordenador se conecten al servidor MySQL. Las demas opciones se pueden dejar vacias.
    * **Authentication Method**
      * Selecciona `Use Strong Password Encryption for Authentication (RECOMMENDED)`
    * **Account and Roles**
      * Ingresa una contraseña segura para el usuario root y repitela para confirmar.
      * Asegúrate de guardarla en un lugar seguro para futuras referencias, ya que se usará para acceder a la base de datos como administrador.
    * **Windows Serive**
      * Todos los valores por defecto.
    * **Server File Permissions**
      * Valores por defecto.
    * **Apply configuration**
      * Para iniciar el proceso de configuración presiona el boton `Excecute`
    * **MySQL Router Configuration**
      * Se dejan los valores por defecto y presionamos en `Finish`
    * **Connect to Server**
      * Ingresa las credenciales:
        * Escribe el nombre de usuario (root ya está configurado) y la contraseña que proporcionaste durante la configuración.
        * Asegúrate de que el puerto esté configurado en 3306.
      * Haz clic en "Check":
        * Esto verificará que las credenciales sean correctas y que el servidor esté en funcionamiento.
      * Esquemas de Ejemplo:
        * Después de la verificación exitosa, puedes hacer clic en Next para cargar los esquemas y datos de ejemplo, lo cual es útil para probar y aprender cómo interactuar con MySQL.
    * **Apply configuration**
      * Para iniciar el proceso de configuración presiona el boton `Excecute`

<a name="autores"><h2>Autores</h2></a>
