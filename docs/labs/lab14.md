---
title: week 15 lab
description: Block on a Condition Variable
layout: default
date: 2021-04-26
# notes gets passed through markdownify
pairings: https://docs.google.com/spreadsheets/d/1W84hOzdF4jmKDEjtqBsQomOpGemSVm9mFrwkw4aYyQE/
github_link: https://classroom.github.com/a/qimFifPl
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

## Block on a Condition Variable
Make sure you have accepted <Link to={frontMatter.github_link}>Homework 6</Link>.

### pthread_mutex_t

1. The `pthread_mutex_t` guarantees mutual exclusion. Only one thread at a time is allowed into code protected by the mutex.

2. Before you use the mutex, you will need to set it up by calling `pthread_mutex_init(pthread_mutex_t *mutex, const pthread_mutexattr_t *attr)`. This will initialize the lock and assign a unique id to the mutex (Note: `*attr` can be `NULL`.)

3. When you don't want multiple threads to access the critical section of the code simultaneously, call `pthread_mutex_lock(pthread_mutex_t *mutex)`. This will allow one thread in, and block any other threads until that thread has released the mutex.

4. Make sure to call `pthread_mutex_unlock(pthread_mutex_t *mutex)` to release the mutex after the critical section.

5. When you are done with the mutex, you can destroy it with `pthread_mutex_destroy(pthread_mutex_t *mutex)`.


### pthread_cond_t

1. A conditional variable enables threads to wait efficiently for changes to shared state protected by a lock.

2. To setup conditional variable, call `pthread_cond_init(pthread_cond_t *restrict cond, const pthread_condattr_t *restrict attr)`.

3. Calling `pthread_cond_wait(pthread_cond_t *restrict cond, pthread_mutex_t *restrict mutex)` will suspend the calling thread till a condition becomes true. We can continuously check for a condition using a `while` loop. It is important to have a lock acquired before calling the `pthread_cond_wait` function.

4. The function call `pthread_cond_signal(pthread_cond_t *cond)` shall unblock the thread blocked on conditional variable. This is usually called after performing the actions that make the condition true. This is the same condition for which the previous thread is waiting. You can also check out `pthread_cond_broadcast(pthread_cond_t *cond)`.

5. The following code is an example of conditional variables:

```c title="cond_wait.c"
//To run the code: ./cond_test 3
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

pthread_mutex_t mylock;
pthread_cond_t cond_var;
int data = -1;

void* printer(void* arg) {
    int* repeat = (int*)arg;
    for (int i = 1; i <= *repeat; i++) {
        pthread_mutex_lock(&mylock);
        printf("Acquired Lock in printer Thread\n");
        while (data == -1) {
            pthread_cond_wait(&cond_var, &mylock);
            printf("Received Signal on printer Thread\n");
        }
        printf("Data for iteration %d: %d\n", i, data);
        data = -1;
        pthread_mutex_unlock(&mylock);
        printf("Released Lock in printer Thread\n");
    }
    pthread_exit(0);
}

int main(int argc, char** argv) {
    if (argc < 2) {
        printf("Usage: %s <repeat>\n", argv[0]);
        exit(-1);
    }
    pthread_t tid;
    int repeat = atoi(argv[1]);
    pthread_cond_init(&cond_var, NULL);
    pthread_create(&tid, NULL, printer, &repeat);
    sleep(1);  // Let printer Thread go ahead and get blocked
    for (int i = repeat; i > 0; i--) {
        pthread_mutex_lock(&mylock);
        printf("Acquired Lock in Main Thread\n");
        data = i;
        sleep(1);  // Just to demonstrate the point, delaying signal
        pthread_cond_signal(&cond_var);
        printf("Sending Signal from Main Thread\n");
        //pthread_cond_broadcast: signals cond_wait_on all threads
        pthread_mutex_unlock(&mylock);
        printf("Released lock in Main Thread\n");
        sleep(1);  // Let printer Thread go ahead and get blocked
    }

    //Wait till thread completes the work
    pthread_join(tid, NULL);
    pthread_cond_destroy(&cond_var);
    pthread_mutex_destroy(&mylock);
}
```

