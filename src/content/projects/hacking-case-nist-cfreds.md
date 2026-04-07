---
title: "Hacking Case — NIST CFReDS Forensic Analysis with Autopsy"
date: 2026-02-17
tags: ["digital-forensics", "autopsy", "nist-cfreds", "windows-artifacts", "evidence-analysis"]
tools: ["Autopsy", "NIST CFReDS", "Windows forensic artifacts"]
summary: "Forensic analysis of the NIST CFReDS 'Hacking Case' image using Autopsy — identifying a suspect user, malicious tools, and evidence of intent for a cohesive investigative narrative."
repoUrl: "https://cfreds.nist.gov/all/NIST/HackingCase"
---

## Overview

This project was a **digital forensics investigation** using **Autopsy** (a free, open-source forensic platform) to analyze a **"Hacking Case"** forensic image from NIST CFReDS (<a href="https://cfreds.nist.gov/all/NIST/HackingCase" target="_blank" rel="noopener noreferrer">NIST Hacking Case</a>). CFReDS provides real-world forensic images for training; this one is a copy of a laptop that was found with a wireless card and a homemade 802.11b antenna, suggesting possible wireless hacking or wardriving. The goal was to find out **who** used the device, **what** tools were on it, **whether** those tools were actually used, and **why** — and to tie that into a clear narrative a court or employer could follow.

![Case description — Dell notebook, wireless card, and 802.11b antenna](/images/hacking-case/case-intro.png)

## Approach

I read the case description first to form hypotheses, then worked through the evidence in order: identify the main user account, see what was on their desktop and in their folders, check what had been used recently, and finally review web history to establish intent. That way each step built on the last and supported a single story.

## Findings

### Suspect identification

I first looked at **OS Accounts** to see who had used the computer. Besides the default Windows accounts (e.g. Administrator, Guest), there was one custom user: **"mr. evil"**. That made him the only real person we could tie activity to, so he became the main suspect for anything the device was used for.

![Documents and Settings — mr.evil folder](/images/hacking-case/documents-settings-mr-evil.png)

![OS Accounts listing — mr. evil and system accounts](/images/hacking-case/os-accounts-listing.png)

### Evidence on the Desktop

Next I looked at **mr. evil’s** files. On his **Desktop** he had a **"tools"** folder full of shortcuts (`.lnk` files — Windows links to programs). Those shortcuts pointed to:

![Desktop and Tools folder structure](/images/hacking-case/desktop-tools-tree.png)

![Tools folder — .lnk shortcuts (Cain, Ethereal, Network Stumbler, etc.)](/images/hacking-case/tools-folder-lnks.png)

- **Cain v2.5** — a password-cracking and network-sniffing tool  
- **Ethereal (now Wireshark)** — captures and analyzes network traffic  
- **Network Stumbler** — finds and lists nearby wireless networks (often used for *wardriving*: driving around to map or access Wi‑Fi)

So the suspect had these tools available and had chosen to keep shortcuts to them. That showed **what was on the machine**, but not yet that he had **used** them or had **bad intentions** — so I checked recent activity and browser history next.

### Proof of use

Windows keeps a **Recent** folder of recently opened files and shortcuts. I checked mr. evil’s Recent folder to see whether those tools had actually been launched. I found recent use of:

![Recent folder contents — Anonymizer, GhostWare, keys.lnk, etc.](/images/hacking-case/recent-folder-files.png)

- **Anonymizer** — software used to hide your identity online  
- **Ghostware** — used to remotely monitor or control other devices  
- **keys.lnk** — another shortcut that suggested further suspicious activity  

So we could show not only that these programs were **on** the machine, but that someone had **recently used** them — which pointed to mr. evil, the only active user.

### Evidence of intent

Having tools and using them still isn’t enough to prove **intent** — they could theoretically be used for learning or authorized testing. So I reviewed **Web History** to see what the user was looking up and visiting. That gave clear evidence of intent:

- **elitehackers.com** — a hacking forum/community; he visited the site and accessed files there, showing he was involved in that world.
- **netstumbler.com/downloads** — he had downloaded Network Stumbler, which matched the shortcut we found on his desktop.
- **wardriving.com** and **whatismyip.com** — direct interest in wardriving and checking his IP, which fit with the homemade antenna and the kind of activity the case suggested.

![Visit Details — elitehackers.com](/images/hacking-case/visit-elitehackers.png)

![Visit Details — netstumbler.com download](/images/hacking-case/visit-netstumbler-download.png)

![Web history — wardriving.com and whatismyip.com (Mr. Evil)](/images/hacking-case/web-history-wardriving.png)

## Conclusion

The investigation produced evidence in three areas that together tell a clear story:

1. **What was on the device** — Hacking and anonymity tools were present (Cain, Ethereal/Wireshark, Network Stumbler, Anonymizer, Ghostware), with shortcuts organized on the desktop.
2. **Whether they were used** — The Recent folder showed that these and other suspicious programs had been opened recently, and mr. evil was the only non-default user, so the activity could be tied to him.
3. **Why it mattered** — Browser history showed visits to hacking forums, wardriving sites, and a Network Stumbler download, which supported a narrative of intentional misuse (e.g. wardriving or unauthorized access) rather than accidental or innocent use.

In the end, a reader (or a court) could follow the same path: who used the laptop, what tools were there, that they were used, and that the user’s behavior indicated malicious intent — which is what this kind of forensic report is meant to show.

---

*Case source: <a href="https://cfreds.nist.gov/all/NIST/HackingCase" target="_blank" rel="noopener noreferrer">NIST CFReDS — Hacking Case</a>*
