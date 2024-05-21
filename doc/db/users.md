# Database schema for users

database `dziura`, collection `users`


```json
{
  "_id": ObjectID,
  "username": string,
  "email": string,
  social_links:[
    {
      "type": string,
      "content": string
    }  
  ],
  "star_average":number
}
```

