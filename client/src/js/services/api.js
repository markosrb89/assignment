
const baseApiUrl = "http://localhost:4000/api";

async function getRepositories(searchTerm) {
    const response = await fetch(`${baseApiUrl}/repositories?search=${searchTerm}`);
    return response.json();
}

async function getBookmarkedRepositories() {
    const response = await fetch(`${baseApiUrl}/repositories/bookmarks`);
    return response.json();
}

async function bookmarkRepository(id, checked) {
    const response = await fetch(`${baseApiUrl}/repositories/bookmarks/${id}`, { 
        method: "PUT", 
        body: JSON.stringify({ checked })
    });
    return response.json();
}

async function removeRepositoryBookmark(id) {
    const response = await fetch(`${baseApiUrl}/repositories/remove-bookmarks/${id}`, { 
        method: "PUT"
    });
    return response.json();
}

export { 
    getRepositories, 
    getBookmarkedRepositories, 
    bookmarkRepository, 
    removeRepositoryBookmark 
}