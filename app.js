const express = require("express");
const app = express();

const port = 3000;

const postRouter = require('./routers/post.js');

app.use(express.urlencoded());

app.use(express.static('public'));

app.use('/posts', postRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.format({
        json: () => {

            res.status(500).json({
                message: err.message,
                error: err
            });

        },
        html: () => {
            res.status(500).send('Ops! Something gone wrong..')
        }
    })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});