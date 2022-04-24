import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { MutableRefObject, useRef, useState } from "react";
import useMessage from "../../../hooks/useMessage"
import style from '../style.module.css'

const Allowance = () => {
	const [allowanceVal, setAllowanceVal] = useState<any>(null)
	const valOwner = useRef() as MutableRefObject<HTMLInputElement>;
	const valSpender = useRef() as MutableRefObject<HTMLInputElement>;
	const { allowance } = useMessage()

	const handleAllowanceToken = async () => {
		const data = await allowance(valOwner.current.value,valSpender.current.value)

		if(data) {
			setAllowanceVal(BigNumber.from(data._hex).toString())
		}
	}

	return (
		<div className={style.content}>
			<div>Input address owner: </div>
      <input className={style.input} ref={valOwner} />
			<div>Input address spender: </div>
      <input className={style.input} ref={valSpender} />
			{allowanceVal !== null && <div>Allowance : {formatEther(allowanceVal)} DO</div>}
			<button className={style.btn} onClick={handleAllowanceToken}>Allowance</button>
		</div>
	)
}

export default Allowance