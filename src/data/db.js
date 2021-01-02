import Dexie from 'dexie';

const db = new Dexie('ogr-keyconfig');
db.version(1).stores({
	config: "++id",
});

db.read = (data) => {
	return db.config.get(data)
		.then((x) => {
			if (x) {
				conlog(`>>> DB Read: id ${x.id}`)
				return x
			}
			return 0
		})
		.catch((err) => {
			console.error(">>> DB Read error: ", err);
		})
}

db.readAll = (data) => {
	const x = db.config.where("id").above(0).toArray()
	// console.log(`conlog: `, x.length)
	return x
}

db.insert = async (data) => {
	// is this necessary?
	// const dataString = JSON.parse(JSON.stringify(data))
	if ((data.xml !== "") && (data.json.data !== null)) {
		if ("id" in data) delete data.id
		data.date = new Date()
		return await db.config.add(data)
			.then((x) => {
				conlog(">>> DB Added:", x)
				return x;
			})
			.catch((err) => {
				console.error(">>> DB Add error", err)
			})
	}
}

db.delete = (id) => {
	db.config.delete(id)
		.then((ret) => {
			conlog(">>> DB ID Deleted (returns `undefined`):", ret)
		})
		.catch((err) => {
			console.error(">>> DB ID Delete error", id, err)
		})
}

export default db;

function conlog() {
	// flag to toggle logging 
	const show = false

	if (show) {
		console.log("____DB____")
		for (const arg in arguments) {
			console.dir(arguments[arg]);
		}
		console.log("^^^^^^^^^^")
	} else {
		// console.log(...arguments)
	}
}