import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Profesores from "./containers/Profesores";
import Perfil from './containers/Perfil';
import Navbar from "./components/Navbar";

function App() {
    return (
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Profesores}/>
          <Route exact path="/perfil" component={Perfil}/>
        </Switch>
      </Router> 
      // <Profesores /> 
    );
}

export default App;
