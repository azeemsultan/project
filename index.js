const express  = require("express");
const cors     = require("cors");

const admin           = require("./routes/api/admin");
const serviceprovider = require("./routes/api/serviceprovider");
const customer        = require("./routes/api/customer");
const task            = require("./routes/api/postTask");
const ptask            = require("./routes/api/privatetask");
const payment         = require("./routes/api/payment");
const rating         = require("./routes/api/rating");
const connectDB       = require("./config/database");


const app = express();
app.use(cors());

/*app.use(function(req,res,next)
{
    res.header('Access-Control-Allow-Origin', "*");
 res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    next();
})
*/


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use("/api/admin", admin);
app.use("/api/serviceprovider", serviceprovider);
app.use("/api/customer", customer);
app.use("/api/postTask", task);
app.use("/api/privateTask", ptask);
app.use("/api/payment",payment);
app.use("/api/rating",rating);
connectDB();
const port = process.env.PORT || 5555;
app.use(cors({origin: '*'}));

app.listen(port,()=> console.log(`Activating project on port ${port}...`));