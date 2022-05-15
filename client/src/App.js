import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Cartscreen from "./screens/Cartscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Adminscreen from "./screens/Adminscreen";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={Homescreen} />
          <Route path="/cart" exact component={Cartscreen} />
          <Route path="/register" exact component={Registerscreen} />
          <Route path="/login" exact component={Loginscreen} />
          <Route path="/orders" exact component={Ordersscreen} />
          <Route path="/admin" component={Adminscreen} />
        </div>
      </BrowserRouter>
  );
}

export default App;
