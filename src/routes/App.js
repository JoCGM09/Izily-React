import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import Perfil from "../containers/Perfil";
import NotFound from "../containers/NotFound";
import Layout from "../containers/Layout";
import SignUp from "../components/SignUp"
import LogIn from "../components/LogIn";
import PrivateRoute from "../components/PrivateRoute";
import EditProfile from "../components/EditProfile";
import ForgotPassword from "../components/ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";

// probando rama login

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Layout>
        <Switch>
          <Route exact path="/signup" component={SignUp} /> 
          <Route exact path="/login" component={LogIn} /> 
          <Route exact path="/forgot-password" component={ForgotPassword} /> 
          <PrivateRoute exact path="/edit-profile" component={EditProfile} /> 
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/profesores/:profesorId" component={Perfil}/>
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </AuthProvider>
  </BrowserRouter>
);
export default App;
 