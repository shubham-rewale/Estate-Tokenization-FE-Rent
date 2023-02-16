import { useContext } from "react";
import { Link } from "react-router-dom";
import { reloadContext, userContext } from "./App";
import connectToMetamask from "./utils/connectTometamask";
import defaultProfileImg from "./assets/defaultProfile.jpg";
import metamaskImg from "./assets/metamask.png";
import homeImg from "./assets/home.png";
import AxiosInstance from "./utils/axiosInstance";

const Header = () => {
  const [user, setUser] = useContext(userContext).userDetails;
  const [reloadComponent, setReloadComponent] =
    useContext(reloadContext).reloadDetails;

  const logIn = async () => {
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      const response = await AxiosInstance(
        `api/user/checkPropertyManager?address=${accounts[0]}`
      );
      setUser({
        isConnected: true,
        address: accounts[0],
        isPropertyManager: response.data.result,
      });
      setReloadComponent(!reloadComponent);
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div
      style={{ backgroundColor: "#EA80FC" }}
      className="  px-2 py-2 flex justify-between items-center"
    >
      <div className="left ml-4">
        <Link to="/">
          <img src={homeImg} alt="" className=" w-8 h-8 hover:cursor-pointer" />
        </Link>{" "}
      </div>
      {user.isConnected ? (
        //  when user connected

        <div className="flex items-center px-2 mr-4">
          <img
            src={defaultProfileImg}
            alt=""
            className=" w-8 h-8 rounded-full mr-4 hover:cursor-pointer"
          />

          <div className="text-black w-24 truncate ...">{user.address}</div>
        </div>
      ) : (
        // when user not connected
        <div className="flex items-center px-2 mr-4">
          <img
            src={metamaskImg}
            alt=""
            className=" w-8 h-8  mr-4 hover:cursor-pointer"
            onClick={logIn}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
