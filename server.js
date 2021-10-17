const express= require('express');

const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const sequelize = require('./util/db');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());

sequelize.sync({ alter: true }).then( (result) => {
    // console.log(result)
}).catch((error) => {
    console.log(error)
})

app.use('/user', userRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`notes-app listening on port ${port}!`));




