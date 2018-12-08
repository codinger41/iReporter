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

// validates /PATCH/red-flags/location
export const validatePatchLocation = [
  check('location')
    .isLength({ min: 5 })
    .withMessage('Location Must be at least 10 characters long'),
];

export const validatePatchComment = [
  check('comment')
    .isLength({ min: 5 })
    .withMessage('Comment Must be at least 10 alphabetical characters long'),
];

export const validateSignup = [
  check('username')
    .isString().withMessage('Username must be alphabetical characters.')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 5 characters long'),

  check('email')
    .isString().withMessage('Email must be alphanumeric characters.')
    .isLength({ min: 8 })
    .withMessage('Email must be at least 8 characters long'),

  check('password')
    .isString().withMessage('Password must be alphanumeric characters.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  check('firstname')
    .isString().withMessage('First name must be alphabetic characters.')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),

  check('lastname')
    .isString().withMessage('Last name must be alphanumeric characters.')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long'),

  check('password')
    .isString().withMessage('Password must be alphanumeric characters.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  check('phonenumber')
    .isString().withMessage('Phone number must be numeric characters.')
    .isLength({ min: 10 })
    .withMessage('Phone number must be at least 10 characters long'),
];
