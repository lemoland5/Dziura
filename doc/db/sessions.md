# Database schema for sessions

database `dziura`, collection `sessions`


```ts
{
  "_id": ObjectID, // ID of the session, will be saved as cookie client-side.
  "user": ObjectID, // whose session is this
  "start": number, // start timestamp of the session
  "expires": number, // expiration date of the session
}
```

