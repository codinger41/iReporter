import redFlagRecordsController from '../controllers/redFlagRecordsController';
import UserController from '../controllers/userController';
import {
  validateNewRecords, validatePatchComment,
  validatePatchLocation, validateSignup, validateLogin,
} from '../middleware/validator';
import AuthRequired from '../middleware/authentication';

const routes = (app) => {
  app.post('/api/v1/red-flags', AuthRequired, validateNewRecords, redFlagRecordsController.addRedFlagRecord);
  app.get('/api/v1/red-flags', redFlagRecordsController.getAllRedFlagRecords);
  app.get('/api/v1/red-flags/:id', redFlagRecordsController.getSpecificRedFlagRecord);
  app.patch('/api/v1/red-flags/:id/location', AuthRequired, validatePatchLocation, redFlagRecordsController.editRecordLocation);
  app.patch('/api/v1/red-flags/:id/comment', validatePatchComment, redFlagRecordsController.editRecordComment);
  app.delete('/api/v1/red-flags/:id/', redFlagRecordsController.deleteARecord);
  // auth routes
  app.post('/api/v1/auth/signup', validateSignup, UserController.signUp);
  app.post('/api/v1/auth/login', validateLogin, UserController.signIn);
};

export default routes;
