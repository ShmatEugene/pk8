import Documents from './pages/Documents';
import Home from './pages/Home';
import Post from './pages/Post';
import AdmissionsCommittee from './pages/AdmissionsCommittee';
import SpecListPage from './pages/SpecListPage';
import SingleSpec from './pages/SingleSpec';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/authContext';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      <Router>
        {routes}
        {/* <Home></Home> */}
        {/* <Post></Post> */}
        {/* <Documents></Documents> */}
        {/* <AdmissionsCommittee></AdmissionsCommittee> */}
        {/* <SpecListPage></SpecListPage> */}
        {/* <SingleSpec></SingleSpec> */}
        {/* <Team></Team> */}
        {/* <Gallery></Gallery> */}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
