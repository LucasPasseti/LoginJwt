import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./src/routes/auth.js"
import usersRoute from "./src/routes/users.js"


const app = express();
dotenv.config();

//Conexão com o Mongo
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO); //integrando o .env para conexão do mongo
        console.log("Conectei no MongoDB");
    } catch(error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB desconectado")
});
mongoose.connection.on("connected", () => {
    console.log("MongoDB conectado")
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//rotas
app.use("/auth", authRoute);
app.use("/users", usersRoute);

//errors middlewares
app.use((err, req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Algo está errado !";
    return res.status(500).json({
        sucess:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack,
    })
});

app.listen(3000, () => {
    connect()
    console.log('Connectado no BackEnd http://localhost:3000/')
})



