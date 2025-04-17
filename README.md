# cushon retail investment scenario

This is a demo app to showcase a web-based React app that allows retail customers to invest in various funds.

## What I've implemented

- A demo database using IndexedDB
- A login flow that uses real data
- A flow for selecting a (or multiple) fund(s) to invest in (using test data)
- Hooks to retrieve and add data to the database 
- Some SCSS mixins for common components like buttons

## What I've not implemented

- UI for various things - like viewing investments and signup
- Hooks for database operations for investments, funds, and individual investments into funds
- Hashing and salting passwords! They're stored in plaintext :<
- Error handling in some places
- Quite a lot of CSS to make it look pretty

## Database structure

This is the entity relationship diagram of the data required for this application:

![ER Diagram](docs/entity_relationship.svg)

Normalising the many-to many relationship between a fund and an investment produces the following tables.

| User     | ISA      | Investment | Fund | Fund Investment |
| -------- | -------- | ---------- | ---- | --------------- |
| ID       | ID       | ID         | ID   | ID              |
| username | name     | date       | name | fund_id         |
| password | owner_id | isa_id     |      | investment_id   |
|          |          |            |      | amount          |

As a demonstration I implemented the database using the client-side indexedDB, accessible in a hook `useDB`. A real client-side app would not do this, and would instead implement the CRUD operations in their own hooks - so this is what's implemented. For users and ISAs, there are each hooks to retrieve data or to get a `Promise` for adding data. 