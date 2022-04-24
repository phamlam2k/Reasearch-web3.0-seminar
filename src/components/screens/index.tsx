import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import style from "./style.module.css";
import Mint from "./mint";
import Transfer from "./transfer";
import Balance from "./balance";
import Approval from "./approval";
import Allowance from "./allowance";

const HomeScreen = () => {
  const { address: account }: any = useSelector((state) => state);
  const [balance, setBalance] = useState<any>(null);
  
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {account?.address !== null && (
        <div className={style.box}>
          <Mint />
          <Transfer address={account?.address} />
          <Balance balance={balance} setBalance={setBalance} />
          <Approval />
          <Allowance />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
