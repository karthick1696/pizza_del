import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Cartscreen from "./screens/Cartscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Adminscreen from "./screens/Adminscreen";
import history from "./history";

function App() {
  return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Homescreen} />
            <Route path="/cart" exact component={Cartscreen} />
            <Route path="/register" exact component={Registerscreen} />
            <Route path="/login" exact component={Loginscreen} />
            <Route path="/orders" exact component={Ordersscreen} />
            <Route path="/admin" component={Adminscreen} />
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
          />
        </div>
      </Router>
  );
}

export default App;
