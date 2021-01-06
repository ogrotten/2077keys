import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { configState } from "../../recoil/atoms"
import { getJSON, getXML } from "../../recoil/selectors";

// import { useUploader } from 'react-files-hooks';
// import db from "../data/db"

import {
	Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
	Box,
	// Container,
	Checkbox,
	VStack,
	Input, InputGroup, InputLeftAddon, InputRightAddon,
	Tr, Td,
	Text,
} from "@chakra-ui/react"

const features = require("../../features")

const EditorItem = (props) => {
	const {item, index} = props
	const [theKey, setTheKey] = useState("")
	const [isDisabled, setIsDisabled] = useState(() => {
		const arr = []
		arr.length = features.default.length
		return arr.fill(true, 0)
	})

	const JSONfile = useRecoilValue(getJSON)
	const XMLfile = useRecoilValue(getXML)
	const [config, setConfig] = useRecoilState(configState)
	// const [JSONfile, setJSONfile] = useRecoilState(jsonobj)
	// const [XMLfile, setXMLfile] = useRecoilState(xmlobj)
	// // const [options, setOptions] = useRecoilState(xmlobj)
	// const [fromDB, setFromDB] = useRecoilState(xmlobj)

	const toggleRow = position => {
		setIsDisabled(() => {
			const disArr = isDisabled.map((currently, index) => {
				// console.log(`conlog: `, `currently ${currently},`, `position ${position},`, `index ${index},`)
				if (index === position) {
					// console.log(`conlog: set currently (${currently}) to ${!currently}`,)
					return !currently
				} else {
					// console.log(`conlog: leave currently (${currently}) unchanged at ${currently}`,)
					return currently
				}
			})
			return disArr
		})
	}

	const doKey = (e) => {
		e.preventDefault()
		setTheKey(e.target.value)
	}

	return (
		<Tr key={item.checkbox}>
			<Td><Checkbox
				onChange={() => {
					toggleRow(index)
				}}
			>{item.checkbox}</Checkbox></Td>
			<Td pb={0} mb={0}>
				<VStack>
					<InputGroup>
						<InputLeftAddon children={item.parameter.before} />
						<Input onChange={doKey}
							isDisabled={isDisabled[index]} size="xl" style={{ textAlign: "center" }} placeholder="f" w="6ch"
						/>
						<InputRightAddon children={item.parameter.after} />
					</InputGroup>
					<Accordion allowToggle w="100%" borderBottom="0px solid white">
						<AccordionItem>
							<AccordionButton>
								<AccordionIcon mr={5} bg="cyan" />
								<Box flex="1" textAlign="left" fontSize="sm">Doc:&nbsp;<b>{item.desc}</b></Box>
							</AccordionButton>
							<AccordionPanel>
								<Text fontSize="sm" style={{ whiteSpace: "pre-line" }}>{item["instruction"]}</Text>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</VStack>
			</Td>
		</Tr>
	)
}

export default EditorItem