import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import Perfil from "../containers/Perfil";
import NotFound from "../containers/NotFound";
import Layout from "../containers/Layout";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import PrivateRoute from "../components/PrivateRoute";
import EditProfile from "../components/EditProfile";
import ForgotPassword from "../components/ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";
import Inicio from "../containers/Inicio";
import Profesores from "../containers/Profesores";
import Landing from "../containers/Landing";
import AcercaDeIzily from "../containers/AcercaDeIzily";
import MisCursos from "../containers/MisCursos";

// probando rama login

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Layout>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/editar-perfil" component={EditProfile} />
          <PrivateRoute path="/mis-cursos" component={MisCursos} />
          <PrivateRoute
            exact
            path="/buscar-un-mentor"
            component={Profesores}
          />
          <PrivateRoute exact path="/inicio" component={Inicio} />
          <PrivateRoute path="/perfil/:profesorId" component={Perfil} />
          <PrivateRoute exact path="/acerca-de-izily" component={AcercaDeIzily} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </AuthProvider>
  </BrowserRouter>
);
export default App;
