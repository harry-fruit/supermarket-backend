db.createUser({
    user: 'harry',
    pwd: 'rootroot',
    roles: [
        {
            role: 'readWrite',
            db: 'supermarket',
        },
    ],
});

//this is a refference to 'use <db_name>'
db = new Mongo().getDB("supermarket");

db.createCollection('users', { capped: false });
db.createCollection('products', { capped: false });