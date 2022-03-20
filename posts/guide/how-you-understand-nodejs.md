---
title: 'How you understand nodejs'
date: 'March 14, 2022'
excerpt: 'Nodejs is non-blocking IO, but how you understand about it'
tag: 'nodejs'
author: 'Nghia Ngo'
cover_image: '/images/posts/how-you-understand-nodejs/nodejs-cover.jpeg'
---
# Nodejs

Node.js is an open-source and cross-platform JavaScript runtime environment.

Node.js runs the [V8 JavaScript engine](https://v8.dev/), the core of Google Chrome.

A Node.js app runs in a single thread, non-bloking I/O

## What is non-blocking IO

<details>
<summary>Answer</summary>
  The thread will not be blocked when calling APIs. That means it will immediately continue executing the code that comes after calling the API. Most non-blocking frameworks use infinite loop that constantly checks(polls) which often calls event-loop. You can look on this site to understand more about event-loop
</details>

[link](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

- How many types of blocking?

  - I/O
  - Interface
  - operation

  <details>
  <summary>Answer</summary>
    - CPU-bound blocking
    <br/>
    - IO-bound blocking
  </details>

- What is CPU-bound blocking?

  - Relate to process of system

  <details>
  <summary>Answer</summary>
    CPU-bound blocking is a thread which gets blocked because of some task requires CPU to perform, but not return instantly. For example, an algorithm executes with a large of data input.
  </details>

  - fs.readAsSync()
  - crypto.generate()
  - check timeout for connection

- What is IO bound blocking?

  - Calling third party
  - Access files

  <details>
  <summary>Answer</summary>
    A thread gets blocked by waiting for data from an IO. IO is the input and the output that refers to interaction with devices such as a hard drive, network or database.
  </details>

- What is difference between CPU bound blocking and IO bound blocking?

  <details>
  <summary>Answer</summary>
    The difference shows on the state of threads.
    <ol>
      <li>With the CPU-bound blocking, it is still working until the result response.</li>
      <li>With the IO-bound blocking, it sleeps when waiting the response, another process of IO will create another thread.</li>
    </ol>
  </details>

## Why nodejs called single thread

- In the end of this [topic](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/), we can see that Node.js has two types of threads: Event loop and `k` Workers. Therefore, why it called single thread when they have multiple workers to running the tasks including non-blocking I/O and CPU-intensive work.

  ![event-loop](/blog/images/posts/how-you-understand-nodejs/event-loop.png)

<details>
<summary>Answer</summary>
  Single thread here means the process will be based on the event loop to execute the I/O and CPU-intensive work. The workers as the name of it, it does the job that the event loop assigns and return the result to the event loop. Now we can see that we only have one event loop, despite more than one task finished by Worker, but it still waiting for the event loop.
</details>

## Nodejs processes and thread

![multiple-process](/blog/images/posts/how-you-understand-nodejs/multiple-process.png)

- Nodejs child process
  - Share memory: event emiter
  - kill proccess
  - string -> data string -> child_process.emit("message", data)
  - processs.on("message", ())
  - Resolve the CPU bound in main thread
- Nodejs cluster -> child process -> spawn based on amount of CPU cores 
  - Create multiple instances of nodejs app.
- Nodejs worker thread
  - Create in main thread, resolve the CPU bound in main thread.

setTimeout(): if the same number which one run first?

- The runner come to the callback stack first will be called first. So the timeout don't really delay by the amount of time, the time in setTimeout means the lower bound of delay.



## Exercise

Write an application with nodejs using the child proccess, cluster or worker thread  to show the different performace between using process or thread and without using them.

- My suggestion is write an application has three APIs, one for CPU-intensive, another for I/O and the last one just an API to check health like /info.

- 2 Nodejs app -> web server -> using APIs nodes -> 3 APIs
  - health check
  - execute I/O bound in this api. Example read a file
  - execute CPU bound in this api. Example run sort large data.(Using cluster, child process or worker in the second app).
