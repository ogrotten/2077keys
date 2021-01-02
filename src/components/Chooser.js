import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { jsonobj, xmlobj, options } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import { useUploader } from 'react-files-hooks';
import db from "../data/db"

import {
	Box,
	Button,
	Container,
	Divider,
	HStack,
	Tag,
	Text,
	Wrap, WrapItem
} from "@chakra-ui/react"

const Chooser = () => {
	const [allconfigs, setAllconfigs] = useState([])
	const [areBoth, setAreBoth] = useState(false)

	const [JSONfile, setJSONfile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLfile] = useRecoilState(xmlobj)

	const isJSON = useRecoilValue(chkJSON)
	const isXML = useRecoilValue(chkXML)

	const resetJSON = useResetRecoilState(jsonobj);
	const resetXML = useResetRecoilState(xmlobj);
	const resetOptions = useResetRecoilState(options);


	const { uploader, reset } = useUploader({
		onSelectFile: incoming => {
			// console.log(`Chooser.js 20: `,incoming[0]);
			const fileReader = new FileReader();
			fileReader.readAsText(incoming[0], "UTF-8");
			fileReader.onload = e => {
				const current = e.target.result
				if (current.includes('"version": 65')) setJSONfile(JSON.parse(current))
				if (current.includes('xml version="1.0"')) {
					if (current.includes("<!-- MAPPINGS -->")) {
						setXMLfile(current)
					} else {
						console.error(`XML UPLOAD: Wrong XML file.\n\n`)
					}
				}
			};
		},
		onError: error => {
			console.error(`UPLOAD: Neither JSON nor XML.\n\n`, error)
		},
		validTypes: ["application/json", "text/xml"]
	});

	const getall = async () => {
		let ret = await db.readAll();
		ret.sort((x, y) => (x.date < y.date ? 1 : -1));
		setAllconfigs([...ret])
	};

	const doReset = () => {
		resetJSON()
		resetXML()
		resetOptions()
	}

	//  #region useEffects 
	useEffect(() => {
		getall()
	}, [])

	useEffect(() => {
		// console.log(`conlog: `, JSONfile)
	}, [JSONfile])

	useEffect(() => {
		// console.log(XMLfile)
	}, [XMLfile])

	useEffect(() => {
		setAreBoth(isJSON && isXML)
	}, [isJSON, isXML])

	useEffect(() => {
		// areBoth ? console.log(`conlog: dexie`,) : console.log(`conlog: NOPE`,)
		db.insert({
			json: JSONfile,
			xml: XMLfile
		})
		getall()
	}, [areBoth])
	// #endregion 

	return (
		<Container>
			<Box fontSize="sm" mt={3} p={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
				<Text><b>Upload New:</b></Text>
				<Button size="sm" p={0}>
					<label style={{ lineHeight: "32px", width: "126px", cursor: 'pointer' }} htmlFor="filePicker">Upload Config...</label>
				</Button>
				<input {...uploader} id="filePicker" style={{ visibility: "hidden" }} type={"file"} />
				<Divider mt={2} mb={2} />
				<Button size="sm" onClick={doReset}>Reset</Button>
			</Box>
			{allconfigs.map((x) => {
				return (
					<Card key={x.id} props={x} />
				)
				// return x.id
			})}
		</Container>
	)
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
			<Divider mt={2} mb={2} />
			<Text>(id: {data.id}) {data.carddate} - {data.cardtime}</Text>
		</Box>
	)
}

export default Chooser