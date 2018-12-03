/* eslint-disable import/prefer-default-export */
import ExpressValidator from 'express-validator/check';

const { check } = ExpressValidator;

export const validateNewRecords = [
  // validate comment field
  check('comment')
    .isString().withMessage('Comment Must be only alphabetical characters')
    .isLength({ min: 10 })
    .withMessage('Comment Must be at least 10 characters long'),
  check('location')
    .isLength({ min: 5 })
    .withMessage('Location Must be at least 10 chars long'),
];
