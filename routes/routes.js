const uuid = require('uuid');
const path = require('path');

const appRouter = (app, db) => {
    app.post('/selfies', (req, res) => {
        const post = {title: req.fields.title, location: req.fields.location};

        if (req.files.selfie) {
            const selfieFileName = path.basename(req.files.selfie.path);
            post.selfieUrl = `${req.protocol}://${req.get('host')}/images/${selfieFileName}`;
        } else {
            post.selfieUrl = `${req.protocol}://${req.get('host')}/dummy/dummy_selfie.jpg`;
        }

        post.id = req.fields.id;

        db.push(`selfies/${post.id}`, post, false);
        res.status(200).send(post);
    });

    app.get('/selfies', (req, res) => {
        const selfies = db.getData('/');

        res.send(selfies);
    });
};

module.exports = appRouter;
