# 🟣 Neuro Noir (AI Vision)

> **Turn Words Into Reality.**
> A stunning, cyberpunk-themed AI image generator powered by open-source diffusion models. Create, enhance, and save HD artwork instantly.

<div align="center">

  [![Live Demo](https://img.shields.io/badge/Live_Demo-Launch_App-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://neuro-noir.vercel.app/)
  [![Repo Size](https://img.shields.io/github/repo-size/manandevs/neuro-noir?style=for-the-badge&color=f472b6)](https://github.com/manandevs/neuro-noir)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

<br />

## 🚀 Project Overview

**Neuro Noir** is a client-side AI image generation interface built with vanilla **HTML5**, **Tailwind CSS**, and **jQuery**. It utilizes the **Pollinations.ai** API to generate images in seconds without requiring backend GPU servers. The UI features a fully immersive, glassmorphism-based cyberpunk aesthetic with live system analytics.

## ✨ Key Features

<table>
  <tr>
    <td align="center" width="33%">
      <br>
      <h3>⚡ Instant Generation</h3>
      <p>Powered by Pollinations.ai for lightning-fast diffusion rendering (seconds to render).</p>
      <br>
    </td>
    <td align="center" width="33%">
      <br>
      <h3>🎨 Cyberpunk UI</h3>
      <p>Immersive interface with neon glows, glassmorphism, and smooth CSS animations.</p>
      <br>
    </td>
    <td align="center" width="33%">
      <br>
      <h3>🛡️ Privacy First</h3>
      <p>No account required. Your creations and history are stored securely in your browser's <b>Local Storage</b>.</p>
      <br>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <br>
      <h3>✨ Prompt Enhancer</h3>
      <p>One-click "Magic Wand" feature to automatically refine and detail your text prompts.</p>
      <br>
    </td>
    <td align="center" width="33%">
      <br>
      <h3>📊 Live System Stats</h3>
      <p>Real-time visual analytics widget tracking system load and server latency using <b>Chart.js</b>.</p>
      <br>
    </td>
    <td align="center" width="33%">
      <br>
      <h3>🖼️ Integrated Gallery</h3>
      <p>View, manage, and download your previous creations in a responsive masonry grid.</p>
      <br>
    </td>
  </tr>
</table>

## 🛠️ Tech Stack

<div align="center">

  <!-- Core -->
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://jquery.com/">
    <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white" alt="jQuery" />
  </a>

  <br />

  <!-- APIs & Libs -->
  <a href="https://pollinations.ai/">
    <img src="https://img.shields.io/badge/Pollinations_API-000000?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Pollinations AI" />
  </a>
  <a href="https://www.chartjs.org/">
    <img src="https://img.shields.io/badge/Chart.js-F5788D?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  </a>
  <a href="https://fontawesome.com/">
    <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
  </a>

</div>

## 🚀 Getting Started

Since this is a static web application, it requires no complex build steps.

1.  **Clone the repo**
    ```bash
    git clone https://github.com/manandevs/neuro-noir.git
    cd neuro-noir
    ```

2.  **Run the project**
    Simply open `index.html` in your browser.
    
    *Optional: For the best experience (to avoid CORS issues with some assets), use a simple local server:*
    
    ```bash
    # using python
    python -m http.server 8000
    
    # OR using VS Code Live Server extension
    ```

## 📂 Project Structure

```text
.
├── 📁 css/
│   └── 📄 style.css        # Custom animations and overrides
├── 📁 js/
│   ├── 📄 script.js        # Main logic (API calls, UI interaction)
│   └── 📄 tailwind.config.js # Tailwind configuration
├── 📁 images/              # Assets and logos
├── 📄 index.html           # Main Generator Page
├── 📄 gallery.html         # User Gallery Page
└── 📄 community.html       # Community Page
