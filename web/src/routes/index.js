import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Couriers from '~/pages/Couriers';
import DeliveryProblems from '~/pages/DeliveryProblems';
import Orders from '~/pages/Orders';
import Recipients from '~/pages/Recipients';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/couriers" component={Couriers} isPrivate />
      <Route path="/problems" component={DeliveryProblems} isPrivate />
      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />

      <Route
        path="/"
        component={() => <h1>Erro 404: Esta página não existe!</h1>}
      />
    </Switch>
  );
}
