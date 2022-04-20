import { MouseEventHandler } from 'react'
import style from './style.module.css'

const Button = (props: any) => {
	const {text, onClick, ...rest} = props
	return (
		<button className={style.button} onClick={onClick} {...props}>
			{text}
		</button>
	)
}

export default Button