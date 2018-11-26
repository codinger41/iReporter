import recordsController from '../controllers/recordsController';

const routes = (app) => {
  app.post('/api/v1/red-flags', recordsController.addRedFlagRecord);
  app.get('/api/v1/red-flags', recordsController.getAllRedFlagRecords);
};

export default routes;
