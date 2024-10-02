const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3400, () => console.log("Server ready on port 3400."));

module.exports = app;
