const app = require('./app');
const dotenv = require("./config/dotenv.js");
const port =  dotenv.PORT
app.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
})