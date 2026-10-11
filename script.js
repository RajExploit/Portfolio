/**
 * Lucky Raj - Portfolio Interactive Engine
 * BCA Scholar & Software Developer | Video Editor & Digital Creator
 */

// --- Global Audio Synthesizer (Zero-dependency Web Audio API) ---
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playCyberBlip(freq = 600, type = 'sine', duration = 0.08) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context may require explicit user gesture
  }
}

// --- Typing Effect in Hero ---
const typingRoles = [
  "Software Developer (BCA)",
  "Video Editor & Motion Designer",
  "C, Python, Java & Web Enthusiast",
  "DaVinci Resolve & Premiere Pro Artist",
  "Cisco Certified in Networking Basics"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const deletingSpeed = 45;
const pauseDelay = 1800;

function typeRoleEffect() {
  const typingElement = document.getElementById("typingRole");
  if (!typingElement) return;

  const currentRole = typingRoles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let timeout = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    timeout = pauseDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typingRoles.length;
    timeout = 400;
  }

  setTimeout(typeRoleEffect, timeout);
}

// --- Ambient Canvas Background (Interactive Node Network) ---
function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width > 768 ? 55 : 25, 70);
  const particles = [];
  const mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? "rgba(0, 242, 254, 0.4)" : "rgba(139, 92, 246, 0.35)";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 2.5;
        this.y -= (dy / dist) * force * 2.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - distance / 110) * 0.15;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// --- Interactive Cursor Follower Glow ---
function initCursorFollower() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();
}

// --- Interactive Terminal Simulation ---
const terminalCommands = {
  help: () => `
    <span class="term-welcome">Available Commands:</span><br>
    &bull; <strong class="term-cmd-highlight">about</strong> / <strong class="term-cmd-highlight">bio</strong> : Professional background & aspirations<br>
    &bull; <strong class="term-cmd-highlight">skills</strong> : Comprehensive technical & creative stack<br>
    &bull; <strong class="term-cmd-highlight">education</strong> : SAGE University BCA & school qualifications<br>
    &bull; <strong class="term-cmd-highlight">projects</strong> : Overview of coding & video editing works<br>
    &bull; <strong class="term-cmd-highlight">certifications</strong> : Cisco Networking & Sunstone Blockchain credentials<br>
    &bull; <strong class="term-cmd-highlight">contact</strong> : Direct reach via email, phone, and GitHub<br>
    &bull; <strong class="term-cmd-highlight">sudo hire lucky</strong> : Unlock special invitation action<br>
    &bull; <strong class="term-cmd-highlight">clear</strong> : Clear current terminal window
  `,

  about: () => `
    <strong>LUCKY RAJ</strong> &mdash; BCA Student @ SAGE University, Indore.<br>
    &bull; Track 1: Software Development (C, Python, Java, SQL, Web Technologies)<br>
    &bull; Track 2: Digital Content & Video Editing (Premiere Pro, After Effects, DaVinci Resolve, CapCut)<br>
    &bull; Focus: Building solid practical skills through coding practice and creative media production.<br>
    &bull; Status: Actively looking for internships & collaborative engineering opportunities.
  `,

  bio: () => terminalCommands.about(),

  skills: () => `
    <span class="term-welcome">Technical & Creative Skills:</span><br>
    &bull; <strong>Programming:</strong> C Programming, Python, Java, JavaScript<br>
    &bull; <strong>Web & DB:</strong> HTML5, CSS3, JavaScript (ES6+), SQL (Relational DBs)<br>
    &bull; <strong>Networking:</strong> Cisco Networking Basics (OSI, IP, Routing, Switches)<br>
    &bull; <strong>Video Editing:</strong> Adobe Premiere Pro, DaVinci Resolve, CapCut<br>
    &bull; <strong>Motion & VFX:</strong> Adobe After Effects (Kinetic typography, animations)<br>
    &bull; <strong>Tools:</strong> VS Code, Git, GitHub (RajExploit)
  `,

  education: () => `
    <span class="term-welcome">Academic Record:</span><br>
    &bull; <strong>Bachelor of Computer Applications (BCA):</strong> SAGE University, Indore (01/2025 &ndash; 01/2028)<br>
    &bull; <strong>Class 12:</strong> Higher Secondary (01/2023 &ndash; 01/2025)<br>
    &bull; <strong>Class 10:</strong> Secondary Matriculation (01/2021 &ndash; 01/2023)
  `,

  certifications: () => `
    <span class="term-welcome">Verified Certifications & Workshops:</span><br>
    &bull; <strong>Networking Basics:</strong> Cisco Networking Academy<br>
    &bull; <strong>Blockchain Workshop:</strong> Sunstone
  `,

  projects: () => `
    <span class="term-welcome">Core Practice Projects:</span><br>
    1. <strong>Programming Practice Suite:</strong> Algorithm problems, C/Java OOP, Python scripts, SQL schema queries.<br>
    2. <strong>Video Editing & Digital Content:</strong> Multi-cam narrative edits, node-based color grading, high-retention short reels.<br>
    3. <strong>Cisco Networking Topology:</strong> Packet Tracer network architecture, VLAN segmentation & IP subnetting.
  `,

  contact: () => `
    <span class="term-welcome">Get In Touch with Lucky Raj:</span><br>
    &bull; <strong>Email:</strong> <a href="mailto:lucky909792@gmail.com" class="link-highlight">lucky909792@gmail.com</a><br>
    &bull; <strong>Phone:</strong> <a href="tel:+917870856510" class="link-highlight">+91 7870856510</a><br>
    &bull; <strong>GitHub:</strong> <a href="https://github.com/RajExploit" target="_blank" class="link-highlight">github.com/RajExploit</a><br>
    &bull; <strong>Location:</strong> Indore, Madhya Pradesh, India
  `,

  "sudo hire lucky": () => `
    <span style="color: #10b981; font-weight: bold; font-size: 1.05rem;">
      🎉 [ACCESS GRANTED]: Welcome aboard!
    </span><br>
    Lucky Raj is eager to bring dedication, technical curiosity, and creative energy to your engineering or digital media team.<br>
    Direct email: <strong>lucky909792@gmail.com</strong> | Phone: <strong>+91 7870856510</strong><br>
    <em>Let's build something phenomenal together!</em>
  `
};

