import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import { useUploader } from 'react-files-hooks';

const Chooser = () => {
	const [areBoth, setAreBoth] = useState(false)
	const [JSONfile, setJSONfile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLfile] = useRecoilState(xmlobj)

	const isJSON = useRecoilValue(chkJSON)
	const isXML = useRecoilValue(chkXML)


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

	useEffect(() => {
		setAreBoth(isJSON && isXML)
	}, [isJSON, isXML])

	useEffect(() => {
		areBoth ? console.log(`conlog: dexie`,) : console.log(`conlog: NOPE`,) 
	}, [areBoth])

	return (
		<div>
			<input {...uploader} id="input" />
			<button onClick={reset}>Reset</button>
		</div>
	)
}

export default Chooser