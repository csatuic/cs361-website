---
title: Homework 2
due: 
    type: due
    title: Homework 2
    date: 2021-10-01T22:59:59-6:00
    description: 'Assignment #2 due'
date: 2021-09-20
github_link: https://classroom.github.com/a/KAqvhMv3 
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

## Inspecting Running Processes



####  The Challenge!

In the last homework you looked at the symbol table of your own compiled program. This time we'll be watching and interacting with precompiled programs as they execute.

Before you start, please make sure to set up your environment correctly. You have two options for this homework:

1. Use `systems[1-4].cs.uic.edu` (e.g. systems1, systems2, etc.), or
2. Use the `.devcontainer` folder that is included with the skeleton code to set up your Docker container environment. **Before opening your workspace in the container, you need to modify both `Dockerfile` and `devcontainer.json` files and replace the `netid` with your UIC NetID (`ARG USERNAME=netId` and `"remoteUser": "netId"`).** 

We covered the second option during <Link to="/labs/lab03">Lab 3</Link>. Make sure when you run `whoami` command in the terminal, it returns your UIC NetID. <u>**Please note that if the result is different than your NetID, your secrets will not be accepted by the autograder.**</u>

<>The skeleton code for this assignment is available through <Link to={frontMatter.github_link}>this GitHub Classroom assignment</Link>. You must use GitHub classroom to
write your code and keep a commit log on GitHub. You can submit the code via
Gradescope.</>

Your task will be to fill out two files in your personal repository called `secrets.txt` and `howto.txt`. 

The format for `secrets.txt` should be:

```
0. these  
1. are  
2. not  
3. real  
4. secrets  
```

`howto.txt` is also **required**: you must describe in English how to find the secret for that given executable. Each individual howto should be on one more more lines after a line with only the executable number and a period on it, like so:

```
0.  
This was the really easy one. You had to run it and then type in the secret of life.  
1.  
For this one, I had to:  
* Run a specific unix utility to learn some specific information  
* Perform some specific task that I found out about by checking part of a specific line in the output of the unix utility.  
...
```

Your `howto.txt` should enable any other CS 361 student to find the password within a minute of reading it.

### Warning

You must complete this assignment on `systems[1-4].cs.uic.edu` or the specified Docker container. Failure to do so will result in a zero.

You will not be given any other files to complete secret findings except the 5 executable files.

#### Hints:

Open your `howto.txt` alongside your shell as you work on each executable file, and use it to take notes. If you don't give a full description of how to arrive at the answer, you may not receive points. 

The content of lab section will cover basic usage of `gdb`, `strace` and `ltrace` which will be incredibly helpful for this assignment. 

`./4` is the "final boss" of this assignment (and is thus worth more points). It tests the implementation of a dynamically linked library, so it will leverage all of your skills that you've developed while studying chapter 7.

#### Template 

The executable files are available in the classroom repository and can be accessed using the link above.

### Turn-in instructions and Grading

Both `secrets.txt` and `howto.txt` **must be submitted to Gradescope via GitHub**. While grading `secrets.txt` will be done automatically, the `howto.txt` will be graded by hand. You should have both files in your submission. If you do not fill `secrets.txt` out exactly as directed, autograding will fail. If you do not complete your assignment on any of `systems[1-4].cs.uic.edu` machines or the Docker container, autograder may fail. If you have issues with the autograder, please contact us via Piazza ASAP. **Technical issues within 36 hours of the deadline will not be an excuse for submitting the assignment improperly or late.**

The first 4 are each worth 1 point each, the final one is worth 4 points. An additional 2 points will be given for each correct howto.

### Due Date

<>
This assignment is due at {new Date(frontMatter.due.date).toLocaleString('en-us')} in time zone {Intl.DateTimeFormat().resolvedOptions().timeZone}. See the <Link to="/syllabus">syllabus</Link> for the late turn-in policy. This assignment is worth just as much as every other homework, so getting as much credit on it as possible is important (don't turn it in late!).
</>
