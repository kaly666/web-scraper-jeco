# Explaination

## Choices
- As for the API i chose puppeteer because I'm used to it and have some basic knowledge about using it.
- As for the front-end, I initially picked HTMX because I kept hearing about it as being something really cool. 

## Standout features
- As a standout feature for the API, I would propose caching some data, especially the sentiment. Calculating it takes some times and waiting for the request to end is quite boring. I would propose hashing the raw file content and storing it. Every time a sentiment is requested, the hashes will be compared (stored with the new one) and if there's no change the saved sentiment will be returned. 
## Learning experience
- My learning experience with HTMX was enjoyable. I do find it interesting, but it wasn't as hard as I tought. I expected HTMX to be a little more challanging (even for that specific task), but it ended up being actual HTML with some special properties that allow HTTP requests and page update without doing much. I should've picked something more exotic. 