import { MutableRefObject, useRef } from "react";
import { toast } from "react-toastify";
import useMessage from "../../../hooks/useMessage";
import style from '../style.module.css'

const Mint = () => {
  const valAddress = useRef() as MutableRefObject<HTMLInputElement>;
  const valMint = useRef() as MutableRefObject<HTMLInputElement>;
	const { mint } = useMessage();

	const handleMint = async () => {
		const data = await mint(valAddress?.current?.value, valMint?.current?.value)

		if (data) {
      toast.success('');
    } else {
      toast.error("Transfer fail");
    }
	}

  return (
    <div className={style.content}>
      <div>Address: </div>
			<input className={style.input} ref={valAddress}/>

			<div>Value mint: </div>
			<input className={style.input} ref={valMint}/>

			<button onClick={handleMint} className={style.btn}>Mint</button>
    </div>
  );
};

export default Mint;
