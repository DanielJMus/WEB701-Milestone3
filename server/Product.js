/* List information for all products */
function GetAllProducts(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    knex
        .select('ID','NAME', 'DESCRIPTION', 'PRICE', 'FRUIT', 'ENERGY', 'CARBOHYDRATES', 'SUGAR', 'SODIUM', 'VITAMINC', 'IMG', 'SELLERID')
        .from('products')
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

/* List information for a single product */
function GetProduct(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex
    .select('ID','NAME', 'DESCRIPTION', 'PRICE', 'FRUIT', 'ENERGY', 'CARBOHYDRATES', 'SUGAR', 'SODIUM', 'VITAMINC', 'IMG', 'SELLERID')
        .from('products')
        .where({
            id: `${id}`
        })
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json(`Product with ID ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

function GetAllSellerListings (req, res)
{
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex
    .select('ID','NAME', 'DESCRIPTION', 'PRICE', 'FRUIT', 'ENERGY', 'CARBOHYDRATES', 'SUGAR', 'SODIUM', 'VITAMINC', 'IMG', 'SELLERID')
    .from('products')
    .where({
        SELLERID: `${id}`
    })
    .then(data => {
        if (data.length > 0) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json(`No products found for user ${id}`);
        }
    })
    .catch(error => res.status(500).json(error));
}

/* Add a product to the database */
function PostProduct(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const payload = req.body
    const mandatoryColumns = ['NAME', 'DESCRIPTION', 'PRICE', 'FRUIT', 'ENERGY', 'CARBOHYDRATES', 'SUGAR', 'SODIUM', 'VITAMINC', 'IMG', 'SELLERID']
    const payloadKeys = Object.keys(payload)
    const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc))
    if (mandatoryColumnsExists) {
        knex('products')
            .insert(payload)
            .then(response => res.status(201).json('Product record created'))
            .catch(error => res.status(500).json(error))
    } else {
        return res.status(400).json(`Mandatory Columns are required ${mandatoryColumns}`);
    }
}

function UpdateProduct(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    const payload = req.body
    knex('products')
        .where('id', id)
        .update(payload)
        .then(response => {
            if (response) {
                res.status(204).json()
            } else {
                return res.status(404).json(`Product with id ${id} not found.`);
            }
        })
        .catch(error => res.status(500).json(error))
}

function DeleteProduct(req, res) {
    // Destructuring 
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex('products')
        .where('id', id)
        .del()
        .then(response => {
            if (response) {
                res.status(200).json(`Product with id ${id} is removed.`)
            } else {
                res.status(404).json(`Product with id ${id} is not found.`)
            }
        })
        .catch(error => res.status(500).json(error))
}

module.exports = {
    GetAllProducts,
    GetAllSellerListings,
    GetProduct,
    PostProduct,
    UpdateProduct,
    DeleteProduct
}