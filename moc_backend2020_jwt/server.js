const express = require("express");
const bodyParser = require("body-parser");

//const cors = require("cors");
const axios = require('axios');

const app = express();

const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplateLentille = require('./app/documents/PdfLentille');
const pdfTemplateProduit = require('./app/documents/PdfProduit');



app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create-pdfLentille', (req, res) => {
  console.log(req.body.id);
  axios.get('http://localhost:4000/ordersLentille/getClientdescriptionByOrdersLentille/' +req.body.id)
  .then(response=>
     pdf.create(pdfTemplateLentille(response.data.data[0]), {}).toFile('resultLentille.pdf', (err) => {
    // console.log(req.body.data.find(element=>element!=null)) ;
     //console.log(req.body.data)
      if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    })
)});

app.get('/fetch-pdfLentille', (req, res) => {
    res.sendFile(`${__dirname}/resultLentille.pdf`)
})
app.post('/create-pdfProduit', (req, res) => {
  console.log(req.body.id);
  axios.get('http://localhost:4000/ordersProduit/getClientdescriptionByOrdersProduit/' +req.body.id)
  .then(response=>
     pdf.create(pdfTemplateProduit(response.data.data[0]), {}).toFile('resultProduit.pdf', (err) => {
    // console.log(req.body.data.find(element=>element!=null)) ;
     //console.log(req.body.data)
      if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    })
)});

app.get('/fetch-pdfProduit', (req, res) => {
    res.sendFile(`${__dirname}/resultProduit.pdf`)
})


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); 
// database
const db = require("./app/models");
const Role = db.role;


db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to moussa optic application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


const ordersRouters = require('./app/routes/OrdersRoute');
const clientRouters = require('./app/routes/ClientRoute');
const ordersLentilleRouters = require('./app/routes/OrdersLentilleRoute');
const ordersProduitRouters = require('./app/routes/OrdersProduitRoute');
const stockRouters = require('./app/routes/StockRoute');

//Route
app.use('/orders', ordersRouters);
app.use('/ordersLentille', ordersLentilleRouters);
app.use('/ordersProduit', ordersProduitRouters);
app.use('/stock', stockRouters);

app.use('/clients', clientRouters);

app.use('/test', (req, res) => {
  res.send("Test route");
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}