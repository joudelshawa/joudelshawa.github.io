// * Joud: This is the data for the projects section of the site.
const projectData: Project[] = [

  {
    name: "FairCast",
    slug: "gnn-heatwave-forecasting",
  
    blurb:
      "Accepted to the NeurIPS 2025 Workshop on Tackling Climate Change with Machine Learning. A graph neural network framework for localized, high-resolution temperature forecasting and equitable early-warning systems.",
  
    technologies: ["PyTorch Geometric", "Graph Neural Networks", "NOAA URMA", "Python", "ClimateBERT", "Satellite Embeddings"],
    links: [
      {
        text: "NeurIPS Workshop Poster",
        href: "https://s3.us-east-1.amazonaws.com/climate-change-ai/papers/neurips2025/61/poster.pdf"
      },
      {
        text: "Paper",
        href: "https://s3.us-east-1.amazonaws.com/climate-change-ai/papers/neurips2025/61/paper.pdf"
      },
      {
        text: "Talk",
        href: "https://www.climatechange.ai/papers/neurips2025/61#recording"
      },
      {
        text: "Slides",
        href: "https://www.canva.com/design/DAG3jpaBZCg/ZMhMLCqysaNfpm8vviJaew/view?utm_content=DAG3jpaBZCg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4fe2b9be28", 
      },
    ],
    image: "/projects/gnn.png",
    year: 2025,
  },
  {
    name: "Hermes",
    slug: "hermes-clinical-nlp",
  
    blurb:
      "Accepted and presented at the AAAI SecureAI4Health 2025 Symposium. A large-language-model-driven multi-agent system that transforms unstructured clinical notes into structured reports and knowledge graphs.",
  
    technologies: ["Python", "Large Language Models", "MIMIC-IV", "Ollama", "Deepseek R1", "LLama"],
    links: [
      {
        text: "AAAI SecureAI4Health Poster",
        href: "https://drive.google.com/file/d/1uX16AoPzxpECsEIyMR6p63_u_VpIEA9C/view"
      },
      {
        text: "Paper",
        href: "https://ojs.aaai.org/index.php/AAAI-SS/article/view/36936"
      },
      {
        text: "Slides",
        href: "https://www.canva.com/design/DAG3TYSBrK4/8J1viIPpVURMWsEKYrlLBQ/view?utm_content=DAG3TYSBrK4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he25515b9bf",
      },
    ],
    image: "/projects/hermes.png",
    year: 2025,
  },
  
  {
    name: "ML4Labs",
    slug: "glucose-prediction",
  
    blurb:
      "Accepted and presented at the AAAI SecureAI4Health 2025 Symposium. A multi-modal deep learning system using Clinical BioBERT and LSTM models to predict laboratory test ordering across multiple hospitals.",
  
    technologies: ["Python", "Keras", "Tensorflow", "SQLAlchemy", "Clinical BioBERT", "GEMINI Dataset", "LSTM"],
    links: [
      {
        text: "AAAI SecureAI4Health Poster",
        href: "https://drive.google.com/file/d/1nLRisia6qJUaBRRlnuyLgC0ar0N1Mk15/view"
      },
      {
        text: "Paper",
        href: "https://ojs.aaai.org/index.php/AAAI-SS/article/view/36924"
      },
      {
        text: "Slides",
        href: "https://www.canva.com/design/DAG3TLvU31o/V4_Q2W_gjuzsPXY9QHWqgQ/view?utm_content=DAG3TLvU31o&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h361faae11e", 
      },
    ],
    image: "/projects/ml4labs.webp",
    year: 2025,
  },
  {
    name: "Unsupervised Anomaly Detection in MRIs",
    slug: "unsupervised-anomaly",

    blurb:
      "This project was conducted as part of an NSERC Undergraduate Student Research Award and aimed to develop an automated deterministic segmentation solution for accurately identifying brain tumor boundaries in MR images using and improving upon existing Denoising Autoencoder and U-net models.",
    technologies: ["Python", "Keras", "TensorFlow", "Brats2021 Dataset"],
    links: [
      {
        text: "BraTs",
        href: "https://www.med.upenn.edu/cbica/brats2021/",
      },
      {
        text: "DenoisingAE",
        href: "https://github.com/AntanasKascenas/DenoisingAE",
      },
    ],
    image: "/projects/unsupervised-anomaly.webp",
    year: 2023,
  },
  {
    name: "BankYeller",
    slug: "bank-yeller",

    blurb:
      "Hackwestern 8 Project + “Best Use of Dasha AI” Winner - An application that allows the user to voice chat with an AI to get their latest bank account information and be able to pay their bills vocally.",

    technologies: [
      "Dasha AI",
      "Figma",
      "Google Cloud Platform",
      "MySQL",
      "JavaScript",
      "Node.js",
    ],
    links: [
      {
        href: "https://devpost.com/software/bank-yeller",
        text: "Devpost",
      },
      {
        href: "https://www.youtube.com/watch?v=e6nFVn0LKjY",
        text: "Demo",
      },
      {
        href: "https://github.com/joudelshawa/HW8-bank-assist",
        text: "GitHub",
      },
    ],
    image: "/projects/bank-yeller.webp",
    year: 2022,
  },
  {
    name: "Evaluating Machine Learning Model Stability for Software Bug Prediction",
    slug: "ibm-uwo-research",

    blurb:
      "IBM + Western University Research - A project aiming to investigate risk prediction of software system failures and evaluate machine learning model stability for software bug prediction.",
    technologies: ["Python", "Git"],
    links: [
      {
        href: "https://ir.lib.uwo.ca/usri/usri2021/researchoutputshowcase/132/",
        text: "Poster",
      },
    ],
    image: "/projects/ibm-uwo-research.webp",
    year: 2022,
  },

  {
    name: "SoQuo",
    slug: "soquo",

    blurb:
      "AI4Good Lab Project + Edmonton Accelerator Award Winner - SoQuo is an app that improves a user’s social media experience by helping them evaluate the impact of online interactions on their mental health.",
    technologies: ["Python", "NLP"],
    links: [
      {
        href: "https://www.ai4goodlab.com/news/2021/10/04/social-media-is-a-no-go-without-soquo/",
        text: "AI4Good Lab Article",
      },
      {
        href: "https://www.canva.com/design/DAEh-FkYcsk/2VQuWn8jZWi8PKiKQJwHdg/view?utm_content=DAEh-FkYcsk&utm_campaign=designshare&utm_medium=link&utm_source=editor",
        text: "Slides",
      },
    ],
    image: "/projects/soquo.webp",
    year: 2022,
  },
  {
    name: "ViewTheWorld",
    slug: "viewtheworld",

    blurb:
      "Software Engineering Course Group Project - A program that retrieves and visualizes environmental and health data from the World Bank’s data repository for selected countries.",
    technologies: ["Python", "World Bank API"],
    image: "/projects/view-the-world.webp",
    year: 2021,
  },
  {
    name: "PlatePal",
    slug: "platepal",
    category: "Mentoring",
    blurb: `AI4Good Lab Project + Edmonton Accelerator Award 2023 Winner - "Spice Up, Save Up" revolutionizes student nutrition, offering affordable and wholesome meal choices to combat food insecurity in Canada.`,
    technologies: [
      "Python",
      "Figma",
      "Google Cloud Platform",
      "MySQL",
      "JavaScript",
      "Node.js",
    ],
    links: [
      {
        href: "https://www.ai4goodlab.com/news/project-reports/2024/02/15/plate-pal-2023-edmonton-accelerator-award-winner/",
        text: "AI4Good Lab Article",
      },
    ],
    image: "/projects/platepal.webp",
    year: 2021,
  },
  {
    name: "Your Perfect Closet",
    slug: "perfect-closet",
    category: "Mentoring",
    blurb: `Women+ in Technology Society ADA Program Project + Winner of Most Creative and Best JAM3 Project - A Chrome extension that enhances online shopping by allowing users to create a personalized, interactive virtual closet.`,
    technologies: ["Figma", "JavaScript", "Python"],

    image: "/projects/perfect-closet.webp",
    year: 2021,
  },
]
export default projectData
