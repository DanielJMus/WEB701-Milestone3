const port = 4200

const database = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'fruitjuice',
    insecureAuth: true
}

module.exports = {
    database,
    port
}