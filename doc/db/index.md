# Database schema

## Collections:
( collection schemas in TypeScript interface type notation )
- [`users`](./users.md)
- [`sessions`](./sessions.md)
- [`requests`](./requests.md)
- [`offers`](./offers.md)
- [`notes`](./notes.md)
- [`subjects`](./subjects.md)


## Global assumptions
- dates are stored as `number` since they are milisecond UNIX timestamps - `Date.now()/1000`
- IDs are stored as `mongodb.ObjectID`
- relations are rarely needed, since mongoDB is **not a relational database**

