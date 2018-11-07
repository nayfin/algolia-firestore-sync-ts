# algolia-firestore-sync
Simple helper for syncing indices to Firestore on Firebase


## Usage

```
import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';
import { syncAlgoliaWithFirestore } from 'algolia-firestore-sync-ts';

const algolia = algoliasearch(functions.config().algolia.appid, functions.config().algolia.adminkey);
const index = algolia.initIndex('ingredients');

export const syncIngredients = functions.firestore.document('/<CollectionName>/{id}').onWrite(
  (change, context) => {
    return syncAlgoliaWithFirestore(index, change, context)
  }
);
```

## TODOs:

- interfaces and strong typing
-