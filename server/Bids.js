/* Get information for a single user account on login */
function GetBids(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id,
    } = req.params
    knex
        .from('bids')
        .where({
            PRODUCTID: `${id}`
        })
        .join('users', 'users.ID', 'bids.USERID')
        .select('bids.ID','bids.PRODUCTID', 'users.USERNAME', 'bids.PRICE')
        .orderBy('PRICE', 'desc')
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json(`Bids for ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

/* Add a user account to the database */
function PostBid(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const payload = req.body
    const mandatoryColumns = ['PRODUCTID', 'USERID', 'PRICE']
    const payloadKeys = Object.keys(payload)
    const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc))
    if (mandatoryColumnsExists) {
        knex('bids')
            .insert(payload)
            .then(response => res.status(201).json('Bid record created'))
            .catch(error => res.status(500).json(error))
    } else {
        return res.status(400).json(`Mandatory Columns are required ${mandatoryColumns}`);
    }
}

function DeleteBid(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex('bids')
        .where('id', id)
        .del()
        .then(response => {
            if (response) {
                res.status(200).json(`Bid with id ${id} is removed.`)
            } else {
                res.status(404).json(`Bid with id ${id} is not found.`)
            }
        })
        .catch(error => res.status(500).json(error))
}

module.exports = {
    GetBids,
    PostBid,
    DeleteBid
}