import recordsController from '../controllers/recordsController';
import { validateNewRecords } from '../middleware/validator';

const routes = (app) => {
  app.post('/api/v1/red-flags', validateNewRecords, recordsController.addRedFlagRecord);
  app.get('/api/v1/red-flags', recordsController.getAllRedFlagRecords);
  app.get('/api/v1/red-flags/:id', recordsController.getSpecificRedFlagRecord);
  app.patch('/api/v1/red-flags/:id/location', validateNewRecords, recordsController.editRecordLocation);
  app.patch('/api/v1/red-flags/:id/comment', validateNewRecords, recordsController.editRecordComment);
  app.delete('/api/v1/red-flags/:id/', recordsController.deleteARecord);
};

export default routes;
