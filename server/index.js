require('dotenv').config();


const express = require('express');
const path = require('path');
const cors = require('cors');
const cookSession = require('cookie-session')

const loginRouter = require('./routers/loginRoute');
const dashboardRouter = require('./routers/dashboardRoute');
const registerRouter = require('./routers/registerRoute');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookSession({
    name:"session",
    keys:['SDFLU9iw2308dlsfuwe2adfl', 'LDFA34gsdfgFOPW2323DA7FS2']
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, "../client"), {extensions: ["html", 'htm']})
);


app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', registerRouter);

// Final Middleware 
// Catch all for any request not handled while express was
// processing requests. 
// Returns 404 Page from the client directory.
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});
  
  
  
// Tell express app to listen for incomming request on a specific PORT
app.listen(PORT, () => {
    console.log(`server started on http://localhost:5000`);
});