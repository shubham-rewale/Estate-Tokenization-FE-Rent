import Home from "./Home";
import PropertyDetails from "./PropertyDetils";
import Proposal from "./Proposal";
import RentOperationDetails from "./RentOperationDetails";
import ReserveOperationDetails from "./ReserveOperationsDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProposalDetails from "./ProposalDetails";
import Header from "./Header";
import { createContext, useState } from "react";

const userContext = createContext();
const reloadContext = createContext();
function App() {
  const [user, setUser] = useState({
    isConnected: false,
    address: "",
    isPropertyManager: "",
  });
  const [reloadComponent, setReloadComponent] = useState(true);
  return (
    <Router>
      <div className="App">
        <userContext.Provider value={{ userDetails: [user, setUser] }}>
          <reloadContext.Provider
            value={{ reloadDetails: [reloadComponent, setReloadComponent] }}
          >
            <Header />
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
          </reloadContext.Provider>
        </userContext.Provider>
      </div>
    </Router>
  );
}

export { App, userContext, reloadContext };
