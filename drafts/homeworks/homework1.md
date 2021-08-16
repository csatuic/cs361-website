---
title: homework 1
description: linux executable format
# liquid shortcoming: can't manipulate objects in templates that well,
# so you need to duplicate relevant info in the 'due' object for rendering in the entire 
# class schedule.
layout: default
due:
  type: due
  title: homework 1
  date: 2021-01-22T16:59:59-6:00
  description: linux executable format
date: 2021-01-15
github_link: https://classroom.github.com/a/JducbSC2
# skeleton_repo: 'csatuic/cs361-hw1-skeleton'
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

## The ELF format

This homework is meant to get you familiarized with the concept of
symbols and how they relate to compiling and linking executables.

We covered using git in the week 1 video and discussion section, but if you're still not that familiar
with it, this assignment is a second chance to get up to speed. Remember: git
gives you warnings and errors _for good reason_, if it complains at the command
line when you run a command, don't just assume it's completed correctly!


<>The skeleton code for this assignment is available through <Link to={frontMatter.github_link}>this GitHub Classroom assignment</Link>. You must use GitHub classroom to
write your code and keep a commit log on GitHub. You can submit the code via
Gradescope.</>

Now that you have the skeleton code, you can start coding. You should commit
early and often, and push to your remote repository whenever is convenient to
back up your work!

## Programming environment

This assignment was created in an Ubuntu 18.04 based environment. The
skeleton code comes with a `devcontainer` setup script so that running
it in a remote container through Visual Studio Code will put you in the
same environment. This assignment is simple enough that any Linux
environment with an up to date `gcc` should be sufficient, including
`systems1.cs.uic.edu`. If you aren't/can't/don't want to complete this
assignment using vscode remote containers, feel free to complete this on
a lab machine, a local Linux VM, or elsewhere.

## The Programming Part!

This part will give you a quick introduction to using `readelf` to better
understand the linking process.

In this assignment, you must fill `hw1.c` with code which will:

1. cause your UIC netID (and nothing else) to be printed on the first line of output when the program is run.
3. cause `gcc -c -Wall hw1.c` and `gcc -Wall -o hw1 *.c` to issue zero warnings (and zero errors).
2. cause Type, Bind, and Ndx of each Symbol to be the same as in the
   example below. E.g. `important` must have Type `FUNC`, Bind `LOCAL`,
   and Ndx `1`.

Running `readelf -sW hw1.o` on the solution results in:

|Num: |  Value  |       Size|Type |  Bind | Vis   |  Ndx|Name|
|---|---|---|---|---|---|---|---|
 | 0: | 0000000000000000 | 0 | NOTYPE | LOCAL | DEFAULT | UND | 
 | 1: | 0000000000000000 | 0 | FILE | LOCAL | DEFAULT | ABS | hw1.c | 
 | 2: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 1 | 
 | 3: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 3 | 
 | 4: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 4 | 
 | 5: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 5 | 
 | 6: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 6 | 
 | 7: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 8 | 
 | 8: | 0000000000000008 | 4 | **OBJECT** | **LOCAL** | DEFAULT | **3** | **order** | 
 | 9: | 0000000000000000 | 4 | **OBJECT** | **LOCAL** | DEFAULT | **4** | **isnt** | 
 | 10: | 0000000000000000 | 58 | **FUNC** | **LOCAL** | DEFAULT | **1** | **important** | 
 | 11: | 0000000000000010 | 8 | **OBJECT** | **LOCAL** | DEFAULT | **3** | **for_these**.3824 | 
 | 12: | 0000000000000008 | 8 | **OBJECT** | **LOCAL** | DEFAULT | **4** | **symbols**.3825 | 
 | 13: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 11 | 
 | 14: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 12 | 
 | 15: | 0000000000000000 | 0 | SECTION | LOCAL | DEFAULT | 10 | 
 | 16: | 0000000000000020 | 100 | **OBJECT** | **GLOBAL** | DEFAULT | **COM** | **but_the** | 
 | 17: | 0000000000000000 | 8 | **OBJECT** | **GLOBAL** | DEFAULT | **3** | **types** | 
 | 18: | 0000000000000000 | 15 | **OBJECT** | **GLOBAL** | DEFAULT | **5** | **scopes** | 
 | 19: | 0000000000000000 | 8 | **OBJECT** | **GLOBAL** | DEFAULT | **6** | **and_the** | 
 | 20: | 0000000000000000 | 8 | **OBJECT** | **GLOBAL** | DEFAULT | **8** | **indices** | 
 | 21: | 0000000000000000 | 0 | **NOTYPE** | **GLOBAL** | DEFAULT | **UND** | **definitely** | 
 | 22: | 000000000000003a | 32 | **FUNC** | **GLOBAL** | DEFAULT | **1** | **matter** | 
 | 23: | 000000000000005a | 44 | FUNC | GLOBAL | DEFAULT | 1 | main | 
 | 24: | 0000000000000000 | 0 | NOTYPE | GLOBAL | DEFAULT | UND | _GLOBAL_OFFSET_TABLE_ | 
 | 25: | 0000000000000000 | 0 | **NOTYPE** | **GLOBAL** | DEFAULT | **UND** | **puts** | 

As a further hint, here's the mapping between the Section Index and the
Section Names:

```
Section Headers:
  [Nr] Name              
  [ 0]                   
  [ 1] .text             
  [ 2] .rela.text        
  [ 3] .data             
  [ 4] .bss              
  [ 5] .rodata           
  [ 6] .data.rel.local   
  [ 7] .rela.data.rel.local
  [ 8] .data.rel         
  [ 9] .rela.data.rel    
  [10] .comment          
  [11] .note.GNU-stack   
  [12] .eh_frame         
  [13] .rela.eh_frame    
  [14] .symtab           
  [15] .strtab           
  [16] .shstrtab          
  ```

Hints:

* The four digit numbers do not need to made identical, but you do need to make
  them show up. Keep experimenting with different variable types until you find
  how to create variables with periods and numbers on them.
* Order for the symbols does not matter. Take a close look at Chapter 7 and think about 
  what properties of a variable put it in a different section, or would give it a different
  Binding or Type. Everything you need to know to solve this puzzle is in the book.

## Template 

There is a very bare bones skeleton and a `Makefile` provided for this
assignment. The skeleton file is worth two points because it compiles with no
warnings and no errors.

## Grading
Grading will be done automatically using Gradescope. Submitting to
GitHub is not sufficient - your code must be submitted to Gradescope. If
you have issues with the autograder, please contact us via Piazza ASAP.
**Technical issues with submitting your assignment is not an acceptable
excuse for submitting the assignment improperly or late.**

## Due Date

<>This assignment is due {new Date(frontMatter.due.date).toLocaleString('en-us')} in time zone {Intl.DateTimeFormat().resolvedOptions().timeZone}. See the <Link to="/syllabus">syllabus</Link> for the late turnin policy. This
assignment is worth just as much as every other homework, but is easier than all
the rest (in our opinion) so getting as much credit on it as possible is
important!</>

## Helpful Documents

Chapter 7 in the book
