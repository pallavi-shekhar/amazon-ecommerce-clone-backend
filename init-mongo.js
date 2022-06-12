function seed(dbName, user, password) {
    db = db.getSiblingDB(dbName);
    db.createUser({
      user: user,
      pwd: password,
      roles: [{ role: 'readWrite', db: dbName }],
    });
  
    db.createCollection('api_keys');
    db.createCollection('roles');
  
    db.api_keys.insert({
      metadata: 'To be used by the xyz vendor',
      key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      version: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    db.roles.insertMany([
      { code: 'BUYER', status: true, createdAt: new Date(), updatedAt: new Date() },
      { code: 'SELLER', status: true, createdAt: new Date(), updatedAt: new Date() },
      { code: 'ADMIN', status: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  }
  
  seed('e-commerce-db', 'e-commerce-db-user', 'commerce');
  