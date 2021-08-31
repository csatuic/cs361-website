---
title: Lab 1
description: course intro
layout: default
date: 2021-08-30T17:00:00-6:00
# notes gets passed through markdownify

 
---

# Development Environment and Basic Commands 

In this lab, we will go over setting up your development environment and learning the expected workflow for assignment submission. Our goal is to ensure that all students have set up their environment and are familiar with the submission process. For all assignments, you can either use your development environment or SSH to `systems[1-4]` using `ssh YOUR-NET-ID@systems1.cs.uic.edu` command. Moreover, during this lab, we will cover some basic Linux and Git command which are helpful throughout this semester.

The deliveries for this lab:

1. Read [Learning Basic commands](https://docs.google.com/document/d/1QYvUGkOxQEcRDI7CS7dk-MAKphFOB7dd1DuX4ZgQtsY) and [SSH key-based authentication](https://docs.google.com/document/d/160fMo-6Qp2nkm_4ALBMaZezHmllhkOAH3IVPlDBRao8) tutorials. In case you are using `systems[1-4]`, the tutorial also helps you setting up SSH key-based authentication on `systems[1-4]`. We will use some of the basic commands to complete the lab assignment.
2. Visit [this GitHub classroom link](https://classroom.github.com/a/tQb_z3bT) and accept the assignment (if you haven't already). 
3. While we are using the same repository as Homework 0, the requirements for the lab assignment are bit different to help you get familiar with Linux and Git commands. In addition to writing a program that returns 42 you are to:
   1. Create a new **hidden file** in the main directory and name it `lab1`. In Unix-like operating systems, any file or folder that starts with a dot (e.g., `.filename`) is treated as hidden. 
   2. Remove `README.md` file from your repository. 
   3. Stage and commit the changes and push them to the remote repository. After this, your remote repository must only have the following files and folders: `.devcontainer`, `.gitignore`, `Makefile`, `hw0.c`, `lab1`. Make sure no additional files or folders exist in your repository. 
   4. Submit the modified repo to [this Gradescope assignment](https://www.gradescope.com/courses/293389/assignments/1448465) .
3. Finally, complete [this Gradescope quiz](https://www.gradescope.com/courses/293389/assignments/1448302).


## Total grade calculation

| Task | Points |
|---|---|
| Lab 1 Submission (autograder) | 5 point |
| Lab 1 Quiz | 4 point |
| Total points | 9 points |
