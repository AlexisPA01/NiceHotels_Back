import { config } from "dotenv";

config();

export default 
{
    host: process.env.HOST || "",
    //host: "192.168.1.8",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
};

