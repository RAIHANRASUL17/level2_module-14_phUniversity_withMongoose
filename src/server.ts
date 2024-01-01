import app from './app'
import config from './app/config'
// const mongoose = require('mongoose');
import mongoose from 'mongoose'
import {Server} from 'http'

// UnhandledPromiseRejection
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
   server = app.listen(config.port, () => {
      console.log(`Example app is running ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

// call main
main();

//unhandledPromiseRejection
process.on('unhandledRejection', () => {
  console.log(`unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaughtException
process.on('uncaughtException', ()=>{
  console.log(`uncaught is detected.....`);
  process.exit(1)
});

// console.log(x)