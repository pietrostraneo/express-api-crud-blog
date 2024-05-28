const path = require("path");
const fs = require("fs");

let posts = require("../db/db.js");

const slugify = require('slugify');

const updatePost = (newPost) => {
    const filePath = path.join(__dirname, '../db/db.js');
    fs.writeFileSync(filePath, JSON.stringify(newPost));
};

const deletePublicFile = (fileName) => {
    const filePath = path.join(__dirname, '../public', fileName);
    fs.unlinkSync(filePath);
};

const create = (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) {
        req.file?.filename && deletePublicFile(req.file.filename);
        res.format({
            json: () => {
                res.status(400).json({
                    error: 'Data is missing',
                    description: `Some data is missing`
                })

            },
            html: () => {
                res.status(400).send('Some data is missing')
            }
        })
    } else if (!req.file || !req.file.mimetype.includes('image')) {
        req.file?.filename && deletePublicFile(req.file.filename);
        res.format({
            json: () => {
                res.status(400).json({
                    error: 'Image is missing',
                    description: `Image is missing or it is not an image file.`
                })

            },
            html: () => {
                res.status(400).send('Image is missing or it is not an image file.')
            }
        })
    }

    const newPost = {
        title,
        slug: slugify(title),
        content,
        image: req.file.filename,
        tags
    };

    if (!posts.some(p => p.slug === slugify(title))) {
        posts.push(newPost);
        updatePost([...posts, newPost]);
    } else {
        req.file?.filename && deletePublicFile(req.file.filename);
        res.format({
            json: () => {
                res.status(400).json({
                    status: 400,
                    error: 'Post already exists',
                    description: `Post with this title already exists`
                })
            },
            html: () => {
                res.status(400).send('Post with this title already exists');
            }
        })
    }

    res.format({
        json: () => {
            res.status(201).json({
                status: 201,
                message: 'Post created successfully',
                data: newPost
            })
        },
        html: () => {
            res.status(201).send('Post created successfully');
        }
    })
};

module.exports = {
    create,
};