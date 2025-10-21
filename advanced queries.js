// advanced-queries.js
const { MongoClient } = require('mongodb');

// your MongoDB connection string
const uri = 'mongodb+srv://ckme:Stat5050@cluster0.pezgv6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const books = db.collection(collectionName);

     // 1. Books in stock and published after 2010
    const inStockRecent = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log('\nBooks in stock and published after 2010:', inStockRecent.length);

    // 2. Projection (title, author, price)
    const projection = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log('\nProjection (title, author, price):', projection.length);

    // 3. Sorting by price ascending
    const ascending = await books.find().sort({ price: 1 }).toArray();
    console.log('\nBooks sorted by price (ascending):', ascending.length);

    // 4. Sorting by price descending
    const descending = await books.find().sort({ price: -1 }).toArray();
    console.log('\nBooks sorted by price (descending):', descending.length);

    // 5. Pagination (5 books per page, skip first 5)
    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log('\nPagination (page 2, 5 books):', page2.length);
    } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

run();
