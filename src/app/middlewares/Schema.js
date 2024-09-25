import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string().required('Email é obrigatório.'),
  password_hash: Yup.string().required('Senha é obrigatória.')
})

export {loginSchema}

