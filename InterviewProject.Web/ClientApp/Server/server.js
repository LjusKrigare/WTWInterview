let Axios = require("axios");
let Cors = require("cors");
let Express = require("express");

const API_ROOT_URL = "https://www.metaweather.com/api/location/";

let app = Express();

app.set("port", process.env.PORT || 8080);

app.use(Cors());


app.get("/weather/:city", (req, res, next) => {
    Axios.get(API_ROOT_URL + "search/", { params: {query: req.params.city}})
        .then((response) => {
            res.status(200).send({data: response.data});
        })
        .catch((error) => {
            console.warn(error);
            res.status(200).send({error: error.message});
        })
        .then(next);
});


app.get("/city/:weather", (req, res, next) => {
    Axios.get(API_ROOT_URL + req.params.weather)
        .then((response) => {
            res.status(200).send({data: response.data});
        })
        .catch((error) => {
            console.warn(error);
            res.status(200).send({error: error.message});
        })
        .then(next);
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}, pid ${process.pid}`);
});