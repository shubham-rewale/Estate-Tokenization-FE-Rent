import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const PropertyDetails = () => {
  const location = useLocation();
  const property = location.state;
  return (
    <div className="PropertyDetails min-h-screen bg-black text-white">
      <p className="PropertyName w-fit mx-auto mb-4 pt-4 text-4xl">
        {property.propertyName.toUpperCase()}
      </p>
      <div className="firstContainer flex ">
        <div className="imageContainer flex-1 p-16 ">
          <img
            src={property.uri}
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
          <p>Location : {property.location}</p>
          <p>Token Id : {property.tokenId}</p>
          <p>Tax Id : {property.taxId}</p>
        </div>
      </div>
      <div className="Buttons flex justify-around">
        <Link
          className="ProposalLinkContainer"
          to={`/proposals/property/${property.tokenId}`}
        >
          <div className="ProposalLink w-fit bg-white text-black text-xl p-2 rounded">
            Proposals
          </div>
        </Link>
        <Link
          className="RentOperationContainer"
          to={`/rentOperations/${property.tokenId}`}
        >
          <div className="RentOperation w-fit bg-white text-black text-xl p-2 rounded">
            Rent Operations
          </div>
        </Link>
        <Link
          className="ReserveOperationContainer"
          to={`/reserveOperations/${property.tokenId}`}
        >
          <div className="ReserveOperation w-fit bg-white text-black text-xl p-2 rounded">
            Reserve Operations
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetails;
