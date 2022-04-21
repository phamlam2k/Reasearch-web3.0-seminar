import React from 'react'
import style from './style.module.css'

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((...props) => {
	return (
		<input className={style.input} {...props}/>
	)
})

export default Input