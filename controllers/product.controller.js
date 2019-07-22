import ProductWorker from '../workers/product.worker'

class ProductController {
    static createProduct(req, res) {
        let attr = {
            name: req.body.name,
            price: req.body.price
        }
        
        ProductWorker.Create(attr)
        .then(product => res.status(200).json({product: product}))
        .catch(err => res.status(500).json({err}))
    }
    
    static getOneProduct(req, res) {
        const id = req.params.id
    
        ProductWorker.FindOne({_id: id})
        .then(product => res.status(200).json({product: product}))
    }
    
    static updateOneProduct(req, res) {
        const id = req.params.id
        const update = { $set: req.body }
    
        ProductWorker.UpdateOne({_id: id}, update)
        .then(product => res.status(200).json({product: product}))
        .catch(err => res.status(500).json({err}))
    }
    
    static deleteOneProduct(req, res) {
        const id = req.params.id
    
        ProductWorker.DeleteOne({_id: id})
        .then(_ => res.status(200).json({message: 'item deleted'}))
        .catch(err => res.status(500).json({err}))
    }
}

export default ProductController