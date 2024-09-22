https://morayodeji.medium.com/building-nodejs-api-without-expressjs-or-any-other-framework-977e8768abb1

https://blog.omarfaroque.com/solid-code-in-nodejs-a87685b4cdfe


 both Pool and Client are used to interact with a PostgreSQL
 1. Client
Single Connection: The Client represents a single connection to the database. Every time you instantiate a Client and connect to the database, it opens a new connection.
Manual Management: You need to manually open (client.connect()) and close (client.end()) the connection each time you perform a query.
Use Case: The Client is ideal for short-lived tasks or when you want complete control over a single database connection.

2. Pool
Connection Pooling: The Pool maintains a pool of database connections that are reused across multiple queries. This avoids the overhead of constantly opening and closing connections.
Automatic Management: The Pool manages the connections automatically. It opens a new connection if needed and reuses idle connections, making it more efficient for handling multiple database requests.
Use Case: The Pool is suitable for applications that need to handle many database requests simultaneously, like web servers where multiple clients are making requests to the database.