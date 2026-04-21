---
title: "Linux Fundamentals: Hands-on Ubuntu lab in VirtualBox"
date: 2026-04-21
tags: ["linux"]
tools: ["Ubuntu 24.04 LTS", "VirtualBox", "Bash", "OpenSSH"]
summary: "A hands-on Linux fundamentals lab in an Ubuntu VM, focused on the command line, permissions, logs, networking basics, and hashing."
---

## Overview

This project is a hands-on Linux lab I did in an **Ubuntu 24.04 LTS** virtual machine running in **VirtualBox**. I wanted to get comfortable using the Linux command line for real work, not just memorizing commands. So I worked through core tasks like navigation, file operations, permissions, basic networking checks, service control, reading logs, and hashing files. I also took screenshots along the way so the steps and results are easy to follow.

## Approach

Before starting, I set up a clean Ubuntu VM in VirtualBox and took a snapshot so I could roll back if I broke anything.

I did the lab in one session and moved from basic orientation to more security-relevant topics.

## Findings

### System orientation

The first thing I do on any unfamiliar Linux system is figure out who I am, where I am, and what’s in the directory.

`whoami` confirms the current user. `pwd` prints the working directory. `ls -al` shows a detailed listing including permissions, owners, hidden files, and timestamps.

![whoami, pwd, ls, and ls -al output in the home directory](/images/linux-fundamentals/01-whoami-pwd-ls-al.png)

### Filesystem navigation

Linux organizes everything under a single root (`/`). Running `ls` at `/` shows the top-level folders like `/etc` (config), `/var` (logs and variable data), `/home` (user folders), and `/proc` (live process info). Knowing this layout helps a lot when you’re trying to find something quickly.

Navigation uses `cd` to move between directories. `cd /` goes to root, `cd ..` moves one level up, `cd ~` returns to the home directory. These are the movements you make constantly during any hands-on work.

![Root filesystem listing and navigation commands](/images/linux-fundamentals/02-filesystem-navigation.png)

### File management

Core file operations in Linux are fast and direct from the command line. I created a working directory (`mkdir lab`), created a file (`touch notes.txt`), copied it (`cp`), renamed it (`mv`), and deleted the copy (`rm`). The final `ls` shows only the renamed file remaining. This demonstrates the full create, copy, move, and delete cycle in a single terminal session.

![mkdir, touch, cp, mv, rm, and ls showing file lifecycle](/images/linux-fundamentals/03-file-management.png)

### File permissions and chmod

Linux file permissions control exactly who can read, write, or execute any given file. Every file has three permission sets: owner, group, and everyone else. Each set has three bits: read (`r`), write (`w`), execute (`x`). These are represented both symbolically (`rwxrwxrwx`) and numerically (777, 644, etc.).

Running `chmod 777` on a file grants full read/write/execute to everyone. You can see it in `ls -al` as `-rwxrwxrwx`. Running `chmod 644` restricts it to owner-read/write and read-only for everyone else (`-rw-r--r--`). The difference between those two states is the difference between a file anyone on the system can modify and one only the owner controls.

For security work, unexpected permissions are a red flag. A configuration file that's world-writable, or a binary that's executable by everyone, is exactly the kind of misconfiguration an attacker looks for. It is also something an analyst should look for.

![chmod 777 and chmod 644 showing permission change in ls -al](/images/linux-fundamentals/04-chmod-permissions.png)

### Reading and writing file content

`echo` writes text to the terminal or redirects it into a file. The `>` operator overwrites a file's contents and `>>` appends to it. `cat` displays a file's full contents. `less` opens it in a scrollable pager, which is useful for longer files where `cat` would flood the screen.

This matters in real life. If you use `>` on a log file you can wipe it. If you use `>>` you keep history and add to it.

![echo with > and >>, cat showing both lines, less command](/images/linux-fundamentals/05-echo-cat-append.png)

### Finding files and searching content

`find` locates files anywhere in the filesystem. I used `2>/dev/null` to hide the “Permission denied” messages so the output is easier to read.

`grep` searches inside files for matching text. `grep -r` does it recursively through a directory. These are foundational tools for investigating a system. You can use them to find a specific config file, locate a string in logs, or trace where a value appears across a codebase.

![find with 2>/dev/null, grep and grep -r output](/images/linux-fundamentals/06-find-grep.png)

### System information and user identity

`uname -a` prints full system information: kernel version, hostname, architecture, and build date. This is the first thing you'd run to understand what system you're dealing with.

`id` is especially useful for security work because it shows your UID/GID and the groups you’re in. Being in the `sudo` group matters because it means you can run commands as root.

![uname -a and id output showing kernel info and group membership](/images/linux-fundamentals/07-uname-id.png)

### Network interfaces and connectivity

`ip a` lists network interfaces and their addresses. In this VM I saw the loopback interface (`lo`) and the main adapter (`enp0s3`) with a NAT IP. This is one of the first commands I’d run if I needed to understand how a host is connected to the network.

`ping -c 4 google.com` confirms outbound connectivity and shows round-trip times. Zero packet loss and consistent ~16ms times confirm the network is healthy.

![ip a output showing network interfaces, ping to google.com](/images/linux-fundamentals/08-ip-a-ping.png)

### Privilege management: sudo and sensitive files

This section shows the difference between a normal user and root.

`sudo whoami` returns `root`, which confirms `sudo` is working. `sudo -l` shows what you’re allowed to run. In my case it was `(ALL : ALL) ALL`, which means full sudo access.

`/etc/passwd` is readable by anyone, but `/etc/shadow` is protected because it contains password hashes. If a normal user could read `/etc/shadow`, they could try cracking hashes offline.

