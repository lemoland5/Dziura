# Database schema for requests

database `dziura`, collection `requests`

```ts
{
  "_id": ObjectID, // ID of request
  "user": ObjectID, // who posted it
  "created": number, // UNIX timestamp - date of creation
  "title": string, // title of the request
  "subject": string, // school subject, must be one of the available subjects, is checked on backend
  "topic": ObjectID|undefined, // optional topic ID
  "content": string, // content of the request, as typed by user
  "attachments":{
      "filename": string, // name of the attachment
      "url": string, // URL of attachment after uploading
      "embed": "image"|"video"|null, // should it be embedded in the webpage as a preview or not
      "mimetype": string, // MIME type of the uploaded file
  }[],
  "comments": {
    "author": ObjectID, // original author
    "content": string, // contents as string
    "created": number, // UNIX timestamp of creation
    "votes":{
      "up": number, // upvotes (or "likes")
      "down": number, // downvotes (or "dislikes")
    }
  }[],
  "ratings": {
    "author": ObjectID, // who gave the rating, might not be necessary
    "rating": number, // number of points awarded or stars rated
  }
}
```

