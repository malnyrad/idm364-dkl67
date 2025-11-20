---
marp: true
class: invert
footer: 'APIs'
headingDivider: 4
math: katex
paginate: true
style: |
  section::after {
    font-size: 16px;
  }
theme: default
---

<style>
  pre {
    line-height: 1.5;
  }
  section.smaller h3 {
    color: #fafafa;
    font-size: 36px;
    height: 100vh;
    display: flex;
    align-items: flex-end;
  }
  section.center-title h1 {
    color: #fafafa;
    text-align: center;
  }
</style>


- [IDM364: APIs](#idm364-apis)
- [Lesson Objectives](#lesson-objectives)
- [What is an API?](#what-is-an-api)
  - [The purpose of an API](#the-purpose-of-an-api)
- [HTTP API Methods](#http-api-methods)
  - [`GET`](#get)
  - [`POST`](#post)
  - [`PUT`](#put)
  - [`DELETE`](#delete)
- [`async/await` syntax](#asyncawait-syntax)
- [Dealing with JSON](#dealing-with-json)
  - [What is JSON (JavaScript Object Notation)?](#what-is-json-javascript-object-notation)
  - [`JSON.stringify()`](#jsonstringify)
  - [`JSON.parse()`](#jsonparse)
- [Sveltekit API structure](#sveltekit-api-structure)
  - [`+page.svelte`](#pagesvelte)
  - [`+page.js`](#pagejs)
  - [`+page.sever.js`](#pageseverjs)
  - [`+layout.svelte`](#layoutsvelte)
  - [`+layout.js`](#layoutjs)
  - [`+layout.server.js`](#layoutserverjs)
- [NodeJS APIs](#nodejs-apis)

# IDM364: APIs

# Lesson Objectives

* Introduce APIs
* Discuss HTTP & APIs
* Review JavaScript API techniques
* Discuss dealing with JSON
* Discuss NodeJS APIs
* Discuss Sveltekit API structure

# What is an API?

<!-- An API, or Application Programming Interface, is a set of rules or protocols which specify how software components should interact. They serve as communication channels between two distinct software systems, allowing them to exchange data and functionalities. For example, an API provided by a service like Facebook allows a third-party application to make use of platform's features like user authentication or posting updates. -->

## The purpose of an API

<!-- APIs are used mainly for two purposes: -->

- Enable integration
- Expose functionality

<!-- **Enable integration**: APIs allow different software systems to communicate and interact with each other, enabling integration. This simplifies the process of building complex systems, as you can rely on APIs to manage communication between software components. -->

---

<!-- **Expose functionality**: APIs allow software developers to expose specific functionalities or data of an application, allowing other applications to use that functionality or data while keeping the rest of the application private. -->

![bg](https://res.cloudinary.com/pjs-uxid/image/upload/v1735237905/interactive_app_design_iv/api-analogy-1.png)

<!-- In JavaScript, API usage is quite common, particularly with RESTful APIs that communicate using HTTP methods. The `fetch` API built into modern browsers is often used to interact with these RESTful APIs. -->

---

<!-- Here's a simple example where we fetch data from an API: -->

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

<!-- In the above example, we're using the `fetch()` function to make a request to 'https://api.example.com/data'. This returns a Promise which resolves into the Response to that request, whether it is successful or not. We then use `response.json()` to parse the response body text as JSON, and `then()` to define a callback that receives the parsed response data. Finally, we use `catch()` to handle any errors that might occur during the request. -->

<!-- APIs provide a powerful tool for developers, allowing us to leverage existing services and codebases, and simplifying the development of complex applications. Understanding how to use them is a key skill in modern web development. -->

# HTTP API Methods

## `GET`

<!-- The HTTP GET method is one of the most common HTTP methods used in web APIs. It allows you to retrieve data from a specified resource. Essentially, when your application sends a GET request to a server, it's asking for data from that server. -->

<!-- To illustrate with JavaScript and the Fetch API, you can retrieve data from a placeholder API, like 'jsonplaceholder.typicode.com', which is a simple fake REST API for testing and prototyping: -->

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

<!-- In this code snippet: -->

 <!-- `fetch()` is used to initiate a request to the URL, 'https://jsonplaceholder.typicode.com/posts'. -->

 <!-- The function `then()` is called on the Promise returned by `fetch()`. This function call passes the HTTP Response stream through `response.json()`, which reads the stream to completion and parses the result as JSON. -->

<!-- Another `then()` call is used to work with the resulting JSON data, logging it to the console. -->

<!-- Lastly, `catch()` is included to handle any potential errors by logging them to the console. -->

<!-- Remember, when using the `GET` method, it should not be used to send sensitive data like passwords, since this data would be included in the URL and can be stored in web server logs or browser history. -->

<!-- `GET` requests also should not modify any data on the server. In RESTful API design, `GET` methods are considered "safe" and "idempotent" - meaning they can be called any number of times without changing the outcome. To modify data, other HTTP methods like `POST`, `PUT`, or `DELETE` should be used. -->

## `POST`

<!-- The HTTP `POST` method is used to send data to a server to create a new resource. The data sent to the server with the `POST` method is stored in the request body of the HTTP request. -->

<!-- Unlike `GET` requests, `POST` requests do not append data to the URL. This means that they can send larger amounts of data and more complex data structures, it also keeps sensitive data more secure since it won't appear in your browser history or web server logs. -->

<!-- Here's a simple example of using the `POST` method with the Fetch API in JavaScript: -->

```javascript
let post_data = {
  title: 'foo',
  body: 'bar',
  user_id: 1,
};

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(post_data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error('Error:', error));
```

<!-- We first define the data we want to send as `post_data`. -->

<!-- We then use `fetch()` to make a request to the URL, but this time we also include an options object. This object includes `method: 'POST'` to specify the HTTP method. -->

<!-- We convert `post_data` to a JSON string using `JSON.stringify()` and include it in the `body` of the request. -->

<!-- We also include `headers` to specify the content type as JSON. -->

<!-- As before, we use `then()` and `response.json()` to process the response and `then()` again to handle the returned data. -->

<!-- Lastly, any potential errors are caught and logged to the console with `catch()`. -->

<!-- The HTTP POST method is powerful for creating new resources and uploading data. Understanding how to implement POST requests alongside GET requests provides the ability to interact with APIs more fully. -->

## `PUT`

<!-- The HTTP `PUT` method is used to update an existing resource on the server. Similar to the POST method, the `PUT` method sends data to the server in the body of the HTTP request. However, unlike POST which creates new resources, `PUT` is idempotent, meaning that making the same request multiple times will result in the same state on the server. -->

<!-- Here's an example of a `PUT` request using the Fetch API: -->

```javascript
let update_data = {
  id: 1,
  title: 'foo',
  body: 'bar',
  user_id: 1,
};

fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify(update_data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error('Error:', error));
```

<!-- We're updating a resource, so we include the 'id' for the resource in `update_data`. -->

<!-- We use `fetch()` to make a request to the URL, appending the id of the resource to the end of the URL. This is often the convention used for targeting specific resources in a RESTful API. -->

<!-- We include an options object with `method: 'PUT'` to specify the HTTP method, `body: JSON.stringify(update_data)` to include the data we're sending as a JSON string in the body of the request, and `headers` to specify the content type as JSON. -->

<!-- We then process the response and handle the returned data in the same way as before. -->

<!-- Not all APIs may be designed to accept PUT requests, or they might implement them differently. It's important to refer to the documentation for the specific API you're working with to understand how these methods are implemented. -->

## `DELETE`

<!-- The HTTP `DELETE` method is used to delete a resource on the server. Unlike GET, POST, and PUT, the `DELETE` method may not require a body in the HTTP request since you're not sending new data or updating existing data, you're removing existing data. -->

<!-- Here's an example of a `DELETE` request using the Fetch API: -->

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
.then(response => response.json())
.then(json => console.log(json))
.catch(error => console.error('Error:', error));
```


<!-- We call `fetch()` as before, targeting a specific resource by appending the id to the end of the URL. But this time we just pass an options object with `method: 'DELETE'` to specify the HTTP method. -->

<!-- We don't pass any body or header data in this request since we aren't sending data to the server. -->

<!-- Handling of the response and any returned data or errors is the same as in the previous examples. -->

<!-- As with the PUT method, not all APIs will implement `DELETE` requests, or may implement them differently. Again, refer to the specific API's documentation to understand how they handle `DELETE` requests. -->

<!-- With the understanding of `DELETE` method along with `GET`, `POST`, and `PUT` methods, you are equipped to handle all aspects of CRUD functionality using APIs in JavaScript. -->

# `async/await` syntax

<!-- JavaScript's Async/Await syntax, introduced with ES2017, provides a way of working with Promises that allows for more readable, synchronous-looking asynchronous code. This can be particularly useful when working with a sequence of asynchronous operations, such as making requests to a web API. -->

<!-- `Async` is a keyword which is used to declare a function as asynchronous – this essentially means that the function will return a Promise. `Await` is used inside an `async` function to pause the execution of the function until the Promise is resolved or rejected. -->

---

<!-- Here's an example of how we could implement the Async/Await syntax into our POST request example from before: -->

```javascript
async function postData() {
  let post_data = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };

  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(post_data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    let json = await response.json();
    console.log(json);
  } catch (error) {
    console.error('Error:', error);
  }
}

postData();
```

<!-- We declare `postData` as an `async` function. -->

<!-- Our `fetch()` call is now preceded with `await`, meaning the function will wait for the request to complete before moving on to the next line. -->

<!-- We can do the same with `response.json()`; since this also returns a Promise, we can wait for it to complete before moving on. -->

<!-- All of the code inside the async function is wrapped in a `try/catch` block. This allows us to handle any errors that may occur during the request in a synchronous manner. -->

<!-- One key advantage of using Async/Await syntax is it can make complex asynchronous code easier to understand and debug, with the added benefit of removing callback nesting, reducing execution complexity and racing problems. Async/Await is a powerful tool in modern JavaScript development and is very useful when dealing with APIs. -->

# Dealing with JSON

<!-- JSON, which stands for JavaScript Object Notation, is a popular data format with a diverse range of applications in data interchange, including that between client and server in a web application. It's a text-based, human-readable format for representing simple data structures and associative arrays (also known as objects). -->

<!-- Although it's derived from JavaScript, JSON is a language-independent data format. Many different programming languages can parse and generate JSON. -->

## What is JSON (JavaScript Object Notation)?

<!-- JSON closely resembles a subset of JavaScript syntax, specifically arrays and objects. However, there are some differences. For example, in JSON all keys must be strings, and these strings are enclosed in double quotes `" "`. -->

---

<!-- Here's an example of what a JSON object might look like: -->

```json
{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "phones": [
    "212-555-1234",
    "646-555-4567"
  ]
}
```

<!-- In JavaScript, you can convert JSON data to and from JavaScript objects using the `JSON.parse()` and `JSON.stringify()` methods respectively. These are often used when receiving data from a web server or when sending data to a web server. -->

---

## `JSON.stringify()`

<!-- Here is an example of converting a JavaScript object to JSON and vice versa: -->

```javascript
// JavaScript object to JSON
let js_object = { name: "John", age: 30, city: "New York" };
let json_data = JSON.stringify(js_object);
console.log(json_data);  // Output: {"name":"John","age":30,"city":"New York"}

// JSON to JavaScript object
let json_string = '{"name":"John", "age":30, "city":"New York"}';
let js_obj = JSON.parse(json_string);
console.log(js_obj);  // Output: { name: 'John', age: 30, city: 'New York' }
```

<!-- Dealing with JSON is a fundamental part of working with APIs, as it's often used as the format for sending and receiving data. Understanding how to parse and stringify JSON is, therefore, an important skill in JavaScript programming, especially when dealing with server side interactions. -->


<!-- `JSON.stringify()` is a method provided by the JSON object in JavaScript. It is used to convert a JavaScript value (object, array, string, number, boolean, or null) into a JSON string. This conversion is often used when you need to send data from a client to a server, or when you need to convert a JavaScript object into a format that can be easily stored or manipulated as a string. -->

## `JSON.parse()`

<!-- The `JSON.parse()` method in JavaScript is used to convert a JSON string into a JavaScript object. This method is commonly used when receiving data from a server as the server typically sends data in the form of a JSON string. -->

```javascript
// JavaScript object to JSON
let js_object = { name: "John", age: 30, city: "New York" };
let json_data = JSON.stringify(js_object);
console.log(json_data);  // Output: {"name":"John","age":30,"city":"New York"}

// JSON to JavaScript object
let json_string = '{"name":"John", "age":30, "city":"New York"}';
let js_obj = JSON.parse(json_string);
console.log(js_obj);  // Output: { name: 'John', age: 30, city: 'New York' }
```

# Sveltekit API structure

## `+page.svelte`

<!-- This is an example of a `+page.svelte` file that displays a blog post. It receives the post prop from the `+page.js` or `+page.server.js` file. -->

```html
<script>
  export let data;
</script>

<article>
  {#each data.posts as post}
    <h1>{post.title}</h1>
    <p>{post.body}</p>
  {/each}
</article>
```

## `+page.js`

```javascript
export async function load() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const data = await res.json();

  if (res.ok) {
    return {
      posts: data,
    };
  } else {
    return {
      status: res.status,
      error: new Error(`Could not load blog posts`),
    };
  }
}
```

## `+page.sever.js`

```javascript
import db from '$lib/db';

export async function load() {
  const posts = await db.getPosts();

  if (posts) {
    return { posts: data };
  } else {
    return { status: 404, error: new Error(`Could not find blog post ${slug}`) };
  }
}
```

## `+layout.svelte`

<!-- This is an example of a `+layout.svelte` file that lays out a page. It receives the comments prop from the +layout.js or `+layout.server.js` file, and it also receives a slot prop that represents the nested page. -->

```html
<script>
  export let comments;
</script>

<main>
  <slot></slot>

  <section>
    <h2>Comments</h2>
    {#each comments as comment}
      <div>
        <p>{comment.author}: {comment.text}</p>
      </div>
    {/each}
  </section>
</main>
```

## `+layout.js`

```javascript
export async function load({ page, fetch }) {
  const { slug } = page.params;
  const res = await fetch(`https://api.example.com/blog/${slug}/comments`);
  const data = await res.json();

  if (res.ok) {
    return { props: { comments: data } };
  } else {
    return { status: res.status, error: new Error(`Could not load comments for blog post ${slug}`) };
  }
}
```

## `+layout.server.js`

```javascript
import db from '$lib/db';

export async function load({ page }) {
  const { slug } = page.params;
  const comments = await db.getComments(slug);

  if (comments) {
    return { props: { comments } };
  } else {
    return { status: 404, error: new Error(`Could not find comments for blog post ${slug}`) };
  }
}
```

<!-- [Sveltekit API routing example](../../examples/06-api-routing/06-api-routing.md) -->

# NodeJS APIs

<!-- [NodeJS API example](../../examples/06-nodejs-apis/06-nodejs-apis.md) -->