function executeTermCommand(rawInput) {
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalInput = document.getElementById("terminalInput");
  if (!terminalOutput) return;

  const input = rawInput.trim().toLowerCase();

  // Print command line
  const cmdLine = document.createElement("div");
  cmdLine.className = "term-line";
  cmdLine.innerHTML = `<span class="term-prompt"><span class="term-user">lucky</span><span class="term-at">@</span><span class="term-host">rajexploit</span>:<span class="term-path">~</span>$</span> <span>${rawInput}</span>`;
  terminalOutput.appendChild(cmdLine);

  playCyberBlip(750, "sine", 0.05);

  if (input === "clear") {
    clearTerminal();
    return;
  }

  const responseLine = document.createElement("div");
  responseLine.className = "term-line output";

  if (terminalCommands[input]) {
    responseLine.innerHTML = terminalCommands[input]();
  } else if (input === "") {
    // empty return
    responseLine.innerHTML = "";
  } else {
    responseLine.innerHTML = `<span style="color:#ef4444;">zsh: command not found: ${rawInput}. Type <strong class="term-cmd-highlight">help</strong> for a list of commands.</span>`;
  }

  terminalOutput.appendChild(responseLine);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;

  if (terminalInput) {
    terminalInput.value = "";
  }
}

function clearTerminal() {
  const terminalOutput = document.getElementById("terminalOutput");
  if (terminalOutput) {
    terminalOutput.innerHTML = `
      <div class="term-line output">
        <span class="term-welcome">Terminal cleared. Type <strong class="term-cmd-highlight">help</strong> for options.</span>
      </div>
    `;
  }
}

