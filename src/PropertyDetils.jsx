import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AxiosInstance from "./utils/axiosInstance";
const PropertyDetails = () => {
  const location = useLocation();
  const property = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [tokenOwnersAndBalances, setTokenOwnersAndBalances] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await AxiosInstance(
        `api/property/getPropertyCurrentOwner/${property.propertyTokenId}`
      );
      // console.log(response.data.propertyOwner);
      setTokenOwnersAndBalances(response.data.propertyOwner);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="PropertyDetails min-h-screen bg-black text-white">
      {isLoading ? (
        <div className="flex justify-center min-h-screen items-center">
          <div className="text-5xl text-gray-500">Loading ...</div>
        </div>
      ) : (
        <div className="PropertyDetails min-h-screen bg-black text-white">
          <p className="PropertyName w-fit mx-auto mb-4 pt-4 text-4xl">
            {property.propertyName.toUpperCase()}
          </p>
          <div className="firstContainer flex ">
            <div className="imageContainer flex-1 p-16 ">
              <img
                src={`https://ipfs.io/ipfs/${property.uri}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.1rem",
                }}
                alt="property Image"
              />
            </div>
            <div className="infoContainer flex flex-col justify-center flex-1 p-16 text-xl">
              <p className="propertyDescription italic mb-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem perspiciatis odit corrupti doloribus commodi autem sequi
                laborum, necessitatibus vero animi eveniet vitae. Voluptate
                excepturi optio delectus nesciunt sequi corrupti eligendi.
              </p>
              <div className="mb-4">
                <p>Location : {property.location}</p>
                <p>Token Id : {property.propertyTokenId}</p>
                <p>Tax Id : {property.taxID}</p>
              </div>

              <div className="Buttons flex justify-around mt-16">
                <Link
                  className="ProposalLinkContainer"
                  to={`/proposals/property/${property.propertyTokenId}`}
                >
                  <div className="ProposalLink w-fit bg-white text-black text-xl p-2 rounded">
                    Proposals
                  </div>
                </Link>
                <Link
                  className="RentOperationContainer"
                  to={`/rentOperations/${property.propertyTokenId}`}
                >
                  <div className="RentOperation w-fit bg-white text-black text-xl p-2 rounded">
                    Rent Operations
                  </div>
                </Link>
                <Link
                  className="ReserveOperationContainer"
                  to={`/reserveOperations/${property.propertyTokenId}`}
                >
                  <div className="ReserveOperation w-fit bg-white text-black text-xl p-2 rounded">
                    Reserve Operations
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="tokenOwners">
            <p className="w-fit text-5xl mb-5 text-gray-500 mx-auto">
              Property Owners
            </p>
            <div className="ownersContainer w-fit mx-auto ">
              <div className="p-3 text-gray-300 text-xl border-b-2 border-b-gray">
                <span className="mr-10 px-44 ">Addresses</span>
                <span>Balances</span>
              </div>
              {tokenOwnersAndBalances.map((addressAndBalance, idx) => {
                return (
                  <div key={idx} className="p-3 text-gray-300 text-xl ">
                    <span className="mr-3 w-fit px-2">
                      {addressAndBalance.Address}
                    </span>
                    <span>{addressAndBalance.Balance}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
