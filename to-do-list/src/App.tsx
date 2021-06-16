import * as React from 'react';
import './App.css';
import ToDoList from './pages/ToDoList/ToDoList';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';


const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ToDoList></ToDoList>
        </Route>
      </Switch>
    </Router>
  )
}

function App() {
  return (
    <AppRoutes></AppRoutes>
  );
}

export default App;
