import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import { HStack, VStack } from "@chakra-ui/react"

const Show = () => {
	const [areBoth, setAreBoth] = useState(false)

	const [JSONfile, setJSONFile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLFile] = useRecoilState(xmlobj)
	const isJSON = useRecoilValue(chkJSON)
	const isXML = useRecoilValue(chkXML)

	useEffect(() => {
		setAreBoth(isJSON && isXML)
	}, [isJSON, isXML])

	return (
		<HStack>
			{
				areBoth
					? <Alert status="success">
						<AlertTitle>Ready</AlertTitle>
						<AlertDescription>to Edit.</AlertDescription>
					</Alert>
					: <Alert status="error">
						<AlertIcon />
						<AlertTitle>Not Ready.</AlertTitle>
						<AlertDescription>Configuration not completely loaded. Use the Chooser tab to load the config files.</AlertDescription>
					</Alert>
			}
			{isXML
				? "inputUserMappings.xml: Loaded"
				: "inputUserMappings.xml: NOT Loaded"}
			<p />
			{isJSON
				? "UserSettings.json: Loaded"
				: "UserSettings.json: NOT Loaded"}
		</HStack>
	)
}

export default Show