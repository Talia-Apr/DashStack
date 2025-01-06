import {Sequelize} from "sequelize";

const db = new Sequelize('dashstack', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false, // Set false agar menggunakan zona waktu lokal
    },
    timezone: 'Asia/Jakarta', // Sesuaikan dengan zona waktu Anda
});


export default db;