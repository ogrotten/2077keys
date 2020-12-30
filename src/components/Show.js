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
				? "inputUserMappings.xml: Loaded"
				: "inputUserMappings.xml: NOT Loaded"}
			<p />
			{isJSON
				? "UserSettings.json: Loaded"
				: "UserSettings.json: NOT Loaded"}
		</>
	)
}

export default Show