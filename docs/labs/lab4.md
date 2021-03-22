---
title: week 5 lab 
description: Dynamic Libraries 
layout: default
due: Monday, February 8 5pm Chicago time
date: 2021-02-08T17:00:00
github_link: https://classroom.github.com/a/PGPE9s17  
pairings: https://docs.google.com/spreadsheets/d/1sEpTvzcamS-VkBauhNrEil24HiMjEASGPu04e5mG9pA/ 
---

# Lab 4: {{page.description}}
In this lab, you will learn how to create and use dynamic libraries which helps you solve part 4 of homework 2. In the first half of the lab, you will be working on Lab 5's assignment on [Gradescope]({{site.gradescope}}). For the second half, you will do a recap of the activities with your partner. You can find your pairings for the lab in [this sheet]({{page.pairings}}). 

## Setting up your environment

1. Before we begin, accept the assignment at [this github classroom link]({{page.github_link}}). The github repository contains the practice code for this lab session. Check out the repository after logging in to systems[1-4].cs.uic.edu or clone the repository and open your workspace in the development container. 
2. Run `make` to create the compiled binary executable `uselib`. Try running it with `./uselib`. You should get an error that says "./uselib: error while loading shared libraries: libsess3.so: cannot open shared object file: No such file or directory".
3. This error is telling you that your runtime environment cannot find the shared library `libsess3.so` that the `uselib` executable depends on. In order to tell it where to look for this library, you will need to set the `LD_LIBRARY_PATH` environment variable. To do this, run the command `export LD_LIBRARY_PATH=<your current directory>:$LD_LIBRARY_PATH` with `<your current directory>` changed appropriately. You can use `PWD` environment variable which points to the current directory: `export LD_LIBRARY_PATH=$PWD:$LD_LIBRARY_PATH`
4. If you rerun `./uselib` it should now run.
5. Answer the first Gradescope question.


## A) Using Dynamic Libraries

1. Look at the source code for the shared library (`sess3.h` and `sess3.c`), and the source code for uselib (`uselib.c`). Run `make` (if you haven't) to create both the shared library and the program that uses it, and run uselib to see what it does.
2. Create a new C file, `tryshared.c`, that uses the "sayHi" method from `sess3.h`. 
3. Add new lines to the Makefile to compile `tryshared.c`. You should be able to use the Makefile entry for `uselib.c` as a guide. Try compiling just your new program, without recompiling `libsess3.so`.
4. Run your new program to see that it successfully uses the shared library code.
5. Now, in `sess3.c`, change the "sayHi" method so that it prints "361 rocks" instead of "Hi 361." Recompile **ONLY** the shared library by typing `make libsess3.so`. 
6. Run `uselib` and `tryshared`. Has what they print changed? Remember, you have not recompiled them.
7. Answer the second and third questions on Gradescope.


## B) Creating Your Own Dynamic Libraries

1. Now, write code to create your own shared library, and a program that uses it. Use `sess3.h` and `sess3.c` as examples for your shared library, but you can write functions in your library that do whatever you want. Write code like `uselib.c` that uses the functions in your shared library. You can name both your shared library and your program anything you like. 
2. Start adding code to the Makefile to compile the shared library you wrote. First, you will need to compile your code into a position independent object file, using the `-fpic` flag. (For `libsess3.so`, this is the line `gcc -c -Wall -Werror -fpic sess3.c`)
3. Next, add a line to compile the object file you just created into a shared library with the `-shared` flag. (For `libsess3.so`, this is the line `gcc -shared -o libsess3.so sess3.o`). The name of your shared library file should begin with `lib` and end with `.so`.
4. Add lines to the Makefile to compile the code that uses your shared library. In order to do this, you will need to tell gcc where to you look for your library, and which library to look for. 
    - Where to look for libraries: "`-L`**path**" tells gcc where to look for libraries. For `libsess3.so`, we use `-L$(PWD)`, using the `PWD` environment variable to tell gcc to look in the current directory. 
    - Which library to use: We use `-lsess3` to tell gcc to use `libsess3.so`. gcc assumes that all libraries begin with `lib`, and end with `.so` or `.a`, so you just need to specify the rest of the name, starting with `-l`.
5. Answer the remaining Gradescope questions.


## Peer evaluation rubric

Please grade your peers out of **2 points** using [this form]({{site.eval_link}}).

| Session | Task | Points |
|---|---|---|
| Session A | Walk through the steps of section (A) and getting answers for question 2 & 3 | 2 points (1 point per question) |
| Session B | Walk through the steps of section (B) and getting answers for question 4 & 5 | 2 points (1 point per question) |
{: class="table table-striped"}

## Total grade calculation

| Task | Points |
|---|---|
| Turn in a Gradescope assignment | 3 points |
| Demonstrate your approach for finding the answers | 2 points |
| Evaluate another student | 2 points |
| Total points | 7 points |
{: class="table table-striped"}

## Timing 

Start exploring the code on the practice code individually and answering the Gradescope questions as soon as the lab section starts. Session A runs from 30:40 and session B will run from 40:50.

If your grader isn't in lab, contact the TA and they will either pair you up with someone else or evaluate you. If the person you are in charge of grading isn't in the lab, you can evaluate a TA.

You can **only** evaluate/be evaluated by the person who you are assigned, **or** someone that the TA has designated. Anyone who submits an evaluation besides this will receive a zero for the lab. You will only receive points if you show up in your registered lab section.

## Hint on Solving Part 4 of Homework 2:

1. To get binary 4 to run, you will need to create your own shared library, to replace the one it expects. This shared library will need to contain a specific function, with a specific name. 
2. The error you get when you first try to run 4 should let you know the name of the shared library you need to create. Once you create a library with this name and make sure binary 4 knows how to find it (by setting the environment variables described in the first section), you should be able to get binary 4 running a little longer.
3. Now you need to figure out what functions binary 4 is trying to use in the shared library (If only you had some sort of tool that told you what library calls a binary was making)
4. Once you're calling a function with the right now, you need to figure out what 4 expects that function to do. Fortunately, 4 has some helpful assert statements that should tell you if the function is returning what it expects.

