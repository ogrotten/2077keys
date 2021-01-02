import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"
import { jsonobj, xmlobj } from "../recoil/atoms"
import { chkJSON, chkXML } from "../recoil/selectors";

import { useUploader } from 'react-files-hooks';
import db from "../data/db"

import {
	Box,
	Container,
	Divider,
	HStack,
	Tag,
	Text,
	Wrap, WrapItem
} from "@chakra-ui/react"

const Editor = () => {
	return (
	<Container>
		Editor
	</Container>
	)
}

export default Editor