import { atom } from "recoil";

export const jsonobj = atom({
	key: "jsonobj",
	default: {data: null},
});

export const xmlobj = atom({
	key: "xmlobj",
	default: {},
});