---
title: Lab 2 
description: Symbol Table Lab
layout: default
date: 2021-09-13T17:00:00-6:00
# notes gets passed through markdownify

 
---

# Symbol table 

Symbol table is a data structure used by a language translator such as a compiler or interpreter, where each identifier (or symbol) in a program's source code is associated with information relating to its declaration or appearance in the source.  For this assignments, you can either use your development environment or SSH to `systems[1-4]` using `ssh YOUR-NET-ID@systems1.cs.uic.edu` command. 
The deliveries for this lab:

1. Visit [this GitHub classroom link](https://classroom.github.com/a/oDMrZs4R) and accept the assignment (if you haven't already). You can compile the code with `make` and check the symbol table with `make test`
2. Complete the To-Dos provided in the comment
   1. Import the `var_from_extra` variable from `extra.c` into `lab2.c` by adding a keyword to the declaration. 
   2. Change section value of `change_ndx_to_6` variable to 6. 
   3. Bind for `change_bind_to_local` variable is `GLOBAL` in the skeleton code. Change it to `LOCAL`. Hint: Expecting a keyword to be added in the declaration. 
   3. Make sure that `make_visible` variable from main function is visible in symbol by adding a keyword to the declaration.
   4. Stage and commit the changes and push them to the remote repository. 
   5. Submit the modified repo to [this Gradescope assignment](https://www.gradescope.com/courses/293389/assignments/1485190) .
3. Finally, complete [this Gradescope quiz](https://www.gradescope.com/courses/293389/assignments/1482802).

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
Your Final Symbol Table will look something like this:

|Num:|    Value       |     Size| Type  |  Bind | Vis    |  Ndx| Name|
|--|    --       |     --| --  |  -- | --    |  --| --|
| 0: |0000000000000000|     0 	|NOTYPE | LOCAL | DEFAULT|  UND|
| 1: |0000000000000000|     0 	|FILE   | LOCAL | DEFAULT|  ABS| lab2.c|
| 2: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|    1|
| 3: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|    3|
| 4: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|    4|
| 5: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|    5|
| 6: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|    6|
| 7: |0000000000000000|     4 	|**OBJECT** | **LOCAL** | DEFAULT|    **3**| **change_bind_to_local**|
| 8: |0000000000000004|     4 	|**OBJECT** | **LOCAL** | DEFAULT|    **3**| **make_visible**.2835|
| 9: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|    9|
|10: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|   10|
|11: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|   11|
|12: |0000000000000000|     0 	|SECTION| LOCAL | DEFAULT|    8|
|13: |0000000000000000|     8 	|**OBJECT** | **GLOBAL**| DEFAULT|    **6**| **change_ndx_to_6**|
|14: |0000000000000000|    52 	|FUNC   | GLOBAL| DEFAULT|    1| main|
|15: |0000000000000000|     0 	|**NOTYPE** | **GLOBAL**| DEFAULT|  **UND**| **var_from_extra**|
|16: |0000000000000000|     0 	|NOTYPE | GLOBAL| DEFAULT|  UND| _GLOBAL_OFFSET_TABLE_|
|17: |0000000000000000|     0 	|NOTYPE | GLOBAL| DEFAULT|  UND| printf|


## Total grade calculation

| Task | Points |
|---|---|
| Lab 2 Submission| 5 point |
| Lab 2 Quiz | 5 point |
| Total points | 10 points |
