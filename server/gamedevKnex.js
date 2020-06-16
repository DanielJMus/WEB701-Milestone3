/* List information for all photoshops */
function listAllGameDevs(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    knex
        .select('ID','Title', 'Description', 'Url', 'ImageUrl')
        .from('tblGamedev')
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

/* List information for a single photoshop */
function listSingleGameDev(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex
        .select('ID','Title', 'Description', 'Url', 'ImageUrl')
        .from('tblGamedev')
        .where({
            id: `${id}`
        })
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json(`Gamedev with ID ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

/* Add a photoshop to the database */
function postGameDev(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const payload = req.body
    const mandatoryColumns = ['Title', 'Description', 'Url', 'ImageUrl']
    const payloadKeys = Object.keys(payload)
    const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc))
    if (mandatoryColumnsExists) {
        knex('tblGamedev')
            .insert(payload)
            .then(response => res.status(201).json('Gamedev record created'))
            .catch(error => res.status(500).json(error))
    } else {
        return res.status(400).json(`Mandatory Columns are required ${mandatoryColumns}`);
    }
}

function updateGameDev(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    const payload = req.body
    knex('tblGamedev')
        .where('id', id)
        .update(payload)
        .then(response => {
            if (response) {
                res.status(204).json()
            } else {
                return res.status(404).json(`Gamedev with id ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

function deleteGameDev(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex('tblGamedev')
        .where('id', id)
        .del()
        .then(response => {
            if (response) {
                res.status(200).json(`Gamedev with id ${id} is removed.`)
            } else {
                res.status(404).json(`Gamedev with id ${id} is not found.`)
            }
        })
        .catch(error => res.status(500).json(error))
}

module.exports = {
    listAllGameDevs,
    listSingleGameDev,
    postGameDev,
    updateGameDev,
    deleteGameDev
}