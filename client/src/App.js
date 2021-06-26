import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <Profile />
        </Route>
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
