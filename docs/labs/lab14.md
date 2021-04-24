---
title: week 15 lab
description: Handling Critical Sections Among Threads 
layout: default
date: 2021-04-26
# notes gets passed through markdownify
pairings: 
github_link: https://classroom.github.com/a/qimFifPl
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

## Handling Critical Sections Among Threads
Make sure you have accepted <Link to={frontMatter.github_link}>Homework 6</Link>.

### pthread_mutex_t

1. The `pthread_mutex_t` guarantees mutual exclusion. Only one thread at a time is allowed into code protected by the mutex.

2. Before you use the mutex, you will need to set it up by calling `pthread_mutex_init(pthread_mutex_t *mutex, const pthread_mutexattr_t *attr)`. This will initialize the lock and assign a unique id to the mutex (Note: `*attr` can be `NULL`.)

3. Before any code you don't want multiple threads in, call `pthread_mutex_lock(pthread_mutex_t *mutex)`. This will allow one thread in, and block any other threads until that thread has released the mutex.

4. Make sure to call `pthread_mutex_unlock(pthread_mutex_t *mutex)` to release the mutex after the critical section.

5. When you are done with the mutex, you can destroy it with `pthread_mutex_destroy(pthread_mutex_t *mutex)`.


### pthread_cond_t

1. Enable threads to wait efficiently for changes to shared state protected by a lock.

2. To setup conditional variable, call `pthread_cond_init(pthread_cond_t *restrict cond, const pthread_condattr_t *restrict attr)`.

3. Calling `pthread_cond_wait(pthread_cond_t *restrict cond, pthread_mutex_t *restrict mutex)` will atomically unlocks mutex and performs the wait for the condition. Make sure that thread is locked while calling pthread_cond_wait function.

4. `pthread_cond_signal(pthread_cond_t *cond)` shall unblock the thread blocked on conditional variable. Also check `pthread_cond_broadcast(pthread_cond_t *cond)`.

5. Execute the following code, compile using provided Makefile

```c
//How to run the code: ./cond_test 3
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

pthread_mutex_t mylock;
pthread_cond_t cond_var;
int data = -1;

void* printer(void* arg){
    int *repeat = (int*)arg;
    for(int i = 1; i<=*repeat ;i++){
        printf("Trying to Acquire Lock in printer Thread\n");
        pthread_mutex_lock(&mylock);
        printf("Acquired Lock in printer Thread\n");
        while(data ==-1){
            printf("Waiting for data to come ...\n");
            pthread_cond_wait(&cond_var,&mylock);
            printf("Received Signal on printer Thread\n");
        }
        printf("Data for iteration %d: %d\n",i,data);
        data = -1;
        pthread_mutex_unlock(&mylock);
        printf("Released Lock in printer Thread\n");
    }
    pthread_exit(0);
}

int main(int argc, char **argv){
    if(argc < 2){
        printf("Usage: %s <repeat>\n",argv[0]);
        exit(-1);
    }
    pthread_t tid;
    int repeat = atoi(argv[1]);
    //Create attributes
    pthread_attr_t attr;
    pthread_attr_init(&attr);
    pthread_cond_init(&cond_var,NULL);
    pthread_create(&tid,&attr,printer,&repeat);
    sleep(1);// Let printer Thread go ahead and get blocked
    for(int i=repeat;i>0;i--){
        printf("Trying to Acquire Lock in Main Thread\n");
        pthread_mutex_lock(&mylock);
        printf("Acquired Lock in Main Thread\n");
        data = i;
        sleep(1);// Just to demonstrate the point, delaying signal
        pthread_cond_signal(&cond_var);
        printf("Sending Signal from Main Thread\n");
        //pthread_cond_broadcast: signals cond_wait_on all threads
        pthread_mutex_unlock(&mylock);
        printf("Released lock in Main Thread\n");
        sleep(1);// Let printer Thread go ahead and get blocked
    }

    //Wait till thread completes the work
    pthread_join(tid,NULL);
    pthread_cond_destroy(&cond_var);
    pthread_mutex_destroy(&mylock);
}
```

```c
all: cond_test 

cond_test: cond_test.c
    gcc cond_test.c -o cond_test  -pthread
clean:
    rm cond_test
```

## Coordinating passengers and elevators

### Passenger_Request

```c
void passenger_request(int passenger, int from_floor, int to_floor,
                                   void (*enter)(int, int), void(*exit)(int, int))
{
        // wait for the elevator to arrive at our origin floor, then get in                                                                        
        int waiting = 1;
        while(waiting) {
                pthread_mutex_lock(&lock);
                if(current_floor == from_floor && state == ELEVATOR_OPEN && occupancy==0) {
                        enter(passenger, 0);
                        occupancy++;
                        waiting=0;
                }
                pthread_mutex_unlock(&lock);
        }
        // wait for the elevator at our destination floor, then get out                                                                            
        int riding=1;
        while(riding) {
                pthread_mutex_lock(&lock);
                if(current_floor == to_floor && state == ELEVATOR_OPEN) {
                        exit(passenger, 0);
                        occupancy--;
                        riding=0;
                }
                pthread_mutex_unlock(&lock);
        }
}
```

### elevator_ready

```c
void elevator_ready(int elevator, int at_floor,
                         void(*move_direction)(int, int),
                           void(*door_open)(int), void(*door_close)(int)) {
        if(elevator!=0) return;
        pthread_mutex_lock(&lock);
        if(state == ELEVATOR_ARRIVED) {
                door_open(elevator);
                state=ELEVATOR_OPEN;
        }
        else if(state == ELEVATOR_OPEN) {
                door_close(elevator);
                state=ELEVATOR_CLOSED;
        }
        else {
                if(at_floor==0 || at_floor==FLOORS-1)
                        direction*=-1;
                move_direction(elevator,direction);
                current_floor=at_floor+direction;
                state=ELEVATOR_ARRIVED;
        }
        pthread_mutex_unlock(&lock);
}
```

1. The code for the elevator and passenger threads is above. The code above uses mutexes to protect shared variables: for example, the `passenger_request` function uses a mutex to protect where it checks and changes elevator variables, in order to insure that multiple passengers do not edit the elevator at the same time.  

2. As you can see, right now elevators stop and open their doors at every floor. Try adding code so that your elevator is assigned a passenger, and rather than stopping at every floor, goes directly to that passenger's `from_floor`, picks up the passenger, and takes them directly to their `to_floor`. This will probably require adding new variables to the existing elevator variables, as you will need some way for the elevator to know which passenger it is assigned to.

3. Remember that the elevator is full when it is holding a single passenger, so you do not have to worry about picking up multiple passengers.

4. Notice that right now the elevator also does not always wait for passengers.  Try adding a barrier so that when the elevator gets to the passenger's floor, it stops until the passenger gets on.  

#### Answer the Gradescope Questions based on your understanding.

## Peer evaluation rubric

You can find your pairings for the lab in <Link to={frontMatter.pairings}>this sheet</Link>. Please grade your peers out of **1 point** using <Link to={site.eval_link}>this form</Link>.

| Session | Task | Points |
|---|---|---|
| Session A | Discuss questions 1, 2, and 3 | 1 point |
| Session B | Discuss questions 4, 5, and 6 | 1 point |


## Total grade calculation

| Task | Points |
|---|---|
| Turn in the Gradescope assignment | 6 points |
| Discuss your answers | 1 point |
| Evaluate another student | 1 point |
| Total points | 8 points |
