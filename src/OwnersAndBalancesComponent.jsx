const OwnersAndBalancesComponent = (props) => {
  const ownersAndBalances = props.ownersAndBalances;
  return (
    <div className="ownersContainer w-fit mx-auto ">
      {ownersAndBalances.map((addressAndBalance, idx) => {
        return (
          <div key={idx} className="p-3 text-gray-300 text-xl ">
            <span className="mr-3 w-fit px-2">{addressAndBalance.Address}</span>
            <span>{addressAndBalance.Balance}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OwnersAndBalancesComponent;
