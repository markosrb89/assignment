const express = require('express');
const router = express.Router();
const searchGithubRepos = require("./utils");

const baseUrl = "https://api.github.com";

// Product Model
const Repository = require('../../models/Repository');

// @route GET api/repositories
// @desc Search Github Repositories
router.get('/', (req, res) => {
    const searchTerm = req.query.search;
    let newRepositories;
    searchGithubRepos(baseUrl, searchTerm)
        .then(githubRepos => {
            newRepositories = githubRepos.data.items.map(repo => {
                const newRepo = new Repository({
                    name: repo.name,
                    ownerName: repo.owner.login,
                    forks: repo.stargazers_count,
                    stars: repo.forks_count,
                    bookmarked: false
                });
                newRepo.save()
                    .catch(error => {
                        console.log(error);
                        res.status(500)
                            .json({
                                success: false
                            });
                    });
                return newRepo;
            });
        })
        .then(() => res.json(newRepositories))
        .catch(error => console.log(error));
});

// @route GET api/repositories/bookmarks
// @desc Get Bookmarked Repositories
router.get('/bookmarks', (req, res) => {
    Repository.find({ bookmarked: true })
        .then(repos => res.json(repos));
});

// @route PUT api/repositories/bookmarks/:id
// @desc Bookmark Repository
router.put('/bookmarks/:id', (req, res) => {
    Repository.findById(req.params.id)
        .then(repo => {
            repo.bookmarked = req.body.checked;
            repo.save()
                .then(repo => res.json(repo))
                .catch(error => {
                    console.log(error);
                    res.status(404)
                        .json({
                            success: false
                        });
                });
        });
});

// @route PUT api/repositories/bookmarks/:id
// @desc Remove Repository Bookmark
router.put('/remove-bookmarks/:id', (req, res) => {
    Repository.findById(req.params.id)
        .then(repo => {
            repo.bookmarked = false;
            repo.save()
                .then(repo => res.json(repo))
                .catch(error => {
                    console.log(error);
                    res.status(404)
                        .json({
                            success: false
                        });
                });
        });
});

module.exports = router;