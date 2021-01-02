const feature = {
	name: "Action",
	desc: "Replace the hard bound 'F' key with a key of your choice as the action key.",
	instruction: "Before using this to change and replace your config, use the game to change any existing bind to the key you want to use for your action key.\nFor example, if you want to use 'Q' as your action key, use the game to change the 'Lean' action to something else, otherwise, you'll 'Lean' everytime you use the action key to open a door.\nAfter using this to change your action key, 'F' will be available to bind to other things.",
	xml: {
		seek: ["\"IK_F\""],
	},
	json: {
		seek: [],
		replace: [],
	},
	perform() {
		return x;
	}
}