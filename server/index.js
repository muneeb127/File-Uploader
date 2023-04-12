const express = require('express');
const cors = require('cors');
require('./database/mongoose');

const userRouter = require('./routers/user');
const fileRouter = require('./routers/file');

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(fileRouter);

app.listen(port, ()=>{
    console.log('App is listening on port ' + port);
})





