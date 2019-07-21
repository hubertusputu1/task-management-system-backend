const Product = require('../models/product.model');

module.exports = {
    Create: ( attr ) => {
        let product = new Product( attr )
        return product.save()
    },

    FindOne: (query) => Product.findOne(query),

    UpdateOne: (query, update) => Product.updateOne(query, update),

    DeleteOne: (query) => Product.deleteOne(query)
}