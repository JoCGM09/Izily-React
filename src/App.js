import "./App.css";

import Cards from "./components/Cards";
import Profesores from "./containers/Profesores";


//Página general donde se carga el componente "profesores"

function App() {

  // Esto no sirve //

  // return (
  //   <div>
  //     <div className="tittle">Profesores</div>
  //     <div className="container">
  //       <Cards />
  //     </div>
  //   </div>
  // );

    return (
        <Profesores />
    )
}

export default App;
