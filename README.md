# Mini Order Status Tracker ( Backend Service )

### Objective

Build a minimal application where users can:

- View a list of fulfillment orders, including Order ID, Customer Name, and Status.

### Tools Used

- Typescript: For strong typing
- Express.js: For building the backend API
- Prisma ORM: For interacting with the PostgreSQL database
- PostgreSQL: Database for storing the order data

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_NAME`: e.g. "order_status_tracker"
`NODE_ENV`
`PORT`
`DATABASE_URL`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Start the server in development mode

```bash
  yarn start:dev
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```
