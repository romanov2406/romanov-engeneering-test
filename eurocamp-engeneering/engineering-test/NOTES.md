
Key Improvements and Best Practices
1. Data Integrity and Primary Keys
   The project uses UUIDs as primary keys for all entities. UUIDs provide globally unique identifiers, which support scalability across distributed systems. The primary key for each entity is generated automatically using the UUID strategy. For example, the id field of each entity is generated using
   **@PrimaryGeneratedColumn('uuid') id!: string;**.

2. Cascading Rules for Referential Integrity
   The Bookings table references the Users and Parcs tables using foreign keys. Cascading rules are applied for onDelete operations to ensure that when a User or Parc is deleted, the corresponding records in the Bookings table are also removed, preventing orphaned records. For example:

    **@ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user!: User;**

    **@ManyToOne(() => Parc, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parc' })
    parc!: Parc;**

3. Indexing for Improved Query Performance
   Frequently queried fields like user and parc are indexed in the Bookings table. Indexing these columns reduces query time, especially for large datasets, by allowing the database to quickly locate the rows. For example:

   **@Index('user_index', ['user']) (Indexing foreign key for user)
     @Index('parc_index', ['parc']) (Indexing foreign key for parc)**

4. Optimized Querying
   Instead of querying all columns from the database, only the required fields are selected. This reduces data transfer and improves query performance. When querying the Users and Parcs tables, only relevant fields like id, name, and email are retrieved. For example:

    When querying the Users table, only id, name, and email are selected.
    When querying the Parcs table, only id, name, and description are selected.
    For optimized querying, instead of selecting all columns, the following method is used:

    createQueryBuilder('user') selects only the necessary fields **(user.id, user.name, user.email)**.
    createQueryBuilder('parc') selects only the necessary fields **(parc.id, parc.name, parc.description)**.

5. Redis Caching
   Redis is used for in-memory caching to speed up frequently accessed data and reduce the load on the PostgreSQL database. Commonly requested data, such as Users or Parcs, is cached in Redis to improve response times for repeated queries. For example:

    Before querying the PostgreSQL database, check if the data is available in Redis.
    If the data is not in Redis, query the database and then store the result in Redis for future use.
    Use Redis' set and get commands for storing and retrieving data.
    For example:
    **redisClient.get('user:id')** retrieves a cached user by id.
    **redisClient.set('user:id', JSON.stringify(user))** caches a user by id in Redis.

6. Modular Structure
   The application is organized into separate modules for Users, Parcs, and Bookings. This modular design improves scalability and maintainability, allowing each module to evolve independently without affecting the others. For example:

    The UserModule will import the UserModel and provide necessary services and controllers to manage users.
    Similarly, the ParcModule will manage the ParcModel entities, and the BookingModule will manage bookings.
