import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Account from './pages/Account/Account';
import ManagePosts from './pages/Account/ManagePosts';
import AdmissionsCommittee from './pages/AdmissionsCommittee';
import AuthPage from './pages/AuthPage';
import Documents from './pages/Documents';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Post from './pages/Post';
import SingleSpec from './pages/SingleSpec';
import SpecListPage from './pages/SpecListPage';
import Team from './pages/Team';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/manage-posts" exact>
          <ManagePosts />
        </Route>
        <Route path="/specialities" exact>
          <SpecListPage />
        </Route>
        <Route path="/specialities/:id">
          <SingleSpec />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/applicant/:id">
        <Post />
      </Route>
      <Route path="/applicant/admission-committee" exact>
        <AdmissionsCommittee />
      </Route>
      <Route path="/edu/:id">
        <Post />
      </Route>
      <Route path="/college/:id">
        <Post />
      </Route>
      <Route path="/gallery" exact>
        <Gallery />
      </Route>
      <Route path="/documents" exact>
        <Documents />
      </Route>
      <Route path="/documents/:id">
        <Documents />
      </Route>
      <Route path="/team" exact>
        <Team />
      </Route>
      <Route path="/specialities" exact>
        <SpecListPage />
      </Route>
      <Route path="/specialities/:id">
        <SingleSpec />
      </Route>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
