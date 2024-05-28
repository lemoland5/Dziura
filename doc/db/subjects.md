# Database schema for subjects

database `dziura`, collection `subjects`


```ts
{
  "_id": ObjectID, // mongodb builtin type for unique IDs
  "name": string, // name of the school subject, must be unique, will be indexed
  "description": string|undefined, // optional description
  "image": string|undefined, //optional image URL
  "topics": { // array of lesson topics allowed within this subject
    "_id": ObjectID, // mongodb builtin type for unique IDs
    "name": string, // name of the topic
    "description": string|undefined, // optional description
    "image": string|undefined, //optional image URL
  }[]
}
```