Running `sudo cat /etc/shadow` succeeds. This demonstrates why sudo access is sensitive.

![sudo whoami, sudo -l showing ALL:ALL, cat /etc/shadow permission denied](/images/linux-fundamentals/09-sudo-whoami-shadow-denied.png)

![sudo cat /etc/shadow showing hashed password entries](/images/linux-fundamentals/10-sudo-shadow.png)

### Service management: SSH as a case study

`systemctl` manages services in modern Linux systems. I used SSH as a hands-on example because it's a real service with real security implications.

At first `systemctl status ssh` said the unit didn’t exist, because SSH wasn’t installed. After installing `openssh-server`, the service was inactive until I started it. Then it showed as running on port 22.

After confirming it worked, I stopped it and disabled it. That’s a simple hardening habit. If you’re not using a service, don’t leave it running.

![systemctl status ssh showing unit not found](/images/linux-fundamentals/11-ssh-not-found.png)

![sudo apt install openssh-server](/images/linux-fundamentals/12-ssh-install.png)

![systemctl status ssh inactive then active after start](/images/linux-fundamentals/13-ssh-status-active.png)

### Log analysis: syslog and auth.log

`/var/log` is where Linux stores system logs. Two are particularly important for security work.

`syslog` is a general system log. Using `tail -20` is a quick way to see what just happened. In my output I could clearly see SSH starting and stopping with timestamps.

`auth.log` is more security-focused. It logs authentication events and sudo usage. In my output, each sudo command was recorded with the command, the user, the directory, and the timestamp.

The connection to my other project is direct. The same kind of log analysis used in the NIST CFReDS hacking case investigation (what happened, when, and under which account) is what `auth.log` enables on a live Linux system.

![sudo tail -20 syslog showing SSH service events](/images/linux-fundamentals/14-syslog-tail.png)

![sudo tail -20 auth.log showing sudo commands and session events](/images/linux-fundamentals/15-auth-log.png)

### Disk usage

`df -h` shows disk usage, and `du -sh` shows the size of a folder. These are handy for baseline checks. If disk usage suddenly jumps, that can be a clue worth investigating.

![df -h showing filesystem usage, du -sh showing lab directory size](/images/linux-fundamentals/16-df-h-du.png)

### File permissions deep dive: stat and sensitive file comparison

`stat` provides more detail than `ls -la`. Beyond permissions and ownership, it shows three distinct timestamps (Access, Modify, and Change), plus the Birth timestamp (file creation). In forensic work, these timestamps are evidence. They can help establish when a file was created, whether it was accessed recently, and whether its metadata was altered independently of its content.

Comparing `ls -al /etc/passwd` and `ls -al /etc/shadow` side by side illustrates the permission model clearly. `/etc/passwd` is `-rw-r--r--` (world-readable). `/etc/shadow` is `-rw-r-----` with group `shadow`, meaning it is readable only by root and the shadow group. That single difference is what separates a publicly accessible account list from the sensitive credential store.

![ls -al of /etc/passwd and /etc/shadow, stat output showing timestamps](/images/linux-fundamentals/17-stat-passwd-shadow-perms.png)

### Network investigation: open ports and routing

`ss -tulnp` lists all active network sockets: TCP and UDP listeners, their local addresses and ports, and the processes that own them. This is one of the most useful commands during an investigation. An unexpected listener on an unusual port is often the first sign something is wrong, such as a backdoor, a misconfigured service, or malware establishing persistence.

In this output, port 22 (SSH) appears as a listener because the service was still running. The routing table from `ip route` shows the default gateway and subnet. This helps explain how the machine connects to its network.

![ss -tulnp showing open ports and listeners, ip route output](/images/linux-fundamentals/18-ss-tulnp-ip-route.png)

### File integrity and hashing

File hashing is a basic forensic skill. A cryptographic hash (like SHA-256) is a fingerprint of a file’s contents. If the file changes at all, the hash changes.

I created a file containing \"hashbrowns\", ran `md5sum` and `sha256sum` to get its baseline hashes, then overwrote it with \"omelette\" and ran `sha256sum` again. The hash is completely different even though the file has the same name, size, and location. This is how forensic analysts verify evidence integrity. Hash the file when it is collected, hash it again before analysis, and compare. If the hashes match, the file is unchanged. If they do not, the evidence may have been altered.

![md5sum and sha256sum before and after file content change](/images/linux-fundamentals/19-hashing.png)

### Command history as a forensic artifact

`history` lists every command the current user has typed in the terminal, in order, with sequence numbers. The shell stores this in `~/.bash_history` and it persists across sessions. In this output, the full progression of the lab session is visible, from the first `whoami` through navigation, file operations, and everything that followed.

From a forensic perspective, bash history is worth checking because it can show what commands a user ran and in what order. It’s also common for attackers to clear it, so missing history can be suspicious too.

![history command output showing full session command log](/images/linux-fundamentals/20-history.png)

## Conclusion

This lab hit three areas that show up constantly in security work:

1. **Navigation and orientation**: knowing the filesystem layout and moving around comfortably.
2. **Permissions and privilege**: understanding sudo, why `/etc/shadow` is protected, and how permissions affect security.
3. **Investigation basics**: checking logs, looking at listening ports, and using hashes to confirm file integrity.

These are the everyday fundamentals. They show up in blue team work, incident response, and basic system hardening.

---

*Lab environment: Ubuntu 24.04 LTS on Oracle VirtualBox 7.2.6. Session conducted April 20–21, 2026.*

