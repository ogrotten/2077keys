import React from 'react'

// import React, { useState, useEffect } from 'react'
// import { useRecoilState, useRecoilValue } from "recoil"
// import { jsonobj, xmlobj } from "../recoil/atoms"
// import { chkJSON, chkXML } from "../recoil/selectors";

// import { useUploader } from 'react-files-hooks';
// import db from "../data/db"

import {
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

	useDisclosure
} from "@chakra-ui/react"

import { UpDownIcon } from '@chakra-ui/icons'

const features = require("../features")

const Editor = () => {

	return (
		<Table variant="simple" w="100%">
			{/* <TableCaption placement="top">Imperial to metric conversion factors</TableCaption> */}
			<Thead color="grey.300">
				<Tr>
					<Th w={100}>Key Option</Th>
					<Th >Parameters</Th>
					<Th w={50} textAlign="center">View<br />Docs</Th>
				</Tr>
			</Thead>

			<Tbody size="sm">
				{features.default.map((feature, i) => {
					const item = feature.feature
					return (
					<Tr key={item.checkbox}>
						<Td><Checkbox>{item.checkbox}</Checkbox></Td>
						<Td>
							<VStack>
								<InputGroup>
									<InputLeftAddon children={item.parameter.before} />
									<Input size="xl" style={{ textAlign: "center" }} placeholder="f" w="6ch" />
									<InputRightAddon children={item.parameter.after} />
								</InputGroup>
								<Container>
									<Text>{item.desc}</Text>
								</Container>
							</VStack>
						</Td>
						<Td textAlign="center"><UpDownIcon /></Td>
					</Tr>
					)
				})}
			</Tbody>
		</Table>)
}

export default Editor