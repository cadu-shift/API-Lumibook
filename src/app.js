const express = require("express");
const apiRoutes = require("./presentation/routes");
const notificationRoutes = require('./presentation/routes/notificationRoutes');
const app = express();

app.use(express.json());
app.use("/api", apiRoutes);
app.use('/notifications', notificationRoutes);

module.exports = app;
