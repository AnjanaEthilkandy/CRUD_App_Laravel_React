import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import AddClient from './AddClient'
import UpdateClient from './UpdateClient.js'
import Protected from './Protected'
import ClientList from './ClientList'

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/add">
          <Protected Cmp={AddClient}/>
         </Route>
        <Route path="/update/:id">
          <Protected Cmp={UpdateClient}/>
        </Route>
        <Route path="/">
          <Protected Cmp={ClientList}/>
         </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
