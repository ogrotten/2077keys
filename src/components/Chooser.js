import React, { useState, useEffect } from 'react'
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"

import { useUploader } from 'react-files-hooks';
// import {xml2json} from ''


const Chooser = () => {
	const [JSONfile, setJSONfile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLfile] = useRecoilState(xmlobj)
	const [filetype, setFiletype] = useState("")
	// const [temp, setTemp] = useState("")

	const { uploader, reset } = useUploader({
		onSelectFile: incoming => {
			// console.log(`Chooser.js 20: `,incoming[0]);
			const fileReader = new FileReader();
			fileReader.readAsText(incoming[0], "UTF-8");
			fileReader.onload = e => {
				const current = e.target.result
				if (current.includes('"version": 65')) setJSONfile(JSON.parse(current))
				if (current.includes('xml version="1.0"')) setXMLfile(current); console.log(`conlog: `, XMLfile)
			};
		},
		onError: error => {
			console.error(`UPLOAD: Neither JSON nor XML.\n\n`, error)
		},
		validTypes: ["application/json", "text/xml"]
	});

	const doFiletype = (e) => {
		setFiletype(e.target.value)
	}

	useEffect(() => {
		console.log(JSONfile)
	}, [JSONfile])

	useEffect(() => {
		console.log(XMLfile)
	}, [XMLfile])

	return (
		<div>
			<div onChange={doFiletype}>
				<input type="radio" name="filetype" value="JSON" />JSON
				<input type="radio" name="filetype" value="XML" />XML
			</div>
			<input {...uploader} id="input" />
			<button onClick={reset}>Reset</button>
		</div>
	)
}

export default Chooser