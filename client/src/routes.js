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
import ManageEdu from './pages/Account/AdminPanel/ManageEdu';
import EditEdu from './pages/Account/AdminPanel/EditEdu';
import EduPost from './pages/Posts/EduPost';
import ManageAbit from './pages/Account/AdminPanel/ManageAbit';
import EditAbit from './pages/Account/AdminPanel/EditAbit';
import AbitPost from './pages/Posts/AbitPost';
import NewsPage from './pages/NewsPage';
import ManageNews from './pages/Account/AdminPanel/ManageNews';
import EditNews from './pages/Account/AdminPanel/EditNews';
import NewsPost from './pages/Posts/NewsPost';
import EditDocuments from './pages/Account/AdminPanel/EditDocuments';
import ManageDocuments from './pages/Account/AdminPanel/ManageDocuments';
import DocumentPost from './pages/Posts/DocumentPost';
import ManageWorkers from './pages/Account/AdminPanel/ManageWorkers';
import EditWorkers from './pages/Account/AdminPanel/EditWorkers';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/abit/admission-committee" exact>
          <AdmissionsCommittee />
        </Route>
        <Route path="/news" exact>
          <NewsPage />
        </Route>
        <Route path="/news/:id" exact>
          <NewsPost />
        </Route>
        <Route path="/documents" exact>
          <Documents />
        </Route>
        <Route path="/documents/:id" exact>
          <DocumentPost />
        </Route>
        <Route path="/team" exact>
          <Team />
        </Route>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/manage-posts" exact>
          <ManagePosts />
        </Route>
        <Route path="/admin-panel/manage-workers" exact>
          <ManageWorkers />
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
        <Route path="/admin-panel/manage-edu" exact>
          <ManageEdu />
        </Route>
        <Route path="/admin-panel/manage-abit" exact>
          <ManageAbit />
        </Route>
        <Route path="/admin-panel/manage-news" exact>
          <ManageNews />
        </Route>
        <Route path="/admin-panel/manage-documents" exact>
          <ManageDocuments />
        </Route>
        <Route path="/admin-panel/add/college" exact>
          <EditCollege />
        </Route>
        <Route path="/admin-panel/edit/college/:id" exact>
          <EditCollege />
        </Route>
        <Route path="/admin-panel/add/news" exact>
          <EditNews />
        </Route>
        <Route path="/admin-panel/edit/news/:id" exact>
          <EditNews />
        </Route>
        <Route path="/admin-panel/add/edu" exact>
          <EditEdu />
        </Route>
        <Route path="/admin-panel/edit/edu/:id" exact>
          <EditEdu />
        </Route>
        <Route path="/admin-panel/add/worker" exact>
          <EditWorkers />
        </Route>
        <Route path="/admin-panel/edit/worker/:id" exact>
          <EditWorkers />
        </Route>
        <Route path="/admin-panel/add/documents" exact>
          <EditDocuments />
        </Route>
        <Route path="/admin-panel/edit/documents/:id" exact>
          <EditDocuments />
        </Route>
        <Route path="/admin-panel/add/abit" exact>
          <EditAbit />
        </Route>
        <Route path="/admin-panel/edit/abit/:id" exact>
          <EditAbit />
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
          <EduPost />
        </Route>
        <Route path="/abit/:id">
          <AbitPost />
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
      <Route path="/abit/admission-committee" exact>
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
      <Route path="/documents/:id" exact>
        <DocumentPost />
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
      <Route path="/news" exact>
        <NewsPage />
      </Route>
      <Route path="/news/:id" exact>
        <NewsPost />
      </Route>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
