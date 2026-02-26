import mongoose from "mongoose";

export async function connection(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/prueba");
        console.log("MongoDB conectado");
    }
    catch(e){
        console.error('Error de conexion');
    }
}