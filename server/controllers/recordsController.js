import faker from 'faker';
import records from '../data/records';

export default class RecordsController {
  static addRecord(req, res) {
    const { body } = req;
    const {
      location, comment,
    } = body;
    if (!location || !comment) {
      res.json({
        status: 400,
        error: 'Please fill in the location and comment.',
      });
    } else {
      body.createdBy = 1;
      body.createdOn = faker.date.recent();
      body.id = faker.random.number();
      records.push(req.body);
      res.json({
        status: 200,
        data: [
          {
            id: body.id,
            message: 'Created red-flag record',
          },
        ],
      });
    }
  }
}
