---
marp: true
class: invert
footer: 'Databases'
headingDivider: 4
math: katex
paginate: true
style: |
  section::after {
    font-size: 16px;
  }
theme: default
---

<style>
  pre {
    line-height: 1.5;
  }
  section.smaller h3 {
    color: #fafafa;
    font-size: 36px;
    height: 100vh;
    display: flex;
    align-items: flex-end;
  }
  section.center-title h1 {
    color: #fafafa;
    text-align: center;
  }
</style>

- [IDM364: Working With Databases](#idm364-working-with-databases)
- [Lesson Objectives](#lesson-objectives)
- [Understanding databases](#understanding-databases)
  - [Database advantages](#database-advantages)
- [Types of databases](#types-of-databases)
  - [Relational Databases](#relational-databases)
  - [NoSQL Databases](#nosql-databases)
  - [In-Memory Databases](#in-memory-databases)
- [Understanding CRUD](#understanding-crud)
  - [CREATE](#create)
  - [READ](#read)
  - [UPDATE](#update)
  - [DELETE](#delete)
- [Database Scheme](#database-scheme)
  - [**Users** Table:](#users-table)
  - [**Posts** Table:](#posts-table)
  - [Database Normalization](#database-normalization)
- [Interact with a database](#interact-with-a-database)
  - [Database Selection and Connections](#database-selection-and-connections)
  - [Additional important topics](#additional-important-topics)

# IDM364: Working With Databases

# Lesson Objectives

* Understand what a database is and why it's important in application
* Learn about the different types of databases
* Understand the concept of CRUD
* Learn how to design a database schema
* Learn how to interact with a database

# Understanding databases

<!-- The first objective is to understand what a database is and why it's important in application development. -->

<!-- A **database** is a structured set of data. It's essentially a place where data can be stored and manipulated effectively. May it be storing user data, product information, transactions, or any system-related information, databases play a crucial role in modern software applications. -->

<!-- Databases help manage large quantities of data efficiently. Large scale operations like searching, sorting, indexing, updating or deleting data are significantly faster and easier to perform on a database as compared to traditional file systems. -->

## Database advantages

<!-- Databases also provide advantages such as: -->

1. Data Integrity
2. Concurrency Control
3. Security
4. Relationships

<!-- **Data Integrity**: Databases enforce rules for data validation and integrity. This reduces the chances of data inconsistency and duplication. For example, you can enforce that an email column in a users table should always be unique, preventing user duplication. -->

<!-- **Concurrency Control**: Databases manage access from multiple users to the same data, ensuring data consistency and correctness. For example, multiple users making a booking for the same hotel room at the same time. The database ensures only one user succeeds. -->

<!-- **Security**: Databases offer security features to protect data, including access control, backup and recovery options. -->

<!-- **Relationships**: Databases allow one to define relationships between different data items. These relationships enable us to retrieve and combine data from different parts of the database in a more flexible manner than would be possible otherwise. -->

<!-- In **application development**, databases hold the data that drives the application. This could include user account information, application settings, user-generated content, and more. When a user uses an application, they're creating, reading, updating, and deleting data from these databases. -->

# Types of databases

<!-- The second objective is to learn about the different types of databases: Relational Databases, NoSQL Databases, and In-Memory Databases. -->

## Relational Databases

<!-- **Relational Databases** are the most commonly used type of database. They store data in tables, and each table has one or more columns and rows. The tables are interrelated, meaning you can link data from one table to another. Examples of relational databases include MySQL, PostgreSQL, and Oracle. -->

<!-- Key concepts in relational databases include: -->

1. Tables
2. Columns and Rows
3. Primary Key
4. Foreign Key
5. SQL (Structured Query Language)

<!-- *Tables*: A table is a collection of entries (data). Each entry constitutes a row that includes certain information about a specific entity. -->

<!-- *Columns and Rows*: Tables are composed of columns (fields) and rows (records). Each row in a table represents a set of related data, and every row in the table has the same structure. -->

<!-- *Primary Key*: It's a unique identifier for a record in the table. No two records can have the same primary key. -->

<!-- *Foreign Key*: It's used to link two tables together. -->

<!-- *SQL (Structured Query Language)*: It's a programming language used to communicate and manipulate relational databases. -->

## NoSQL Databases

<!-- **NoSQL Databases** don't use the tabular schema of SQL databases. They are used when dealing with a large set of distributed data. NoSQL databases include MongoDB, Cassandra, and Google Cloud BigTable. -->

<!-- There are four main types of NoSQL databases: -->

1. Document databases
2. Key-value stores
3. Wide-column stores
4. Graph databases

<!-- *Document databases* pair each key with a complex data structure known as a document. Documents can contain many different key-value pairs, or key-array pairs. MongoDB is a good example. -->

<!-- *Key-value stores* are the simplest NoSQL databases. Every single item in the database is stored as an attribute name (or key), together with its value. Redis and Riak are examples of key-value stores. -->

<!-- *Wide-column stores* such as Cassandra and HBase are optimized for queries over large datasets, and store columns of data together, instead of rows. -->

<!-- *Graph databases* such as Neo4j and Amazon Neptune are used to store data whose relations are best represented in a graph. -->

## In-Memory Databases

<!-- **In-Memory Databases** hold the entire dataset in memory. This significantly speeds up data retrieval times, making these databases ideal for applications that require real-time processing of high volumes of data. Examples include Redis and Apache Ignite. -->

<!-- Database choice influences how you build your application, and depends on the product requirements. It's not about one database type being better than the other, but more about suitably matching the database to specific use-cases and requirements. Understanding the different types of databases allows you to make educated decisions depending on the layout and requirements of the data your application will be handling. -->

# Understanding CRUD

<!-- Our next objective focuses on understanding the concept of CRUD (Create, Read, Update, Delete) operations in the context of databases. -->

<!-- These four operations correspond to the four basic functions that a database should be able to perform: create data, read data, update data, and delete data. -->

## CREATE

<!-- **Create** involves creating or adding new data entries into the database. This is commonly achieved with the SQL command `INSERT`. -->

```sql
INSERT INTO Users (name, email)
VALUES ('John Doe', 'john.doe@example.com');
```

## READ

<!-- **Read** involves reading or retrieving existing data from the database. This is usually done using the `SELECT` command. -->

```sql
SELECT * FROM Users;
```

## UPDATE

<!-- **Update** involves making changes to existing data. For example, this could involve changing a user's email address. The `UPDATE` command is used in SQL. -->

```sql
UPDATE Users
SET email = 'new.email@example.com'
WHERE name = 'John Doe';
```

## DELETE

<!-- **Delete** involves removing existing data from the database. You might delete data for various reasons, perhaps the data is no longer needed or it's become outdated. The `DELETE` command is used. -->

```sql
DELETE FROM Users WHERE name = 'John Doe';
```

<!-- These four basic operations are the foundation of interacting with any stored data. No matter how complex the system, these operations are the core of any database management system. -->

<!-- It’s important to note, each database type might use different syntax or method names for performing CRUD operations. However, the underlying concepts remain the same. The idea is always about manipulating data in these four key ways, whether it's in a relational database (like MySQL or PostgreSQL), a NoSQL database (like MongoDB), or even an in-memory database (like Redis). -->

<!-- Understanding these operations enables developers to build applications that can efficiently store, retrieve, and manipulate data. The ability to perform CRUD operations is fundamental when interacting with any database. -->

# Database Scheme

<!-- Next let's look at designing a database schema and understanding the principles of data normalization. -->

<!-- A **database schema** is an abstract design that represents the storage of your data in a database. It describes both how the data is organized and how its relationships are enforced. When you're initially setting up a database, you'll need to define this schema - i.e., you'll have to define the tables, fields, relationships, indexes, and other database elements. -->

<!-- Here's a simple example of a possible schema for a blog: -->

## **Users** Table:

| userID (PK) | username | password |
| ----------- | -------- | -------- |
| 1           | JohnDoe  | abc123   |

<!-- In the **Users** table, the `userID` column is the primary key (PK), meaning it uniquely identifies each record. -->

## **Posts** Table:

| postID (PK) | userID (FK) | title   | content |
| ----------- | ----------- | ------- | ------- |
| 1           | 1           | My Post | ...     |

<!-- The **Posts** table has a `postID` primary key, and also a `userID` foreign key (FK) which creates a relationship between a post and the user who created it. -->

## Database Normalization

<!-- **Data Normalization** is a systematic way of ensuring that a database structure is suitable for general-purpose querying and free of certain undesirable characteristics—insertion, update, and deletion anomalies—that could lead to a loss of data integrity. -->

<!-- There are several normal forms each with increasing level of normalization: -->

- First normal form (1NF)
- Second normal form (2NF)
- Third normal form (3NF)
- Boyce-Codd normal form (BCNF), Fourth normal form (4NF), Fifth normal form (5NF)

<!-- **First normal form (1NF)**: Each table cell should have a single value. No group of data within a data column. -->

<!-- **Second normal form (2NF)**: All non-key attributes should be fully functional dependent on the primary key. -->

<!-- **Third normal form (3NF)**: All non-key attributes should not depend on other non-key attributes. -->

<!-- **Boyce-Codd normal form (BCNF), Fourth normal form (4NF), Fifth normal form (5NF)**: Address more complex scenarios and are less commonly applied, but they're available for more complex normalization requirements. -->

<!-- The primary value of normalization is it helps reduce data redundancy and improve data integrity. However, there might be scenarios where normalization to the higher degrees is unnecessary and may even be detrimental to performance due to the -->

# Interact with a database

<!-- Interacting with databases is a fundamental aspect of software development, especially in backend development and data analysis. Most interactions involve using a programming language in conjunction with SQL or a database-specific API. This often involves the use of a Database Management System (DBMS) which acts as an interface between the databases and the user or the application. -->

<!-- Let's look at a few basic ways in which we interact with databases. -->

## Database Selection and Connections

<!-- **Database Selection and Connections**: Interactions start with choosing the right database for your application based on requirements, followed by establishing a connection. Different programming languages and frameworks have different ways of connecting to databases, but in general, a connection string or a pool of connections is established that can be used to run queries. -->

---

<!-- For instance, connecting to a PostgreSQL database in Node.js might look like this: -->

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
});

pool.query('SELECT * FROM Users', (error, results) => {
 if (error) throw error;
 console.log(results.rows);
});
```

---

```php
<?php
$server_name = "localhost";
$username = "database_username";
$password = "database_password";
$db_name = "database_name";

$conn = new mysqli($server_name, $username, $password, $db_name);

if ($conn->connect_error)
  die("Connection failed: " . $conn->connect_error);

$sql = "SELECT * FROM Users";
$stmt = $conn->prepare($sql);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
  // ...
?>
```

<!-- Let's look at some examples of database interactions. -->

<!-- [07-nodejs-apis](../../examples/07-databases/07-nodejs-apis.md) -->
<!-- [07-mysql](../../examples/07-databases/07-mysql.md) -->
<!-- [07-postgres](../../examples/07-databases/07-postgres.md) -->

## Additional important topics

- Database security
- SQL injection prevention

<!-- It's critical to understand the basics of database security, including SQL injection attacks and how to prevent them. We're not covering these topics in detail, but you should research and learn about these concepts. -->
