import React, { useEffect } from 'react'
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"

import { useUploader } from 'react-files-hooks';

const Chooser = () => {
	const [JSONfile, setJSONfile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLfile] = useRecoilState(xmlobj)

	const { uploader, reset } = useUploader({
		onSelectFile: incoming => {
			// console.log(`Chooser.js 20: `,incoming[0]);
			const fileReader = new FileReader();
			fileReader.readAsText(incoming[0], "UTF-8");
			fileReader.onload = e => {
				const current = e.target.result
				if (current.includes('"version": 65')) setJSONfile(JSON.parse(current))
				if (current.includes('xml version="1.0"')){
					if ( current.includes("<!-- MAPPINGS -->")){
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

	useEffect(() => {
		// console.log(JSONfile)
	}, [JSONfile])

	useEffect(() => {
		// console.log(XMLfile)
	}, [XMLfile])

	return (
		<div>
			<input {...uploader} id="input" />
			<button onClick={reset}>Reset</button>
		</div>
	)
}

export default Chooser