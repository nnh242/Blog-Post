const express = require ('express');
const router = express.Router();
const {posts} = require ('./models');
const bodyParser = require ('body-parser');

function initialPosts() {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

posts.create(
    'First Post Title', initalPosts(), 'Tina'
);

posts.create(
    'Second Post', initialPosts(),'Tina'
);

//create a POST endpoint
router.post('/', jsonParser, (req,res) => {
    const requiredFields =['title','content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            console.error(`Missing \`${field}\` in request body`);
            return res.status(400).send(message);
        }
    }
    const item = posts.create(
        req.body.title, req.body.content, req.body.author
    );
    res.status(201).json(item);
});

// create a GET endpoint
router.get('/', (req,res) => {
    res.json(posts.get());
});

//create a PUT endpoint
router.put('/:id', jsonParser, (req,res) => {
    const requiredFields = [
        'id', 'title','content','author', 'publishDate'
    ];
    for(let i=0; i<requiredFields.length;i++) {
        const field = requiredFiels[i];
        if (!(field in req.body)) {
            console.error(`Missing \`${field}\` in request body`);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id){
        const message = (
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
          console.error(message);
          return res.status(400).send(message);
    }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    const updatedItem = posts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
});
// create a DELETE endpoint
router.delete('/:id', (req, res) => {
    posts.delete(req.params.id);
    console.log(`Deleted blog post with id \`${req.params.ID}\``);
    res.status(204).end();
});

module.exports = router;