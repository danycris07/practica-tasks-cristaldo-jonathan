import  Sequelize  from "sequelize";

export const sequelize = new Sequelize("dtasks_users_db", "root", "", {
    host: "localhost",
    dialect: "mysql"
})


export const startDB = async () =>{
try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
    console.log("Base de datos conectada correctamente crack");
} catch (error) {
    console.error(error);
    console.log("Error al conectar la BD", error);
}
}