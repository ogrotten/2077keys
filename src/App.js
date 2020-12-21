import React, { useEffect, useState } from 'react';
import { useUploader } from 'react-files-hooks';

function App() {
	const [file, setFile] = useState({})
	const { uploader, reset } = useUploader({
		onSelectFile: incoming => {
			const fileReader = new FileReader();
			fileReader.readAsText(incoming[0], "UTF-8");
			fileReader.onload = e => {
				console.log(`App.js 11: `, e)
				setFile(JSON.parse(e.target.result));
			};
		},
		onError: error => {
			console.log(`App.js 11: `, error)
		},
		// validTypes: ["text/plain"]
		validTypes: ["application/json", "application/xml"]
	});

	useEffect(() => {
		console.log(file)
	}, [file])

	return (
		<div>
			<input {...uploader} id="input" />
			<button onClick={reset}>Reset</button>
			{console.log(`App.js 24: `, file)}
		</div>
	)

}

export default App;
