# RSS Reader API

This is the back-end for [RSS Reader](https://github.com/RtiM0/rss-reader) built with NestJS.
> **What's an RSS Reader?**

> RSS stands for Really Simple Syndication, and it is a simple, standardized content distribution method that can help you stay up-to-date with your favourite newscasts, blogs, websites, and social media channels. Instead of visiting sites to find new posts or subscribing to sites to receive notifications of new posts, find the RSS feed on a website and read new posts in an RSS reader.

## Installation

1. Clone the repo
	```bash
	git clone https://github.com/RtiM0/rss-reader-api.git
	```
2. Install npm modules
	```bash
	cd rss-reader-api
	npm install
	```

## Usage
1. Set the database config in ``src/app.module.ts``
2. Start the API using NPM script
	```bash
	npm run start
	```
3. API will start on ```localhost:3001``` (port can be changed from ``src/main.ts`` file).
## Endpoints
All endpoints have a unified response format.
```ts
{
	message: any,
	error: boolean
}
```
- ``GET /feed``
	- Returns all the feeds stored in the database.
- ``POST /feed``
	- To subscribe to new feeds.
	- Tries to detect rss feeds from website urls (for eg: https://theverge.com -> https://www.theverge.com/rss/index.xml).
	- Saves favicon of the feed.
	- Fetches the latest RSS Feed for it.
- ``GET /feed/:id``
	- Returns the articles for the specified feed.
	- Supports pagination with ``page`` and ``size`` queries.
- ``GET /feed/refresh``
	- Refreshes all feeds.
- ``GET /feed/:id/refresh``
	- Refreshes the specified feed.
## Libraries
External Libraries are only used if they are light-weight, have strong support and that they fully justify their purpose and provide no other unnecessary functions.
The libraries used in this project are:
- [ggkovacs/rss-finder](https://github.com/ggkovacs/rss-finder) - To find and verify RSS Feeds.
- [rbren/rss-parser](https://github.com/rbren/rss-parser) - To parse the feeds and efficiently extract data.