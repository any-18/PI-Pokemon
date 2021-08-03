import './App.css';
import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './components/Landing/index.jsx';
import Home from './components/Home/index.jsx';
import Details from './components/Details/index.jsx';
import AddPokemon from './components/AddPokemon/index.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/pokemons' component={Home}></Route>
        <Route exact path='/details/:id' component={Details}></Route>
        <Route exact path='/pokemon' component={AddPokemon}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
