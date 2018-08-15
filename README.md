# Assignment

> Technologies used: Node, Express, MongoDB, React, Redux

## Quick Start

#### Install dependencies for server ####
$ npm install

#### Install dependencies for client ####
$ npm run client-install

#### Run the client & server with concurrently ####
$ npm run dev

#### Run the Express server only ####
$ npm run server

#### Run the React client only ####
$ npm run client

#### Server runs on http://localhost:4000 and client on http://localhost:3000 ####

## HTTP API

### Method ###
GET | PUT

#### @route GET api/repositories?search="" ###
 Search Github Repositories

#### @route GET api/repositories/bookmarks ####
 Get Bookmarked Repositories

#### @route PUT api/repositories/bookmarks/:id ####
 Body: { checked: true/false }
 Bookmark Repository

#### @route PUT api/repositories/bookmarks/:id ####
 Remove Repository Bookmark
