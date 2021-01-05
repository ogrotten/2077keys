import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
// import { chkJSON, chkXML } from "../recoil/selectors";

// import { useUploader } from 'react-files-hooks';
// import db from "../data/db"

import "./items/EditorItem"

import {
	Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
	Box,
	// Container,
	Checkbox,
	VStack,
	Input, InputGroup, InputLeftAddon, InputRightAddon,
	Table, Thead, Tbody, Tr, Th, Td,
	Text,
} from "@chakra-ui/react"
import EditorItem from './items/EditorItem'

const features = require("../features")

const Editor = () => {
	const [JSONfile, setJSONfile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLfile] = useRecoilState(xmlobj)
	const [options, setOptions] = useRecoilState(xmlobj)


	// useEffect(() => {
		// const run = features.default[0].feature
		// let newXML
		// if (isDisabled[index]) {
		// 	// if unchecked
		// 	newXML = run.perform(XMLfile, newKey)	//true
		// } else {
		// 	// checked
		// 	newXML = run.revert(XMLfile, newKey)	//false 
		// }
		// setXMLfile(newXML)

		// return () => {
		// 	cleanup
		// }
	// }, [newKey])

	return (
		<Table variant="simple" w="100%">
			{/* <TableCaption placement="top">Imperial to metric conversion factors</TableCaption> */}
			<Thead color="grey.300">
				<Tr>
					<Th w={200}>Key Option</Th>
					<Th >Parameters</Th>
				</Tr>
			</Thead>

			<Tbody size="sm">
				<EditorItem />
			</Tbody>
		</Table>)
}

export default Editor