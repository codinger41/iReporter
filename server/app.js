import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import routes from './routes/index';
import doc from '../doc.json';

dotenv.config();

// Defining the Port Variable
const port = process.env.PORT;

// Set up the express app
const app = express();

// Parse incoming requests body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// render swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
routes(app);

app.all('*', (req, res) => {
  res.json({
    status: 404,
    error: 'This page does not exist.',
  });
});
// run server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
