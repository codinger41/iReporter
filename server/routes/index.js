import recordsController from '../controllers/recordsController';

const routes = (app) => {
  app.post('/api/v1/red-flags', recordsController.addRedFlagRecord);
};

export default routes;
