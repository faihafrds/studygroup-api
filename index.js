const express = require('express')
const app = express()
let products = require('./db/products.json')
let admin = require('./db/admin.json')
let customers = require('./db/customers.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/products/:id', (req, res) => {
    const product = products.find(i => i.id === +req.params.id)
    res.status(200).json(product)
})

app.post('/products', (req, res) => {
    const { nama, harga, stock } = req.body
    const id = products[products.length - 1].id + 1
    const product = {
        id, nama, harga, stock
    }
    products.push(product)
    res.status(201).json(products)
}) 

app.put('/products/:id', (req, res)=>{
    let product = products.find(i => i.id === +req.params.id)
    const params = { nama: req.body.nama, harga: req.body.harga, stock: req.body.stock}
    product = {...product, ...params}
    products = products.map(i => i.id === products.id ? product : i)
    res.status(200).json(product)
})

app.delete('/products/:id', (req, res) => {
    products = products.filter(i => i.id != +req.params.id)
    res.status(200).json({
        message: `Product dengan id ${req.params.id} sudah berhasil dihapus!`
    })
})

app.get('/admin', (req, res) => {
    res.status(200).json(admin)
})

app.get('/admin/:id', (req, res) => {
    const data = admin.find(i => i.id === +req.params.id)
    res.status(200).json(data)
})

app.post('/admin', (req, res) => {
    const { nama } = req.body
    const id = admin[admin.length - 1].id + 1
    const data = {
        id, nama
    }
    admin.push(data)
    res.status(201).json(admin)
}) 

app.put('/admin/:id', (req, res)=>{
    let data = admin.find(i => i.id === +req.params.id)
    const params = { nama: req.body.nama}
    data = {...data, ...params}
    admin = admin.map(i => i.id === admin.id ? data : i)
    res.status(200).json(data)
})

app.delete('/admin/:id', (req, res) => {
    admin = admin.filter(i => i.id != +req.params.id)
    res.status(200).json({
        message: `Admin dengan id ${req.params.id} sudah berhasil dihapus!`
    })
})

app.get('/customers', (req, res) => {
    res.status(200).json(customers)
})

app.get('/customers/:id', (req, res) => {
    const customer = customers.find(i => i.id === +req.params.id)
    res.status(200).json(customer)
})

app.post('/customers', (req, res) => {
    const { nama, email } = req.body
    const id = customers[customers.length - 1].id + 1
    const customer = {
        id, nama, email
    }
    customers.push(customer)
    res.status(201).json(customers)
}) 

app.put('/customers/:id', (req, res)=>{
    let customer = customers.find(i => i.id === +req.params.id)
    const params = { nama: req.body.nama, email: req.body.email}
    customer = {...customer, ...params}
    customers = customers.map(i => i.id === customers.id ? customers : i)
    res.status(200).json(customer)
})

app.delete('/customers/:id', (req, res) => {
    customers = customers.filter(i => i.id != +req.params.id)
    res.status(200).json({
        message: `Customer dengan id ${req.params.id} sudah berhasil dihapus!`
    })
})

app.listen(3000, ()=>{
    console.log('Server nyala di port 3000!')
})