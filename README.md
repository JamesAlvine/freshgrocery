
# freshgrocery

This is a simple web app for shopping groceries online.

This repo contains both frontend and backen:

### backend
this has all the database functionalities

### frontend
this contains all the fronend/ui 



## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


## Frontend Deployment

To deploy this project run

```bash
  npm run deploy
```


## Contributing

Contributions are always welcome!



## Author

- [@JamesAlvine](https://www.github.com/JamesAlvine)

