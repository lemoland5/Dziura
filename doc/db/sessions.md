# Database schema for sessions

database `dziura`, collection `sessions`


```json
{
  "_id": ObjectID,
  "user": ObjectID,
  "start": number,
  "expires": number,
  active: boolean
}
```

