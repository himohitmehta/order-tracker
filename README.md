# Order Tracker

A minimal application built with Next.js, tRPC, Typescript, Zod, React Query, React table, Tailwind CSS, Shadcn UI, Prisma and PostgreSQL (Neon for deploying db), and Vercel for application deployment.

## Features:

- View list of orders with details like order id, order date, customer name, email, address, order line items, fulfillment status, and total amount.
- Filter data based on customer name, email, status, and date range.
- Sort data based on the order date. (you can sort the visible list as per the total amount)
- Paginated list of orders.
- Change the rows visible per page.

## How to run the app:

- Clone the repository.
- Run `pnpm install` to install the dependencies.
- Run `pnpm dev` to start the development server.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to run the app in production mode:

- Run `pnpm build` to build the app.
- Run `pnpm start` to start the production server.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Connect with Database:

- Create a `.env` file in the root directory.
- Add the following environment variables in the `.env` file:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/order-tracker"
```

- Replace the `password` with your PostgreSQL password.
- Run the following command to generate the Prisma client:

```bash
pnpm prisma generate

or

pnpm db:generate
```

- Run the following command to push the schema to the database:

```bash
pnpm prisma db push

or

pnpm db:push
```

## known issues:

- Sometimes the data doesn't load properly after resetting the filters. (Need to refresh the page to load the data properly)
- Sometimes the paginated data doesn't work properly with the queries.
- On Refreshing the page, the app starts from the page 1, need to sync the page number with pagination as well.

## Demo:

Demo Video: [https://drive.google.com/drive/folders/17M6jAXxgKGnkUkOJSPE6mEoe3tBX_fjf?usp=drive_link](https://drive.google.com/drive/folders/17M6jAXxgKGnkUkOJSPE6mEoe3tBX_fjf?usp=drive_link)

Deployed URL: [https://tracker.himohit.me/](https://tracker.himohit.me/)

Video:[https://drive.google.com/file/d/1wxDxDwk5MiZBYDiTpM1XRYHyUhOt5VD8/view?usp=drive_link](https://drive.google.com/file/d/1wxDxDwk5MiZBYDiTpM1XRYHyUhOt5VD8/view?usp=drive_link)
