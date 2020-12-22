import React, { useState, useEffect } from 'react'
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { useUploader } from 'react-files-hooks';


const Chooser = () => {
	const [file, setFile] = useRecoilState(jsonobj)
	const [filetype, setFiletype] = useState("")

	const { uploader, reset } = useUploader({
		onSelectFile: incoming => {
			const fileReader = new FileReader();
			fileReader.readAsText(incoming[0], "UTF-8");
			fileReader.onload = e => {
				// console.log(`App.js 11: `, e)
				if (filetype = "JSON") setFile(JSON.parse(e.target.result));
				if (filetype = "XML") setFile(JSON.parse(e.target.result));
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

	return (
		<div>
			<div onchange={doFiletype}>
				<input type="radio" name="filetype" value="JSON" />JSON
				<input type="radio" name="filetype" value="XML" />XML
			</div>
			<input {...uploader} id="input" />
			<button onClick={reset}>Reset</button>
		</div>
	)
}

export default Chooser