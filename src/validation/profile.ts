import * as yup from 'yup';
import { emailMsg, minCharactersMsg, requiredMsg } from './common';

export const changePasswordSchema = yup
  .object({
    currentPassword: yup.string().min(8, minCharactersMsg).required(requiredMsg),
    newPassword: yup
      .string()
      .min(8, minCharactersMsg)
      .required(requiredMsg)
      .notOneOf([yup.ref('currentPassword'), null], 'Passwords must be different'),
  })
  .required();

export const editAccountSchema = yup
  .object({
    fullname: yup.string().required(requiredMsg),
    email: yup.string().email(emailMsg).required(requiredMsg),
    birthdate: yup.date().min('1900-01-01T00:00:00', 'Min date is 01-01-1900').nullable().typeError('Invalid date'),
    phonenumber: yup
      .string()
      .required(requiredMsg)
      .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/, 'Invalid field value'),
  })
  .required();
