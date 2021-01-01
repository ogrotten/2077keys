import Dexie from 'dexie';

const db = new Dexie('ogr-keyconfig');
db.version(1).stores({
	json: "++id",
	xml: "++id"
});

db.readJSON = (data) => {
	return db.json.get(data)
		.then((x) => {
			if (x) {
				conlog(">>> JSON Read:", data, JSON.parse(x))
				return x
			}
			return 0
		})
		.catch((err) => {
			console.error(">>> JSON Read error: ", err);
		})
}

db.readXML = (data) => {
	return db.xml.get(data)
		.then((x) => {
			if (x) {
				conlog(">>> XML Read:", data, x)
				return x
			}
			return 0
		})
		.catch((err) => {
			console.error(">>> XML Read error: ", err);
		})
}

db.readAll = (data) => {
	return {
		json: db.json.where("id").above(0).toArray(),
		xml: db.xml.where("id").above(0).toArray()
	}
}

db.insertJSON = (data) => {
	// is this necessary?
	// const dataString = JSON.parse(JSON.stringify(data))
	const dataString = JSON.parse(JSON.stringify(data))
	if ("id" in dataString) delete dataString.id
	return db.json.add(dataString)
		.then((x) => {
			conlog(">>> JSON Added:", x, dataString)
			return x;
		})
		.catch((err) => {
			console.error(">>> JSON Add error", dataString, err)
		})
}

db.delete = (id) => {
	db.json.delete(id)
		.then((ret) => {
			conlog(">>> DB ID Deleted (returns `undefined`):", ret)
		})
		.catch((err) => {
			console.error(">>> DB ID Delete error", id, err)
		})
	db.xml.delete(id)
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