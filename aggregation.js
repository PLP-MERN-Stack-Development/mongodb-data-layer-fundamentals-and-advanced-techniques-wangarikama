require('dotenv').config();

// aggregation.js
const { MongoClient } = require('mongodb');

// your MongoDB connection string
const uri = process.env.MONGO_URI;
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const books = db.collection(collectionName);

   // 1. Average price by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
    ]).toArray();
    console.log('\nAverage price by genre:', avgPriceByGenre);

    // 2. Author with the most books
    const mostBooksByAuthor = await books.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('\nAuthor with most books:', mostBooksByAuthor);

    // 3. Group by publication decade and count
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: { $floor: { $divide: ['$published_year', 10] } },
          totalBooks: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]).toArray();
    console.log('\nBooks grouped by decade:', booksByDecade);
    } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

run();
