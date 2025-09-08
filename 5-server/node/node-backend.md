## Backend Development with Node.js – Fundamentals

## 1. Introduction to Backend Development
Backend development refers to building the server-side logic of applications.  
It focuses on:
- Handling client requests
- Managing databases
- Processing business logic
- Sending responses back to the client

In modern applications, backend development powers APIs, authentication, data persistence, and integrations with third-party services.

## 2. Why Node.js for Backend?
Node.js is a runtime environment built on **Chrome's V8 JavaScript engine** that allows JavaScript to run outside the browser.  

Key benefits:
- Uses JavaScript on both frontend and backend.
- Event-driven and non-blocking I/O model, which makes it fast and scalable.
- Huge ecosystem with npm (Node Package Manager).
- Widely used for REST APIs, microservices, and real-time apps (like chat apps).

## 3. Setting Up Node.js
1. Download and install Node.js from [https://nodejs.org](https://nodejs.org).
2. Verify installation:
```bash
node -v
npm -v
```

## 4. First Node.js Program
Create a file `app.js`:

```js
console.log("Hello, Backend with Node.js!");
```

Run it:
```bash
node app.js
```

Output:
```
Hello, Backend with Node.js!
```

## 5. Core Fundamentals in Node.js

### a. Modules
Modules help organize code into reusable files.  

Example (`math.js`):
```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };
```

Using it (`app.js`):
```js
const math = require('./math');

console.log(math.add(5, 3)); 
console.log(math.multiply(4, 2)); 
```

### b. Built-in Core Modules
Node.js provides many built-in modules for backend tasks.

#### File System (fs)
```js
const fs = require('fs');

fs.writeFileSync('message.txt', 'Hello, Node.js File System!');
const content = fs.readFileSync('message.txt', 'utf-8');
console.log(content);
```

#### Path
```js
const path = require('path');

const filePath = path.join(__dirname, 'app.js');
console.log(filePath);
```

#### OS
```js
const os = require('os');

console.log(os.platform()); 
console.log(os.totalmem()); 
```

### c. Event-driven Architecture
Node.js is built on an event-driven model.  
We can use the `events` module to create custom event emitters.

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log(`Hello, ${name}`);
});

emitter.emit('greet', 'Alice');
```

### d. Asynchronous Programming
Node.js uses **non-blocking I/O**, meaning multiple tasks can run without waiting for others to finish.  

#### Using Callbacks
```js
const fs = require('fs');

fs.readFile('message.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("Reading file...");
```

Order of execution:
```
Reading file...
Hello, Node.js File System!
```

#### Using Promises
```js
const fs = require('fs').promises;

fs.readFile('message.txt', 'utf-8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

#### Using Async/Await
```js
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('message.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
```

### e. HTTP Module – Creating a Server
We don’t need frameworks to build a server in Node.js.  

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, this is a basic Node.js server!');
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

Open `http://localhost:3000` in a browser.

### f. Handling Routes Manually
Before using frameworks like Express, we can handle different URLs manually.

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home Page');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About Page');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

### g. Parsing Request Data
Handling request body manually without frameworks.

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/data' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: body }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

### h. Serving Static Files
We can serve HTML, CSS, or JS files manually.

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading page");
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Static server running at http://localhost:3000/");
});
```

## 6. Summary of Fundamentals Before Frameworks
At this stage, you should understand:
- Node.js modules and built-in libraries
- File system operations
- Event-driven programming
- Asynchronous patterns (callbacks, promises, async/await)
- Creating servers with the HTTP module
- Handling routes manually
- Parsing request bodies
- Serving static files

From here, frameworks like **Express.js** simplify these tasks by providing routing, middleware, and utilities out of the box.
