import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <Form>
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
