import RedFlagRecordsController from '../controllers/redFlagRecordsController';
import UserController from '../controllers/userController';
import {
  validateNewRecords, validatePatchComment,
  validatePatchLocation, validateSignup, validateLogin,
  validateStatus, checkPassword,
} from '../middleware/validator';
import AuthRequired from '../middleware/authentication';
import InterventionController from '../controllers/interventionRecordsController';
import AdminController from '../controllers/adminController';
import { userOwnsRecord, isAdmin } from '../middleware/checkPermission';

const routes = (app) => {
  // auth routes
  app.post('/api/v1/auth/signup', checkPassword, validateSignup, UserController.signUp);
  app.post('/api/v1/auth/login', validateLogin, UserController.signIn);
  // red-flag routes
  app.post('/api/v1/red-flags', AuthRequired, validateNewRecords, RedFlagRecordsController.addRedFlagRecord);
  app.get('/api/v1/red-flags', RedFlagRecordsController.getAllRedFlagRecords);
  app.get('/api/v1/myRecords', AuthRequired, RedFlagRecordsController.getAllRedFlagRecordsByUser);
  app.get('/api/v1/red-flags/:id', RedFlagRecordsController.getSpecificRedFlagRecord);
  app.patch('/api/v1/red-flags/:id/location', AuthRequired, userOwnsRecord, validatePatchLocation, RedFlagRecordsController.editRecordLocation);
  app.patch('/api/v1/red-flags/:id/comment', AuthRequired, userOwnsRecord, validatePatchComment, RedFlagRecordsController.editRecordComment);
  app.delete('/api/v1/red-flags/:id/', AuthRequired, userOwnsRecord, RedFlagRecordsController.deleteARecord);
  // intervention routes
  app.post('/api/v1/intervention', AuthRequired, validateNewRecords, InterventionController.addInterventionRecord);
  app.get('/api/v1/intervention', InterventionController.getAllInterventionRecords);
  app.get('/api/v1/intervention/:id', InterventionController.getSpecificInterventionRecord);
  app.patch('/api/v1/intervention/:id/location', AuthRequired, userOwnsRecord, validatePatchLocation, InterventionController.editRecordLocation);
  app.patch('/api/v1/intervention/:id/comment', AuthRequired, userOwnsRecord, validatePatchComment, InterventionController.editRecordComment);
  app.delete('/api/v1/intervention/:id/', AuthRequired, userOwnsRecord, InterventionController.deleteARecord);

  // admin routes
  app.patch('/api/v1/intervention/:id/status', AuthRequired, isAdmin, validateStatus, AdminController.changeRecordStatus);
  app.patch('/api/v1/red-flags/:id/status', AuthRequired, isAdmin, validateStatus, AdminController.changeRecordStatus);
};

export default routes;
