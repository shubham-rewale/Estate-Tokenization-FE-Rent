import PropertyCard from "./propertyCard.jsx";

const Home = () => {
  const properties = [
    {
      tokenId: 2,
      uri: "https://ipfs.io/ipfs/QmQiTr9pxmDG8LLoVBSnfRURSgMedU5vyvELXXKASt463R",
      propertyName: "Urban Pacific Real Estate",
      location: "California, United States",
      taxId: "45FTEYHEA3",
    },
    {
      tokenId: 3,
      uri: "https://ipfs.io/ipfs/QmToLt8pdvBAMvX3iTvcig6Tw4Sh3sP5uGdK19o7asV74B",
      propertyName: "Urban Pacific Real Estate",
      location: "California, United States",
      taxId: "45FTEYHEA3",
    },
    {
      tokenId: 3,
      uri: "https://ipfs.io/ipfs/QmXADmuKgPaDwRorpHmQCPTrdvrPwRbQ9bBS87rEbb76xk",
      propertyName: "Urban Pacific Real Estate",
      location: "California, United States",
      taxId: "45FTEYHEA3",
    },
    {
      tokenId: 4,
      uri: "https://ipfs.io/ipfs/QmXADmuKgPaDwRorpHmQCPTrdvrPwRbQ9bBS87rEbb76xk",
      propertyName: "Urban Pacific Real Estate",
      location: "California, United States",
      taxId: "45FTEYHEA3",
    },
    {
      tokenId: 5,
      uri: "https://ipfs.io/ipfs/QmXADmuKgPaDwRorpHmQCPTrdvrPwRbQ9bBS87rEbb76xk",
      propertyName: "Urban Pacific Real Estate",
      location: "California, United States",
      taxId: "45FTEYHEA3",
    },
    {
      tokenId: 6,
      uri: "https://ipfs.io/ipfs/QmfGuRFpdMoQWRFYSNnTwDwWT7pgCQU3DpG5CHUfu2b3pq",
      propertyName: "Urban Pacific Real Estate",
      location: "California, United States",
      taxId: "45FTEYHEA3",
    },
  ];
  return (
    <div className="Home bg-black text-white">
      <p className="heading w-fit mx-auto mb-2 p-3 text-3xl">
        All Listed Properties
      </p>
      <div className="CardsContainer flex flex-wrap justify-center ">
        {properties ? (
          properties.map((property, idx) => (
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
