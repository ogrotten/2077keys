import React from 'react';

import Chooser from "./components/Chooser"
import Show from "./components/Show"

import { Box, Container, StackDivider, Tabs, TabList, TabPanels, Tab, TabPanel, VStack } from "@chakra-ui/react"

function App() {
	return (
		<Container maxW="xl">
			<VStack
				divider={<StackDivider borderColor="gray.200" />}
				spacing={4}
				align="stretch"
			>
				<Show />
				<Tabs variant="enclosed-colored">
					<TabList>
						<Tab>Chooser</Tab>
						<Tab>Editor</Tab>
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
