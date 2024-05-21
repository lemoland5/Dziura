# Database schema for users

database `dziura`, collection `users`


```ts
{
  "_id": ObjectID, // mongodb builtin type for unique IDs
  "username": string, // unique username
  "created": number, // UNIX timestamp - date of creation
  "email": string, // e-mail address
  "password":{ // secure authentication data
    "hash": string, // SHA256 hash of the password + the salt
    "salt": string // salt used for this user
  },
  "social_links":[ // array of social links
    {
      "type": string, // name of linked social media
      "content": string, // url of link
      "image": string|undefined // image URL, if any.
    }  
  ],
}
```

