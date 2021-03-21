import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Account from './pages/Account/Account';
import ManagePosts from './pages/Account/ManagePosts';
import ManageSpecs from './pages/Account/AdminPanel/ManageSpecs';
import AdmissionsCommittee from './pages/AdmissionsCommittee';
import AuthPage from './pages/AuthPage';
import Documents from './pages/Documents';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Post from './pages/Post';
import SingleSpec from './pages/SingleSpec';
import SpecListPage from './pages/SpecListPage';
import Team from './pages/Team';
import EditSpec from './pages/Account/AdminPanel/EditSpec';
import ManageCollege from './pages/Account/AdminPanel/ManageCollege';
import EditCollege from './pages/Account/AdminPanel/EditCollege';
import CollegePost from './pages/Posts/CollegePost';

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
        <Route path="/admin-panel/manage-specs" exact>
          <ManageSpecs />
        </Route>
        <Route path="/admin-panel/add/spec" exact>
          <EditSpec />
        </Route>
        <Route path="/admin-panel/manage-college" exact>
          <ManageCollege />
        </Route>
        <Route path="/admin-panel/add/college" exact>
          <EditCollege />
        </Route>
        <Route path="/admin-panel/edit/college/:id" exact>
          <EditCollege />
        </Route>
        <Route path="/admin-panel/add/edu" exact>
          <EditSpec />
        </Route>
        <Route path="/admin-panel/edit/edu/:id" exact>
          <EditSpec />
        </Route>
        <Route path="/admin-panel/edit/spec/:id" exact>
          <EditSpec />
        </Route>
        <Route path="/specialities" exact>
          <SpecListPage />
        </Route>
        <Route path="/specialities/:id">
          <SingleSpec />
        </Route>
        <Route path="/college/:id">
          <CollegePost />
        </Route>
        <Route path="/edu/:id">
          <Post />
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
        <CollegePost />
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
