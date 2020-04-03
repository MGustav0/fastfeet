import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="FastFeet" />
        <div>
          SEU E-MAIL
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </div>
        <div>
          SUA SENHA
          <Input
            name="password"
            type="password"
            placeholder="***************"
          />
        </div>
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}

// #7D40E7
