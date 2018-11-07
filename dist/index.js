"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Takes an the Algolia index and key of document to be deleted
var removeObject = function (index, key) {
    // then it deletes the document
    return index.deleteObject(key, function (err) {
        if (err)
            throw err;
        console.log('Key Removed from Algolia Index', key);
    });
};
// Takes an the Algolia index and data to be added or updated to
var upsertObject = function (index, data) {
    // then it adds or updates it
    return index.saveObject(data, function (err, content) {
        if (err)
            throw err;
        console.log("Document " + data.objectID + " Updated in Algolia Index ");
    });
};
// Takes an Algolia index and a Firestore event and uses event data to keep them in sync
exports.syncAlgoliaWithFirestore = function (index, change, context) {
    var data = change.after.exists ? change.after.data() : null; // extract data from Firestore event
    var key = context.params.id; // gets the id of the document changed
    // If no data then it was a delete event
    if (!data) {
        // so delete the document from Algolia index
        return removeObject(index, key);
    }
    // add objectID param to data object and set it to key of Firestore document
    data['objectID'] = key;
    // upsert the data to the Algolia index
    return upsertObject(index, data);
};
