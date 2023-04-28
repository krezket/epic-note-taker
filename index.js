const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allRoutes = require("./public/assets/controller");
app.use(allRoutes)

app.listen(PORT,()=>{
    console.log("listening on port " + PORT)
});