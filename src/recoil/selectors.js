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
		// const JSON = get(configState).json
		// const XML = get(configState).xml
		return {
			JSON: Object.keys(get(configState).json).length === 0 ? false : true,
			XML: get(configState).xml.length === 0 ? false : true
		}
	}
})

// export const uploadState = selector({
// 	key: "uploadState",
// 	get: ({get}) =>{
// 		return get(configState).status
// 	}
// })
