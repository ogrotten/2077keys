import React from 'react'
import "./items/EditorItem"

import {
	Table, Thead, Tbody, Tr, Th,
} from "@chakra-ui/react"
import EditorItem from './items/EditorItem'

const features = require("../features")

const Editor = () => {
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
				{features.default.map((feature, i) => {
					const item = feature.feature
					// console.log(`conlog: ${i}`, isDisabled[i])
					return <EditorItem item={item} index={i} key={item.checkbox} />
				})}
			</Tbody>
		</Table>
	)
}

export default Editor