---
title: week 13 lab
description: Introduction to Wireshark
layout: default
date: 2021-04-12
# notes gets passed through markdownify
pairings: https://docs.google.com/spreadsheets/d/1i4MQaLNor8fBIWz1DnujECbAdt_F6DFMn1ofEcm75rw
github_link: https://classroom.github.com/a/aoUUUzUS
student_ports_link: https://docs.google.com/spreadsheets/d/1zJNLivFtDW8lBjbmy0M1kJudbokOaxG_HqbsOIjSstM/edit#gid=0
wireshark_download: https://www.wireshark.org/#download
wireshark_tutorial: https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html
tcp_3_way_handshake: https://www.guru99.com/tcp-3-way-handshake.html
tcp_server: https://drive.google.com/file/d/1qmsTQWvFAbf_V74cYgFWyIjxv0FV2Kp5/view?usp=sharing
tcp_client: https://drive.google.com/file/d/1TJrMxRUN9ySQOxpTpWPQ2zZSlAFH97f1/view?usp=sharing
http_server: https://drive.google.com/file/d/1kL6cGrwHituu9ypXfPKGlXEMlIG3pQbh/view?usp=sharing
tcp_capture: https://drive.google.com/file/d/1mkvUjCVkjkH9kloC_PQAuXxru01B6cJK/view?usp=sharing
http_capture: https://drive.google.com/file/d/1AESWobUx0UBYVpI7pH2SjJqRVDDL_Wek/view?usp=sharing
webchat_capture: https://drive.google.com/file/d/10SHyTuSjKc8XFWWBu8FHcJ0ih2LM1lzt/view?usp=sharing
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

## Introduction to Wireshark 

<Link to={frontMatter.wireshark_tutorial}>Wireshark</Link> is a open-source network protocol analyzer. 
It is extremely useful in debugging network traffic. Wireshark consists of two parts: one is a packet 
capture engine powered by tcpdump, and the other is a powerful and expressive packet parsing capability 
that understands hundreds of different network protocols. Download and install the wireshark from <Link to={frontMatter.wireshark_download}>here</Link>.

## TCP Packets Analysis in Wireshark

Let's examine packets captured during <Link to={frontMatter.tcp_3_way_handshake}>TCP communication</Link>
from <Link to={frontMatter.tcp_capture}>this</Link> pcap file. 

![TCP 3 Way Handshake Capture](../../static/img/Wireshark_Layout.png)

Here both server as well as client are running on localhost i.e. 127.0.0.1. Server is using port 6000 
and Client is using port 54478. After three way handshake, Client sends data to Server(Packet no. 4). 
Server acknowledges and then replies back to the Client with some data(Packet no. 6). The Client 
acknowledges this packet. Finally socket is closed from both sides.

## Capture the Live Traffic

1.  Download the <Link to={frontMatter.tcp_server}>TCP Server</Link> and <Link to={frontMatter.tcp_client}>TCPClient</Link> python scripts.

2.  Default port for TCP Server is set to 6000. We will be running our TCP Server over local interface 
    with ip address 127.0.0.1 . Start the TCP Server using following command:

    ```bash
        python TCPServer.py
    ``` 

3.  In order to capture the packets we must first select the interface(in our case loopback interface)
    on which communication is going on. From Menu bar select Capture->Options->Npcap Loopback Adapter. 
    If interface is already selected then you can start capture directly by clicking on Start button 
    which resembles the Blue colored shark fin.

4.  Execute the TCP Client script using following command:

    ```bash
        python TCPClient.py
    ``` 

5.  After successful capture of the packets. Kill the server and stop the capture by clicking on Red 
    colored Stop button next to Start button.

## Additional Packets Analysis

1.  Examine the HTTP transaction from <Link to={frontMatter.http_capture}>this</Link> pcap file. 
    Alternatively try to run http server using <Link to={frontMatter.http_server}>python script</Link>.
    
    ```bash
        python HTTP_Server.py
    ``` 

    Use browser as a client. Try to access http://127.0.0.1:7000/ from browser. Capture the packets using technique learnt from the previous excercise.

2.  Now let's examine <Link to={frontMatter.webchat_capture}>this</Link> pcap file containing 
    transactions with webchat server from homework5. In this scenario, three clients are communicating 
    with each other using webchat server. Initially on connecting with webchat server each client sends 
    message saying, "Hello, I am Client <1/2/3>". Later while disconnecting each client sends message 
    saying, "Bye, from Client <1/2/3>"


## Tips and Tricks

1.  While running program on remote system, gui based Wireshark will not be available directly. Thus it 
    is recommended to use tshark or tcpdump to capture the packets and store them in pcap file on remote system. 
    This file can be later analyzed with Wireshark.

    ```bash
        sudo tshark -i <interface name> -w <filename>.pcap
        sudo tcpdump -i <interface name> -w <filename>.pcap
    ```

2.  Filters are valuable features of Wireshark. Simply Right Click on any field within Packet Details 
    Pane and select Apply as Filter. Now only packets satisfying filters will be displayed.

    ```
        (tcp.dstport == 1234) && (ip.dst == 1.2.3.4) && (ip.src == 1.2.3.3)
    ```

3.  Many times you might face the issue of "Port Already in use" even though program seems terminated. 
    In this case find pid associated with that port using netstat and kill the program using acquired pid.

    ```bash
        netstat -atp | grep <port no. under use>
        sudo kill -9 <pid>
    ```

Note: If you are using systemsX machines for these experiments then use the <Link to={frontMatter.student_ports_link}>port</Link> assigned to you from <Link to={frontMatter.github_link}>homework5</Link>. 

Answer the Gradescope Quiz based on your learning

## Peer evaluation rubric

You can find your pairings for the lab in <Link to={frontMatter.pairings}>this sheet</Link>. Please grade your peers out of **1 point** using <Link to={site.eval_link}>this form</Link>.

| Session | Task | Points |
|---|---|---|
| Session A | Discuss questions 1, 2, and 3 | 1 point |
| Session B | Discuss questions 4 and 5 | 1 point |


## Total grade calculation

| Task | Points |
|---|---|
| Turn in the Gradescope assignment | 6 points |
| Discuss your answers | 1 point |
| Evaluate another student | 1 point |
| Total points | 8 points |
