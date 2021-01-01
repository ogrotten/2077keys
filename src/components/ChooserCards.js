import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import { useUploader } from 'react-files-hooks';
import db from "../data/db"

import {
	Badge,
	Box,
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

	return <Wrap>
		{allconfigs.map((x) => {
			return (
				<WrapItem key={x.id}>
					<Card props={x} />
				</WrapItem>
			)
			// return x.id
		})}
	</Wrap>
}

const Card = (props) => {
	const [data, setData] = useState(props.props)


	useEffect(() => {
		const dt = new Date(data.date)
		data.carddate = dt.toDateString()
	}, [])

	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden">
			{data.id}
			{data.carddate}
		</Box>
	)
}

export default ChooserCards