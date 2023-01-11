import PropertyCard from "./propertyCard.jsx";
import AxiosInstance from "./utils/axiosInstance.js";
import { useEffect, useState } from "react";

const Home = () => {
  const [tokenData, setTokenData] = useState([]);
  useEffect(() => {
    AxiosInstance("/api/property/getAllPropertystatus")
      .then((responce) => {
        // console.log(responce.data.PropertyDetail);
        setTokenData(responce.data.PropertyDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Home bg-black text-white">
      <p className="heading w-fit mx-auto mb-2 p-3 text-3xl">
        All Listed Properties
      </p>
      <div className="CardsContainer flex flex-wrap justify-center ">
        {tokenData ? (
          tokenData.map((property, idx) => (
            <PropertyCard key={idx} property={property} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
