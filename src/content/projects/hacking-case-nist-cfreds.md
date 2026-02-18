---
title: "Hacking Case — NIST CFReDS Forensic Analysis with Autopsy"
date: 2026-02-17
tags: ["digital-forensics", "autopsy", "nist-cfreds", "windows-artifacts", "evidence-analysis"]
tools: ["Autopsy", "NIST CFReDS", "Windows forensic artifacts"]
summary: "Forensic analysis of the NIST CFReDS 'Hacking Case' image using Autopsy — identifying a suspect user, malicious tools, and evidence of intent for a cohesive investigative narrative."
repoUrl: "https://cfreds.nist.gov/all/NIST/HackingCase"
---

## Overview

This project was a digital forensics investigation using **Autopsy** on the NIST CFReDS forensic image **"Hacking Case"** (<a href="https://cfreds.nist.gov/all/NIST/HackingCase" target="_blank" rel="noopener noreferrer">NIST Hacking Case</a>). The case description indicated the device was involved in wireless hacking activity, including a homemade 802.11b antenna. The goal was to find evidence of wireless tools, network scanners, suspicious files, and browser activity related to hacking — and to build a clear narrative of software presence, usage, and malicious intent.

![Case description — Dell notebook, wireless card, and 802.11b antenna](/images/hacking-case/case-intro.png)

## Approach

I started by reading the case description to form hypotheses and then systematically examined OS accounts, user folders, desktop shortcuts, recent files, and web history to link a suspect to tools and intent.

## Findings

### Suspect identification

Under **OS Accounts**, a non-default user **"mr. evil"** was the only custom account, indicating he was the primary user and main suspect for the potential cybercrimes involving the device.

![Documents and Settings — mr.evil folder](/images/hacking-case/documents-settings-mr-evil.png)

![OS Accounts listing — mr. evil and system accounts](/images/hacking-case/os-accounts-listing.png)

### Evidence on the Desktop

Inside **Documents and Settings → mr.evil**, the **Desktop** contained a **"tools"** folder with multiple `.lnk` shortcuts to hacking-related software:

![Desktop and Tools folder structure](/images/hacking-case/desktop-tools-tree.png)

![Tools folder — .lnk shortcuts (Cain, Ethereal, Network Stumbler, etc.)](/images/hacking-case/tools-folder-lnks.png)

- **Cain v2.5** — password cracking
- **Ethereal (Wireshark)** — packet sniffing and network traffic capture
- **Network Stumbler** — discover and analyze nearby wireless networks (strong indicator of wardriving)

This showed the suspect had access to and had saved links to these tools, but did not yet prove malicious use.

### Proof of use

I checked **Recent** activity and found recent use of:

![Recent folder contents — Anonymizer, GhostWare, keys.lnk, etc.](/images/hacking-case/recent-folder-files.png)

- **Anonymizer.lnk** — used to hide identity online
- **Ghostware.lnk** — used to remotely monitor devices
- **keys.lnk** — additional suspicious shortcut

This established that someone had actively used these programs on the device.

### Evidence of intent

To support malicious intent, I reviewed **Web History**. Findings included:

- Visits to **"elitehackers"** — a hacking community/forum, supporting the conclusion that the user was engaged in hacking culture
- Access to multiple files from that site
- Evidence of **downloading Network Stumbler**, corroborating the desktop shortcut
- A **news article** showing the device was used for both hacking and personal use
- **Direct evidence of interest in wardriving**, tying the homemade 802.11b antenna and Network Stumbler to likely wardriving activity

![Visit Details — elitehackers.com](/images/hacking-case/visit-elitehackers.png)

![Visit Details — netstumbler.com download](/images/hacking-case/visit-netstumbler-download.png)

![Web history — wardriving.com and whatismyip.com (Mr. Evil)](/images/hacking-case/web-history-wardriving.png)

## Conclusion

The investigation produced evidence in three areas:

1. **Software existence** — hacking and anonymity tools present (Cain, Ethereal/Wireshark, Network Stumbler, Anonymizer, Ghostware).
2. **Usage** — recent file and shortcut activity showing these tools were used on the device.
3. **Malicious intent** — browser history (elitehackers, wardriving-related content) supporting a narrative of intentional misuse.

Together, this painted a clear picture of how the device was used and supported a cohesive forensic narrative for the case.

---

*Case source: <a href="https://cfreds.nist.gov/all/NIST/HackingCase" target="_blank" rel="noopener noreferrer">NIST CFReDS — Hacking Case</a>*
