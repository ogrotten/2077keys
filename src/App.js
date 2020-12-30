import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil"
import { jsonobj, xmlobj } from "./recoil/atoms"
import { useUploader } from 'react-files-hooks';

import Chooser from "./components/Chooser"
import Show from "./components/Show"

function App() {

	return (
		<>
			<Chooser />
			<br />
			<Show />
		</>
	)

}

export default App;
