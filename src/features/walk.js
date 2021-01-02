export const feature = {
	checkbox: "Walk Toggle",
	desc: "Key to toggle walking speed.",
	instruction: `
This will add a key to your config.
When pressed and held, will make the character move forward at a slow speed.

Release the key to stop moving. 
	`,
	xml: {
		seek: [`< mapping name = "LeftY_Axis" type = "Axis" >`],
		action: "add tag end",
		actionString: `<button id="IK_Alt" val="0.4" overridableUI="forward"/>`
	},
	parameter: {
		before: "Insert",
		after: "key to Walk."
	},
	// json: {
	// 	seek: [],
	// 	replace: [],
	// },
	perform() {
		return;
	},
	info: `
https://steamcommunity.com/app/1091500/discussions/0/2988665684324821306/?ctp=3#c2988665684327816627
Post #41

1. Go into the game and unbind/ rebind the key you want to use for your walk toggle if its bind to something else, like Alt for example.

2. Then go into Cyberpunk 2077\r6\config and edit InputUserMappings.xml file.

3. Find the section < mapping name = "LeftY_Axis" type = "Axis" > at the top and add this at the bottom
	< button id = "IK_Alt" val = "0.4" overridableUI = "forward" /> or the value can be whatever you want.It's the speed of your character 1.0 = full. It should look something like this:

		< mapping name = "LeftY_Axis" type = "Axis" >
<button id="IK_Pad_LeftAxisY" />
<button id="IK_W" val="1.0" overridableUI="forward"/>
<button id="IK_S" val="-1.0" overridableUI="back"/>
<button id="IK_Alt" val="0.4" overridableUI="forward"/>
</ >

4. Enjoy your new walking toggle on PC.
	`,
}

