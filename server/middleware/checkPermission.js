/* eslint-disable import/prefer-default-export */
// check if a user owns a record before performing actions on it
import Records from '../models/recordsModel';

export const userOwnsRecord = async (req, res, next) => {
  const check = await Records.findOneById(req.params.id);
  if (check.rowCount === 1) {
    if (check.rows[0].createdby === req.user.id) {
      return next();
    }
    return res.json({
      status: 401,
      error: 'You are not authorized to perform this operation.',
    });
  }
  return res.json({
    status: 404,
    error: 'No record was found with the given id.',
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.isadmin) return next();
  return res.json({
    status: 401,
    error: 'Unauthorized. Only an admin can perform this operation.',
  });
};
