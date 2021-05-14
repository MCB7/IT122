'use strict'

import { Human } from "../IT_122_javascript/models/human.js";

// find all documents
Human.find({}, (err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
    return
});

// count # of docs
console.log("step 1")
Human.countDocuments((err, result) => {
    console.log("step 2")
    console.log(result + " db entries");
});
console.log("step 3")