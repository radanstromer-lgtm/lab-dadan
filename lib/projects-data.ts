export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  long_description?: string;
  content?: string;
}

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Focus.exe",
    description:
      "A brutalist task manager that yells at you when you procrastinate. Dark mode only, obviously.",
    tags: ["React", "Zustand", "Tailwind"],
    image: "/images/project-1.png",
    link: "#",
    long_description:
      "Focus.exe is designed for developers who get easily distracted. Built with a brutalist interface, it actively monitors idle time and uses micro-interactions and audio cues to keep you locked into deep work mode.",
  },
  {
    id: "02",
    title: "Chromatica",
    description:
      "Vector drawing tool with an overly complex generative gradient engine. Runs entirely in the browser.",
    tags: ["Canvas API", "WebGL", "TypeScript"],
    image: "/images/project-2.png",
    link: "#",
    long_description:
      "Chromatica leverages WebGL shaders to create fluid, real-time vector gradients and math-driven mesh distortions, rendering multi-layered canvas art smoothly at 60fps.",
  },
  {
    id: "03",
    title: "Neon Void",
    description:
      "8-bit space shooter built to test WASM performance. Warning: extremely addictive and loud.",
    tags: ["Rust", "WASM", "HTML5"],
    image: "/images/project-3.png",
    link: "#",
    long_description:
      "Engineered with Rust compiled to WebAssembly for raw execution speed. Features retro synthwave audio synthesis and custom particle physics.",
  },
  {
    id: "04",
    title: "NeuroBabble",
    description:
      "An AI experiment that fine-tunes small language models on my old cringey blog posts.",
    tags: ["Python", "Transformers", "React"],
    image: "/images/project-4.png",
    link: "#",
    long_description:
      "Fine-tuned Transformer models trained on personal archives to synthesize nostalgic, erratic early-2010s blog posts with high accuracy.",
  },
  {
    id: "05",
    title: "MathArt.js",
    description:
      "Swirling chaotic particles forming geometric patterns based on user audio input.",
    tags: ["Three.js", "WebAudio API"],
    image: "/images/project-5.png",
    link: "#",
    long_description:
      "Audio-reactive WebGL engine using Three.js and WebAudio API FFT frequency analysis to warp geometry and light in real time.",
  },
  {
    id: "06",
    title: "Pulse Dash",
    description:
      "Over-engineered data visualization dashboard for tracking literally nothing important.",
    tags: ["D3.js", "Vue", "Framer Motion"],
    image: "/images/project-6.png",
    link: "#",
    long_description:
      "Experimental dashboard combining D3 data binding with Framer Motion layout animations for interactive charts and graphs.",
  },
  {
    id: "07",
    title: "ChronoSync",
    description:
      "Sleek timezone converter because scheduling meetings across the globe is a nightmare.",
    tags: ["Svelte", "Luxon"],
    image: "/images/project-7.png",
    link: "#",
    long_description:
      "Zero-latency timezone alignment tool built with Svelte for quick visual comparisons across global working hours.",
  },
  {
    id: "08",
    title: "JellyBlob",
    description:
      "A weird surreal web toy with floating 3D jelly blobs that follow your cursor.",
    tags: ["React Three Fiber", "Cannon.js"],
    image: "/images/project-8.png",
    link: "#",
    long_description:
      "Surreal physics playground using React Three Fiber and Cannon.js soft-body physics to simulate jelly-like elastic interactions.",
  },
];
