
 - The Bookings table uses foreign keys to reference Users and Parcs, which helps maintain data integrity.
  UUIDs are used as primary keys for all entities, supporting scalability and ensuring uniqueness across distributed systems.
  While the structure is generally good, there are areas for improvement to enhance efficiency, scalability, and maintainability.

   @PrimaryGeneratedColumn('uuid')
   id!: string;

   
 - The Bookings table already uses foreign keys to link to the Users and Parcs tables. However, adding cascading rules for updates and deletes would further strengthen referential integrity:
   Cascading Deletes/Updates: Ensures that when a User or Parc is deleted or updated, the changes are automatically reflected in the Bookings table, which prevents orphaned records.
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user!: User;

    @ManyToOne(() => Parc, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parc' })
    parc!: Parc;


 - Indexing is critical for improving query performance, particularly in the Bookings table. Foreign keys like user and parc are frequently queried, so they should be indexed to optimize performance.
   @Index('user_index', ['user'])  // Indexing foreign key for user
 
   @Index('parc_index', ['parc'])  // Indexing foreign key for parc 


 - Instead of querying all columns from the database, it's beneficial to fetch only the required fields. This reduces the amount of data transferred and improves performance.
   The service layer can be optimized by ensuring that only the necessary fields are fetched from the database, reducing memory usage and improving performance. For example, when querying the Users or Parcs tables, only relevant fields such as id, name, and email should be retrieved.
 
 - Currently, all entities are bundled within a single module, which may work for small applications. However, as the application grows, it's advisable to break it into separate modules for better scalability and maintainability, 
   Each entity (Users, Parcs, and Bookings) should have its own module, controller, service, and model. This modular approach would allow each part of the application to evolve independently without impacting the other parts, making the codebase easier to manage and scale.
