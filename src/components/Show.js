import React from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

const Show = () => {
	const [JSONfile, setJSONFile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLFile] = useRecoilState(xmlobj)
	const isJSON = useRecoilValue(chkJSON)
	const isXML = useRecoilValue(chkXML)
	return (
		<>
			{isXML
				? "XML: Loaded"
				: "XML: NOT Loaded"}
			<p />
			{isJSON
				? "JSON: Loaded"
				: "JSON: NOT Loaded"}
		</>
	)
}

export default Show