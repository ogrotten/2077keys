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
		const exists = { json: false, xml: false, }
		exists.JSON = Object.keys(getJSON).length === 0 ? true : false
		exists.XML = getXML.length === 0 ? true : false
		return exists
	}
})
