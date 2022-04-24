import { MutableRefObject, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useMessage from "../../../hooks/useMessage";
import style from "../style.module.css";

const Transfer = ({ address }: { address: string }) => {
  const [balance, setBalance] = useState<any>();
  const valReceive = useRef() as MutableRefObject<HTMLInputElement>;
  const valAmount = useRef() as MutableRefObject<HTMLInputElement>;
  const { transferMoney, getBalanceOf } = useMessage();

  useEffect(() => {
    const getBalance = async () => {
      const data = await getBalanceOf(address);

      setBalance(data);
    };

    getBalance();
  }, [address]);

  const handleTransferMoney = async () => {
    const data = await transferMoney(
      valReceive.current.value,
      valAmount.current.value
    );

    if (data) {
      toast.success(`https://testnet.bscscan.com/tx/${data?.hash}`);
    }
  };

  return (
    <div className={style.content}>
      <div>Input address you want to transfer: </div>
      <input className={style.input} ref={valReceive} />
      <div>Input value: </div>
      <input
        max={balance}
        className={style.input}
        type={"number"}
        ref={valAmount}
      />
      <button className={style.btn} onClick={handleTransferMoney}>
        Transfer
      </button>
    </div>
  );
};

export default Transfer;
