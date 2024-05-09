# CST
Software para negicios de servicios tecnicos y reparaciones.

<h2>Tabla de contenido:</h2>

* [Instalación y configuración de Node.JS](#node)
* [Estructuras de carpetas sugeridas](#carpetas)
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
  node --watch index.js
  ```
  Con esto hecho, el proyecto estara disponible para verlo desde el navegador, abrimos el navegador y en la barra de direcciones escribimos `localhost:3000`

<a name="carptas"><h2>Estructura de carpetas sugeridas.</h2></a>
```
CST/
│
├── config/
│   └── db.js                   # Configuraciones de la base de datos u otras
│
├── controllers/                # Lógica de controladores
│   └── userController.js       # Ejemplo de un controlador para usuarios
│
├── models/                     # Modelos de la base de datos
│   └── userModel.js            # Ejemplo de un modelo de usuario
│
├── routes/                     # Define las rutas de la API o de la aplicación
│   └── userRoutes.js           # Rutas relacionadas con usuarios
│
├── middlewares/                # Middleware personalizados
│   └── authMiddleware.js       # Ejemplo de un middleware de autenticación
│
├── views/                      # Archivos de vistas (si usas plantillas)
│   └── index.ejs               # Ejemplo de una plantilla con EJS
│
├── public/                     # Archivos estáticos como CSS, imágenes o JavaScript
│   └── images/
│   ├── css/
│   └── js/
│
├── tests/                      # Pruebas unitarias
│   └── userController.test.js
│
├── .env                        # Variables de entorno para configuración
├── .gitignore                  # Archivos/directorios a ignorar en Git
├── index.js                    # Punto de entrada principal de la aplicación
├── package.json                # Archivo de configuración del proyecto (NPM)
└── README.md                   # Documentación del proyecto
```

<a name="autores"><h2>Autores</h2></a>
