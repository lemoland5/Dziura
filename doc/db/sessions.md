# Database schema for sessions

database `dziura`, collection `sessions`


```ts
{
  "_id": ObjectID,
  "user": ObjectID,
  "start": number,
  "expires": number,
  "active": boolean
}
```

