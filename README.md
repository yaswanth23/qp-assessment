# qp-assessment
Grocery Booking API

## To run the application locally, follow the below steps.

1. Setting up the database:
   You need to provide the database connection details in .env and .env.development files in the root directory of the project. Here's a sample of what it should look like:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

The application uses Prisma ORM for database management. To generate the necessary tables in your PostgreSQL database, execute the following command:

```bash
npx prisma migrate dev --name init_creating_tables_in_db
```

After the successful execution of the above command, run the following command to deploy the migrations:

```bash
npx prisma migrate deploy
```

After deploying the migrations, generate the Prisma Client with the following command:

```bash
npx prisma generate
```

2. Running the app:
   Install all the required dependencies using the following command:

```bash
$ npm install
```

After all dependencies are successfully installed, start the application in development mode with the following command:

```bash
# development
$ NODE_ENV=development npm run start:dev
```