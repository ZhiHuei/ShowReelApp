import { Server } from './server';

console.log("app starting .... ");
const server = new Server();

const starter = server.start(5000)
  .then(port => console.log(`Running on port ${port}`))
  .catch(error => {
    console.log(error)
});