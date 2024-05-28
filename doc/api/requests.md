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
## GET `/api/requests`
### URL query params
- `limit`: the number of items in a page, default `5`
- `page`: page number, default `0`
### Response \[success]
Returns raw `request` [schema](../db/requests.md)


## GET `/api/requests/id/<id>`
Retrieve request number `<id>`
### Response \[success]
Returns raw `request` [schema](../db/requests.md)
