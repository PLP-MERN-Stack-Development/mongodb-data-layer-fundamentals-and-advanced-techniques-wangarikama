const { MongoClient } = require("mongodb");
// your MongoDB connection string
const uri = 'mongodb+srv://ckme:Stat5050@cluster0.pezgv6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'plp_bookstore';
const collectionName = 'books';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // 1️⃣ CREATE
    const newBook = { title: "Red Hat", author: "Alvin", year: 2025 };
    await books.insertOne(newBook);
    console.log("✅ Inserted a new book");

    // 2️⃣ READ
    const allBooks = await books.find().toArray();
    console.log("📚 All books:", allBooks);

    // 3️⃣ UPDATE
    await books.updateOne(
      { title: "Red Hat" },
      { $set: { author: "Alvin Macharia" } }
    );
    console.log("✏️ Updated the book");

    // 4️⃣ DELETE
    await books.deleteOne({ title: "Red Hat" });
    console.log("🗑️ Deleted the book");

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();