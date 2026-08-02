export interface CourseItem {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  tags: string[];
  image: string;
  link?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  format: string;
  duration: string;
  status: "Published" | "In Progress" | "Coming Soon";
  module_count?: number;
  enrollment_count?: number;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  sort_order: number;
  duration?: string;
  content_type: "video" | "article" | "quiz" | "exercise";
  is_free: boolean;
}

export const FALLBACK_COURSES: CourseItem[] = [
  {
    id: "course-01",
    title: "Build a Brutalist Portfolio",
    description:
      "Buat website portofolio dari nol dengan desain brutalist yang anti-mainstream.",
    long_description:
      "Workshop lengkap membangun portofolio web dengan pendekatan desain brutalist. Mulai dari wireframe, design system, hingga deployment. Cocok untuk developer yang bosan dengan template generic.",
    tags: ["Next.js", "CSS", "Design"],
    image: "/images/course-1.png",
    level: "Beginner",
    format: "Video Course",
    duration: "4h 30m",
    status: "Published",
    module_count: 7,
    enrollment_count: 42,
  },
  {
    id: "course-02",
    title: "WebGL Shader Masterclass",
    description:
      "Deep dive ke dunia shader programming untuk visual effect yang memukau di browser.",
    long_description:
      "Pelajari GLSL dari dasar hingga advanced. Buat shader custom untuk particle systems, post-processing effects, dan generative art. Proyek akhir: interactive audio-reactive visualizer.",
    tags: ["WebGL", "GLSL", "Three.js"],
    image: "/images/course-2.png",
    level: "Advanced",
    format: "Workshop",
    duration: "8h",
    status: "Published",
    module_count: 12,
    enrollment_count: 18,
  },
  {
    id: "course-03",
    title: "Rust for Frontend Devs",
    description:
      "Pelajari Rust dan compile ke WebAssembly untuk performa web app yang blazing fast.",
    long_description:
      "Transisi dari JavaScript/TypeScript ke Rust dengan fokus pada use case frontend. Belajar ownership, borrowing, dan lifetime — lalu compile semuanya ke WASM.",
    tags: ["Rust", "WASM", "TypeScript"],
    image: "/images/course-3.png",
    level: "Intermediate",
    format: "Tutorial Series",
    duration: "6h 15m",
    status: "In Progress",
    module_count: 9,
    enrollment_count: 31,
  },
  {
    id: "course-04",
    title: "DIY IoT with ESP32",
    description:
      "Bangun proyek IoT dari nol: sensor, microcontroller, sampai dashboard monitoring.",
    long_description:
      "Hands-on workshop menghubungkan dunia fisik dan digital. Setup ESP32, baca sensor, kirim data ke cloud, dan visualisasikan di dashboard web real-time.",
    tags: ["ESP32", "C++", "MQTT", "React"],
    image: "/images/course-4.png",
    level: "Beginner",
    format: "Video Course",
    duration: "5h",
    status: "Coming Soon",
    module_count: 8,
    enrollment_count: 0,
  },
];

export const FALLBACK_MODULES: CourseModule[] = [
  {
    id: "mod-01-01",
    course_id: "course-01",
    title: "Filosofi Desain Brutalist",
    description:
      "Kenapa brutalist? Sejarah, prinsip, dan kapan harus (dan tidak) menggunakannya.",
    sort_order: 1,
    duration: "20m",
    content_type: "video",
    is_free: true,
  },
  {
    id: "mod-01-02",
    course_id: "course-01",
    title: "Setup Project & Tooling",
    description:
      "Next.js, Tailwind CSS v4, dan konfigurasi development environment.",
    sort_order: 2,
    duration: "25m",
    content_type: "video",
    is_free: true,
  },
  {
    id: "mod-01-03",
    course_id: "course-01",
    title: "Design System dari Nol",
    description:
      "Buat color palette, typography scale, dan spacing system sendiri.",
    sort_order: 3,
    duration: "35m",
    content_type: "video",
    is_free: false,
  },
  {
    id: "mod-01-04",
    course_id: "course-01",
    title: "Komponen Paper Card & Masking Tape",
    description:
      "Implementasi komponen visual khas brutalist: paper textures, tape effects, dan hand-drawn borders.",
    sort_order: 4,
    duration: "40m",
    content_type: "video",
    is_free: false,
  },
  {
    id: "mod-01-05",
    course_id: "course-01",
    title: "Layout Grid & Responsive Design",
    description:
      "Grid system yang berantakan tapi tetap accessible dan responsive.",
    sort_order: 5,
    duration: "30m",
    content_type: "video",
    is_free: false,
  },
  {
    id: "mod-01-06",
    course_id: "course-01",
    title: "Animasi dengan Framer Motion",
    description:
      "Scroll-triggered animations, micro-interactions, dan page transitions.",
    sort_order: 6,
    duration: "35m",
    content_type: "video",
    is_free: false,
  },
  {
    id: "mod-01-07",
    course_id: "course-01",
    title: "Deployment & Performance",
    description:
      "Deploy ke Vercel, optimasi gambar, dan lighthouse audit.",
    sort_order: 7,
    duration: "25m",
    content_type: "video",
    is_free: false,
  },
];
