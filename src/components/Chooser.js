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
	Spinner,
	Tag,
	Text,
	Wrap, WrapItem
} from "@chakra-ui/react"

const Chooser = () => {
	const [allconfigs, setAllconfigs] = useState({ loaded: false, configs: [] })
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
		setAllconfigs({ loaded: true, configs: [...ret] })
	};

	const doReset = () => {
		resetJSON()
		resetXML()
		resetOptions()
	}

	//  #region useEffects 

	useEffect(() => {
		// console.log(`conlog: `, JSONfile)
	}, [JSONfile])

	useEffect(() => {
		// console.log(XMLfile)
	}, [XMLfile])

	useEffect(() => {
		// console.log(XMLfile)
		console.log(`conlog: `, allconfigs.loaded)
	}, [allconfigs])

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
			{ allconfigs.loaded		// check if allconfigs.loaded === true
				? allconfigs.configs.length > 0		// if allconfigs.loaded is true, check if allconfigs.configs has any entries
					? allconfigs.configs.map((x) => {		// if allconfigs.configs has entries
						return (
							<Card key={x.id} props={x} />
						)
						// return x.id
					})
					: <Text size="lg" color="silver" m={4}>No stored configs</Text>		// if allconfigs.configs has zero entries
				: <Spinner		// if allconfigs.loaded === true
					m={4}
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			}
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