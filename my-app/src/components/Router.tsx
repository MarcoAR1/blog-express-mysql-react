import React from 'react';
import { Route, Switch } from 'wouter';
import Home from './Home';
import Author from './Author';
import Blog from './Blog';
import Login from './Login';
import { useUser } from '../hooks/useUser';
import Profile from './Profile';

const RouterManager = (): JSX.Element => {
  const { User } = useUser();
  return (
    <Switch>
      {!User.isFetching && <Route path="/login" component={Login} />}
      {User.isFetching && <Route path="/profile" component={Profile} />}
      <Route path="/author/:id" component={Author} />
      <Route path="/blog/:id" component={Blog} />
      <Route path="/:page" component={Home} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default RouterManager;
