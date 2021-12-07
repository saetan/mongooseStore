const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const methodOverride = require("method-override");

router.use(express.static("public"));
router.use(express.urlencoded());
router.use(methodOverride("_method"));

//create seed data
router.get('/seed', async (req, res) => {
    const newProducts = [
        {
            name: "Beans",
            description:
                "A small pile of beans. Buy more beans for a big pile of beans.",
            img: "https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2",
            price: 5,
            qty: 99,
        },
        {
            name: "Bones",
            description: "It's just a bag of bones.",
            img: "http://bluelips.com/prod_images_large/bones1.jpg",
            price: 25,
            qty: 0,
        },
        {
            name: "Bins",
            description: "A stack of colorful bins for your beans and bones.",
            img: "http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg",
            price: 7000,
            qty: 1,
        }
    ];

    try {
        const seedItems = await Product.create(newProducts);
        res.send(seedItems);
    } catch (err) {
        res.send(err.message);
    }
});

//View all
router.get('/store', async (req, res) => {
    const products = await Product.find();
    res.render('pages/all.ejs', { products: products });
});

//add item new page
router.get('/store/new', (req, res) => {
    res.render('pages/new.ejs');
});

//show individual item page
router.get('/store/:_id', async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    res.render('pages/show.ejs', { product: product });
});

//edit item page
router.get('/store/:_id/edit', async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    res.render('pages/edit.ejs', { product: product });
});

//add new item
router.post('/store', async (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.qty = Number(req.body.qty);
    const newItem = await Product.create(req.body);
    res.redirect('/store');
});

//edit a item page
router.put('/store/:id', async (req, res) => {
    const { id } = req.params;
    req.body.price = Number(req.body.price);
    req.body.qty = Number(req.body.qty);
    const newItem = await Product.findByIdAndUpdate(id, req.body);
    res.redirect('/store');
});

router.delete('/store/:id', async (req, res) => {
    const { id } = req.params;
    const deleteItem = await Product.findByIdAndDelete(id);
    res.redirect('/store');
});

router.patch('/store/:_id', async (req, res) => {
    const { _id } = req.params;
    const updateItem = await Product.findById(_id);
    updateItem.qty = updateItem.qty - 1;
    const newUpdatedItem = await Product.findByIdAndUpdate(_id, updateItem, { new: true });
    res.redirect('/store');
})

router.get('/', (req, res) => {
    res.redirect('/store');
});



module.exports = router