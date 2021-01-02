// import React from 'react'

import React, { useState, useEffect } from 'react'
// import { useRecoilState, useRecoilValue } from "recoil"
// import { jsonobj, xmlobj } from "../recoil/atoms"
// import { chkJSON, chkXML } from "../recoil/selectors";

// import { useUploader } from 'react-files-hooks';
// import db from "../data/db"

import {
	Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
	Box,
	Container,
	Checkbox, CheckboxGroup,
	Divider,
	HStack, VStack,
	Input, InputGroup, InputLeftAddon, InputRightAddon,
	Table, Thead, Tbody, Tr, Th, Td, TableCaption,
	Tag,
	Text,
	Wrap, WrapItem,

	useDisclosure,
	extendTheme
} from "@chakra-ui/react"

import { UpDownIcon } from '@chakra-ui/icons'

const features = require("../features")

const Editor = () => {
	const [isDisabled, setIsDisabled] = useState(() => {
		const arr = []
		arr.length = features.default.length
		return arr.fill(true, 0)
	})

	const toggleRow = position => {
		setIsDisabled(() => {
			const disArr = isDisabled.map((currently, index) => {
				console.log(`conlog: `, `currently ${currently},`, `position ${position},`, `index ${index},`)
				if (index === position) {
					console.log(`conlog: set currently (${currently}) to ${!currently}`,)
					return !currently
					// if (item=true) {
					// 	return false
					// } else {
					// 	return true
					// }
				} else {
					console.log(`conlog: leave currently (${currently}) unchanged at ${currently}`,)
					return currently
				}
			})
			// console.log(`conlog: `, disArr)
			return disArr
		})
	}

	return (
		<Table variant="simple" w="100%">
			{/* <TableCaption placement="top">Imperial to metric conversion factors</TableCaption> */}
			<Thead color="grey.300">
				<Tr>
					<Th w={100}>Key Option</Th>
					<Th >Parameters</Th>
				</Tr>
			</Thead>

			<Tbody size="sm">
				{features.default.map((feature, i) => {
					const item = feature.feature
					// console.log(`conlog: ${i}`, isDisabled[i])
					return (
						<Tr key={item.checkbox}>
							<Td><Checkbox
								onChange={() => {
									toggleRow(i)
								}}
							>{item.checkbox}</Checkbox></Td>
							<Td pb={0} mb={0}>
								<VStack>
									<InputGroup>
										<InputLeftAddon children={item.parameter.before} />
										<Input isDisabled={isDisabled[i]} size="xl" style={{ textAlign: "center" }} placeholder="f" w="6ch" />
										<InputRightAddon children={item.parameter.after} />
									</InputGroup>
									<Accordion allowToggle w="100%" borderBottom="0px solid white">
										<AccordionItem>
											<AccordionButton>
												<AccordionIcon mr={5} bg="cyan" />
												<Box flex="1" textAlign="left" fontSize="sm">Doc:&nbsp;<b>{item.desc}</b></Box>
											</AccordionButton>
											<AccordionPanel>
												<Text fontSize="sm">{item["instruction"]}</Text>
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
								</VStack>
							</Td>
						</Tr>
					)
				})}
			</Tbody>
		</Table>)
}

export default Editor