// --- Project Modal Deep-Dive Data ---
const projectModalData = {
  "code-suite": {
    title: "Programming Practice & Lab Development Suite",
    badge: "Software Engineering & Computer Applications",
    image: "assets/project_code_dev.jpg",
    description: `
      An extensive repository of programming lab solutions and personal practice modules developed as part of Lucky's BCA curriculum at SAGE University and independent software explorations.
    `,
    highlights: [
      "<strong>C Language Foundations:</strong> Pointer arithmetic, dynamic memory allocation (`malloc`, `free`), linked lists, stack implementations, and procedural algorithms.",
      "<strong>Object-Oriented Programming in Java:</strong> Inheritance, polymorphism, encapsulation, exception handling, and class architecture.",
      "<strong>Python Automation & Scripting:</strong> Data collection, string manipulation algorithms, file I/O, and mathematical computation.",
      "<strong>SQL Database Queries:</strong> Relational schema design, entity relationship mapping, nested `SELECT` queries, `JOIN` operations, and normalization."
    ],
    sampleCode: `// Sample: Dynamic Memory Array in C
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));
    if (!arr) return 1;

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
        printf("Index %d: Value = %d\\n", i, arr[i]);
    }
    free(arr);
    return 0;
}`,
    githubUrl: "https://github.com/RajExploit"
  },

  "video-suite": {
    title: "Cinematic Video Editing & Digital Content Production",
    badge: "Multimedia Post-Production & Color Grading",
    image: "assets/project_video_reel.jpg",
    description: `
      A comprehensive production portfolio demonstrating advanced editing techniques, visual rhythm, sound design, and color grading for digital content across modern social and commercial formats.
    `,
    highlights: [
      "<strong>Adobe Premiere Pro:</strong> Multi-cam editing, L-cuts, J-cuts, audio synchronization, beat-matched cuts, and timeline color workflows.",
      "<strong>DaVinci Resolve Color Studio:</strong> Professional node-based grading, LUT development, skin tone isolation, contrast curves, and high-dynamic-range deliverables.",
      "<strong>Adobe After Effects:</strong> Motion tracking, custom kinetic typography, visual glitch effects, masking, and brand intros.",
      "<strong>CapCut Optimization:</strong> Rapid narrative hooks, sound effect layering, auto-captions, and retention optimization for short-form video (Instagram Reels / YouTube Shorts)."
    ],
    sampleCode: null,
    githubUrl: "https://github.com/RajExploit"
  },

  "network-lab": {
    title: "Enterprise Network Architecture & Routing Lab",
    badge: "Cisco Networking Academy Certified",
    image: "assets/project_network.jpg",
    description: `
      Practical network configurations, packet tracer topology designs, and subnetting exercises completed as part of the verified Cisco Networking Academy - Networking Basics certification.
    `,
    highlights: [
      "<strong>OSI & TCP/IP Model:</strong> Deep understanding of packet encapsulation, frame delivery, protocols (HTTP, DNS, DHCP, ARP, ICMP).",
      "<strong>IP Addressing & Subnetting:</strong> Variable Length Subnet Masking (VLSM), CIDR notation, private vs public IP space planning.",
      "<strong>Routing & Switching:</strong> Static routing, RIP/OSPF fundamentals, VLAN segregation, and default gateway configurations.",
      "<strong>Network Security & Troubleshooting:</strong> Ping, Traceroute packet tracing, firewall rules, and port connectivity verification."
    ],
    sampleCode: `# Cisco IOS CLI Configuration Snippet
Router> enable
Router# configure terminal
Router(config)# interface GigabitEthernet0/0/0
Router(config-if)# ip address 192.168.10.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# ip route 0.0.0.0 0.0.0.0 192.168.10.254`,
    githubUrl: "https://github.com/RajExploit"
  }
};

function openProjectModal(key) {
  const modal = document.getElementById("projectModal");
  const content = document.getElementById("projectModalContent");
  const modalTitle = document.getElementById("modalProjectTitle");
  if (!modal || !content) return;

  const data = projectModalData[key];
  if (!data) return;

  modalTitle.innerHTML = `<i class="fa-solid fa-folder-open"></i> ${data.title}`;

  let highlightsHtml = data.highlights
    .map((item) => `<li><i class="fa-solid fa-chevron-right" style="color:var(--accent-cyan); font-size:0.8rem; margin-right:0.5rem;"></i>${item}</li>`)
    .join("");

  let codeBlockHtml = data.sampleCode
    ? `
      <div style="margin-top: 1.5rem;">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--accent-cyan); font-family: var(--font-code);">
          <i class="fa-solid fa-code"></i> Implementation Code Snippet:
        </h4>
        <pre style="background: #060a12; padding: 1.2rem; border-radius: 8px; border: 1px solid var(--border-subtle); overflow-x: auto; font-family: var(--font-code); font-size: 0.85rem; color: #a5b4fc; line-height: 1.5;"><code>${escapeHtml(data.sampleCode)}</code></pre>
      </div>
    `
    : "";

  content.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <img src="${data.image}" alt="${data.title}" style="width: 100%; border-radius: 12px; margin-bottom: 1.25rem; border: 1px solid var(--border-subtle); max-height: 320px; object-fit: cover;">
      <span class="project-badge" style="position: static; display: inline-block; margin-bottom: 0.8rem;">${data.badge}</span>
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.2rem;">${data.description}</p>
      
      <h4 style="font-size: 1.05rem; margin-bottom: 0.75rem; color: var(--text-primary);">Core Competencies Demonstrated:</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.2rem; font-size: 0.92rem; color: var(--text-secondary);">
        ${highlightsHtml}
      </ul>

      ${codeBlockHtml}

      <div style="display: flex; gap: 1rem; margin-top: 1.8rem; padding-top: 1.2rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> View GitHub (RajExploit)
        </a>
        <a href="#contact" onclick="closeProjectModal()" class="btn btn-glass btn-sm">
          <i class="fa-solid fa-paper-plane"></i> Discuss This Project
        </a>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  playCyberBlip(800, "triangle", 0.08);
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// --- Resume Modal ---
function openResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    playCyberBlip(650, "sine", 0.08);
  }
}

function closeResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function printResume() {
  playCyberBlip(900, "square", 0.05);
  window.print();
}

