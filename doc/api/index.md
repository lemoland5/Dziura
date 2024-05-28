# API documentation

The API is accessible at `/api/*`, with all request routes signed in as `/*` in `../../Server/routes/`

## Metods:
- [`/api/login`](./login.md)
- [`/api/signup`](./signup.md)
- [`/api/requests`](./requests.md)


## Example use case -> for frontend developers
1. User logs in using `/api/login`
2. User posts a request using `/api/requests`
3. On user page get user data including user id using `/api/user` you can use `/api/request/id/<id>` to get the requests user has posted, or `/api/offers/id/<id>` to get the offers user has posted

