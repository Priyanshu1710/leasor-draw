# ☄️ laser-draw

A premium, interactive Markdown component for React that brings your documentation to life with a dynamic laser pointer interaction. Perfect for presentations, walkthroughs, or just adding that "wow" factor to your docs.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%3E%3D18-61dafb.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

---

## ✨ Features

- **🚀 Interactive Laser Pointer**: A smooth, velocity-aware laser trail that follows your cursor.
- **📝 Markdown Support**: Full GFM (GitHub Flavored Markdown) support via `marked`.
- **🎨 Premium Aesthetics**: Minimalist, floating toolbar with glassmorphism effects.
- **⚡ Lightweight**: Optimized for performance with zero unnecessary dependencies.
- **🌓 Mode Toggling**: Easily switch between normal reading and presentation mode.

---

## 🚀 Installation

```bash
npm install laser-draw
# or
yarn add laser-draw
# or
pnpm add laser-draw
```

---

## ⚡ Quick Start

```tsx
import { Draw } from "laser-draw";
import "laser-draw/style.css";

const MyDoc = () => <Draw content="# Hello World" />;
```

---

## 📁 Usage

### Simple Implementation

```tsx
import { Draw } from "laser-draw";
import "laser-draw/style.css";

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Draw content="## My Presentation Content" />
    </div>
  );
}
```

### Dynamic Content Example (React)

You can use `laser-draw` with dynamic state to create an interactive document viewer.

```tsx
import React, { useState } from "react";
import { Draw } from "laser-draw";
import "laser-draw/style.css";

export default function DocumentViewer() {
  const [doc, setDoc] = useState("# Initial Content");

  return (
    <div className="container">
      {/* Your Editor or Controls */}
      <button onClick={() => setDoc("# Updated Content 🚀")}>
        Update Doc
      </button>

      {/* The Laser Draw Component */}
      <Draw content={doc} />
    </div>
  );
}
```

---

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `content` | `string` | `""` | The raw markdown string to render. |
| `className` | `string` | `""` | Optional CSS class for the container. |

---

## 🧠 Why this works

Unlike static markdown viewers, **laser-draw** is built for engagement. 

- **Shows real usage**: The interactive layer lives on top of your content without blocking it.
- **Demonstrates practicality**: It's not just a viewer; it's a tool for communication.
- **Makes package feel alive**: The micro-animations and feedback loops (like the trail decay) make the user experience feel premium and modern.

---

## 🛠️ Development

If you want to contribute or experiment locally:

1. Clone the repo
2. Install dependencies: `npm install`
3. Run build: `npm run build`
4. Watch mode: `npm run dev`

---

## 📄 License

MIT © [Priyanshu (zyvio)](https://github.com/zyvio)
# leasor-draw
