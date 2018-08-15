import {
    getRepositories,
    getBookmarkedRepositories,
    bookmarkRepository,
    removeRepositoryBookmark
} from "../../services/api";

// Actions
const FETCH_REPOSITORIES_REQUEST = "FETCH_REPOSITORIES_REQUEST";
const FETCH_REPOSITORIES_SUCCESS = "FETCH_REPOSITORIES_SUCCESS";

const FETCH_BOOKMARKED_REPOSITORIES_REQUEST = "FETCH_BOOKMARKED_REPOSITORIES_REQUEST";
const FETCH_BOOKMARKED_REPOSITORIES_SUCCESS = "FETCH_BOOKMARKED_REPOSITORIES_SUCCESS";

const BOOKMARK_REPOSITORY_REQUEST = "BOOKMARK_REPOSITORY_REQUEST";
const BOOKMARK_REPOSITORY_SUCCESS = "BOOKMARK_REPOSITORY_SUCCESS";

const REMOVE_REPOSITORY_BOOKMARK_REQUEST = "REMOVE_REPOSITORY_BOOKMARK_REQUEST";
const REMOVE_REPOSITORY_BOOKMARK_SUCCESS = "REMOVE_REPOSITORY_BOOKMARK_SUCCESS";

// Reducer
const initialState = {
    loading: false,
    data: [],
    bookmarked: []
};

export default function repositories(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_REPOSITORIES_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case FETCH_REPOSITORIES_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.json
            });
        case FETCH_BOOKMARKED_REPOSITORIES_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case FETCH_BOOKMARKED_REPOSITORIES_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                bookmarked: action.json,
                loading: false
            });
        case REMOVE_REPOSITORY_BOOKMARK_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case REMOVE_REPOSITORY_BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                bookmarked: state.bookmarked.filter(repo => repo._id !== action.json._id),
                data: state.data.map((repo) => {
                    if (action.json._id === repo._id) {
                        return {
                            ...repo,
                            bookmarked: action.json.bookmarked
                        };
                    }
                    return repo;
                }),
                loading: false
            });
        case BOOKMARK_REPOSITORY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case BOOKMARK_REPOSITORY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: state.data.map((repo) => {
                    if (action.json._id === repo._id) {
                        return {
                            ...repo,
                            bookmarked: action.json.bookmarked
                        };
                    }
                    return repo;
                }),
                loading: false
            });
        default:
            return state;
    }
};

// Action creators
export function fetchRepos(searchTerm) {
    return dispatch => {
        dispatch(fetchReposRequest());
        return getRepositories(searchTerm)
            .then(json => dispatch(fetchReposSuccess(json)));
    };
}

function fetchReposRequest() {
    return {
        type: FETCH_REPOSITORIES_REQUEST
    };
}

function fetchReposSuccess(json) {
    return {
        type: FETCH_REPOSITORIES_SUCCESS,
        json
    };
}

export function fetchBookmarkedRepos() {
    return dispatch => {
        dispatch(fetchBookmarkedReposRequest());
        return getBookmarkedRepositories()
            .then(json => dispatch(fetchBookmarkedReposSuccess(json)));
    };
}

function fetchBookmarkedReposRequest() {
    return {
        type: FETCH_BOOKMARKED_REPOSITORIES_REQUEST
    };
}

function fetchBookmarkedReposSuccess(json) {
    return {
        type: FETCH_BOOKMARKED_REPOSITORIES_SUCCESS,
        json
    };
}

export function bookmarkRepo(id, checked) {
    return dispatch => {
        dispatch(bookmarkRepoRequest());
        return bookmarkRepository(id, checked)
            .then(json => dispatch(bookmarkRepoSuccess(json)));
    };
}

function bookmarkRepoRequest() {
    return {
        type: BOOKMARK_REPOSITORY_REQUEST
    };
}

function bookmarkRepoSuccess(json) {
    return {
        type: BOOKMARK_REPOSITORY_SUCCESS,
        json
    };
}

export function removeBookmark(id) {
    return dispatch => {
        dispatch(removeBookmarkRequest());
        return removeRepositoryBookmark(id)
            .then(json => dispatch(removeBookmarkSuccess(json)));
    };
}

function removeBookmarkRequest() {
    return {
        type: REMOVE_REPOSITORY_BOOKMARK_REQUEST
    };
}

function removeBookmarkSuccess(json) {
    return {
        type: REMOVE_REPOSITORY_BOOKMARK_SUCCESS,
        json
    };
}