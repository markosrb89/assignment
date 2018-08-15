const axios = require("axios");

async function searchGithubRepos(baseUrl, searchTerm) {
    const repos = await axios.get(baseUrl + "/search/repositories?q=" + searchTerm);
    return repos;
}

module.exports = searchGithubRepos;