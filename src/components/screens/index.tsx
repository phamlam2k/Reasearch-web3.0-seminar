import { MutableRefObject, useEffect, useRef, useState } from "react";
import { BigNumber } from "ethers";
import { formatEther, isAddress } from "ethers/lib/utils";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import useMessage from "../../hooks/useMessage";
import { StateType } from "../../utils/reducer";
import style from "./style.module.css";

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
};

const HomeScreen = () => {
  const { address: account }: any = useSelector((state) => state);
  const [balance, setBalance] = useState<any>(null);
  const val = useRef() as MutableRefObject<HTMLInputElement>;
  const valReceive = useRef() as MutableRefObject<HTMLInputElement>;
  const valAmount = useRef() as MutableRefObject<HTMLInputElement>;
  const valMint = useRef() as MutableRefObject<HTMLInputElement>;
  const { transferMoney, getBalanceOf } = useMessage();

  const handleCheckBalance = async () => {
    if (isAddress(val.current.value)) {
      const data = await getBalanceOf(val.current.value);
      setBalance(data);
    } else {
      toast.error("Invalid address pls check again");
    }
  };

  const handleTransferMoney = async () => {
    const data = await transferMoney(
      valReceive.current.value,
      valAmount.current.value
    );

    if (data) {
      toast.success(`https://testnet.bscscan.com/tx/${data?.hash}`);
    } else {
      toast.error("Transfer fail");
    }
  };

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
        <>
          <div className={style.box}>
            <div>Input address check for balance: </div>
            <input className={style.input} ref={val} />
            {balance !== null && (
              <div>The balance is {formatEther(balance)} DO</div>
            )}
            <button className={style.btn} onClick={handleCheckBalance}>
              Check
            </button>
          </div>
          <div className={style.box}>
            {/* <div>Mint value: </div>
            <input className={style.input} ref={valReceive} /> */}
            <div>Input address you want to transfer: </div>
            <input className={style.input} ref={valReceive} />
            <div>Input value: </div>
            <input className={style.input} type={"number"} ref={valAmount} />
            <button className={style.btn} onClick={handleTransferMoney}>
              Transfer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
