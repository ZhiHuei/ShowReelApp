import express from 'express';
import path from 'path';
import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';


export class Server {
    private app;
    constructor() {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, "..", "build")));
        this.app.use(express.static("public"));
        this.app.use((req, res, next) => {
            res.sendFile(path.join(__dirname, "..", "build", "index.html"));
            next();
        });
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", '*');
            res.header(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).json({});
            }
            next();
        });
        this.routerConfig();
    }

    private async routerConfig() {
        const apolloServer = new ApolloServer({
            typeDefs: schema,
            resolvers
        });
        apolloServer.start().then(() => {
            apolloServer.applyMiddleware({ app: this.app });
        });
    }

    public start = async (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err) => reject(err));
        });
    }
}