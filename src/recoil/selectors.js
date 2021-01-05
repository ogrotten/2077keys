import { selector } from "recoil";
import { config } from "./atoms"

export const getJSON = selector({
	key: "getJSON",
	get: ({ get }) => {
		return get(config).json;
	},
});

export const getXML = selector({
	key: "getXML",
	get: ({ get }) => {
		return get(config).xml;
	},
});

export const exists = selector({
	key: "exists",
	get: ({ get }) => {
		const exists = { json: false, xml: false, }
		exists.JSON = Object.keys(getJSON).length === 0 ? true : false
		exists.XML = getXML.length === 0 ? true : false
		return exists
	}
})
