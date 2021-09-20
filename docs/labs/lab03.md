---
title: Lab 3
description: Program Debugging with gdb,strace & ltrace
layout: default
date: 2021-09-20T17:00:00-6:00
# notes get passed through markdownify


---
import Link from '@docusaurus/Link';

## Lab 3: Program Debugging

In this lab, you will explore some debugging tools which are helpful when trying to debug a fully compiled executable. You have to debug lab3 assignment with these tools and complete the Gradescope Quiz.

This lab also helps you get started with <Link to="/homeworks/homework2">Homework 2</Link>. You have two options for Homework 2:

1. Use `systems[1-4].cs.uic.edu` (e.g. systems1, systems2, etc.), or
2. Use the `.devcontainer` folder that is included with the skeleton code to set up your Docker container environment. **Before opening your workspace in the container, you need to modify both `Dockerfile` and `devcontainer.json` files and replace the `netid` with your UIC NetID (`ARG USERNAME=netId` and `"remoteUser": "netId"`).** 

In either case, when you run `whoami` command in the terminal, it should return your UIC NetID. If you are using containers (option 2), **please do this during the lab to make sure your environment is ready for Homework 2**.

## gdb

1.  Before we begin, log in to `systems[1-4].cs.uic.edu` or your docker devcontainer, and accept the assignment at [this github classroom link](https://classroom.github.com/a/OboRfTnp) which contains the practice code for this lab session. For this practice session, we are giving you the source code for the files you will be practicing on - but for homework, you will only get the binaries.

2.  Run make to compile the code.

3.  Start running gdb on the `trygdb` binary in gdb with the command
    `gdb ./trygdb`.

4.  Here are some useful gdb commands for you to use:

    1.  `run` - runs the attached binary

    2.  `list` - prints out the c source code, with line numbers

    3.  `break linenumber` - pauses the code before executing line
        linenumber

    4.  `continue` - starts the code again after a breakpoint

    5.  `print variable` - prints the current value of variable. You can also use `p variable`.

    6.  `watch variable` - will break when the variable you're watching changes

    7.  `set variable=value` - sets a variable to the value you specify

5.  Use the above commands to answer the questions about gdb on
    gradescope.

## strace

1.  strace is a debugging program that tells you all of the **system
    calls** a program makes. System calls are requests a program makes
    to the operating system - we will go over them in depth in class
    this week.

2.  Run strace on the trystrace executable with `strace ./trystrace`.

3.  strace will print out a bunch of systems calls, most of which are
    actually the operating system creating, loading and running the
    executable. The first line of output we're interested in looks like:
    `write(1, "Hello, operating system\n", 24Hello, operating system\
    ) = 24"`

    Note that this is actually one line `("write(1, "Hello, operating
    system", 24) = 24")` being interrupted by our program printing.

4.  This line tells us that the system call `write` was called (as a
    result of our printf call) on the parameters `1, "operating system", 24`,
    and had the return value of 24.

5.  Some helpful strace options to play around with:

    1.  `strace -e write` will only show you the calls to write. (You
        can substitute your favorite system call for write.)

    2.  `strace -f` will trace any processes spawned by the original
        process.

    3.  `strace -p pid` will attach strace to the process ID of a
        running process.

    4.  `strace -s x` will print the first x characters of any string
        (useful because strace truncates strings by default.)

6.  Use above commands to answer the questions about strace on gradescope.

## ltrace

1.  ltrace is much the same as strace, except that it prints out calls
    to shared libraries, rather than system calls.

2.  Run ltrace on the tryltrace executable with `ltrace ./tryltrace`.

3.  Notice that the ltrace output is almost identical to strace, except that it prints out library calls, rather than system calls. Try running both strace and ltrace on both binaries to see the differences in what they print out.

4.  All of the strace options listed above will also work for ltrace.

5.  Use above commands to answer the questions about ltrace on gradescope.

Complete this [Gradescope Quiz](https://www.gradescope.com/courses/293389/assignments/1505305)

## Total grade calculation

| Task | Points |
|---|---|
| Gradescope Quiz | 7 points |
| Total points | 7 points |

