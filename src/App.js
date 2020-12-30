import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "./recoil/atoms"
import { useUploader } from 'react-files-hooks';

import Chooser from "./components/Chooser"
import Show from "./components/Show"

function App() {
	// const [file, setFile] = useRecoilState(jsonobj)
	// const { uploader, reset } = useUploader({
	// 	onSelectFile: incoming => {
	// 		const fileReader = new FileReader();
	// 		fileReader.readAsText(incoming[0], "UTF-8");
	// 		fileReader.onload = e => {
	// 			console.log(`App.js 11: `, e)
	// 			setFile(JSON.parse(e.target.result));
	// 		};
	// 	},
	// 	onError: error => {
	// 		console.log(`App.js 11: `, error)
	// 	},
	// 	validTypes: ["application/json", "application/xml"]
	// });

	// useEffect(() => {
	// 	console.log(file)
	// }, [file])

	return (
		<>
			<Chooser />
			<br />
			<Show />
		</>
	)

}

export default App;
