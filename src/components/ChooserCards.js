import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj, options } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import { useUploader } from 'react-files-hooks';
import db from "../data/db"

import {
	Box,
	Container,
	Divider,
	HStack,
	Tag,
	Text,
	Wrap, WrapItem
} from "@chakra-ui/react"

const ChooserCards = () => {
	const [allconfigs, setAllconfigs] = useState([])

	const getall = async () => {
		let ret = await db.readAll();
		ret.sort((x, y) => (x.date < y.date ? 1 : -1));
		setAllconfigs([...ret])
	};

	useEffect(() => {
		getall()
	}, [])

	return <Container>
		<Box fontSize="sm" mt={3} p={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
			<Text><b>Upload New:</b></Text>
		</Box>
		{allconfigs.map((x) => {
			return (
				<Card key={x.id} props={x} />
			)
			// return x.id
		})}
	</Container>
}

const Card = (props) => {
	const [data, setData] = useState(props.props)

	useEffect(() => {
		const dt = new Date(data.date)
		const ops =
			setData({
				...data,
				carddate: dt.toDateString(),
				// cardtime: `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
				cardtime: `${dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" })}`
			})
	}, [])

	return (
		<Box fontSize="sm" mt={3} p={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
			<HStack spacing={4}>
				<Tag variant="subtle" colorScheme="cyan" size="sm">option</Tag>
				<Tag variant="subtle" colorScheme="cyan" size="sm">array</Tag>
			</HStack>
			<Divider mt={2} mb={2}/>
			<Text>(id: {data.id}) {data.carddate} - {data.cardtime}</Text>
		</Box>
	)
}

export default ChooserCards