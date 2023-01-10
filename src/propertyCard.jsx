import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  let property = props.property;
  return (
    <Link to={`/property/${property.tokenId}`} state={property}>
      <div className="propertyCard w-96 m-7 border-2 border-white rounded hover:scale-110 hover:duration-75">
        <div className="image">
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
        <div className="details p-2">
          <div className="propertyName my-2">
            Property : {property.propertyName}
          </div>
          <div className="location my-2">Location : {property.location}</div>
          <div className="tokenId my-2">Token Id : {property.tokenId}</div>
          <div className="taxId my-2">Tax Id : {property.taxId}</div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
