// ts prefers imports over require
import express from "express";
const app = express();
const port = process.env.PORT || 8080;

// /route/:myparam accessed by req.params.myparam
// /route?myparam=something accessed by req.query.myparam

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.status(200)
  res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
