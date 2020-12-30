import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import {
	Alert, AlertIcon, AlertTitle, AlertDescription,
	Wrap, WrapItem,
	HStack, VStack,
	Grid, GridItem,
	Divider,
	Text,
	Badge,
	Container,
} from "@chakra-ui/react"

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
		<VStack>
			<br />
			{
				areBoth
					? <Alert status="success" flexDirection="column" alignItems="left" rounded="md">
						<HStack><AlertIcon /><AlertTitle w="30%">Ready</AlertTitle></HStack>
						<AlertDescription fontSize="sm">Editor Unlocked.</AlertDescription>
					</Alert>
					: <Alert status="error" flexDirection="column" alignItems="left" rounded="md">
						<HStack><AlertIcon /><AlertTitle w="30%">Not Ready.</AlertTitle></HStack>
						<AlertDescription fontSize="sm">Configuration not loaded. Use the <b>Chooser</b> tab to load the config files.</AlertDescription>
					</Alert>
			}
			<Grid fontSize="sm" w="100%" templateColumns="repeat(2, 1fr)" gap={6}>
				<HStack>
					<Text>inputUserMappings.xml</Text>
					{
						isXML
							? <Badge align="center" w="100px" colorScheme="green" variant="outline">Ready</Badge>
							: <Badge align="center" w="100px" colorScheme="red" variant="solid">NOT Loaded</Badge>
					}
				</HStack>
				<HStack>
					<Text>UserSettings.json</Text>
					{
						isJSON
							? <Badge align="center" w="100px" colorScheme="green" variant="outline">Ready</Badge>
							: <Badge align="center" w="100px" colorScheme="red" variant="solid">NOT Loaded</Badge>
					}
				</HStack>
			</Grid>
		</VStack>
	)
}

export default Show