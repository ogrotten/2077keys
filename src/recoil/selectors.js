import { selector } from "recoil";
import { jsonobj, xmlobj } from "./atoms"

export const chkJSON = selector({
	key: "chkJSON",
	get: ({get}) => {
		const json = get(jsonobj);
		// console.log(`conlog: `, json)
		if (json.data !== null) return true;
		return false
	},
});

export const chkXML = selector({
	key: "chkXML",
	get: ({ get }) => {
		const xml = get(xmlobj);
		// console.log(`conlog: `, xml)
		if (xml !== "") return true;
		return false
	},
});