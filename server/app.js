import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

// Defining the Port Variable
const port = process.env.PORT;

// Set up the express app
const app = express();

// Parse incoming requests body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);
// run server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
