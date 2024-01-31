const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();

app.use("api/v1",rootRouter);

//since FE and BE are one some machine
app.use(cors());
app.use(express.json());

app.listen(3000);