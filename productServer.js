var express = require('express');
var config = require('./config/index')
var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', (req, res, next) => {
    req.url = '/index.html';
    next();
})
app.use(router);

const apiData = require('./data.json')
const seller = apiData.seller
const goods = apiData.goods
const ratings = apiData.ratings
var apiRouter = express.Router();

apiRouter.get('/seller', (req, res) => {
    res.json({
        erro: 0,
        data: seller
    })
})
apiRouter.get('/goods', (req, res) => {
    res.json({
        erro: 0,
        data: goods
    })
})
apiRouter.get('/ratings', (req, res) => {
    res.json({
        erro: 0,
        data: ratings
    })
})

app.use('/api', apiRouter)
app.use(express.static('./dist'))
module.exports = app.listen(port, (erro) => {
    if (erro) {
        console.log(err);
        return
    }
    console.log('listening at http://localhost:' + port + '/n')
})