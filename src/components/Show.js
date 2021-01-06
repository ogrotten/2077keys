import React, { useState, useEffect } from 'react'
import { useRecoilValue } from "recoil"
import { existState } from "../recoil/selectors";

import {
	Alert, AlertIcon, AlertTitle, AlertDescription,
	HStack, VStack,
	Grid,
	Text,
	Badge,
} from "@chakra-ui/react"

const Show = () => {
	const exists = useRecoilValue(existState)

	return (
		<VStack>
			<br />
			{
				exists.JSON && exists.XML
					? <Alert status="success" flexDirection="column" alignItems="left" rounded="md" border="1px" p="15px" borderColor="green.200">
						<HStack><AlertIcon /><AlertTitle w="30%">Ready</AlertTitle></HStack>
						<AlertDescription fontSize="sm">Editor Unlocked.</AlertDescription>
					</Alert>
					: <Alert status="error" flexDirection="column" alignItems="left" rounded="md" borderWidth="3px" p="13px" borderColor="red.200">
						<HStack><AlertIcon /><AlertTitle w="30%">Not Ready.</AlertTitle></HStack>
						<AlertDescription fontSize="sm">Configuration not loaded. Use the <b>Chooser</b> tab to load the config files.</AlertDescription>
					</Alert>
			}
			<Grid fontSize="sm" w="100%" templateColumns="repeat(2, 1fr)" gap={6}>
				<HStack>
					<Text>inputUserMappings.xml</Text>
					{
						exists.XML
							? <Badge align="center" w="100px" colorScheme="green" variant="outline">Ready</Badge>
							: <Badge align="center" w="100px" colorScheme="red" variant="solid">NOT Loaded</Badge>
					}
				</HStack>
				<HStack>
					<Text>UserSettings.json</Text>
					{
						exists.JSON
							? <Badge align="center" w="100px" colorScheme="green" variant="outline">Ready</Badge>
							: <Badge align="center" w="100px" colorScheme="red" variant="solid">NOT Loaded</Badge>
					}
				</HStack>
			</Grid>
		</VStack>
	)
}

export default Show