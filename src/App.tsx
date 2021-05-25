import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "page/HomePage";
import ProductsPage from "page/ProductsPage";
import CartPage from "page/CartPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={ProductsPage} />
        <Route exact path="/cart" component={CartPage} />
      </Switch>
    </Router>
  );
}

export default App;
