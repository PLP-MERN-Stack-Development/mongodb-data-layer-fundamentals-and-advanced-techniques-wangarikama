README.md
PLP Bookstore - MongoDB Assignment
Overview

This project demonstrates how to use MongoDB for database operations.
It covers database setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.

All scripts connect to a MongoDB Atlas cluster using Node.js.

Files Included
File	Description
insert_books.js	Inserts sample book data into the database
queries.js	Contains CRUD and advanced MongoDB queries
aggregation.js	Aggregation pipeline examples
indexing.js	Index creation and performance tests
compass_screenshot.png	Screenshot showing the database and collections
README.md	Instructions on setup and usage
Requirements

Before running any script, make sure you have:

Node.js (v18 or higher)

MongoDB Atlas account (or local MongoDB setup)

Internet connection

Installed dependencies

Installation Steps

Clone your repository

git clone <your-repo-link>
cd plp_bookstore


Install dependencies

npm install mongodb


Set up your MongoDB connection

Open any script (e.g., insert_books.js)

Replace <db_password> in the URI with your real MongoDB Atlas password

How to Run the Scripts
1. Insert Sample Books

Run this to populate your database:

node insert_books.js


You should see:

Connected to MongoDB server
12 books were successfully inserted into the database

2. Run Queries

This file performs basic CRUD and advanced queries:

node queries.js

3. Aggregation Pipelines

Run data analysis pipelines:

node aggregation.js

4. Indexing

Run indexing operations to test performance:

node indexing.js

Screenshot

Below is the screenshot of the books collection in MongoDB Compass:

Author

Cathy Kamau
MongoDB Fundamentals - PLP Program
>>>>>>> 309f040 (Added MongoDB setup, CRUD, aggregation, and indexing scripts)