// --- Toast Notification & Clipboard ---
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-green); margin-right:0.5rem;"></i> ${message}`;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function copyToClipboard(text, customMessage = "Copied to clipboard!") {
  playCyberBlip(900, "sine", 0.06);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast(customMessage);
      })
      .catch(() => {
        fallbackCopyTextToClipboard(text, customMessage);
      });
  } else {
    fallbackCopyTextToClipboard(text, customMessage);
  }
}

function fallbackCopyTextToClipboard(text, customMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(customMessage);
  } catch (err) {
    showToast("Press Ctrl+C to copy");
  }
  document.body.removeChild(textArea);
}

// --- Contact Form Submission ---
function handleContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  if (!form) return;

  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const subject = document.getElementById("subjectSelect").value;
  const message = document.getElementById("userMessage").value.trim();

  if (!name || !email || !subject || !message) {
    showToast("Please complete all required fields.");
    return;
  }

  // Animation on button
  if (submitBtn) {
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;
  }

  playCyberBlip(1100, "triangle", 0.12);

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Message Prepared!</span> <i class="fa-solid fa-check"></i>`;
      submitBtn.style.background = "#10b981";
    }

    showToast(`Thank you, ${name}! Opening mail client to send to Lucky Raj.`);

    // Launch mailto fallback
    const mailtoUrl = `mailto:lucky909792@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject} from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSent via Lucky Raj Portfolio`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }
    }, 3000);
  }, 1000);
}

// --- Filtering: Skills & Projects ---
function initFilters() {
  // Skills filter
  const skillFilters = document.querySelectorAll("#skillFilters .filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  skillFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      playCyberBlip(500, "sine", 0.04);
      skillFilters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
          card.style.animation = "modalPop 0.3s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Projects filter
  const projectFilters = document.querySelectorAll("#projectFilters .filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      playCyberBlip(500, "sine", 0.04);
      projectFilters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
          card.style.animation = "modalPop 0.3s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// --- Navigation & Scroll Effects ---
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const backToTop = document.getElementById("backToTop");
  const themeToggle = document.getElementById("themeToggle");
  const soundToggle = document.getElementById("soundToggle");
  const resumeBtn = document.getElementById("resumeModalBtn");

  // Mobile menu toggle
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
      const icon = mobileBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
      playCyberBlip(600, "sine", 0.05);
    });

    // Close on click link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        const icon = mobileBtn.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  // Scroll header styling & back to top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Scroll spy for active link
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (link) link.classList.add("active");
      } else {
        if (link) link.classList.remove("active");
      }
    });
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      playCyberBlip(800, "sine", 0.08);
    });
  }

  // Theme toggle
  if (themeToggle) {
    // Check saved
    const savedTheme = localStorage.getItem("lucky_portfolio_theme");
    if (savedTheme === "light") {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      themeToggle.innerHTML = `<i class="fa-solid fa-sun" style="color:var(--accent-amber);"></i>`;
    }

    themeToggle.addEventListener("click", () => {
      playCyberBlip(700, "triangle", 0.06);
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        themeToggle.innerHTML = `<i class="fa-solid fa-sun" style="color:var(--accent-amber);"></i>`;
        localStorage.setItem("lucky_portfolio_theme", "light");
        showToast("Switched to Light Theme");
      } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        localStorage.setItem("lucky_portfolio_theme", "dark");
        showToast("Switched to Cyber Dark Theme");
      }
    });
  }

  // Sound toggle
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundToggle.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        playCyberBlip(880, "sine", 0.08);
        showToast("Sound FX Enabled 🔊");
      } else {
        soundToggle.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        showToast("Sound FX Muted 🔇");
      }
    });
  }

  // Resume modal trigger
  if (resumeBtn) {
    resumeBtn.addEventListener("click", openResumeModal);
  }
}

// --- Terminal Input Key Handler ---
function initTerminalInput() {
  const termInput = document.getElementById("terminalInput");
  if (!termInput) return;

  const history = [];
  let historyIndex = -1;

  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = termInput.value;
      if (val.trim()) {
        history.push(val);
        historyIndex = history.length;
        executeTermCommand(val);
      }
    } else if (e.key === "ArrowUp") {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        termInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        termInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        termInput.value = "";
      }
    }
  });
}

// --- Escape Key listener for Modals ---
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeResumeModal();
    closeProjectModal();
  }
});

// --- Initialize All Features on DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  typeRoleEffect();
  initAmbientCanvas();
  initCursorFollower();
  initFilters();
  initNavigation();
  initTerminalInput();

  // Set current year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  console.log("%c⚡ Lucky Raj Portfolio initialized successfully!", "color: #00f2fe; font-size: 14px; font-weight: bold;");
});
