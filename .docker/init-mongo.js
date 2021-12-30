db.createUser({
    user: 'harry',
    pwd: 'rootroot',
    roles: [
        { role: 'readWrite', db: 'admin' },
        { role: 'readWrite', db: 'supermarket' }
    ]
})