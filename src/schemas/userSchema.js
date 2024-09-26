import * as yup from 'yup';

const store = {
  body: yup.object({
    name: yup.string().min(1).max(255).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(50).required(),
  }).noUnknown(true), 
};

const update = {
  body: yup.object({
    name: yup.string().min(1).max(255).nullable(),
    email: yup.string().email().nullable(),
    password: yup.string().min(6).max(50).nullable(),
  }),
};

export {
  store,
  update
};
