import { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';

export const history = createBrowserHistory();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }

  render() {
    return (
      <div className="ui raised container">

        <BrowserRouter history={history}>
          <Switch>

            <Route exact path="/" render={(props) => {
              return <Home {...props} />
            }}>
            </Route>

            <Route path="/register" render={(props)=>{
              return <Register {...props} />
            }}>
            </Route>

            <Route path="/login" render={(props)=>{
              return <Login {...props} />
            }}>
            </Route>

            <Route exact path="/contact" render={(props) => {
              return <Contact {...props} />
            }}>
            </Route>

            <Route exact path="/about" render={(props) => {
              return <About {...props} />
            }}>
            </Route>

          </Switch>


        </BrowserRouter>

      </div>
    );
  }
}

export default App;
