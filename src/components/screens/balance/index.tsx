import { formatEther, isAddress } from "ethers/lib/utils";
import { MutableRefObject, useRef } from "react";
import { toast } from "react-toastify";
import useMessage from "../../../hooks/useMessage";
import style from "../style.module.css";

const Balance = ({balance, setBalance}: any) => {
  const val = useRef() as MutableRefObject<HTMLInputElement>;
  const { getBalanceOf, loadingBalance } = useMessage();

  const handleCheckBalance = async () => {
    if (isAddress(val.current.value)) {
      const data = await getBalanceOf(val.current.value);
      setBalance(data);
    } else {
      toast.error("Invalid address pls check again");
    }
  };

  return (
    <div className={style.content}>
      <div>Input address check for balance: </div>
      <input className={style.input} ref={val} />
      {loadingBalance && <div>loading</div>}
      {balance !== null && loadingBalance === false && <div>The balance is {formatEther(balance)} DO</div>}
      <button className={style.btn} onClick={handleCheckBalance}>
        Check
      </button>
    </div>
  );
};

export default Balance;