6. To compile, you can the following `Makefile` or add the recipe to an existing one. To run, you'll have to provide an argument using `./cond_test <repeat>`.

```make
all: cond_test 

cond_test: cond_test.c
    gcc cond_test.c -o cond_test  -pthread
clean:
    rm cond_test
```

7. Answer the questions on Gradescope.


## Peer evaluation rubric

You can find your pairings for the lab in <Link to={frontMatter.pairings}>this sheet</Link>. Please grade your peers out of **1 point** using <Link to={site.eval_link}>this form</Link>.

| Session | Task | Points |
|---|---|---|
| Session A | Discuss questions 1, 2, and 3 | 1 point |
| Session B | Discuss questions 4.1, and 4.2 | 1 point |


## Total grade calculation

| Task | Points |
|---|---|
| Turn in the Gradescope assignment | 5 points |
| Discuss your answers | 1 point |
| Evaluate another student | 1 point |
| Total points | 8 points |


## Getting started on HW6

### Structures for Elevator and Passengers

1. To better manage the data across elevator and passenger threads, we suggest using the following data structures:
```c
struct psg {
    int id;
    int from_floor;
    int to_floor;
    int elenumber;
    enum { WAITING = 1,
           RIDING = 2,
           DONE = 3 } state;
    struct psg* next;
} passengers[PASSENGERS];

struct ele {
    int current_floor;
    int direction;
    int occupancy;
    enum { ELEVATOR_ARRIVED = 1,
           ELEVATOR_OPEN = 2,
           ELEVATOR_CLOSED = 3 } state;
    struct psg* waiting;
    struct psg* riding;
} elevators[ELEVATORS];
```

2. Besides the passenger related details, `psg` contains `elenumber` that can be used to assign an elevator to the passenger when there are more than one elevators in a *round-robin* manner. Notice that `psg` also contains a pointer of its own type, which means the structure can be used as a linked list when multiple passengers are allowed in a elevator.

3. The elevator structor `ele` contains two linked lists, `waiting` and `riding` that represent the passengers that are waiting for and currently riding the elevator respectively.

4. Both structures also have a `state` enums which are useful when threads are performing critical functions or checking for conditions.

### Add and Remove passenger from the linked list

Once you've the passenger and elevator structures ready, you can use the following two functions that can add and remove a passenger to the linked list. They take the `head` of the linked list and the `passenger` structure as arguments.

```c
// MUST hold lock and check for sufficient capacity before calling this,
// and MUST NOT be in the riding queue. adds to end of queue.
void add_to_list(struct psg** head, struct psg* passenger) {
    struct psg* p = *head;
    if (p == NULL)
        *head = passenger;
    else {
        while (p->next != NULL) {
            p = p->next;
        }
        p->next = passenger;
    }
}

// Must hold lock, does not update occupancy.
void remove_from_list(struct psg** head, struct psg* passenger) {
    struct psg* p = *head;
    struct psg* prev = NULL;
    while (p != passenger) {
        prev = p;
        p = (p)->next;
        // don't crash because you got asked to remove someone that isn't on this
        // list
        assert(p != NULL);
    }
    // removing the head - must fix head pointer too
    if (prev == NULL)
        *head = p->next;
    else
        prev->next = p->next;
    passenger->next = NULL;
}
```

### Things to do

Now that you've access to the code mentioned above, you have the following three to-dos:
1. Modify `scheduler_init()` to initialize all variables inside the passenger and elevator structures for ALL the threads. You should also initialize all the mutexes, conditional variables, and barriers you might be using in this function.
2. Modify `passenger_request()` such that the functions sets the right source and destination floors for the passenger and wait for the elevator to arrive. Once the elevator has arrived, wait for the passenger to reach their destination floor, and finally let the passenger exit the elevator.
3. Modify `elevator_ready()` such that the elevator picks up all the passengers that are waiting for the elevator, opens the elevator door and wait for the passenger enter the elevator. Once the passenger has entered, drop the passenger off at the destination floor and wait for the passenger to exit.
