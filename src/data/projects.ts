// * Joud: This is the data for the projects section of the site.
const projectData = [
  {
    name: "Bountree",
    detailsPage: "/projects/bountree", // The path to the standalone project page

    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "Bountree is a global recruitment marketplace for deep tech startup jobs. It crowd-sources job roles to a network of recruiters, allowing anyone to earn rewards for successful referrals.", // Full description of the project
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"], // dunno if u want this
    github: "https://github.com/mo-shawa/bountree",
    deployment: "http://bountree.app/",
    image: "/projects/bountree.webp", // Make sure it's a high res square cropped image
    year: 2023, // dunno if u want this
    gradientColors: "from-pink-100 via-violet-100 to-white", // The gradient colors for the backdrop of the preview card. You have to use tailwindcss classes here
    // pick light shades that match the image ideally
    /**
     * @resource https://tailwindcss.com/docs/background-image#gradient-color-stops
     * @resrouce https://tailwindcss.com/docs/gradient-color-stops
     */
  },
  {
    name: "Culler",
    detailsPage: "/projects/culler",
    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "Culler is a color utility library for JavaScript and TypeScript. It provides a set of functions for working with colors, and is designed to be lightweight, modular, and performant. (Culler is used for all the dynamic colors on this site! 👀)",
    technologies: ["Typescript"],
    github: "https://github.com/mo-shawa/culler",
    deployment: "http://npmjs.com/package/culler",
    image: "/projects/bountree.webp",
    year: 2023,
    gradientColors: "from-slate-200 via-emerald-100 to-blue-200",
  },
  {
    name: "sahba.space",
    detailsPage: "/projects/sahba.space",
    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "A Custom portfolio website for Sahba El-Shawa, an interdisciplinary researcher and social entrepreneur. Based around an emulation of a galaxy created with Three.js and custom shaders.",
    technologies: ["TypeScript", "Three.js", "GSAP", "GLSL"],
    github: "https://github.com/mo-shawa/sahba.space",
    deployment: "http://sahba.space",
    year: 2023,
    image: "/projects/sahba.webp",
    gradientColors: "from-blue-200 via-violet-200 to-white",
  },
  {
    name: "Ask GPT",
    detailsPage: "/projects/askgpt3",
    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "Ask an advanced AI a question and get a response! Your questions and answers are saved locally in your browser, so you can come back to them later.",
    technologies: ["GPT-3", "React.js", "React Spring", "Node.js"],
    github: "https://github.com/mo-shawa/openAI-AMA",
    deployment: "http://openai-ama.herokuapp.com/",
    image: "/projects/askgpt3.webp",
    year: 2022,
    gradientColors: "from-violet-200 via-blue-200 to-slate-100",
  },
  {
    name: "test 1",
    detailsPage: "/projects/askgpt3",
    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "Ask an advanced AI a question and get a response! Your questions and answers are saved locally in your browser, so you can come back to them later.",
    technologies: ["GPT-3", "React.js", "React Spring", "Node.js"],
    github: "https://github.com/mo-shawa/openAI-AMA",
    deployment: "http://openai-ama.herokuapp.com/",
    image: "/projects/askgpt3.webp",
    year: 2022,
    gradientColors: "from-violet-200 via-blue-200 to-slate-100",
  },
  {
    name: "test 2",
    detailsPage: "/projects/askgpt3",
    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "Ask an advanced AI a question and get a response! Your questions and answers are saved locally in your browser, so you can come back to them later.",
    technologies: ["GPT-3", "React.js", "React Spring", "Node.js"],
    github: "https://github.com/mo-shawa/openAI-AMA",
    deployment: "http://openai-ama.herokuapp.com/",
    image: "/projects/askgpt3.webp",
    year: 2022,
    gradientColors: "from-violet-200 via-blue-200 to-emerald-100",
  },
  {
    name: "test 3",
    detailsPage: "/projects/askgpt3",
    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "Ask an advanced AI a question and get a response! Your questions and answers are saved locally in your browser, so you can come back to them later.",
    technologies: ["GPT-3", "React.js", "React Spring", "Node.js"],
    github: "https://github.com/mo-shawa/openAI-AMA",
    deployment: "http://openai-ama.herokuapp.com/",
    image: "/projects/askgpt3.webp",
    year: 2022,
    gradientColors: "from-stone-200 via-blue-200 to-slate-100",
  },
  {
    name: "test 4",
    detailsPage: "/projects/askgpt3",
    blurb: "A short thing about the thing", // Goes under the project name in the previews
    description:
      "Ask an advanced AI a question and get a response! Your questions and answers are saved locally in your browser, so you can come back to them later.",
    technologies: ["GPT-3", "React.js", "React Spring", "Node.js"],
    github: "https://github.com/mo-shawa/openAI-AMA",
    deployment: "http://openai-ama.herokuapp.com/",
    image: "/projects/askgpt3.webp",
    year: 2022,
    gradientColors: "from-violet-200 via-green-200 to-slate-100",
  },
]
export default projectData
