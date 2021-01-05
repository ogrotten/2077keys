export const feature = {
	checkbox: "Action",
	desc: "Replace 'F' as the action key.",
	instruction: `Before doing this, use the game to change existing binds of the key you want to use.\n\nFor example, if you want to use 'Q' as your action key, use the game to change the 'Lean' key to something else. Otherwise, you will 'Lean' everytime you use your new action key to open a door.\n\nAfter using this to change your action key, 'F' will be available to bind to other things.`,
	parameter: {
		before: "Use",
		after: "as the Action key."
	},
	xml: {
		seek: [`IK_F`],
		action: "replace",
		actionString: null
	},
	// json: {
	// 	seek: [],
	// 	action: "replace",
	// 	actionString: null
	// },
	perform(xml, incoming) {
		// `chosen` is the key the user wants
		// `target` is the default setting
		const chosen = `"IK_${incoming.toUpperCase()}`
		const target = `"IK_F"`
		const newxml = xml.replace(target, chosen)
		return newxml
	},
	revert(xml, incoming) {
		// `chosen` is the key the user already set
		// `target` is the default setting
		const chosen = `"IK_${incoming.toUpperCase()}`
		const target = `"IK_F"`
		const newxml = xml.replace(chosen, target)
		return newxml
	},

	info: "https://old.reddit.com/r/cyberpunkgame/comments/k0llf4/pc_questions_megathread/gf8jtio/",
}
