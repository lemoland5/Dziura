# `/api/requests` subrouter

## POST `/api/requests`
Add a request
### Request
```ts
{
  "title": string,
  "subject": string,
  "topic": string,
  "content": string,
}
```
### Cookies
- `session`: `mongodb.ObjectID`, session identifier

### Response \[success]
```ts
{
  "message": string,
  "id": ObjectID,
}
```

