import { ethers } from "ethers";

const ReserveOperationsDetails = () => {
  const maintenanceReserveData = {
    propertyMaintenanceReserveCap: "1200000000000000000",
    propertyMaintenanceReserve: "500000000000000000",
    propertyMaintenanceReserveDeficit: "700000000000000000",
  };

  const vacancyReserveData = {
    propertyVacancyReserveCap: "1200000000000000000",
    propertyVacancyReserve: "500000000000000000",
    propertyVacancyReserveDeficit: "700000000000000000",
  };
  return (
    <div className="ReserveOperationsDetails min-h-screen bg-black text-white">
      <p className="text-7xl w-fit mx-auto p-5 font-bold text-cyan-700">
        Reserve Details
      </p>
      <div className="Container1 flex">
        <div className="MaintenanceReserve p-12 flex-1 flex justify-center items-center border-r-2">
          <div>
            <p className="text-5xl text-gray-500 p-4">Maintenance Reserve</p>
            <div className="mt-9 flex justify-center items-center flex-col">
              <p className="text-2xl my-2 text-gray-300">
                Maintenance Reserve Cap :{" "}
                <span className="text-green-600">
                  {ethers.utils.formatEther(
                    maintenanceReserveData.propertyMaintenanceReserveCap
                  )}{" "}
                  Ether
                </span>
              </p>
              <p className="text-2xl my-2 text-gray-300">
                Maintenance Reserve :{" "}
                <span className="text-green-600">
                  {ethers.utils.formatEther(
                    maintenanceReserveData.propertyMaintenanceReserve
                  )}{" "}
                  Ether
                </span>
              </p>
              <p className="text-2xl my-2 text-gray-300">
                Maintenance Reserve Deficit :{" "}
                <span className="text-green-600">
                  {ethers.utils.formatEther(
                    maintenanceReserveData.propertyMaintenanceReserveDeficit
                  )}{" "}
                  Ether
                </span>
              </p>
            </div>
            <div className="FormContainer mt-10">
              <form>
                <div className="form-group my-3 flex justify-center">
                  <input
                    type="text"
                    className="form-control
        block
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                    //   name="proposalProof"
                    //   value={proposalDetails.proposalProof}
                    //   onChange={handleProposalForm}
                    placeholder="In Ether"
                    required
                  />

                  <button
                    type="submit"
                    className="
        block
        px-3
        py-1.5
        uppercase
        bg-transparent
        text-green-600 
        text-lg rounded 
        border-2
        border-green-600
        hover:bg-green-600 
        hover:text-gray-300"
                  >
                    Restore
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <button>Restore Maintenance Reserve</button> */}
        </div>
        <div className="VacancyReserve flex-1 p-12 flex justify-center items-center">
          <div className="">
            <p className="text-5xl text-gray-500 p-4">Vacancy Reserve</p>
            <div className="mt-9 flex justify-center items-center flex-col">
              <p className="text-2xl my-2 text-gray-300">
                Property Vacancy Reserve Cap :{" "}
                <span className="text-rose-800">
                  {ethers.utils.formatEther(
                    vacancyReserveData.propertyVacancyReserveCap
                  )}{" "}
                  Ether
                </span>
              </p>
              <p className="text-2xl my-2 text-gray-300">
                Property vacancy Reserve :{" "}
                <span className="text-rose-800">
                  {ethers.utils.formatEther(
                    vacancyReserveData.propertyVacancyReserve
                  )}{" "}
                  Ether
                </span>
              </p>
              <p className="text-2xl my-2 text-gray-300">
                Property vacancy Reserve Deficit :{" "}
                <span className="text-rose-800">
                  {ethers.utils.formatEther(
                    vacancyReserveData.propertyVacancyReserveDeficit
                  )}{" "}
                  Ether
                </span>
              </p>
            </div>
            <div className="FormContainer mt-10">
              <form>
                <div className="form-group my-3 flex justify-center">
                  <input
                    type="text"
                    className="form-control
        block
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                    //   name="proposalProof"
                    //   value={proposalDetails.proposalProof}
                    //   onChange={handleProposalForm}
                    placeholder="In Ether"
                    required
                  />

                  <button
                    type="submit"
                    className="
        block
        px-3
        py-1.5
        uppercase
        bg-transparent
        text-rose-800 
        text-lg rounded 
        border-2
        border-rose-800
        hover:bg-rose-800 
        hover:text-gray-300"
                  >
                    Restore
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveOperationsDetails;
