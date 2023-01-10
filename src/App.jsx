import Home from "./Home";
import PropertyDetails from "./PropertyDetils";
import Proposal from "./Proposal";
import RentOperationDetails from "./RentOperationDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/property/:tokenId"
            exact
            element={<PropertyDetails />}
          />
          <Route
            path="/proposals/property/:tokenId"
            exact
            element={<Proposal />}
          />
          <Route
            path="/rentOperations/:tokenId"
            exact
            element={<RentOperationDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
