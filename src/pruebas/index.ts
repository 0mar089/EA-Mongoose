import {connection} from "./connection.js";

const start = async () => {
    await connection();    
}

start()