import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil"
import { chkJSON, chkXML } from "./recoil/selectors";

import Chooser from "./components/Chooser"
import Show from "./components/Show"
import Editor from "./components/Editor"

import {
	Container,
	StackDivider,
	Tabs, TabList, TabPanels, Tab,
	TabPanel,
	VStack
} from "@chakra-ui/react"

import { QuestionIcon, LockIcon, EditIcon, CopyIcon } from '@chakra-ui/icons'

function App() {
	const [areBoth, setAreBoth] = useState(false)

	const isJSON = useRecoilValue(chkJSON)
	const isXML = useRecoilValue(chkXML)

	useEffect(() => {
		setAreBoth(isJSON && isXML)
	}, [isJSON, isXML])

	return (
		<Container maxW="900px">
			<VStack
				divider={<StackDivider borderColor="gray.200" />}
				spacing={4}
				align="stretch"
			>
				<Show />
				<Tabs variant="enclosed-colored">
					<TabList>
						<Tab><CopyIcon />&nbsp;Chooser</Tab>
						{
							areBoth
								? <Tab><EditIcon />&nbsp;Editor</Tab>
								: <Tab isDisabled color="silver"><LockIcon color="red.500" />&nbsp;Editor</Tab>
						}
						<Tab><QuestionIcon color="blue.400" />&nbsp;Help</Tab>
						<Tab><EditIcon />&nbsp;Editor</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Chooser />
						</TabPanel>
						<TabPanel>
							<Editor />
						</TabPanel>
						<TabPanel>
							<p>Helping Text</p>
						</TabPanel>
						<TabPanel>
							<Editor />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
		</Container>
	)
}

export default App;
