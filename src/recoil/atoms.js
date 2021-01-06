import { atom } from "recoil";

export const configState = atom({
	key: "config",
	default: {
		options: [],
		json: {},
		xml: "",
		status: ""
	},
});

