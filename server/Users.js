/* List information for all user accounts */
function GetAllUsers(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    knex
        .select('ID','USERNAME', 'EMAIL', 'PASSWORD', 'USERTYPE')
        .from('users')
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

/* List information for a single user account */
function GetUser(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex
        .select('ID','USERNAME', 'EMAIL', 'PASSWORD', 'USERTYPE')
        .from('users')
        .where({
            id: `${id}`
        })
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json(`User with ID ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

/* Get information for a single user account on login */
function GetUserLogin(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        name,
    } = req.params
    console.log(name);
    knex
        .select('ID','USERNAME', 'EMAIL', 'PASSWORD', 'USERTYPE')
        .from('users')
        .where({
            USERNAME: `${name}`
        })
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json(`User with username or password ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

/* Add a user account to the database */
function PostUser(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const payload = req.body
    const mandatoryColumns = ['USERNAME', 'EMAIL', 'PASSWORD', 'USERTYPE']
    const payloadKeys = Object.keys(payload)
    const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc))
    if (mandatoryColumnsExists) {
        knex('users')
            .insert(payload)
            .then(response => res.status(201).json('User record created'))
            .catch(error => res.status(500).json(error))
    } else {
        return res.status(400).json(`Mandatory Columns are required ${mandatoryColumns}`);
    }
}

function UpdateUser(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    const payload = req.body
    knex('users')
        .where('id', id)
        .update(payload)
        .then(response => {
            if (response) {
                res.status(204).json()
            } else {
                return res.status(404).json(`User with id ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

function DeleteUser(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex('users')
        .where('id', id)
        .del()
        .then(response => {
            if (response) {
                res.status(200).json(`User with id ${id} is removed.`)
            } else {
                res.status(404).json(`User with id ${id} is not found.`)
            }
        })
        .catch(error => res.status(500).json(error))
}

module.exports = {
    GetAllUsers,
    GetUser,
    GetUserLogin,
    PostUser,
    UpdateUser,
    DeleteUser
}