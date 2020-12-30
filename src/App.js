import React from 'react';
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "./recoil/atoms"

import Chooser from "./components/Chooser"
import Show from "./components/Show"

function App() {
	const [JSONfile, setJSONfile] = useRecoilState(jsonobj)
	const [XMLfile, setXMLfile] = useRecoilState(xmlobj)

	return (
		<>
			<Chooser />
			<br />
			<Show />
		</>
	)
}

export default App;
