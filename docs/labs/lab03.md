---
title: week 4 lab
description: Program Debugging
layout: default
due: Monday, Februrary 1st 5pm Chicago time
date: 2021-02-01T17:00:00
# notes get passed through markdownify
github_link: https://classroom.github.com/a/-Br3s7dU
# skeleton_repo: csatuic/cs361-lab4-skeleton
pairings: https://docs.google.com/spreadsheets/d/1UzNHmKtnI5PjRSwy5UTWnm3Ys15FnLZ9LV19HhO49fk
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'



## Lab 3: Program Debugging

<>
In this lab, you will explore some debugging tools which are helpful when trying to debug a fully compiled executable. 
The lab has two deliverables. First, you need to work on your own and complete the Lab 3 assignment on Gradescope. Second, you would do a recap of the activities with your partner. You can find your pairings for the lab in <Link to={frontMatter.pairings}>this sheet</Link>.
</>

## gdb

1.  Before we begin, log in to `systems[1-4].cs.uic.edu` or your docker devcontainer, and accept the assignment at [this github classroom link](https://classroom.github.com/a/-Br3s7dU) which contains the practice code for this lab session. For this practice session, we are giving you the source code for the files you will be practicing on - in the homework, you will get only the binaries.

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
    executable. The first line of output we're interested in looks like:\
    `write(1, "Hello, operating system", 24Hello, operating system\
    ) = 24"`\
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

6.  Answer the questions about strace on gradescope.

## ltrace

1.  ltrace is much the same as strace, except that it prints out calls
    to shared libraries, rather than system calls.

2.  Run ltrace on the tryltrace executable with `ltrace ./tryltrace`.

3.  Notice that the ltrace output is almost identical to strace, except that it prints out library calls, rather than system calls. Try running both strace and ltrace on both binaries to see the differences in what they print out.

4.  All of the strace options listed above will also work for ltrace.

5.  Answer the questions about ltrace on gradescope.


## Peer evaluation rubric


<>Please grade your peers out of 3 points using <Link to={site.eval_link}>this form</Link></>.

| Session | Task | Points |
|---|---|---|
| Session A | Walk through the steps of getting answers for question 1, 2 & 3 | 3 points (1 point for each question) |
| Session B | Walk through the steps of getting answers for question 4, 5 & 6 | 3 points (1 point for each question) |

## Total grade calculation

| Task | Points |
|---|---|
| Turn in a Gradescope assignment | 3 points |
| Demonstrate your approach to finding the answers | 3 points |
| Evaluating another student | 3 points |
| Total points | 9 points |

## Timing 

Start exploring the tools on the practice code individually as soon as the lab section starts. Session A run from 30:40 and session B will run from 40:50. 

If your grader isn't in lab, contact the TA and they will either pair you up with someone else or evaluate you. If the person you are in charge of grading isn't in the lab, you can evaluate a TA.

You can **only** evaluate/be evaluated by the person who you are assigned, **or** someone that the TA has designated. Anyone who submits an evaluation besides this will receive a zero for the lab. You will only receive points if you show up in your registered lab section.
