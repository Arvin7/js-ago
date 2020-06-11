# js-ago  
  
![Github issues](https://img.shields.io/github/issues/Arvin7/js-ago)
![GitHub stars](https://img.shields.io/github/stars/Arvin7/js-ago)
![GitHub license](https://img.shields.io/github/license/Arvin7/js-ago)
![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FArvin7%2Fjs-ago)

Simple "time" ago for your UNIX timestamps

### Example
In a React component:
```jsx
import React from 'react';
import js_ago from 'js-ago';

const Article = () => {
    const timestamp = 1591872078; // E.g. fetched from the API

    return (
        <article>
            <h1>Post Title</h1>

            <p>Lorem ipsum...</p>

            <footer>
                Posted {js_ago(timestamp)}
            </footer>
        </article>
    );
};

export default Article;
```

### Outputs
Based on the timestamp you pass, you would get such results:
 * [0-59] seconds ago
 * [1-59] minutes ago
 * [1-23] hours ago
 * [1-3] weeks ago
 * [1-11] months ago
 * [1-99] years ago
 * ...

Therefore, this package doesn't print out something like:
_2 hours and 14 minutes ago_

### Use-case
Many 😀

Personally, I use this when I've written the back-end with PHP/MySQL, and my React app fetches the data through an API.
