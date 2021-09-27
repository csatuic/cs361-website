---
title: Lab 4 
description: Dynamic Libraries 
layout: default
date: 2021-09-27T17:00:00-6:00
---
import Link from '@docusaurus/Link';

# Lab 4: Dynamic Libraries
In this lab, you will learn how to create and use dynamic libraries which helps you solve part 4 of homework 2.For the first part of the lab, you will be using existing dynamic library and then creating your own dynamic library. For the second part you will be completing the gradescope quiz.

## Setting up your environment

1. Before we begin, accept the assignment at [this github classroom link](https://classroom.github.com/a/pBqI0fin). The github repository contains the practice code for this lab session. Check out the repository after logging in to systems[1-4].cs.uic.edu or clone the repository and open your workspace in the development container. 
2. Run `make` to create the compiled binary executable `uselib`. Try running it with `./uselib`. You should get an error that says "./uselib: error while loading shared libraries: libsess4.so: cannot open shared object file: No such file or directory".
3. This error is telling you that your runtime environment cannot find the shared library `libsess4.so` that the `uselib` executable depends on. In order to tell it where to look for this library, you will need to set the `LD_LIBRARY_PATH` environment variable. To do this, run the command `export LD_LIBRARY_PATH=<your current directory>:$LD_LIBRARY_PATH` with `<your current directory>` changed appropriately. You can use `PWD` environment variable which points to the current directory: `export LD_LIBRARY_PATH=$(PWD):$LD_LIBRARY_PATH`
4. If you rerun `./uselib` it should now run.
5. Answer the first Gradescope question.


## A) Using Dynamic Libraries

1. Look at the source code for the shared library (`sess4.h` and `sess4.c`), and the source code for uselib (`uselib.c`). Run `make` (if you haven't) to create both the shared library and the program that uses it, and run uselib to see what it does.
2. Create a new C file, `tryshared.c`, that uses the "sayHi" method from `sess4.h`. 
3. Add new lines to the Makefile to compile `tryshared.c`. You should be able to use the Makefile entry for `uselib.c` as a guide. Try compiling just your new program, without recompiling `libsess4.so`.
4. Run your new program to see that it successfully uses the shared library code.
5. Now, in `sess4.c`, change the "sayHi" method so that it prints "361 rocks" instead of "Hi 361." Recompile **ONLY** the shared library by typing `make libsess4.so`. 
6. Run `uselib` and `tryshared`. Has what they print changed? Remember, you have not recompiled them.
7. Answer the second and third questions on Gradescope.


## B) Creating Your Own Dynamic Libraries

1. Now, write code to create your own shared library, and a program that uses it. Use `sess4.h` and `sess4.c` as examples for your shared library, but you can write functions in your library that do whatever you want. Write code like `uselib.c` that uses the functions in your shared library. You can name both your shared library and your program anything you like. 
2. Start adding code to the Makefile to compile the shared library you wrote. First, you will need to compile your code into a position independent object file, using the `-fpic` flag. (For `libsess4.so`, this is the line `gcc -c -Wall -Werror -fpic sess4.c`)
3. Next, add a line to compile the object file you just created into a shared library with the `-shared` flag. (For `libsess4.so`, this is the line `gcc -shared -o libsess4.so sess4.o`). The name of your shared library file should begin with `lib` and end with `.so`.
4. Add lines to the Makefile to compile the code that uses your shared library. In order to do this, you will need to tell gcc where to you look for your library, and which library to look for. 
    - Where to look for libraries: "`-L`**path**" tells gcc where to look for libraries. For `libsess4.so`, we use `-L$(PWD)`, using the `PWD` environment variable to tell gcc to look in the current directory. 
    - Which library to use: We use `-lsess4` to tell gcc to use `libsess4.so`. gcc assumes that all libraries begin with `lib`, and end with `.so` or `.a`, so you just need to specify the rest of the name, starting with `-l`.
5. Answer the remaining Gradescope questions.

Complete the [Gradescope Quiz](https://www.gradescope.com/courses/293389/assignments/1527117)

## Total grade calculation

| Task | Points |
|---|---|
| Turn in a Gradescope Quiz | 10 points |
| Total points | 10 points |

## Hint on Solving Part 4 of Homework 2:

1. To get binary 4 to run, you will need to create your own shared library, to replace the one it expects. This shared library will need to contain a specific function, with a specific name. 
2. The error you get when you first try to run 4 should let you know the name of the shared library you need to create. Once you create a library with this name and make sure binary 4 knows how to find it (by setting the environment variables described in the first section), you should be able to get binary 4 running a little longer.
3. Now you need to figure out what functions binary 4 is trying to use in the shared library (If only you had some sort of tool that told you what library calls a binary was making)
4. Once you're calling a function with the right now, you need to figure out what 4 expects that function to do. Fortunately, 4 has some helpful assert statements that should tell you if the function is returning what it expects.

