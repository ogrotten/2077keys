import React from 'react'
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"

const Show = () => {
	const [JSONfile, setJSONFile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLFile] = useRecoilState(xmlobj)
	return (
		XMLfile
	)
}

export default Show