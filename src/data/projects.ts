// * Joud: This is the data for the projects section of the site.
const projectData: Project[] = [

  {
    name: "FairCast",
    slug: "gnn-heatwave-forecasting",
  
    blurb:
      "Accepted to the NeurIPS 2025 Workshop on Tackling Climate Change with Machine Learning. A graph neural network framework for localized, high-resolution temperature forecasting and equitable early-warning systems.",
  
    description: `Heatwaves are intensifying worldwide and disproportionately affect marginalized communities in the Global South, where limited infrastructure and data availability hinder early-warning systems. This project introduces a Graph Neural Network (GNN) framework for high-resolution temperature forecasting, capturing spatial dependencies across thousands of grid points in Southwestern Ontario.
  
    By learning spatial relationships through adjacency graphs, the model achieves a mean absolute error (MAE) of 1.93 °C (1–48 h forecasts) and 2.93 °C at 48 h, significantly improving upon traditional numerical weather prediction models. The framework is designed for transfer learning, enabling adaptation to data-limited regions.
  
    This work was **accepted to the NeurIPS 2025 Workshop on Tackling Climate Change with Machine Learning**, where I presented a poster and recorded a short talk. The project lays the foundation for localized, equitable forecasting in resource-constrained settings.`,
  
    technologies: ["PyTorch Geometric", "Graph Neural Networks", "NOAA URMA", "Python", "ClimateBERT", "Satellite Embeddings"],
    links: [
      {
        text: "NeurIPS Workshop Poster",
        href: "#", // jtodo replace with actual link
      },
      {
        text: "Paper",
        href: "#", // jtodo replace with actual link
      },
      {
        text: "Talk",
        href: "#", // jtodo replace with actual link
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
  
    description: `Unstructured clinical text poses major challenges for automation and interpretability in healthcare. **Hermes** is a **multi-agent large language model (LLM) framework** that sequentially converts discharge summaries into structured **SOAP-format reports** and **knowledge graphs**.
  
    The system integrates four specialized agents — Hermes-R (report generation), Hermes-G (graph construction), Hermes-Q (question-answer generation), and Hermes-A (answer validation) — that collaborate through **iterative refinement and semantic validation loops** to enhance factual accuracy and consistency.
  
    **Accepted and presented at the AAAI SecureAI4Health 2025 Symposium** (poster + lightning talk), Hermes demonstrates how coordinated LLM agents can improve the reliability and interpretability of clinical natural language processing.`,
  
    technologies: ["Python", "Large Language Models", "MIMIC-IV", "Ollama", "Deepseek R1", "LLama"],
    links: [
      {
        text: "AAAI SecureAI4Health Poster",
        href: "#", // jtodo replace with actual link
      },
      {
        text: "Paper",
        href: "#", // jtodo replace with actual link
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
  
    description: `Excessive laboratory testing contributes to significant healthcare costs and patient burden. This project develops a deep learning framework that predicts whether a glucose test will be ordered in the next AM/PM time bin, using the GEMINI dataset.
  
    The model integrates **Clinical BioBERT embeddings** for unstructured notes with **Long Short-Term Memory (LSTM)** networks for temporal modeling, achieving **ROC-AUC 0.92**, **PR-AUC 0.67**, and **cross-hospital generalization 0.84 ROC-AUC**. Temporal recency cues further enhanced predictive stability.
  
    The project was **presented at the AAAI SecureAI4Health Symposium 2025** (poster + lightning talk) and showcased at **Vector Remarkable 2025**, marking progress toward real-time decision support for reducing unnecessary lab tests.`,
  
    technologies: ["Python", "Keras", "Tensorflow", "SQLAlchemy", "Clinical BioBERT", "GEMINI Dataset", "LSTM"],
    links: [
      {
        text: "AAAI SecureAI4Health Poster",
        href: "#", // jtodo replace with actual link
      },
      {
        text: "Paper",
        href: "#", // jtodo replace with actual link
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
    description: `Natural Sciences and Engineering Research Council of Canada (NSERC) Undergraduate Student Research Award Project - Done under the supervision of Dr. Yalda Mohsenzadeh, Associate Professor at Western University and Faculty Member at the Vector Institute

    Manual detection and tracing of tumor boundaries are impractical due to their tedious, time-consuming, and subjective nature, leading to inconsistencies and inefficiencies in clinical applications. To overcome these challenges, we explored and aimed to improve existing automated segmentation methods using machine learning. We focused on addressing the challenges in accurately identifying brain tumor boundaries in MRI images, particularly for Glioblastoma (GBM) and diffuse astrocytic glioma, the most aggressive malignant primary tumors of the central nervous system.
    
    Utilizing the Brats2021 dataset, we began to improve upon an existing Denoising Autoencoder model that was trained on healthy brain images with added noise. To help the autoencoder become better at detecting anomalies, some random noise is added to the healthy brain images during the training process. The autoencoder is then trained to remove this noise and reconstruct the original healthy image without the added noise.
    
    By reconstructing these images and identifying reconstruction errors, our model aimed to effectively highlight anomalies, thus improving segmentation accuracy. However, this project was shelved in favour of ML4Labs, my undergraduate thesis research project, which took priority.
    
    Note: This project was shelved to prioritize ML4Labs, my undergraduate thesis research project.
    `,
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
    description: `
    Bank Yeller is a program that allows users to voice chat with an AI assistant to get their latest bank account information and be able to pay their bills vocally. We also deployed an SQL Database on Google Cloud Platform to mimic a bank’s database and demonstrate how this would work in everyday life.
    
    Bank Yeller was created to address the concern that people who are visually impaired and/or not tech-savvy might struggle as consumers are having to increasingly rely on Web-based banking and financial systems. By using Bank Yeller, consumers will be able to access their bank information using their voice, without having to deal with any confusing interfaces!
   `,
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
    description: `Large software systems are implemented using many different programming languages and scripts, and consequently the dependencies between their components are very complex. It is therefore difficult to extract and understand these dependencies by solely analyzing the source code, so that failure risks can be detected accurately. On the other hand, it is a common practice for software engineers to keep track of process related metrics such as the number of times a component was maintained, with which other components it has been co-committed, whether the maintenance activity was a bug-fixing activity, and how many lines of source code have been altered. These data provide valuable information to be used for training a machine learning model and for devising metrics which can predict the risk associated with a future failure of a component due to maintenance activities in this or in another component related to it.

    In collaboration with IBM Centre for Advanced Studies and as part of my Western University Undergraduate Student Research Internship (USRI) under the supervision of Dr. Konstantinos Kontogiannis, I investigated the risk prediction of software system failures and evaluated the stability of machine learning models for software bug prediction. Large software systems, implemented using various programming languages and scripts, have complex dependencies that are difficult to extract and understand solely through source code analysis. By utilizing process-related metrics, such as maintenance frequency, co-commitment with other components, bug-fixing activities, and lines of code altered, we trained a machine learning model to predict the risk of future failures due to maintenance activities. 
    
    A poster was created to summarize the findings and provide future direction. This was presented at the Western University Undergraduate Student Research Showcase.`,
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
    description: `Our goal was to answer the question: how can we protect our mental well-being and still fully participate in social media?

    As a team, we wanted to create a tool that would allow users to remain active on popular social media platforms while remaining mindful of their mental health. Our project, SoQuo, aims to solve the problem of over-exposure to harmful or disturbing content seen on social media. SoQuo is a mobile app that aims to help users understand how their feed affects their mood, without becoming ignorant of current events. With such a tool, we hope that users both with and without mental illnesses can use social media more consciously.
    
    SoQuo analyzes your Twitter home timeline by extracting all of its topics from it in real-time. It then summarizes the tweets into two metrics. One metric, the Feed Sentiment metric, tells you how much of your feed is positive, negative, or neutral. The other metric, the Today’s Topics metric, tells you the ratio of each topic on your overall Twitter feed, as well as your most likely associated emotion. SoQuo provides insights as well as warnings, and acquires this data by asking the user how they felt about the most prevalent topics they saw on their timeline after they closed a social media app.
    
    Keywords: Mental health, natural language processing (NLP), emotions, machine learning (ML), topic classification, topic modelling, sentiment analysis, user interface (UI)/ user experience (UX), artificial intelligence (AI), random forest
    `,
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
    description: `Led a team of five using an Agile software development approach to create a program that retrieves and visualizes environmental and health data for selected countries from the World Bank’s data repository. 

    Working in sprints, we delivered the specification, design, implementation, and testing of the system. Our design process included creating UML diagrams with design patterns such as Singleton, Strategy, Factory, Proxy, and Observer. For implementation and testing, we used Java and HTTP GET requests, ensuring a robust and efficient solution.
    
    Note: this project was done as part of a course group project. Grade received: 100%
    `,
    technologies: ["Python", "World Bank API"],
    image: "/projects/view-the-world.webp",
    year: 2021,
  },
  {
    name: "[Mentoring] PlatePal",
    slug: "platepal",

    blurb: `AI4Good Lab Project + Edmonton Accelerator Award 2023 Winner - "Spice Up, Save Up" revolutionizes student nutrition, offering affordable and wholesome meal choices to combat food insecurity in Canada.`,
    description: `The Plate Pal project aims to address food insecurity by developing a user-friendly website that helps individuals with limited access to affordable groceries.

    Plate Pal is designed to generate a curated list of the most budget-friendly grocery options based on the user's postal code and specific dietary restrictions. The platform creates a seamless and empowering experience, enabling users to make informed decisions about their food choices. 
    
    Key features include:
    - Compiling a comprehensive list of weekly offers from nearby grocery stores.
    - Optimizing users' purchasing power.
    - Providing a stress-free, personalized grocery plan.
    
    Goals:
    - Improve the affordability of food.
    - Address food insecurity.
    - Promote healthier eating habits through tailored recommendations based on location, dietary needs, and budget constraints.
    
    As a mentor, I guided the project team in achieving these objectives, ensuring the development of a practical and impactful solution for food insecurity, as well as ensuring their pitch was engaging and informative.`,
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
    name: "[Mentoring] Your Perfect Closet",
    slug: "perfect-closet",

    blurb: `Women+ in Technology Society ADA Program Project + Winner of Most Creative and Best JAM3 Project - A Chrome extension that enhances online shopping by allowing users to create a personalized, interactive virtual closet.`,
    description: `As part of the Women+ in Technology Society’s Ada Mentorship Program, six first- and second-year female undergraduate students developed "Your Perfect Closet," a Chrome extension designed to enhance online shopping experiences. The project addressed the challenges faced by users who struggle with the overwhelming number of choices and the difficulty in visualizing how clothes will look together when shopping online. The extension allows users to save items from websites like H&M into a single, interactive drag-and-drop interface, where they can mix and match outfits on a personalized avatar. This streamlined process reduces the hassle of multiple open tabs and improves confidence in online purchases.

    The project used tools like Figma for wireframing and JavaScript for the Chrome extension. As a mentor, I guided the team through the Agile process, helped them with technical challenges, and inspired them to pursue careers in technology. 
    
    This project won two awards: Most Creative Project and Best JAM3 Project (for building a product that helps a company leverage technology to improve their customer experience).
    `,
    technologies: ["Figma", "JavaScript", "Python"],

    image: "/projects/perfect-closet.webp",
    year: 2021,
  },
]
export default projectData
