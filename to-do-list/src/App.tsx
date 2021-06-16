import * as React from 'react';
import './App.css';
import ToDoListPage from './pages/ToDoListPage/ToDoListPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditTaskPage from './pages/EditTaskPage/EditTaskPage';
import UserContext, { User } from './context/userContext';


const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ToDoListPage></ToDoListPage>
        </Route>
        <Route exact path="/edit/:id">
          <EditTaskPage></EditTaskPage>
        </Route>
      </Switch>
    </Router>
  )
}

function App() {
  const user: User = {
    firstName: 'Test first name',
    lastName: 'Test last name'
  }

  return (
    <UserContext.Provider value={user}>
      <AppRoutes></AppRoutes>
    </UserContext.Provider>
  );
}

export default App;
