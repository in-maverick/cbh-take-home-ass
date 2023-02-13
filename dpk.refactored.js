/** refactored by Pradeep */
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
	const TRIVIAL_PARTITION_KEY = "0";
	const MAX_PARTITION_KEY_LENGTH = 256;

	// event true && event.partitionKey true candidate = event.partitionKey;
	// event true && event.partitionKey false candidate = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

	//event=false then return from here
	if (!event) {
		return TRIVIAL_PARTITION_KEY;
	}
	//event.partitionKey=true then candidate = event.partitionKey otherwise in or Case 
	// which is crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
	let candidate = event.partitionKey || JSON.stringify(event); // data =JSON.stringify(event)
	// check of candidate is already string else convert to string
	candidate = typeof candidate === "string" ? candidate : JSON.stringify(candidate);

	
	return candidate.length <= MAX_PARTITION_KEY_LENGTH ? candidate : crypto.createHash("sha3-512").update(candidate).digest("hex");
};


/** Login for refactoring */

/** block 1 */

// if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

// event true && event.partitionKey true candidate = event.partitionKey;
// event true && event.partitionKey false candidate = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");


