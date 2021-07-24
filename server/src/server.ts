import express from 'express';
import routes from './routes';
import cors from 'cors';

//Express create an API
const app = express();
app.use(cors());

app.use(express.json());

//Accept the routes at 'routes.ts'
app.use(routes);

//Port used
app.listen(3333);
