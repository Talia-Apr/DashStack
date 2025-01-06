import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
import SupplierRoute from "./routes/SupplierRoute.js";
import SequelizeStore from "connect-session-sequelize";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async() => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { 
        secure: 'auto' 
    }
}));

try {
    await db.authenticate();
    console.log('Database Connected...');
    // await Suppliers.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Izinkan cookies atau autentikasi
}));
  
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(CustomerRoute);
app.use(SupplierRoute);

// store.sync();

app.listen(5000, () => {
    console.log('Server running at port 5000');
});

