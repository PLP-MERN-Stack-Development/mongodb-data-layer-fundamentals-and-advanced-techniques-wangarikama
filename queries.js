require('dotenv').config();

// queries.js
const { MongoClient } = require('mongodb');

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

    // 1. Books in a specific genre
    console.log('\nBooks in Fiction genre:');
    console.log(await books.find({ genre: 'Fiction' }).toArray());

    // 2. Books published after 1950
    console.log('\nBooks published after 1950:');
    console.log(await books.find({ published_year: { $gt: 1950 } }).toArray());

    // 3. Books by George Orwell
    console.log('\nBooks by George Orwell:');
    console.log(await books.find({ author: 'George Orwell' }).toArray());

    // 4. Update price of 1984
    console.log('\nUpdating price of 1984...');
    await books.updateOne({ title: '1984' }, { $set: { price: 15.99 } });
    console.log(await books.findOne({ title: '1984' }));

    // 5. Delete Moby Dick
    console.log('\nDeleting "Moby Dick"...');
    await books.deleteOne({ title: 'Moby Dick' });
    console.log('Deleted successfully');

    // 6. Books in stock and published after 2010
    console.log('\nBooks in stock and published after 2010:');
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    // 7. Projection (title, author, price)
    console.log('\nTitle, author, and price only:');
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    // 8. Sorting
    console.log('\nBooks sorted by price (ascending):');
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log('\nBooks sorted by price (descending):');
    console.log(await books.find().sort({ price: -1 }).toArray());

    // 9. Pagination (5 books per page)
    console.log('\nPage 1:');
    console.log(await books.find().limit(5).toArray());

    console.log('\nPage 2:');
    console.log(await books.find().skip(5).limit(5).toArray());

    // 10. Aggregation: average price by genre
    console.log('\nAverage price by genre:');
    console.log(await books.aggregate([
      { $group: { _id: '$genre', averagePrice: { $avg: '$price' } } }
    ]).toArray());

    // 11. Aggregation: author with most books
    console.log('\nAuthor with most books:');
    console.log(await books.aggregate([
      { $group: { _id: '$author', totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray());

    // 12. Aggregation: books by decade
    console.log('\nBooks grouped by publication decade:');
    console.log(await books.aggregate([
      {
        $group: {
          _id: { $concat: [{ $toString: { $multiply: [{ $floor: { $divide: ['$published_year', 10] } }, 10] } }, 's'] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray());

    // 13. Indexing
    console.log('\nCreating index on title...');
    await books.createIndex({ title: 1 });
    console.log('Index created on title');

    console.log('\nCreating compound index on author and published_year...');
    await books.createIndex({ author: 1, published_year: 1 });
    console.log('Compound index created');

    // 14. Explain performance
    console.log('\nExplain query performance for title search:');
    console.log(await books.find({ title: '1984' }).explain('executionStats'));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

runQueries();

