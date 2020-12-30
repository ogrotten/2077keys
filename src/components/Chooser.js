import React, { useState, useEffect } from 'react'
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"

import { useUploader } from 'react-files-hooks';
// import {xml2json} from ''


const Chooser = () => {
	const [file, setFile] = useRecoilState(jsonobj)
	const [filetype, setFiletype] = useState("")
	// const [temp, setTemp] = useState("")

	const { uploader, reset } = useUploader({
		onSelectFile: incoming => {
			// console.log(`Chooser.js 20: `,incoming[0]);
			const fileReader = new FileReader();
			fileReader.readAsText(incoming[0], "UTF-8");
			fileReader.onload = e => {
				const current = e.target.result
				if (current.startsWith()) {}
				setFile(JSON.parse(e.target.result));
			};
		},
		onError: error => {
			console.log(`App.js 11: `, error)
		},
		validTypes: ["application/json", "application/xml"]
	});
	
	const doFiletype = (e) => {
		setFiletype(e.target.value)
	}

	useEffect(() => {
		console.log(file)
	}, [file])

	useEffect(() => {
		console.log(filetype)
	}, [filetype])

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