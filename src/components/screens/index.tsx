import { BigNumber } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { MutableRefObject, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
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
	const [balance, setBalance] = useState<any>(null)
  const val = useRef() as MutableRefObject<HTMLInputElement>;
	const valReceive = useRef() as MutableRefObject<HTMLInputElement>;
	const valAmmount = useRef() as MutableRefObject<HTMLInputElement>;
  const { transferMoney, getBalanceOf } = useMessage();

  const handleSendMessage = () => {
    if (isAddress(val.current.value)) {
      getBalanceOf(val.current.value)
    } else {
      toast.error("Invalid address pls check again");
    }
  };

	const handleTransferMoney = () => {
		transferMoney(valReceive, valAmmount)
	}

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
						{balance !== null && (<div>The balance is {balance}</div>)}
            <button className={style.btn} onClick={handleSendMessage}>
              Check
            </button>
          </div>
          <div className={style.box}>
						<div>Input address you want to transfer: </div>
            <input className={style.input} ref={valReceive} />
						<div>Input value: </div>
            <input className={style.input} type={'number'} ref={valAmmount} />
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
