---
title: Lab 5
description: Intro to shells
layout: default
date: 2021-10-4T17:00:00-6:00
github_link: https://classroom.github.com/a/7Zg4hHQd
gradescope_quiz: https://www.gradescope.com/courses/293389/assignments/1547021
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

# Lab 5: Intro to shells

In this lab, we will be writing a shell program.  A shell is the program that all of you use when
you ssh to a linux machine, or hit ``ctrl+` `` to open a terminal in vscode. It's the program which
prints out a prompt, reads in what you type, and then executes whatever instruction you told it to
do.  It is different from ssh (which is the program you use to connect to the server), or linux
(which is the OS on which your shell is running). The basic
loop for our (and any) shell, will be:

* Prompt the user
* Read and parse the command the user types in
* Create a new process to run the command the user typed
* Wait for the new process to end print the previous command's exit status if the user types the command `?`
* Start over with the prompt


## The high level structure of a shell

To start this week's lab, <Link to={frontMatter.github_link}>accept Homework 3</Link> via GitHub.

This skeleton code
is a slightly modified version of the basic shell that is presented in the book in Chapter 8. In
homework 3, we will be using `spawn` (instead of `fork`), to run simple commands and then we will be 
adding the ability to handle signals and file redirection. This week's lab will help you do the first step.

> If you'd like to go over the absolute basics of creating new processes and running different
> programs, checkout [these sample programs](https://github.com/uic-cs361/cs361-lab5-example).

To get started, clone the homework repository and get it started - as usual, you can either do this on your
laptop via a devcontainer or a systemsX machine on campus.

Take a close look at `spawnshell.c`, and give yourself some time to understand what each function does.

* `eval` takes as input one string written by the user.
    * `parseline` separates that one long string into an `argv` style collection of pointers to the
      individual "words" of the command, detects composed commands and returns a struct containing
      information about the parsed line.
    * `builtin_command` checks to see whether the user entered a special command, like `exit`. If
      there's a special command, you don't need to create a new process, because it's something the
      shell should take care of.

> Suggested activity: convince yourself that you understand how `parseline` is manipulating `buf`
> and `argv`.

## How a spawn based shell works

A spawn based shell is nearly identical to a fork based shell, however spawn only returns once, and
it returns success or failure, rather than returning the process id. You will have to create a
variable to store the process id, and pass it **by reference** to the `posix_spawn` or `posix_spawnp` 
function.

## What you need to do for this lab

For the first half of the lab, you will be working on your own to understand `spawnshell.c` and 
complete the `exec_cmd` function so that your shell can run simple commands (e.g., `ls -la`) . 
For the second half complete the <Link to={frontMatter.gradescope_quiz}>Gradescope Quiz</Link>.

Note: you can use the [sample programs](https://github.com/uic-cs361/cs361-lab5-example) to complete
`exec_cmd` and answer questions 1 (hint: use `strace`).

## Total grade calculation

| Task | Points |
|---|---|
| Turn in a Gradescope Quiz | 10 points |
| Total points | 10 points |

# Getting started on Homework 3

Accept Homework 3 if you haven't already, and open it up. Your task for the remainder of the lab is
to complete the `exec_cmd` function (indicated with `Lab 5 TODO:`) in `spawnshell.c` so that it uses `posix_spawn` to run simple 
commands. You can take a look at the `posix_spawn` man page and the sample code to
get an idea of how to spawn a child process. 
Note that using `posix_spawnp` makes life a little easier because it uses the `$PATH`
environment variable to find executables. For instance, in `posix_spawn` you will need to use 
`/bin/ls` to run `ls` command while `ls` works in `posix_spawnp`.

## Testing Homework 3

One very important component of all software engineering is testing. Rather than doing our testing
for this assignment via the autograder right away, we will be showing you how you can test the full
functionality of your shell. You're encouraged to write your own test cases to determine whether your
code is working correctly.

## Using input redirection to test a shell

One important concept we'll go over this week is file redirection. In short, file redirection allows
you to read your program's input from a file, rather than from the keyboard.

For instance, if you have a file `input` that has the lines:

```
/bin/echo hello world
/bin/echo CS361 > cs361.txt
/bin/ls -ltr | grep spawn
/bin/echo hello &
```

You can feed it to a new instance of a shell program by redirecting the input from that file by
adding the `<` character as an argument, then the name of the file:

```
cs361@home-desktop:~/repos/shell-skel$ sh < input 
```

> Suggested activity: Ask yourself what you expect will happen when you run `sh < input`, then
> create this file on your machine and feed it to the shell `sh` and see what happens.

In addition to using `sh`, you can also run the skeleton code for the assignment in the same way,
and see that it works properly.

> Ask yourself: how can you convince yourself that it is working properly? Hint: read the output of
> `man diff` and try to think of a way to use that tool to determine whether your shell is running
> properly (note: not that it's using `posix_spawn`, just that it is working as you expect it to).

## Receiving redirected input vs. redirecting input ourselves

Redirected input is a tricky topic. Every process has its own input and output files, and it doesn't
care whether they are connected to terminals, files, or other cool things like network connections.
By testing our shell _using_ input redirection, our shell doesn't need to _understand_ input
redirection. However, over the course of the next two weeks, you'll need to add input redirection to
your shell, so that, for instance, you could run a set of commands like this:

```
pwd
ls > list_of_files
cat < list of files
```

...and it would work the way that `sh` works when given that set of inputs.