import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import { useUploader } from 'react-files-hooks';
import db from "../data/db"

import {
	Box,
	Container,
	Checkbox, CheckboxGroup,
	Divider,
	HStack,
	Input, InputGroup, InputLeftAddon, InputRightAddon,
	Table, Thead, Tbody, Tr, Th, Td, TableCaption,
	Tag,
	Text,
	Wrap, WrapItem
} from "@chakra-ui/react"

const Editor = () => {
	return (
		<Table variant="simple">
			{/* <TableCaption placement="top">Imperial to metric conversion factors</TableCaption> */}
			<Thead color="grey.300">
				<Tr>
					<Th>Key Option</Th>
					<Th>Parameters</Th>
				</Tr>
			</Thead>
			<Tbody size="sm">
				<Tr>
					<Td>
						<Checkbox>Action</Checkbox>
					</Td>
					<Td>
						<InputGroup>
							<InputLeftAddon children="Use" />
							<Input size="xl" style={{ textAlign: "center" }} placeholder="f" w="6ch" />
							<InputRightAddon children="as the action key." />
						</InputGroup>
					</Td>
				</Tr>
				<Tr>
					<Td><Checkbox>Dodge</Checkbox></Td>
					<Td>
						<InputGroup>
							<InputLeftAddon children="Use" />
							<Input size="xl" style={{ textAlign: "center" }} placeholder="m" w="6ch" />
							<InputRightAddon children="to dodge instead of dbl-tap." />
						</InputGroup>
					</Td>
				</Tr>
				<Tr>
					<Td><Checkbox>Walk</Checkbox></Td>
					<Td>
						<InputGroup>
							<InputLeftAddon children="Use" />
							<Input size="xl" style={{ textAlign: "center" }} placeholder="m" w="6ch" />
							<InputRightAddon children="to walk." />
						</InputGroup>
					</Td>
				</Tr>
			</Tbody>
		</Table>)
}

export default Editor