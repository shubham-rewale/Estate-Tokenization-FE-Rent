import PropertyCard from "./propertyCard.jsx";
import AxiosInstance from "./utils/axiosInstance.js";
import { useEffect, useState } from "react";

const Home = () => {
  const [tokenData, setTokenData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosInstance(
          "/api/property/getAllListedProperty"
        );
        setTokenData(response.data.PropertyDetail);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const LoadingSkeleton = () => {
    return (
      <div className="w-96 m-7 border-2 border-white rounded hover:scale-110 hover:duration-75">
        <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="lg:h-48 bg-gray-400 md:h-36 w-full object-cover object-center"></div>
          <div className="p-6">
            <h2 className="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
            <h1 className="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>
            <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
            <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
            <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Home bg-black text-white min-h-screen">
      <p className="heading w-fit mx-auto mb-2 p-3 text-3xl">
        All Listed Properties
      </p>
      <div className="CardsContainer flex flex-wrap justify-center ">
        {tokenData.length > 0
          ? tokenData.map((property, idx) => (
              <PropertyCard key={idx} property={property} />
            ))
          : Array(6).fill(<LoadingSkeleton />)}
      </div>
    </div>
  );
};

export default Home;
