import React, {useState, useEffect} from 'react';
import { useRecoilValue } from "recoil"
import { chkJSON, chkXML } from "./recoil/selectors";

import Chooser from "./components/Chooser"
import Show from "./components/Show"

import { Box, Container, StackDivider, Tabs, TabList, TabPanels, Tab, TabPanel, VStack } from "@chakra-ui/react"

function App() {
	const [areBoth, setAreBoth] = useState(false)

	const isJSON = useRecoilValue(chkJSON)
	const isXML = useRecoilValue(chkXML)

	useEffect(() => {
		setAreBoth(isJSON && isXML)
	}, [isJSON, isXML])

	return (
		<Container maxW="xl">
			<VStack
				divider={<StackDivider borderColor="gray.200" />}
				spacing={4}
				align="stretch"
			>
				<Show />
				<Tabs variant="line">
					<TabList>
						<Tab>Chooser</Tab>
						{
							areBoth
								? <Tab>Editor</Tab>
								: <Tab isDisabled>Editor</Tab>
						}
					</TabList>
					<TabPanels>
						<TabPanel>
							<Chooser />
						</TabPanel>
						<TabPanel>
							<p>Editor</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
		</Container>
	)
}

export default App;
