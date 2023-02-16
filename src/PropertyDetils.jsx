import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AxiosInstance from "./utils/axiosInstance";
import OwnersAndBalancesComponent from "./OwnersAndBalancesComponent";

const PropertyDetails = () => {
  const location = useLocation();
  const property = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [tokenOwnersAndBalances, setTokenOwnersAndBalances] = useState([]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await AxiosInstance(
        `api/property/getPropertyCurrentOwner/${property.propertyTokenId}`
      );
      // console.log(response.data.propertyOwner);
      setTokenOwnersAndBalances(response.data.propertyOwner);
      setIsLoading(false);
    })();
  }, []);

  const LoadingSkeleton = () => {
    return (
      <div className="w-fit [&>div]:flex [&>div]:animate-pulse [&>div]:mb-4">
        {Array(6)
          .fill(0)
          .map((item, idx) => {
            return (
              <div className="[&>p]:bg-gray-400 [&>p]:h-3" key={idx}>
                <p className="w-96 mr-10"></p>
                <p className="w-10"></p>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className="PropertyDetails min-h-screen bg-black text-white">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              perspiciatis odit corrupti doloribus commodi autem sequi laborum,
              necessitatibus vero animi eveniet vitae. Voluptate excepturi optio
              delectus nesciunt sequi corrupti eligendi.
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
            {isLoading ? (
              <div
                className="flex justify-center items-center pt-12"
                style={{ minHeight: "84%" }}
              >
                <LoadingSkeleton />
              </div>
            ) : (
              <OwnersAndBalancesComponent
                ownersAndBalances={tokenOwnersAndBalances}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
