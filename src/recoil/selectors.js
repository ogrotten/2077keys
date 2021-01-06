import { selector } from "recoil";
import { configState } from "./atoms"

export const getJSON = selector({
	key: "getJSON",
	get: ({ get }) => {
		return get(configState).json;
	},
});

export const getXML = selector({
	key: "getXML",
	get: ({ get }) => {
		return get(configState).xml;
	},
});

export const existState = selector({
	key: "existState",
	get: ({ get }) => {
		const JSON = get(configState).json
		const XML = get(configState).xml
		const exists = { JSON: false, XML: false, }
		exists.JSON = Object.keys(JSON).length === 0 ? false : true
		exists.XML = XML.length === 0 ? false : true
		return exists
	}
})

// export const uploadState = selector({
// 	key: "uploadState",
// 	get: ({get}) =>{
// 		return get(configState).status
// 	}
// })
