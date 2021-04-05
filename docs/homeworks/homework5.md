---
title: homework 5
due: 
    type: due
    title: homework 5
    date: 2021-04-16T16:59:00-6:00
    description: 'Assignment #5 due'
date: 2021-03-29
github_link: https://classroom.github.com/a/aoUUUzUS
student_ports_link: https://docs.google.com/spreadsheets/d/1zJNLivFtDW8lBjbmy0M1kJudbokOaxG_HqbsOIjSstM/edit#gid=0
video: https://www.youtube.com/watch?v=qIjd5xOlF5Q
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'


## a web based chat server

<Link to={frontMatter.github_link}>Assignment checkout link</Link>.

In this assignment, you will be finishing a super basic, but totally
functional, web-based chat program. The main challenge for students will be to
digest the code as given, and write the logic that makes the stateful protocol
run. Watch <Link to={frontMatter.video}>this video</Link> to see the solution
code in action.

### HTTP routes

The server itself functions as a standard HTTP server. Where the previous
homework required you to serve files and run external programs based on each
request, this server functions more as a _web application_ in that the server
will be performing actions itself based on requests: sometimes it will send a
file, sometimes it will send chat messages, sometimes it will receive chat
messages and then send them to all listening clients.

In a modern web application, rather than simply serving files, these different
actions are called **routes**. The routes in our application are:

1. `GET /index.html` just sends the static index file.
2. `GET /listen` set up a "server-sent events" connection, where newly received
   messages are sent.
3. `POST /speak` the web browser makes this request when a user wants to send a
   chat message, and the received message is broadcast to all listening
   clients.


### Server-sent events

Generally, "asynchronous" communication between an http server and an http
client is somewhat complicated. Thankfully, [server-sent
events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
make this simple: by sending a response with mime type `text/event-stream`, the
browser knows to continually read bytes from that socket and interpret them as
empty-line-delimited individual messages, similar to how HTTP headers and HTTP
bodies are separated.

Another nice aspect of how the browser works is that it can make multiple
requests simultaneously through different file descriptors. So once it receives
`index.html`, it can then make one long-lived HTTP connection to the `/listen`
endpoint, waiting for new messages to appear, and then make separate
connections and send messages to the `/speak` endpoint when the client wants to
send a message.


## Skeleton code

The skeleton code for this assignment is based off of the event-driven,
single-threaded echo server in the book. All of the code for receiving multiple
connections is still in there. The TODOs for this assignment happen when a new
message comes in on an individual socket: you need to decide on what to do next
in order to move the protocol forward. Each time that bytes are received, they
should be accumulated into `requestbuf` for that specific client.

## My suggested strategy

My TODO solutions are 4 and 29 lines long respectively - the vast majority of
the difficulty in this assignment is understanding what you need to do,
understanding what the skeleton code does, and then using the helper functions
already written to add the correct code. The skeleton code itself is based off
of the select-based echo server that's presented in the book. I would recommend
reading that section of the book, paying extra attention to how the select
server was written, and then move forward from there. The main thing that makes
this more complicated is that the echo server doesn't require any statefulness
(do different on a given connection based on what information you've received
previously), and it doesn't require any interaction between different socket
connections. 

## Grading Rubric

This assignment is worth **10 points** in total.

* **5 points** for getting a simple server working that receives fully formed
  easy to interpret requests.
* **5 points** for handling correct but oddly sent requests.

Grading will be done automatically using a script. We will publish this script
after grading has completed; you are responsible for writing your own test
cases. **Publicly sharing valid testing scripts with other students will earn
extra credit in the course**.


## How to run your program
There are two ways to run and test your code:
1. Use <Link to={frontMatter.student_ports_link}>this spreadsheet</Link> to find your port
   number, which is unique to you in order to avoid collisions. Use this port
   number to run the webserver on `systemsX`.
2. The `devcontainer.json` has settings to forward a port from the container to
   your local machine. If you wish to change the forwarded port, you can change
   the port number in line `"forwardPorts": [<port-number>]`. You can also
   ctrl+click on the http link that is printed to the console to open up a
   browser to that link.

If you have any questions about the homework requirements or specification,
please post on Piazza.

## Due Date

<>This assignment is due {new Date(frontMatter.due.date).toLocaleString('en-us')} in the {Intl.DateTimeFormat().resolvedOptions().timeZone} time zone. See the <Link to="/syllabus">syllabus</Link> for the late turnin policy.</>