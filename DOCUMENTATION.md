# Document API Documentation

## Base URL

`/api/v1/documents`

---

## 1. Upload Document

**POST** `/api/v1/documents/upload`

Uploads an image file to Cloudinary and saves its metadata to the database.

### Request Headers

- `Authorization: Bearer <token>` (required)

### Request Body (form-data)

| Key   | Type | Description                                    |
| ----- | ---- | ---------------------------------------------- |
| file  | File | The image file to upload (jpg, jpeg, png, gif) |
| title | Text | The title of the image                         |

### Response

- **200 OK**

```
{
  "message": "Document uploaded successfully",
  "document": {
    "_id": "...",
    "title": "...",
    "link": "<Cloudinary URL>",
    "uploadedBy": "<userId>",
    ...
  }
}
```

- **400 Bad Request**: Missing file or title
- **401 Unauthorized**: Missing/invalid token
- **413 Payload Too Large**: File exceeds 10MB

---

## 2. Get All Documents

**GET** `/api/v1/documents/`

Returns all documents in the database.

### Request Headers

- `Authorization: Bearer <token>` (required)

### Response

- **200 OK**

```
{
  "documents": [ ... ],
  "count": 5
}
```

---

## Notes

- All endpoints require authentication.
- File uploads are limited to 10MB.
- Only jpg, jpeg, png, and gif files are allowed.
- The `title` field must be provided in the form-data.
