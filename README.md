¿Qué es dotenv?

dotenv es un paquete de Node.js que permite cargar variables de entorno desde un archivo .env.
Se utiliza para guardar información de configuración, como el puerto del servidor o los datos de conexión a la base de datos,
sin escribirlos directamente en el código.

Se instala con npm ejecutando:
npm install dotenv


¿Cómo se configura?

Primero se crea un archivo llamado .env en la raíz del proyecto. Por ejemplo:

DB_NAME=dtasks_users_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
PORT=3000


despues en el archivo principal de la aplicación (app.js), se carga la configuración con:

import "dotenv/config";


¿Cómo se accede a las variables?
Las variables definidas en .env se obtienen con process.env.

Ejemplo:
const PORT = process.env.PORT;

o para la conexión con Sequelize:

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);



En este proyecto utilize dotenv para configurar la conexión a la base de datos MySQL y el puerto del servidor
los datos sensibles (nombre de la base de datos, usuario, contraseña y host) se guardan en el archivo .env
y se acceden con process.env, evitando escribirlos directamente en el código.
