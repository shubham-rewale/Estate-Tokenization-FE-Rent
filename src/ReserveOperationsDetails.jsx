import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MaintenanceReserveABI,
  Maintenance_Mumbai_Address,
} from "./contracts/MaintenanceReserve";
import {
  VacancyReserveABI,
  Vacancy_Mumbai_Address,
} from "./contracts/VacancyReserve";
import AxiosInstance from "./utils/axiosInstance";
import connectToMetamask from "./utils/connectTometamask";
import { LoadingModal } from "./Modal";
import loaderGIF from "./assets/loader.gif";
import APIloader2GIF from "./assets/APILoader2.gif";
import { reloadContext, userContext } from "./App";

const ReserveOperationsDetails = () => {
  const [ReserveAmounts, setReserveAmounts] = useState({
    maintenanceReserveAmount: "",
    vacancyReserveAmount: "",
  });
  const [maintenanceReserveData, setMaintenanceReserveData] = useState({
    propertyMaintenanceReserveCap: "0",
    propertyMaintenanceReserve: "0",
    propertyMaintenanceReserveDeficit: "0",
  });

  const [vacancyReserveData, setVacancyReserveData] = useState({
    propertyVacancyReserveCap: "0",
    propertyVacancyReserve: "0",
    propertyVacancyReserveDeficit: "0",
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
        `api/property/getReservesDetails/${tokenId}`
      );
      const result = response.data;
      setMaintenanceReserveData({
        propertyMaintenanceReserveDeficit:
          result.maintenanceReserveDetails.maintenanceReserveDeficit,
        propertyMaintenanceReserve:
          result.maintenanceReserveDetails.maintenanceReserve,
        propertyMaintenanceReserveCap:
          result.maintenanceReserveDetails.maintenanceReserveCap,
      });

      setVacancyReserveData({
        propertyVacancyReserveDeficit:
          result.vacancyReserveDetails.vacancyReserveDeficit,
        propertyVacancyReserve: result.vacancyReserveDetails.vacancyReserve,
        propertyVacancyReserveCap:
          result.vacancyReserveDetails.vacancyReserveCap,
      });
      setIsLoading(false);
    })();
  }, [reloadComponent]);
  const handleAmountForm = (e) => {
    setReserveAmounts((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleMaintenanceReserveRestore = async (e) => {
    e.preventDefault();
    // console.log(ReserveAmounts.maintenanceReserveAmount);
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      const maintenanceReserveReadWrite = new ethers.Contract(
        Maintenance_Mumbai_Address,
        MaintenanceReserveABI,
        signer
      );
      const restoreMaintenanceReserveAmount = ethers.utils.parseUnits(
        ReserveAmounts.maintenanceReserveAmount,
        "ether"
      );
      const tx = await maintenanceReserveReadWrite.restoreMaintenanceReserve(
        tokenId,
        { value: restoreMaintenanceReserveAmount }
      );
      setShowLoader(true);
      const restoreTxFinality = await tx.wait();
      if (restoreTxFinality.blockNumber != null) {
        alert("Successfully Restored Maintenance Reserve");
        setReloadComponent(!reloadComponent);
      } else {
        alert("something Went Wrong, try again");
      }
    } catch (err) {
      if (err.code === 4001) {
        alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
    setReserveAmounts({
      maintenanceReserveAmount: "",
      vacancyReserveAmount: "",
    });
    setShowLoader(false);
  };

  const handleVacancyReserveRestore = async (e) => {
    e.preventDefault();
    // console.log(ReserveAmounts.vacancyReserveAmount);
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      const vacancyReserveReadWrite = new ethers.Contract(
        Vacancy_Mumbai_Address,
        VacancyReserveABI,
        signer
      );
      const restoreVacancyReserveAmount = ethers.utils.parseUnits(
        ReserveAmounts.vacancyReserveAmount,
        "ether"
      );
      const tx = await vacancyReserveReadWrite.restoreVacancyReserve(tokenId, {
        value: restoreVacancyReserveAmount,
      });
      setShowLoader(true);
      const restoreTxFinality = await tx.wait();
      if (restoreTxFinality.blockNumber != null) {
        alert("Successfully Restored Vacancy Reserve");
        setReloadComponent(!reloadComponent);
      } else {
        alert("something Went Wrong, try again");
      }
    } catch (err) {
      if (err.code === 4001) {
        alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
    setReserveAmounts({
      maintenanceReserveAmount: "",
      vacancyReserveAmount: "",
    });
    setShowLoader(false);
  };

  const LoadingSkeleton = () => {
    return <div className="bg-gray-500 animate-pulse h-5 w-24"></div>;
  };
  return (
    <div className="ReserveOperationsDetails min-h-screen bg-black text-white">
      <p className="text-7xl w-fit mx-auto p-5 font-bold text-cyan-700">
        Reserve Details
      </p>
      <div className="Container1 flex">
        <div className="MaintenanceReserve p-12 flex-1 flex justify-center items-center">
          <div>
            <p className="text-5xl text-gray-500 p-4">Maintenance Reserve</p>
            <div className="mt-9 flex justify-center items-center flex-col [&>p]:text-2xl [&>p]:my-2 [&>p]:text-gray-300 [&>p]:flex [&>p]:items-center">
              <p>
                <p className="mr-4">Maintenance Reserve Cap </p>
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <span className="text-green-600 block">
                    {maintenanceReserveData.propertyMaintenanceReserveCap} Ether
                  </span>
                )}
              </p>
              <p>
                <p className="mr-4">Maintenance Reserve</p>
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <span className="text-green-600">
                    {maintenanceReserveData.propertyMaintenanceReserve} Ether
                  </span>
                )}
              </p>
              <p>
                <p className="mr-4">Maintenance Reserve Deficit</p>
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <span className="text-green-600">
                    {maintenanceReserveData.propertyMaintenanceReserveDeficit}{" "}
                    Ether
                  </span>
                )}
              </p>
            </div>
            {user.isConnected && user.isPropertyManager && (
              <div className="FormContainer mt-10">
                <form onSubmit={handleMaintenanceReserveRestore}>
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
                      name="maintenanceReserveAmount"
                      value={ReserveAmounts.maintenanceReserveAmount}
                      onChange={handleAmountForm}
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
            )}
          </div>
        </div>

        <div className="VacancyReserve flex-1 p-12 flex justify-center items-center">
          <div className="">
            <p className="text-5xl text-gray-500 p-4">Vacancy Reserve</p>
            <div className="mt-9 flex justify-center items-center flex-col [&>p]:text-2xl [&>p]:my-2 [&>p]:text-gray-300 [&>p]:flex [&>p]:items-center">
              <p>
                <p className="mr-4">Property Vacancy Reserve Cap</p>
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <span className="text-rose-800">
                    {vacancyReserveData.propertyVacancyReserveCap} Ether
                  </span>
                )}
              </p>
              <p>
                <p className="mr-4">Property vacancy Reserve</p>
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <span className="text-rose-800">
                    {vacancyReserveData.propertyVacancyReserve} Ether
                  </span>
                )}
              </p>
              <p>
                <p className="mr-4">Property vacancy Reserve Deficit</p>
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <span className="text-rose-800">
                    {vacancyReserveData.propertyVacancyReserveDeficit} Ether
                  </span>
                )}
              </p>
            </div>
            {user.isConnected && user.isPropertyManager && (
              <div className="FormContainer mt-10">
                <form onSubmit={handleVacancyReserveRestore}>
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
                      name="vacancyReserveAmount"
                      value={ReserveAmounts.vacancyReserveAmount}
                      onChange={handleAmountForm}
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
            )}
          </div>
        </div>
      </div>
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

export default ReserveOperationsDetails;
