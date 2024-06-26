# phoneBookApp

Helsingin Yliopiston Full Stack Open submission repository. PhoneBook App with a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. Deployment to the Internet is included. 

## Note on MongoDB Cluster

>This application is currently using a shared MongoDB cluster for development environments and low-traffic applications. Shared clusters have some limitations and are not recommended for high-traffic applications. They are also not optimized for performance, which can result in slower response times.

>As a result, you may experience a delay when the application is loading data, especially at the beginning. This is expected behavior given the current setup and not a bug in the application.

>For a production application, it is recommended to use a dedicated MongoDB cluster to ensure optimal performance.

## Tech & Tools 

- Vite + React
- Node.js
- Express.js
- MongoDB
- IntelliJ
- Postman
- Render

## Deployment on Render

![Status](https://img.shields.io/badge/render-published-darkgreen.svg)

### Frontend - frontend:

- [Static page:](https://vickneee-phonebookapp.onrender.com/)
  
- Add Environment Variables

### Backend - backend:

- [Web Service:](https://phonebook-backend-cmob.onrender.com/)

- Add Environment Variables

## Backend API EndPoints

**GET GET Home Page**

```bash
{{baseURL}}/
```

This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1).

A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.

﻿
**GET GET Info**

```bash
{{baseURL}}/api/info
```

This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1).

A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.

﻿
**GET GET All Persons**

```bash
{{baseURL}}/api/persons
```

This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1).

A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.

﻿
**GET GET a Person By ID**

```bash
{{baseURL}}/api/persons/66006cd621e429870e9d11d2
```

This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have id=1).

A successful GET response will have a 200 OK status, and should include some kind of response body - for example, HTML web content or JSON data.

﻿**POST ADD a Person**
 
```bash
{{baseURL}}/api/persons
```

This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.

A successful POST request typically returns a 200 OK or 201 Created response code.

- **Body**

```json
{
    "name": "Teet Sukk",
    "number": "04045679877"
}
```

**PUT UPDATE a Person**

```bash
{{baseURL}}/api/persons/660094f8e59af5e2816c663c
```

This is a PUT request and it is used to overwrite an existing piece of data. For instance, after you create an entity with a POST request, you may want to modify that later. You can do that using a PUT request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1).

A successful PUT request typically returns a 200 OK, 201 Created, or 204 No Content response code.

- **Body**

```json
{
    "name": "Janne Saar",
    "number": "04066666666"
}
```

**DELETE** **DELETE a Person By ID**

```bash
{{baseURL}}/api/persons/66008ac333a19a5bc835edb7
```

This is a DELETE request, and it is used to delete data that was previously created via a POST request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1).

A successful DELETE request typically returns a 200 OK, 202 Accepted, or 204 No Content response code.

