import Home from "./Home";
import PropertyDetails from "./PropertyDetils";
import Proposal from "./Proposal";
import RentOperationDetails from "./RentOperationDetails";
import ReserveOperationDetails from "./ReserveOperationsDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProposalDetails from "./ProposalDetails";

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
            path="/proposalsDetails/property/:tokenId"
            exact
            element={<Proposal />}
          />
          <Route
            path="/property/:tokenId/proposal/:onChainProposalId"
            exact
            element={<ProposalDetails />}
          />

          <Route
            path="/rentOperations/:tokenId"
            exact
            element={<RentOperationDetails />}
          />
          <Route
            path="/reserveOperations/:tokenId"
            exact
            element={<ReserveOperationDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
