import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { configState } from "../recoil/atoms"
import { getJSON, getXML, existState } from "../recoil/selectors";

import { useUploader } from 'react-files-hooks';
import db from "../data/db"

import {
	Box,
	Button,
	Container,
	Divider,
	Flex, Spacer,
	HStack,
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
	Spinner,
	Tag,
	Text,

	useDisclosure,
} from "@chakra-ui/react"

import { DeleteIcon } from '@chakra-ui/icons'

const Chooser = () => {
	const [allconfigs, setAllconfigs] = useState({ loaded: false, configs: [] })
	const [config, setConfig] = useRecoilState(configState)

	const [fileJSON, setFileJSON] = useState({})
	const [fileXML, setFileXML] = useState("")

	const exists = useRecoilValue(existState)

	const resetConfig = useResetRecoilState(configState);

	const { uploader } = useUploader({
		onSelectFile: incoming => {
			const fileReader = new FileReader();
			fileReader.readAsText(incoming[0], "UTF-8");
			fileReader.onload = e => {
				const current = e.target.result
				let status, date = new Date()
				if (config.status === "") {
					status = "ONE"
				} else if (config.status === "ONE") {
					status = "FILE"
				}
				if (current.includes('"version": 65')) {
					setFileJSON(current)
				} else if (current.includes('xml version="1.0"')) {
					if (current.includes("<!-- MAPPINGS -->")) {
						setFileXML(current)
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
		resetConfig()
	}

	useEffect(() => {
		const uploadState = () => {
			if (config.status === "DATABASE") return "DATABASE"

			if (exists.JSON && exists.XML) return "COMPLETE"
			if (exists.JSON || exists.XML) return "ONE"
			return "NONE"
		}

		if (uploadState() === "COMPLETE") {
			db.insert(config)
		}
		getall()
	}, [exists])

	useEffect(() => {
		setConfig({ ...config, json: fileJSON, xml: fileXML })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileJSON, fileXML])



	return (
		<Container>{/* console.log(`conlog: `, uploadState()) */}
			<Box fontSize="sm" mt={3} p={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
				<Button size="sm" p={0} colorScheme="blue" /* onClick={checkdata} */>
					<label style={{ lineHeight: "32px", width: "126px", cursor: 'pointer' }} htmlFor="filePicker">Upload Config...</label>
				</Button>
				<input {...uploader} id="filePicker" style={{ visibility: "hidden" }} type={"file"} />
				<Text>Will upload config files.</Text>
				<Divider mt={2} mb={2} />
				<Button size="sm" onClick={doReset}>Reset</Button>
				<Text>Unload current configs.</Text>
			</Box>
			{ allconfigs.loaded		// check if allconfigs.loaded === true
				? allconfigs.configs.length > 0		// if allconfigs.loaded is true, check if allconfigs.configs has any entries
					? allconfigs.configs.map((item) => {		// if allconfigs.configs has entries
						return (
							<Card key={item.id} item={item} />
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
	const [item, setItem] = useState(props.item)

	const [config, setConfig] = useRecoilState(configState)

	const { isOpen, onOpen, onClose } = useDisclosure()

	const doLoad = async (e) => {
		e.preventDefault()
		let fromDB = await db.read(item.id);
		console.log(`conlog: `, fromDB)
		setConfig({
			...fromDB,
			status: "DATABASE",
		})
	}

	const doTrash = async () => {
		console.log(`conlog: Yes. Delete.`, )
		onClose()
	}

	useEffect(() => {
		// console.log(`conlog: `, exists)
		const dt = new Date(item.date)
		setItem({
			...item,
			carddate: dt.toDateString(),
			cardtime: `${dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" })}`
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Box fontSize="sm" mt={3} p={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
			<HStack spacing={2}>
				<Tag variant="subtle" colorScheme="cyan" size="sm">option</Tag>
				<Tag variant="subtle" colorScheme="cyan" size="sm">array</Tag>
			</HStack>
			<Divider mt={2} mb={2} />
			<Flex>
				<Text>(id: {item.id}) {item.carddate} - {item.cardtime}</Text>
				<Spacer />
				<Button ml={1} size="xs" colorScheme="red" onClick={onOpen}><DeleteIcon /></Button>
				<Button ml={1} size="xs" colorScheme="blue" onClick={doLoad}>Open</Button>
			</Flex>
			<Modal closeOnOverlayClick={true} closeOnEsc={true} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>checking</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={doTrash}>
							Close
            			</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default Chooser