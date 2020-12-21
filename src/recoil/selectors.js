import { selector } from "recoil";

import { jsonfilestate } from "./atoms";
import { getContacts, getDetails } from "../data";

export const jsonfile = selector({
	key: "jsonfile",
	get: async () => {
		const response = await getContacts();
		return response;
	},
});

export const xmlfile = selector({
	key: "xmlfile",
	get: async ({ get }) => {
		const response = await getDetails(get(currentContactState));
		return response;
	},
});