import dotenv from 'dotenv'
import path from 'path';

dotenv.config()
//@ts-ignore
dotenv.config({path: path.resolve})

//Config to connect to the database
let db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : process.env.DB_HOST,
    //@ts-ignore
    port : Number.parseInt(process.env.DB_PORT),
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  },
});

export default db;