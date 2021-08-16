---
title: week 11 lab
description: Socket Programming
layout: default
date: 2021-03-29
# notes gets passed through markdownify
pairings: https://docs.google.com/spreadsheets/d/1-_eq1hCAJBkIsbUiRHTrcZPpOe7m7iWEuZYiSHkb-5o
github_link: https://classroom.github.com/a/aoUUUzUS
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

## Socket Programming

## Getting Set Up 

1.  As usual, start by going to the homework 
    page, read the <Link to="/homeworks/homework5">homework 
    5 description</Link>, and <Link to={frontMatter.github_link}>check out your 
    copy of the skeleton code</Link>.

2.  If you're using: 
    1. `systemsX` to work on 
    this homework, you'll need a unique port 
    number to run your webserver, which is mentioned in spreadsheet at the bottom of the homework 5 description.
    
    2. Docker container, you can use any port number in your container, but the default forwarded port metioned in the `devcontainer.json` is `5000`.

3.  In this homework, you will be developing a web based chat program. This
    requires you to understand the basics of socket programming, and HTTP. In
    this lab session, we will be discussing the network programming aspects of
    the homework. 

## Socket Programming

1.  There is an excellent guide to network programming at
    http://beej.us/guide/bgnet/. You should definitely read this guide.
    Go read it now.

2.  Open `server.c` and locate the main function. We will go through the
    important steps that this code takes to set up a listening server socket.
    While this is mostly boilerplate that doesn't change much from one
    implementation to another, it's important to understand the purpose of each
    of these network function calls.

3.  The first thing we do is get the port number from the command line
    arguments, and convert it from a string to an integer using the atoi
    function. (Use "man atoi" to find out more about this function.)

    ```c
    port = atoi(argv[1]);
    ```

4.  Next we need to create a socket for clients to connect to our webserver.
    This is all abstracted away in the `Open_listenfd` function from `csapp.c`,
    so let's take a look inside it. `Open_listenfd` (with an uppercase O)
    performs some simple error handling, so let's take a look at
    `open_listenfd(int port)` from `csapp.c`. The first important thing it does
    is create a socket:

    ```c    
    if ((listenfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    ```

    These options cause the operating system to set up a reliable in order
    bytestream using an IPv4 address.

5.  Now, we need to set the socket options to allow reusing the 
    port instantly after the socket is closed. To disable the wait time for rebinding the socket, we set the following socket options:

    ```c
    setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, (const void *)&optval,
                 sizeof(int))
    ```

    Visit the man page of `setsockopt` to understand what each of the function parameters mean.

5.  Next, we bind our socket to a port. Here we're saying our socket is
    IPv4, that it should listen on any available address, and that it should use our port number.

    ```c
    bzero((char *)&serveraddr, sizeof(serveraddr));
    serveraddr.sin_family = AF_INET;
    serveraddr.sin_addr.s_addr = htonl(INADDR_ANY);
    serveraddr.sin_port = htons((unsigned short)port);
    if (bind(listenfd, (SA *)&serveraddr, sizeof(serveraddr)) < 0) return -1;
    ```

6.  Now we have to actual listen to our socket, in case anyone
    tries to connect to us. We do this like so:

    ```c
    listen(listenfd, LISTENQ) < 0)
    ```

7.  Now we can return to `server.c`. Here is where we will see our main "event
    loop" (shown below). The call to `Select()` will instruct the operating
    system to put our process to sleep until ANY of the file descriptors in
    `pool.ready_set` has new data to receive. Once any of them have data for
    us, then we can process it, do what we need to do based on that new data,
    and go back to sleep.

    One special thing about `Select` and server sockets in particular is that
    we included the `listenfd` in the read set, even though we'll never
    specifically `recv` from it. This is because server sockets are special:
    they show up as "readable" when a client has connected and thus we can call
    `accept()` on that file descriptor to create a new file descriptor which we
    can use to communicte with a new client.
    
    ```c
    while (1) {
        /* Wait for listening/connected descriptor(s) to become ready */
        pool.ready_set = pool.read_set;
        pool.nready = Select(pool.maxfd + 1, &pool.ready_set, NULL, NULL, NULL);

        /* If listening descriptor ready, add new client to pool */
        if (FD_ISSET(listenfd, &pool.ready_set)) {
        connfd = Accept(listenfd, (SA *)&clientaddr, &clientlen);
        add_client(connfd, &pool);
        }
        // perform the relevant protocol steps for each FD that has bytes available
        check_clients(&pool);
    }
    ```

9.  Answer the questions on socket programming on Gradescope.

10. Now in our code we call a function that will actually use the
    socket. Before we look at that function, let's learn a little about the HTTP protocol.


## HTTP Protocol

1.  The client will start by sending us a request that will look like

    ```
    GET <filename> HTTP/1.0
    \r\n\r\n
    ```

2.  For our purposes, the things we need to be able to do are to tell when the
    request is complete (which we can do by look for the control sequence it will
    always end with).

3.  Assuming the server is configured to send back a file for a given request,
    it will respond the following header, followed by the bytes which make up
    the file.

    ```
    HTTP/1.0 200 OK\r\n
    Content-type: text/html; charset=UTF-8\r\n\r\n
    ```

## Running and Testing Web Server Code 

1.  If you are running in a Docker container evironment you can run and test
    your program locally. However, if you're using `systemsX`, you will need to
    forward ports from the systemsX machine to your local machine. The format
    for this command is:

    ```bash
    ssh -L localPort:localhost:remotePort netid@systemsX.cs.uic.edu
    ```
    which makes `http://localhost:remotePort` on `systemsX` accessible on your local machine at `http://localhost:localPort`.

    For instance, if you are assigned port 33000, and want to test your code
    locally, you can do so by connecting to `systems1` like so:

    ```
    ssh -L 33000:localhost:33000 ckanich@systems1.cs.uic.edu
    ```

    And then as long as that ssh session is connected, there is a "tunnel" that sends any connections made to your local computer at port 33000 on `systems1.cs.uic.edu`

## Peer evaluation rubric

You can find your pairings for the lab in <Link to={frontMatter.pairings}>this sheet</Link>. Please grade your peers out of **1 point** using <Link to={site.eval_link}>this form</Link>.

| Session | Task | Points |
|---|---|---|
| Session A | Discuss questions 1, 2, and 3 | 1 point |
| Session B | Discuss questions 4 and 5 | 1 point |


## Total grade calculation

| Task | Points |
|---|---|
| Turn in the Gradescope assignment | 6 points |
| Discuss your answers | 1 point |
| Evaluate another student | 1 point |
| Total points | 8 points |