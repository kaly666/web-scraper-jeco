const express = require('express');
const cors = require('cors');
const config = require('./config.json');

const getPosts = require('./flows/getPosts');
const puppeteerInstance = require('./services/puppeteer');

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

app.get('/posts', async (req,res) => {
    

    const posts = await getPosts(req.query);
    
    res.send(posts);
    
})