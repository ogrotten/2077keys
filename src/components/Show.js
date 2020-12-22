import React from 'react'
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"

const Show = () => {
	const [data, setData] = useRecoilState(jsonobj)
	return (
		JSON.stringify(data)
	)
}

export default Show