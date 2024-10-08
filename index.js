const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
// const session = require("express-session");
// const store = new session.MemoryStore();
const PORT = 4000;

// const https = require('https');

// const options = {
//   key: fs.readFileSync('./ec2.key'),
//   cert: fs.readFileSync('./ec2.crt')
// };

// https.createServer(options, app).listen(PORT);

// app.use(session({
//   secret:"some secret",
//   cookie: {maxAge: 60000},
//   saveUninitialized: false,
//   store
// }))

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    return callback(null, true);
  }
}));

const db = require("./models");

// Routers
const Contact = require("./routes/api");
app.use("/api", Contact);


db.sequelize.sync().then(() => {
  // https.createServer(options, app).listen(PORT);
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});

// Run All Crons
const runCrons = require("./crons");
runCrons();
