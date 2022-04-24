import { MutableRefObject, useRef } from "react";
import useMessage from "../../../hooks/useMessage"
import style from '../style.module.css'

const Approval = () => {
	const valSpender = useRef() as MutableRefObject<HTMLInputElement>;
  const valAmount = useRef() as MutableRefObject<HTMLInputElement>;
	const { approveToken } = useMessage()

	const handleApproveToken = async () => {
		const data = await approveToken(valSpender.current.value, valAmount.current.value)

		console.log(data)
	}

	return (
		<div className={style.content}>
			<div>Input address you want to approve: </div>
      <input className={style.input} ref={valSpender} />
      <div>Input value: </div>
      <input
        className={style.input}
        type={"number"}
        ref={valAmount}
      />
			<button className={style.btn} onClick={handleApproveToken}>Approve</button>
		</div>
	)
}

export default Approval