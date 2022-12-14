const express = require('express');
const fs = require('fs');
const router = express.Router();



// leo el archivo de forma sincrona

const products = fs.readFileSync('./data/products.txt', 'utf-8')

const productsParse = JSON.parse(products)

const getProducts = productsParse.map(p => p.title)
  
// Routers

router
    .get('/',(req, res) => {
    res.json(getProducts);
    console.log(getProducts)
    })

// api/products/:id

    .get('/:id', (req, res) => {
    const { id } = req.query;
    console.log(req);
    const getId = productsParse.find(num=> num.id === +id);
    if (!getId) {
        return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
      }
      return res.json({ success: true, result: getId });
    
    })

    .post('/',(req, res) => {
    const {title, price} = req.body;
    if (!title || !price) {
        return res.status(400).json({
            succes: false,
            error: 'Hubo un error'
        });
    }
    const newProduct = {
        title,
        price,
        id: productsParse.length + 1
    }
    res.send(`<h3>
    product: ${newProduct.title}, price: ${newProduct.price}, id: ${newProduct.id}
    </h3>`);
    productsParse.push(newProduct)
    fs.writeFileSync('./data/products.txt', JSON.stringify(productsParse, null, 2))
    console.log(productsParse)
    })

    .put('/:id', (req, res) => {
    const {
        params: {id},
        body: {
            title, 
            price,
        }
    } = req;
    if (!title || !price ) {
        return res.status(400).json({
            success: false,
            error: 'Wrong body format'
        });
    };
    const productIndex = productsParse.findIndex((product) => product.id === +id);
    if (productIndex < 0) return res.status(404).json({
        success: false,
        error: `Product with id: ${id} does not exist!`
    });
    const newProduct = {
        ...productsParse[productIndex],
        title,
        price
    };
    productsParse[productIndex] = newProduct;
    fs.writeFileSync('./data/products.txt', JSON.stringify(productsParse, null, 2))
    console.log(productsParse)
    return res.json({
        success: true,
        result: newProduct
    });
    
 
    })

    .delete('/:idDelete', (req, res) => {
    const {
        idDelete
    } = req.query;
    console.log(req.query)
    const productIndex = productsParse.findIndex(product => product.id === +idDelete);
    if (productIndex < 0) return res.status(404).json({
        success: false,
        error: `Product with id ${idDelete} does not exist!`
    });
    productsParse.splice(productIndex, 1);
    fs.writeFileSync('./data/products.txt', JSON.stringify(productsParse, null, 2))
    console.log(productsParse)
    
    return res.json({
        success: true,
        result: 'product correctly eliminated'
    });
    });







module.exports = router;