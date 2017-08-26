const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const express = require ('express');
const app = express();
const postRouter = require ()

app.use(morgan('common'));

app.use('/blog-posts', postRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});