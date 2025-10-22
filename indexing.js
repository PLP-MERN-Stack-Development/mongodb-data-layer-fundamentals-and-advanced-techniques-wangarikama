 require('dotenv').config();

 //indexing.js
const { MongoClient } = require('mongodb');

 // your MongoDB connection string
const uri = process.env.MONGO_URI;
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // 1. Index on title
    await books.createIndex({ title: 1 });
    console.log('\nCreated index on title');

    // 2. Compound index on author and published_year
    await books.createIndex({ author: 1, published_year: -1 });
    console.log('Created compound index on author and published_year');

    // 3. Use explain() to check performance
    const explainResult = await books.find({ title: '1984' }).explain('executionStats');
    console.log('\nExplain result for title search:', explainResult.executionStats.executionTimeMillis, 'ms');

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

run();