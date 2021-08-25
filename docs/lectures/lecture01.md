---
type: lecture
date: 2021-08-24T8:00:00-5:00
title: Setting up the optimal programming environment for CS 361
contents: 
    - link: https://jvns.ca/wizard-zine.pdf
      name: so you want to be a wizard
    - link: https://www.youtube.com/watch?v=TavEuAJ4z9A
      name: course overview
    - link: https://www.youtube.com/watch?v=N6acwsgUl1w
      name: environment
    - name: shell
      link: https://www.youtube.com/watch?v=cK24JPyouxc
    - name: ssh
      link: https://www.youtube.com/watch?v=SWe9ldIxs5o
    - name: git, GitHub, Gradescope
      link: https://www.youtube.com/watch?v=WXudtLoLIao
    - link: https://www.youtube.com/watch?v=jWZMEenRB8s
      name: remote development
    - link: https://docs.google.com/document/d/160fMo-6Qp2nkm_4ALBMaZezHmllhkOAH3IVPlDBRao8
      name: SSH key-based authentication
    - link: https://docs.google.com/document/d/1QYvUGkOxQEcRDI7CS7dk-MAKphFOB7dd1DuX4ZgQtsY 
      name: Learning Basic commands
sidebar: true
notes: |
    [MIT's missing semester](https://missing.csail.mit.edu/) module
    goes into these topics in a lot more detail.
    
    For git specifically,
    [Dangit, git](https://dangitgit.com/en) can be quite helpful.
---

The overall theme of this week's lesson is getting more efficient at CS-ing, but none of it is strictly required: as far as programming is concerned, all that's required for this course is that you submit your code to the autograder and it works. You can use whatever editor you want, whatever operating system you want, etc. How you get from skeleton code to functioning assignment is up to you. The stuff here is *optional*, but it's *useful* so that's why we spent the whole week on it.

**Notes:**
- All homeworks are released via GitHub and must be submitted to Gradescope via GitHub.  
- The most efficient and less time consuming development setup for all platforms is using [VSCode and remote containers](#using-remote-containers). To speed up your workflow, all homeworks will include a `.devcontainer` subdirectory that contains the necessary configurations for VSCode to open the project in a remote container. 

---

## Fresh install to fully set up environment

The goal here is to set up your PC with easy access to a local Linux development environment. This can be accomplished in lots of different ways, but we're going to leverage [VSCode's remote development](https://code.visualstudio.com/docs/remote/remote-overview) feature as it allows us to create a relatively standardized environment across the big three desktop-class computer operating systems (Windows, MacOS, & Linux).

## Home directories

If your username is `kaytwo`, by default your Mac home directory will be
`/Users/kaytwo/`, on Linux it will be `/home/kaytwo/`, and on Windows it will be
`C:\Users\kaytw\` (usernames truncate to the first five letters). When using
WSL2 in Windows, you also have a "linux home directory" at
`/home/user-name-you-chose-when-you-installed-your-wsl2-distro/`, and when you
are running your WSL2 shell, your Windows home directory is available from the
path `/mnt/c/Users/kaytw/`. On Linux and Mac machines, you can refer to your
home directory using the special shortcut `~/` - no matter what your user name
is, your own home directory is `~/`.


## Running commands
Unless stated otherwise, when asked to run a command, on Linux you should use whatever terminal program you like (I believe "terminal" is the default in Ubuntu), Terminal on Mac, and PowerShell on Windows. On Windows, don't use `command.com`/`cmd.exe` - only PowerShell, as many commands use built in features that aren't available on any other shell.

## Assumptions

I'll be assuming that you have a Mac, Linux with the `apt` package manager, or a Windows machine. The first thing you should do is make sure your OS is up to date. If you're using a Linux machine, I assume you're capable of running commands as the administrator user (`sudo`). The Linux instructions will work fine in a VM, but if you're using a VM only for this class, I would recommend using remote development instead.

### Mac
Choose System Preferences from the Apple menu, then click Software Update to check for updates.

### Windows
Tap Windows button, type "check for Updates," and make sure to update. We're using some very new features on Windows, so you **need** to do this step.

### Linux
On a modern Debian derived machine, `sudo apt update && sudo apt upgrade` will bring everything up to date.

## Prep Windows for WSL2

* Once your Windows is up to date, [install WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Make sure to follow all of the steps on that page.

## Programs you'll need installed

* `git`. Mac has it preinstalled, on Linux you may need `apt install git`, on Windows you can install it via `choco install git` or [download the installer](https://git-scm.com/download/win). On Windows you will also need to tell git to use the system ssh client we're about to install - [follow this StackOverflow answer](https://stackoverflow.com/a/54657119) or follow the instructions below under "Using your ssh agent from git."
* `ssh`. Preinstalled on Mac and Linux. On Windows, click Start, Settings, Apps, Apps and Features, Manage Optional Features. If OpenSSH client is not already installed, click "Add a feature", type OpenSSH Client, and click install.
* `ssh-agent`. Pre-installed and pre-activated on Mac and most Linux desktops. On Windows, in an Administrator PowerShell session, you can run these three commands:
  * `Set-Service ssh-agent -StartupType Automatic`
  * `Start-Service ssh-agent`
  * `Get-Service ssh-agent` (this just confirms that it is running)
* [Visual Studio Code](https://code.visualstudio.com/download)
* Docker. On Linux, [install Docker Engine](https://docs.docker.com/engine/install/ubuntu/), on Mac and Windows, [install Docker Desktop](https://www.docker.com/products/docker-desktop).

## Set your git username and email

Git will complain if you don't set up your name and email. To set up git configurations globally use the following commands: 
```
git config --global user.email "your email" 
git config --global user.name "your name"
```
To configure name and email locally (i.e., per-repository), remove the `--global` switch from the above commands. Make sure you are inside the repository when you run the commands. 


## Generate an ssh key

* On all three systems, you can run `ssh-keygen` to generate an ssh key and have
  it saved in the default location. I highly recommend putting a passphrase on
  the key.
* Once the key is generated, if you saved it to the default location, you should
  be able to run `ssh-add` and the agent will find and try to add the key. If
  you added a passphrase, enter it now. By default you will never need to enter
  this passphrase again on Windows, and will only need to after a restart on
  Mac/Linux. Google for something like "add ssh key passphrase to credential
  manager (Mac|Linux) if you'd like to save the passphrase forever there too.


## Install your ssh key in other places
To use your ssh key on CS linux machines, log in using your password, and then
make sure that the `.ssh` directory exists inside your home directory. You can
do this by running `ls -alh .ssh` and if you don't get an error message, that
means that the directory exists. Make sure it has the right permissions by
running `chmod 700 .ssh`. When you ran `ssh-keygen` above, its output will tell
you the name of the public and private keys that it created: by default in
Mac/Ubuntu, they will be called `~/.ssh/id_rsa` for the private and
`~/.ssh/id_rsa.pub` for the public. Edit the file `.ssh/authorized_keys` and add
the contents of the ssh public key as a new line. Make sure that file is not
readable by anyone else - run `chmod 600 ~/.ssh/authorized_keys`.

You can also install your key in GitHub by navigating to Settings -> SSH and GPG
Keys -> New SSH Key -> paste the contents of the public key file into the "Key"
field. If you've done everything correctly up to here, running `ssh
git@github.com` should NOT ask you for a password or a passphrase, and should
show you something like this:
```
$ ssh git@github.com
Warning: Permanently added the RSA host key for IP address '140.82.112.4' to the list of known hosts.
PTY allocation request failed on channel 0
Hi kaytwo! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
$
```

## Using your ssh agent from git

`git` on Windows is installed with its own ssh that it uses by default,
so you'll need to override this if you want to use the provided ssh
client and ssh agent, by setting the environment variable `GIT_SSH` to
`C:\Windows\System32\OpenSSH\ssh.exe`. You can set environment variables
in Windows by running "Edit the system environment variables" from the
Start Menu, then click "Environment Variables..." and add the new
variable - you can add it for just your user or for all users on a
multi-user machine by setting it as a System variable.

## Using your ssh agent from WSL2

Although Microsoft has put a lot of effort into making WSL2 and Windows feel like one machine, there are still places where that illusion breaks down. We need to forward our agent from Windows into WSL2.

1. In WSL2, install `socat` using this command: `sudo apt install -y socat`.
2. In your windows home directory, create a subdirectory called `.wsl` and save `npiperelay.exe`  (in Piazza resources section, or you can build it yourself [from source](https://github.com/jstarks/npiperelay)) in that new directory.
3. In a Linux shell, create a symlink from your Windows home directory to
   your Linux home directory under the name `winhome`. If your Windows
   home directory is `C:\Users\kaytw\`, then the easiest way to do this
   is: `ln -s /mnt/c/Users/kaytw ~/winhome`
3. In WSL2, add this text to the bottom of the file `~/.bashrc`:
```bash
export SSH_AUTH_SOCK=$HOME/.ssh/$WSL_DISTRO_NAME.agent.sock
ss -a | grep -q $SSH_AUTH_SOCK
if [ $? -ne 0   ]; then
    rm -f $SSH_AUTH_SOCK
    ( setsid socat UNIX-LISTEN:$SSH_AUTH_SOCK,fork EXEC:"$HOME/winhome/.wsl/npiperelay.exe -ei -s //./pipe/openssh-ssh-agent",nofork & ) >/dev/null 2>&1
fi
```

## Using your ssh agent on other machines

If you're planning on `ssh`-ing into a machine and then `ssh`-ing, `rsync`-ing, or `git clone`-ing from another machine, you'll want to *forward* your agent to the remote host. To enable this, you will want to create a file `.ssh/config` under your home directory, and fill it in with customizations based on the host(s) you plan to connect to. For instance, to forward your agent to any machine within cs, you would add:

```
Host *.cs.uic.edu
  ForwardAgent yes
```

The ssh config file is also useful for customizing other parts of how ssh runs. If your local username isn't your netID, you will need to either type in your netID every time you ssh someplace, OR you can just set it as default when connecting to CS servers:

```
Host *.cs.uic.edu
  ForwardAgent yes
  User ckanich
```
Substitute your netID for mine here. By adding the `ForwardAgent` line, you'll be able to use your local agent to connect to remote machines from the remote machine you're logged in to.

## Using remote containers

Now that you have Docker and VSCode, you can use a linux environment locally. You can use the "Open folder in container..." command in VSCode to open a directory in a container (hit ctrl+shift+p to bring up the command palette, then start typing those words and select that command once you see it). If the directory has a container config already (in the `.devcontainers` subdirectory), it will configure the Linux environment for you, otherwise it will ask you which environment you want to use. For this class, **Ubuntu 18.04** is sufficient. When using the same configuration as other students/instructors, this gives us our final goal: a standardized development environment running on any host laptop.

## Potential problems/confusing things

* When you first connect to a new machine that your PC has never seen before,
  ssh will ask you to verify the key fingerprint of the remote machine.
  Verifying this key is almost always impractical, so it is safe to say 'yes'
  to that prompt.
* If you have trouble getting WSL2 installed, virtualization might not be turned
  on in your BIOS. Restart your computer and enable settings for enabling
  virtualization: they might be labeled "VT-x" or "AMD-V." The vast majority of
  laptops in use today have this feature, but it isn't guaranteed. If you are
  getting errors about virtualization not being available and you can't find any
  setting for it in your BIOS, contact us.
* If you have limited RAM on your laptop, you can restrict WSL2's memory/CPU
  usage by creating a file in your Windows home directory called `.wslconfig`
  with contents like this to restrict its memory and CPU usage:
```
[wsl2]
memory=4GB # Limits VM memory in WSL 2 to 4 GB
processors=2 # Limits the WSL 2 VM to two processor cores
```
* WSL2 also does what it can to not gobble up your memory, but you can also manually
  force it to flush its cache (and return that memory to the host OS) by running
  the command `echo 1 > /proc/sys/vm/drop_caches`. See [here](https://devblogs.microsoft.com/commandline/memory-reclaim-in-the-windows-subsystem-for-linux-2/) for more info.


## Totally optional but useful.

Linux is built around free software, so it makes sense that its package manager
is installed by default. Windows and Mac have their own terminal based free
software package managers: [Chocolatey](https://chocolatey.org/)  and
[Homebrew](https://brew.sh) respectively. While they aren't necessary for
anything in this guide, they do make installing free software (especially
software packages for compiling/running various programming languages like
Python, Go, Rust) very fast and easy.
