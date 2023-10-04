const express = require('express');
const cors = require('cors');
const config = require('./config.json');

const getPosts = require('./flows/getPosts');
const puppeteerInstance = require('./services/puppeteer');
const getPost = require('./flows/getPost');

const app = express();

app.use(express.json());
app.use(cors());

// error handling
app.use((req,res,next) => {
    try {
        console.log(`${req.method} ${req.url}`)
        next();
    } catch(err) {
        res.send({
            message: 'An error occurred while retrieving the data.',
            error: err
        })
    }
})

app.listen(config.serverPort, () => {
    console.log(`Server is running on port ${config.serverPort}`);

    console.log('Browser instance is being initialized...');
    puppeteerInstance.instance.then(instance => {
        console.log('Browser instance initialized.');
    })
})

app.get('/posts/', async (req,res) => {
    const posts = await getPosts(req.query);
    res.send(posts);
})

app.get('/post/', async (req,res) => {
    let post = await getPost(req.query) 
    res.send(post)
})

app.on('error', (err) => {
    console.log('An error occurred while starting the server.');
    console.log(err);
})

process.on('uncaughtException', (err) => {
    console.log('An uncaught exception occurred.');
    console.log(err);
})

process.on('unhandledRejection', (err) => {
    console.log('An unhandled rejection occurred.');
    console.log(err);
})