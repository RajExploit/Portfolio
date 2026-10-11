# Lucky Raj &mdash; Professional Portfolio Website ⚡

> **BCA Student @ SAGE University, Indore** &bull; Software Developer (C, Python, Java, SQL, Web) &bull; Video Editor & Digital Content Creator (Premiere Pro, DaVinci Resolve, After Effects, CapCut).

This is a developer & creative portfolio built with semantic **HTML5**, responsive **Vanilla CSS3**, and interactive **Vanilla JavaScript** (ES6+), optimized for high visual impact, performance, and accessibility.

---

## 🌟 Highlights & Features

- **Dual-Track Persona Showcase**:
  - **Track 1 &ndash; Software Developer:** Highlights computer science fundamentals, C, Python, Java, SQL databases, and Cisco certified networking principles.
  - **Track 2 &ndash; Digital Creator:** Showcases professional video post-production across Adobe Premiere Pro, DaVinci Resolve, After Effects, and CapCut.
- **Interactive Developer CLI Terminal (`rajexploit@portfolio:~$`)**:
  - Live interactive command line emulator supporting custom commands: `about`, `skills`, `education`, `projects`, `certifications`, `contact`, `clear`, and `sudo hire lucky`!
  - Includes quick shortcut pills for mobile & desktop convenience.
- **Interactive Resume Modal & Printable Sheet**:
  - Integrated "Resume CV" modal displaying Lucky Raj's exact curriculum vitae matching the official resume layout.
  - Print / Save PDF button pre-configured with print-specific CSS rules.
- **Particle & Ambient Canvas**:
  - 60 FPS interactive particle constellation canvas with cursor reactivity.
  - Ambient radial cursor follower glow.
- **Synthesized Audio Feedback**:
  - Lightweight Web Audio API synthesizer for tactile cyber audio cues with mute/unmute control.
- **Live Filterable Matrix**:
  - Filter skills by Programming & Web, Creative & Video, and Systems & Tools.
  - Filter projects by Software, Video, and Networking.
- **Direct Contact & Instant Copy**:
  - One-click copy buttons for email (`lucky909792@gmail.com`) and phone (`+91 7870856510`) with floating toast notification.
  - Working interactive message dispatch form.
- **Dark / Light Theme Toggle**:
  - Seamless toggle between Sleek Cyber Dark Mode and Clean Daylight Slate.

---

## 📁 Project Structure

```
My portfolio/
├── index.html              # Main HTML markup with SEO and semantic structure
├── style.css               # Design system, glassmorphism, responsive styles & print CSS
├── script.js               # CLI terminal engine, particle background, modals, typing effect
├── assets/
│   ├── lucky_avatar.jpg        # High-res developer portrait
│   ├── project_code_dev.jpg    # Software engineering showcase banner
│   ├── project_video_reel.jpg  # Video editing suite showcase banner
│   └── project_network.jpg     # Cisco networking topology showcase banner
└── README.md               # Documentation and deployment guide
```

---

## 🚀 Running Locally

1. Open your terminal in this directory:
   ```bash
   cd "/Users/apple/My portfolio"
   ```

2. Start a local HTTP server:
   ```bash
   python3 -m http.server 5173
   ```

3. Open in your browser:
   [http://localhost:5173](http://localhost:5173)

Alternatively, you can open `index.html` directly in any web browser.

---

## 🌐 Deploying to GitHub Pages (`RajExploit`)

Since Lucky Raj has a GitHub profile at [https://github.com/RajExploit](https://github.com/RajExploit), this repository can be deployed directly to GitHub Pages for free:

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```

2. Link to your GitHub repository:
   ```bash
   git remote add origin https://github.com/RajExploit/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository on GitHub: `Settings` > `Pages`.
   - Set source to `Deploy from a branch` -> `main` / `root`.
   - Your site will be live at `https://rajexploit.github.io/portfolio`!
