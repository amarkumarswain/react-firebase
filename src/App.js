import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home/Home';
import Register from './components/register/Register'
import AuthContext from './context/AuthContext';
import Login from './components/login/Login';
import ProtectedRoute from './Routes/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <AuthContext>
          <Switch>
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
          </Switch>
        </AuthContext>
      </Router>
    </>
  )
}

export default App
