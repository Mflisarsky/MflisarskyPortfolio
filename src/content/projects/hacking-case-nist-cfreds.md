---
title: "Hacking Case: Autopsy analysis of a NIST CFReDS forensic image"
date: 2026-02-17
tags: ["digital forensics", "autopsy", "evidence analysis"]
tools: ["Autopsy", "NIST CFReDS", "Windows forensic artifacts"]
summary: "Forensic analysis of the NIST CFReDS 'Hacking Case' image using Autopsy, identifying a suspect user, malicious tools, and evidence of intent for a cohesive investigative narrative."
repoUrl: "https://cfreds.nist.gov/all/NIST/HackingCase"
---

## Overview

This project is a digital forensics investigation using **Autopsy** (a free, open-source forensic tool). I analyzed the NIST CFReDS **\"Hacking Case\"** forensic image (<a href="https://cfreds.nist.gov/all/NIST/HackingCase" target="_blank" rel="noopener noreferrer">NIST Hacking Case</a>). The case describes a laptop found with a wireless card and a homemade 802.11b antenna, which points toward possible wireless hacking or wardriving. My goal was simple: figure out who used the device, what tools were on it, whether those tools were used, and what the web activity says about intent.

![Case description - Dell notebook, wireless card, and 802.11b antenna](/images/hacking-case/case-intro.png)

## Approach

I started with the case description, then worked through the evidence in a practical order. First I identified the main user account. Then I looked at the suspect’s desktop and user folders for tools. After that I checked recent activity to see what had been opened. Finally I reviewed browser history to understand intent.

## Findings

### Suspect identification

I first checked **OS Accounts** to see who used the computer. Besides the default Windows accounts (like Administrator and Guest), there was one custom user: **\"mr. evil\"**. Since it was the only real user account, that’s the account I tied the rest of the evidence to.

![Documents and Settings - mr.evil folder](/images/hacking-case/documents-settings-mr-evil.png)

![OS Accounts listing - mr. evil and system accounts](/images/hacking-case/os-accounts-listing.png)

### Evidence on the Desktop

Next I looked at **mr. evil’s** files. On his **Desktop** he had a **\"tools\"** folder full of Windows shortcuts (`.lnk` files). Those shortcuts pointed to:

![Desktop and Tools folder structure](/images/hacking-case/desktop-tools-tree.png)

![Tools folder - .lnk shortcuts (Cain, Ethereal, Network Stumbler, etc.)](/images/hacking-case/tools-folder-lnks.png)

- **Cain v2.5**: password cracking and network sniffing  
- **Ethereal (Wireshark)**: captures and analyzes network traffic  
- **Network Stumbler**: finds nearby wireless networks (often used for wardriving)

This showed what tools were present, but I still needed proof they were actually being used. That’s why I checked recent activity and browser history next.

### Proof of use

Windows keeps a **Recent** folder of recently opened files and shortcuts. I checked mr. evil’s Recent folder to see what had actually been opened. I found:

![Recent folder contents - Anonymizer, GhostWare, keys.lnk, etc.](/images/hacking-case/recent-folder-files.png)

- **Anonymizer**: software used to hide identity online  
- **Ghostware**: remote monitoring/control software  
- **keys.lnk**: another suspicious shortcut  

So it wasn’t just “tools installed.” There was evidence that the tools (and related shortcuts) were being used under the mr. evil profile.

### Evidence of intent

Having tools installed isn’t automatically a crime, so I checked **Web History** to understand what the user was researching and doing online. The browsing history supported the idea that the tools were being used for hacking-related activity:

- **elitehackers.com**: hacking forum/community activity  
- **netstumbler.com/downloads**: download activity that matched the desktop shortcut  
- **wardriving.com** and **whatismyip.com**: interest in wardriving and checking IP information  

![Visit Details - elitehackers.com](/images/hacking-case/visit-elitehackers.png)

![Visit Details - netstumbler.com download](/images/hacking-case/visit-netstumbler-download.png)

![Web history - wardriving.com and whatismyip.com (Mr. Evil)](/images/hacking-case/web-history-wardriving.png)

## Conclusion

At a high level, the evidence came together in three parts:

1. **Tools present**: shortcuts and programs consistent with hacking and anonymity.  
2. **Signs of use**: Recent items showing the tools/shortcuts were opened.  
3. **Intent**: browser history that lined up with wardriving and hacking-related activity.  

The end result is a straightforward narrative: identify the user, show the tools, show they were used, and support intent with web activity.

---

*Case source: <a href="https://cfreds.nist.gov/all/NIST/HackingCase" target="_blank" rel="noopener noreferrer">NIST CFReDS - Hacking Case</a>*
