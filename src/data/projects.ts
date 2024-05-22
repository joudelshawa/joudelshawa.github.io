// * Joud: This is the data for the projects section of the site.
const projectData = [
  {
    name: "ML4Labs - Undergraduate Thesis Research & Ongoing Research at the Vector Institute",
    slug: "ml4labs", // The path to the standalone project page

    blurb:
      "A research project that aims to use recurrent neural networks for real-time prediction of laboratory test requirements, reducing unnecessary tests and improving healthcare efficiency", // Goes under the project name in the previews
    description: `Unnecessary laboratory tests contribute to healthcare waste, increased costs, and risks such as hospital-acquired anemia. Our research seeks to address this by using Recurrent Neural Networks (RNNs) (currently Long Short-Term Memory (LSTM) networks) for real-time prediction of laboratory test requirements, focusing on efficiently determining the necessity and timing of tests. 

      By applying deep learning techniques to clinical data, we aim to enhance decision-making for healthcare professionals. Using Python, Keras, TensorFlow, and the GEMINI dataset, we built a system that predicts glucose test occurrences, achieving an accuracy of 76%, which is a 23% improvement over our baseline model. 
      
      The novelty of our work lies in modeling temporal relationships in GEMINI clinical data using RNNs, with significant implications for both theoretical and practical aspects of healthcare. 
      
      This project has since been updated and is in progress as I continue this research as a research intern at the Vector Institute. We are now exploring novel methods such as using natural language processing to generate predictions and improve embeddings, aiming to further enhance the system's performance and integration into real-world healthcare settings.
      
      Note: This project has been updated and is in progress as I continue this research as a research intern at the Vector Institute, where we are exploring novel methods to enhance the system's performance and integration. I will be presenting our preliminary results at the Vector/GEMINI Research Day event on June 24, 2024 from 8:30 to 11:30 am.
      `,
    technologies: ["Python", "Keras", "TensorFlow", "GEMINI Dataset"],
    link: "https://www.canva.com/design/DAGCoUIZ760/JZb2TjEkTySAwU1DVs3Log/view?utm_content=DAGCoUIZ760&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    image: "/projects/ml4labs.png",
    year: 2024,
    // backgroundColor: "bg-white",
    // textColors: {
    //   primary: "text-slate-800",
    //   secondary: "text-slate-600",
    //   tertiary: "text-slate-200",
    // },
  },
  {
    name: "Unsupervised Anomaly Detection in Magnetic Resonance Images - NSERC Award 2023",
    slug: "unsupervised-anomaly",

    blurb:
      "The project aimed to develop an automated deterministic segmentation solution for accurately identifying brain tumor boundaries in MRI images using and improving upon existing Denoising Autoencoder and U-net models.",
    description: `Natural Sciences and Engineering Research Council of Canada (NSERC) Award Project - Done under the supervision of Dr. Yalda Mohsenzadeh, Associate Professor at Western University and Faculty Member at the Vector Institute

    Manual detection and tracing of tumor boundaries are impractical due to their tedious, time-consuming, and subjective nature, leading to inconsistencies and inefficiencies in clinical applications. To overcome these challenges, we explored and aimed to improve existing automated segmentation methods using machine learning. We focused on addressing the challenges in accurately identifying brain tumor boundaries in MRI images, particularly for Glioblastoma (GBM) and diffuse astrocytic glioma, the most aggressive malignant primary tumors of the central nervous system.
    
    Utilizing the Brats2021 dataset, we began to improve upon an existing Denoising Autoencoder model that was trained on healthy brain images with added noise. To help the autoencoder become better at detecting anomalies, some random noise is added to the healthy brain images during the training process. The autoencoder is then trained to remove this noise and reconstruct the original healthy image without the added noise.
    
    By reconstructing these images and identifying reconstruction errors, our model aimed to effectively highlight anomalies, thus improving segmentation accuracy. However, this project was shelved in favour of ML4Labs, my undergraduate thesis research project, which took priority.
    
    Note: This project was shelved to prioritize ML4Labs, my undergraduate thesis research project.
    `,
    technologies: ["Python", "Keras", "TensorFlow", "GEMINI Dataset"],
    link: "https://www.canva.com/design/DAGCoUIZ760/JZb2TjEkTySAwU1DVs3Log/view?utm_content=DAGCoUIZ760&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    image: "/projects/unsupervised-anomaly.png",
    year: 2023,
  },
  {
    name: "BankYeller - Hackwestern 8 Project + “Best Use of Dasha AI” Winner",
    slug: "bank-yeller",

    blurb:
      "An application that allows the user to voice chat with an AI to get their latest bank account information and be able to pay their bills vocally.",
    description: `
    Bank Yeller is a program that allows users to voice chat with an AI assistant to get their latest bank account information and be able to pay their bills vocally. We also deployed an SQL Database on Google Cloud Platform to mimic a bank’s database and demonstrate how this would work in everyday life.
    
    Bank Yeller was created to address the concern that people who are visually impaired and/or not tech-savvy might struggle as consumers are having to increasingly rely on Web-based banking and financial systems. By using Bank Yeller, consumers will be able to access their bank information using their voice, without having to deal with any confusing interfaces!
    
    ORRR Today’s technological advances have resulted in many consumers having to increasingly rely on Web-based banking and financial systems. Consumers often overlooked as we make this transition include the visually impaired and/or the less tech-savvy populations (e.g. elderly). It is critical that we guarantee that systems give equal and complete access to everyone, and none are disregarded. Some may point out that paper billing is an option, but on top of not being eco-friendly, paper billing is not an ideal way of getting the latest information about your records on the go.`,
    technologies: [
      "Dasha AI",
      "Figma",
      "Google Cloud Platform",
      "MySQL",
      "JavaScript",
      "Node.js",
    ],
    link: "https://devpost.com/software/bank-yeller",
    image: "/projects/bank-yeller.jpg",
    year: 2022,
  },
  {
    name: "Evaluating Machine Learning Model Stability for Software Bug Prediction - IBM + Western University Research",
    slug: "ibm-uwo-research",

    blurb:
      "A project aiming to investigate risk prediction of software system failures and evaluate machine learning model stability for software bug prediction.",
    description: `Large software systems are implemented using many different programming languages and scripts, and consequently the dependencies between their components are very complex. It is therefore difficult to extract and understand these dependencies by solely analyzing the source code, so that failure risks can be detected accurately. On the other hand, it is a common practice for software engineers to keep track of process related metrics such as the number of times a component was maintained, with which other components it has been co-committed, whether the maintenance activity was a bug-fixing activity, and how many lines of source code have been altered. These data provide valuable information to be used for training a machine learning model and for devising metrics which can predict the risk associated with a future failure of a component due to maintenance activities in this or in another component related to it.

    In collaboration with IBM Centre for Advanced Studies and as part of my Western University Undergraduate Student Research Internship (USRI) under the supervision of Dr. Konstantinos Kontogiannis, I investigated the risk prediction of software system failures and evaluated the stability of machine learning models for software bug prediction. Large software systems, implemented using various programming languages and scripts, have complex dependencies that are difficult to extract and understand solely through source code analysis. By utilizing process-related metrics, such as maintenance frequency, co-commitment with other components, bug-fixing activities, and lines of code altered, we trained a machine learning model to predict the risk of future failures due to maintenance activities. 
    
    A poster was created to summarize the findings and provide future direction. This was presented at the Western University Undergraduate Student Research Showcase.`,
    technologies: [
      "Dasha AI",
      "Figma",
      "Google Cloud Platform",
      "MySQL",
      "JavaScript",
      "Node.js",
    ],
    link: "https://ir.lib.uwo.ca/usri/usri2021/researchoutputshowcase/132/",
    image: "/projects/ibm-uwo-research.png",
    year: 2022,
  },
  {
    name: "SoQuo - AI4Good Lab Project + Edmonton Accelerator Award Winner",
    slug: "soquo",

    blurb:
      "SoQuo is an app that improves a user’s social media experience by helping them evaluate the impact of online interactions on their mental health.",
    description: `Our goal was to answer the question: how can we protect our mental well-being and still fully participate in social media?

    As a team, we wanted to create a tool that would allow users to remain active on popular social media platforms while remaining mindful of their mental health. Our project, SoQuo, aims to solve the problem of over-exposure to harmful or disturbing content seen on social media. SoQuo is a mobile app that aims to help users understand how their feed affects their mood, without becoming ignorant of current events. With such a tool, we hope that users both with and without mental illnesses can use social media more consciously.
    
    SoQuo analyzes your Twitter home timeline by extracting all of its topics from it in real-time. It then summarizes the tweets into two metrics. One metric, the Feed Sentiment metric, tells you how much of your feed is positive, negative, or neutral. The other metric, the Today’s Topics metric, tells you the ratio of each topic on your overall Twitter feed, as well as your most likely associated emotion. SoQuo provides insights as well as warnings, and acquires this data by asking the user how they felt about the most prevalent topics they saw on their timeline after they closed a social media app.
    
    Keywords: Mental health, natural language processing (NLP), emotions, machine learning (ML), topic classification, topic modelling, sentiment analysis, user interface (UI)/ user experience (UX), artificial intelligence (AI), random forest
    `,
    technologies: [
      "Dasha AI",
      "Figma",
      "Google Cloud Platform",
      "MySQL",
      "JavaScript",
      "Node.js",
    ],
    link: "https://www.ai4goodlab.com/news/2021/10/04/social-media-is-a-no-go-without-soquo/",
    image: "/projects/soquo.webp",
    year: 2021,
  },
]
export default projectData
