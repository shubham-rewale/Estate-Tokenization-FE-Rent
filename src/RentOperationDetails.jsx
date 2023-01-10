import { ethers } from "ethers";
const RentOperationDetails = () => {
  const propertyStatus = {
    propertyStatus: "Property is currently vacant",
    tenant: "0x0000000000000000000000000000000000000000",
    rentalPeriod: "0",
    noOfCompletedDays: "0",
    dailyRent: "0",
  };

  const rentDeposits = 20;

  return (
    <div className="RentOperations min-h-screen bg-black text-white">
      <div className="Container mx-4 mb-12 pt-10 flex">
        <div className="LeftSomeBoldText flex-1 text-9xl p-4 text-cyan-700">
          Lorem ipsum dolor sit amet consectetur
        </div>
        <div className="RightPropertyStatusContainer flex-1 text-gray-400 border-gray-300">
          <p className=" w-fit text-5xl p-4 mx-auto border-4 rounded">
            Property Status
          </p>
          {propertyStatus.rentalPeriod != "0" ? (
            <div className="">
              <div className="statusDetails p-3 my-9 text-2xl">
                <p className="m-2 ">
                  Status : Property Is{" "}
                  <span className=" text-green-500">Occupied</span>
                </p>
                <p className="m-2">
                  Tenant :{" "}
                  <span className=" text-green-500">
                    {propertyStatus.tenant}
                  </span>
                </p>
                <p className="m-2">
                  Rental Period :{" "}
                  <span className=" text-green-500">
                    {propertyStatus.rentalPeriod}
                  </span>
                </p>
                <p className="m-2">
                  Days Completed :{" "}
                  <span className=" text-green-500">
                    {propertyStatus.noOfCompletedDays}
                  </span>
                </p>
                <p className="m-2">
                  Daily Rent :{" "}
                  <span className=" text-green-500">
                    {propertyStatus.dailyRent}
                  </span>{" "}
                  Ether
                </p>

                <p className="m-2">
                  Remaining Rent Deposits :{" "}
                  <span className=" text-green-500">{rentDeposits}</span> Ether
                </p>
              </div>
              <div className="DistributeTerminateButtons flex justify-around ">
                <button className=" bg-transparent text-purple-800 text-lg m-2 p-2 rounded border-2 border-purple-800 hover:bg-purple-800  hover:text-gray-300">
                  Distribute Rent Amount
                </button>
                <button className=" bg-transparent text-rose-800 text-lg m-2 p-2 rounded border-2 border-rose-800 hover:bg-rose-800  hover:text-gray-300">
                  Terminate Rental Period
                </button>
              </div>
            </div>
          ) : (
            <div className=" w-full h-5/6 flex justify-center items-center">
              <div className="w-fit text-4xl">
                Currently This Property Is{" "}
                <span className=" text-red-500">Vacant</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="RentalPropertyDetailsContainer">
        <p className="text-5xl w-fit mx-auto text-gray-500 p-3 border-b-2">
          Rental Property Details
        </p>
        <div className="Container2 flex my-10">
          <div className="leftFormContainer flex-1 p-5">
            <form>
              <div className="form-group my-3">
                <label
                  htmlFor="MaintenanceReserveCap"
                  className="form-label inline-block mb-2 text-gray-400"
                >
                  Enter Property Maintenance Reserve Cap
                </label>
                <input
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                  id="MaintenanceReserveCap"
                  //   name="proposalProof"
                  //   value={proposalDetails.proposalProof}
                  //   onChange={handleProposalForm}
                  placeholder="In Ether"
                  required
                />
              </div>

              <div className="form-group my-6">
                <label
                  htmlFor="vacancyReserveCap"
                  className="form-label inline-block mb-2 text-gray-400"
                >
                  Enter Property Vacancy Reserve Cap
                </label>
                <input
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                  id="vacancyReserveCap"
                  //   name="proposalProof"
                  //   value={proposalDetails.proposalProof}
                  //   onChange={handleProposalForm}
                  placeholder="In Ether"
                  required
                />
              </div>
              <button
                type="submit"
                className="
      block
      mx-auto
      p-2.5
      text-lg
      bg-cyan-900
      text-gray-300
      uppercase
      rounded
       hover:text-black"
              >
                List Property for Rental Process
              </button>
            </form>
          </div>
          <div className="rightBlackContainer flex-1"></div>
        </div>
      </div>

      <div className="InitiateRentalPeriod">
        <p className="text-5xl w-fit mx-auto text-gray-500 p-3 border-b-2">
          Initiate Rental period
        </p>
        <div className="Container3 flex mt-6 pb-6">
          <div className="leftBlackContainer flex-1"></div>
          <div className="rightFormContainer flex-1 p-5">
            <form>
              <div className="form-group my-3">
                <label
                  htmlFor="tenantAddress"
                  className="form-label inline-block mb-2 text-gray-400"
                >
                  Enter Tenant Address
                </label>
                <input
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                  id="tenantAddress"
                  //   name="proposalProof"
                  //   value={proposalDetails.proposalProof}
                  //   onChange={handleProposalForm}
                  placeholder="Tenant Eth Address"
                  required
                />
              </div>

              <div className="form-group my-3">
                <label
                  htmlFor="rentalPeriodInDays"
                  className="form-label inline-block mb-2 text-gray-400"
                >
                  Rental Period In Days
                </label>
                <input
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                  id="rentalPeriodInDays"
                  //   name="proposalProof"
                  //   value={proposalDetails.proposalProof}
                  //   onChange={handleProposalForm}
                  placeholder="In Days"
                  required
                />
              </div>
              <div className="form-group my-3">
                <label
                  htmlFor="amountTowardsMaintenanceReserve"
                  className="form-label inline-block mb-2 text-gray-400"
                >
                  Amount Towards Maintenance Reserve
                </label>
                <input
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                  id="amountTowardsMaintenanceReserve"
                  //   name="proposalProof"
                  //   value={proposalDetails.proposalProof}
                  //   onChange={handleProposalForm}
                  placeholder="In Eth"
                  required
                />
              </div>

              <div className="form-group my-3">
                <label
                  htmlFor="amountTowardsVacancyReserve"
                  className="form-label inline-block mb-2 text-gray-400"
                >
                  Amount Towards Vacancy Reserve
                </label>
                <input
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
       text-white
        bg-gray-900 
        rounded"
                  id="amountTowardsVacancyReserve"
                  //   name="proposalProof"
                  //   value={proposalDetails.proposalProof}
                  //   onChange={handleProposalForm}
                  placeholder="In Eth"
                  required
                />
              </div>
              <button
                type="submit"
                className="
                block
      w-fit
      mx-auto
      px-6
      py-2.5
      text-lg
      bg-cyan-900
      text-gray-300
      uppercase
      rounded
       hover:text-black"
              >
                Initiate Rental Period
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentOperationDetails;
