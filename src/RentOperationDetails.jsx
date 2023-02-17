import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ABI, MUMBAI_ADDRESS } from "./contracts/RentalProperties";
import AxiosInstance from "./utils/axiosInstance";
import connectToMetamask from "./utils/connectTometamask";
import List_For_Rental from "./assets/List_For_Rental.png";
import Initiate from "./assets/Initiate.png";
import { LoadingModal } from "./Modal";
import loaderGIF from "./assets/loader.gif";
import { reloadContext, userContext } from "./App";

const RentOperationDetails = () => {
  const [listPropertydetails, setListPropertydetails] = useState({
    maintenanceReserveCap: "",
    vacancyReserveCap: "",
  });
  const [initiateRentalDetails, setinitiateRentalDetails] = useState({
    tenantAddress: "",
    rentalPeriod: "",
    amountToMaintenanceReserve: "",
    amountToVacancyReserve: "",
    totalRentAmount: "",
  });
  const [propertyStatus, setpropertyStatus] = useState({
    propertyStatus: "",
    tenant: "",
    rentalPeriod: "",
    noOfCompletedDays: "",
    dailyRent: "",
    rentDeposits: "",
  });
  const [reloadComponent, setReloadComponent] =
    useContext(reloadContext).reloadDetails;
  const [user, setUser] = useContext(userContext).userDetails;
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  //fetching the token id from url
  const tokenId = location.pathname.split("/")[2];

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await AxiosInstance(
        `api/property/getPropertyRentalStatus/${tokenId}`
      );
      const data = response.data.details;
      setpropertyStatus({
        propertyStatus: response.data.propertyStatus,
        tenant: data ? data.tenant : "",
        rentalPeriod: data ? data.rentalPeriod : "",
        noOfCompletedDays: data ? data.noOfCompletedDays : "",
        dailyRent: data ? data.dailyRent : "",
        rentDeposits: data ? data.rentDeposits : "",
      });
      setIsLoading(false);
    })();
  }, [reloadComponent]);
  // const handleListForm = (e) => {
  //   setListPropertydetails((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  // const handleListPropertyForRentalSubmit = async (e) => {
  //   e.preventDefault();
  //   const maintenanceReserveCapAmount = ethers.utils.parseUnits(
  //     listPropertydetails.maintenanceReserveCap,
  //     "ether"
  //   );
  //   const vacancyReserveCapAmount = ethers.utils.parseUnits(
  //     listPropertydetails.vacancyReserveCap,
  //     "ether"
  //   );

  //   try {
  //     const [provider, accounts, signer] = await connectToMetamask();
  //     //checking the network
  //     const chainId = await signer.getChainId();
  //     if (chainId !== 80001) {
  //       alert("connect you metamask to Mumbai network");
  //       return;
  //     }
  //     // console.log(accounts);
  //     const rentalPropertiesReadWrite = new ethers.Contract(
  //       MUMBAI_ADDRESS,
  //       ABI,
  //       signer
  //     );

  //     const listPropertyTx =
  //       await rentalPropertiesReadWrite.enterRentalPropertyDetails(
  //         tokenId,
  //         maintenanceReserveCapAmount,
  //         vacancyReserveCapAmount
  //       );
  //     setShowLoader(true);
  //     const txFinality = await listPropertyTx.wait();
  //     if (txFinality.blockNumber != null) {
  //       let changeListingStatusResponse = await AxiosInstance.patch(
  //         `api/property/changeListingStatus/${tokenId}`
  //       );
  //       alert("Successfully listed property");
  //       setReloadComponent(!reloadComponent);
  //     } else {
  //       alert("something Went Wrong, try again");
  //     }
  //   } catch (err) {
  //     if (err.code === 4001) {
  //       window.alert("User Rejected Metamask Connection");
  //     } else {
  //       console.log(err);
  //     }
  //   }
  //   setShowLoader(false);
  //   // console.log(maintenanceReserveCapAmount, vacancyReserveCapAmount);
  // };

  const handleInitiateRentalFrom = (e) => {
    setinitiateRentalDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleInitiateRentalSubmit = async (e) => {
    e.preventDefault();
    // console.log(initiateRentalDetails);
    const amountToMaintenanceReserve = ethers.utils.parseUnits(
      initiateRentalDetails.amountToMaintenanceReserve,
      "ether"
    );
    const amountToVacancyReserve = ethers.utils.parseUnits(
      initiateRentalDetails.amountToVacancyReserve,
      "ether"
    );

    const totalRentAmount = ethers.utils.parseUnits(
      initiateRentalDetails.totalRentAmount,
      "ether"
    );
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      //checking the network
      const chainId = await signer.getChainId();
      if (chainId !== 80001) {
        alert("connect you metamask to Mumbai network");
        return;
      }
      // console.log(accounts);
      const rentalPropertiesReadWrite = new ethers.Contract(
        MUMBAI_ADDRESS,
        ABI,
        signer
      );

      const initialRentalTx =
        await rentalPropertiesReadWrite.initiateRentalPeriod(
          tokenId,
          initiateRentalDetails.tenantAddress,
          initiateRentalDetails.rentalPeriod,
          amountToMaintenanceReserve,
          amountToVacancyReserve,
          { value: totalRentAmount }
        );
      setShowLoader(true);
      const initialRentalTxFinality = await initialRentalTx.wait();
      // console.log(initialRentalTxFinality);
      if (initialRentalTxFinality.blockNumber != null) {
        alert("Successfully Initiated the rental Period");
        setReloadComponent(!reloadComponent);
        setinitiateRentalDetails({
          tenantAddress: "",
          rentalPeriod: "",
          amountToMaintenanceReserve: "",
          amountToVacancyReserve: "",
          totalRentAmount: "",
        });
      } else {
        alert("something Went Wrong, try again");
      }
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
    setShowLoader(false);
  };
  const handleTerminateRentalPeriod = async (e) => {
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      //checking the network
      const chainId = await signer.getChainId();
      if (chainId !== 80001) {
        alert("connect you metamask to Mumbai network");
        return;
      }
      // console.log(accounts);
      const rentalPropertiesReadWrite = new ethers.Contract(
        MUMBAI_ADDRESS,
        ABI,
        signer
      );

      const terminateRentalTx =
        await rentalPropertiesReadWrite.terminateRentalPeriod(tokenId);
      setShowLoader(true);
      const terminateRentalTxFinality = await terminateRentalTx.wait();
      // console.log(terminateRentalTxFinality);
      if (terminateRentalTxFinality.blockNumber != null) {
        alert("Successfully Terminated the rental Period");
        setReloadComponent(!reloadComponent);
      } else {
        alert("something Went Wrong, try again");
      }
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
    setShowLoader(false);
  };

  const handleDistributeRentAmount = async (e) => {
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      //checking the network
      const chainId = await signer.getChainId();
      if (chainId !== 80001) {
        alert("connect you metamask to Mumbai network");
        return;
      }

      const rentalPropertiesReadWrite = new ethers.Contract(
        MUMBAI_ADDRESS,
        ABI,
        signer
      );
      const response = await AxiosInstance(
        `/api/vote/getVoters?target=ownerAddresses&tokenId=${tokenId}`
      );
      // console.log(response);
      const owners = response.data.result.data;
      // console.log(owners);
      const distributeRentalAmountTx =
        await rentalPropertiesReadWrite.distributeRentAmount(tokenId, owners);
      setShowLoader(true);
      const distributeRentalAmountTxFinality =
        await distributeRentalAmountTx.wait();
      // console.log(terminateRentalTxFinality);
      if (distributeRentalAmountTxFinality.blockNumber != null) {
        alert("Successfully Distribute Rent");
        setReloadComponent(!reloadComponent);
        // window.location.reload(false);
      } else {
        alert("something Went Wrong, try again");
      }
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
    setShowLoader(false);
  };

  const LoadingSkeleton = () => {
    return (
      <div className="w-96 [&>p]:mb-4 [&>p]:animate-pulse [&>p]:h-3 [&>p]:bg-gray-400">
        <p className="w-26"></p>
        <p className="w-1/2"></p>
        <p className="leading-relaxed w-full"></p>
        <p className="leading-relaxed w-2/3"></p>
        <p className="leading-relaxed w-1/2"></p>
        <div className="flex justify-around [&>div]:animate-pulse mt-10">
          <div className=" w-24 h-8 bg-gray-400"></div>
          <div className=" w-24 h-8 bg-gray-400"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="RentOperations min-h-screen bg-black text-white">
      <div className="Container0 mx-4 mb-12 pt-10 flex">
        <div className="LeftSomeBoldText flex-1 text-9xl p-4 text-cyan-700">
          Lorem ipsum dolor sit amet consectetur
        </div>
        <div className="RightPropertyStatusContainer flex-1 text-gray-400 border-gray-300">
          <p className=" w-fit text-5xl p-4 mx-auto border-4 rounded">
            Property Status
          </p>
          {isLoading ? (
            <div
              className="flex justify-center items-center"
              style={{ minHeight: "84%" }}
            >
              <LoadingSkeleton />
            </div>
          ) : propertyStatus.propertyStatus === "Occupied" ? (
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
                  <span className=" text-green-500">
                    {propertyStatus.rentDeposits}
                  </span>{" "}
                  Ether
                </p>
              </div>
              <div className="DistributeTerminateButtons flex justify-around ">
                {user.isConnected && user.isPropertyManager && (
                  <div className="rentButtonContainer">
                    <button
                      className=" bg-transparent text-purple-800 text-lg m-2 p-2 rounded border-2 border-purple-800 hover:bg-purple-800  hover:text-gray-300"
                      onClick={handleDistributeRentAmount}
                    >
                      Distribute Rent Amount
                    </button>
                    <button
                      className=" bg-transparent text-rose-800 text-lg m-2 p-2 rounded border-2 border-rose-800 hover:bg-rose-800  hover:text-gray-300"
                      onClick={handleTerminateRentalPeriod}
                    >
                      Terminate Rental Period
                    </button>
                  </div>
                )}
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

      {user.isConnected && user.isPropertyManager && (
        <div className="Container1">
          <div className="InitiateRentalPeriod">
            <p className="text-5xl w-fit mx-auto text-gray-500 p-3 border-b-2">
              Initiate Rental period
            </p>
            <div className="Container3 flex mt-6 pb-6">
              <div className="leftBlackContainer flex-1 pt-12">
                <img src={Initiate} alt="Initiate" />
              </div>
              <div className="rightFormContainer flex-1 p-16">
                <form onSubmit={handleInitiateRentalSubmit}>
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
                      name="tenantAddress"
                      value={initiateRentalDetails.tenantAddress}
                      onChange={handleInitiateRentalFrom}
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
                      name="rentalPeriod"
                      value={initiateRentalDetails.rentalPeriod}
                      onChange={handleInitiateRentalFrom}
                      placeholder="In Days"
                      required
                    />
                  </div>
                  <div className="form-group my-3">
                    <label
                      htmlFor="totalRentAmount"
                      className="form-label inline-block mb-2 text-gray-400"
                    >
                      Total Rent Amount
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
                      id="totalRentAmount"
                      name="totalRentAmount"
                      value={initiateRentalDetails.totalRentAmount}
                      onChange={handleInitiateRentalFrom}
                      placeholder="In Eth"
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
                      name="amountToMaintenanceReserve"
                      value={initiateRentalDetails.amountToMaintenanceReserve}
                      onChange={handleInitiateRentalFrom}
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
                      name="amountToVacancyReserve"
                      value={initiateRentalDetails.amountToVacancyReserve}
                      onChange={handleInitiateRentalFrom}
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
      hover:bg-blue-700
        border-2
       border-blue-700
      text-gray-500
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
      )}

      <LoadingModal show={showLoader}>
        <div
          className="flex justify-center items-center flex-col"
          style={{ height: "100%" }}
        >
          <div>
            <img src={loaderGIF} alt="blockGIF" style={{ width: "50px" }} />
          </div>
          <p className=" text-2xl mt-10">This will take seconds</p>
        </div>
      </LoadingModal>
    </div>
  );
};

export default RentOperationDetails;
