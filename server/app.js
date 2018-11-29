import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

// Defining the Port Variable
const port = process.env.PORT || 3000;

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
