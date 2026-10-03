---
order: 3
featured: true
name: ML4Labs
venue: AAAI SecureAI4Health 2025 Symposium
year: 2025
blurb: Accepted and presented at the AAAI SecureAI4Health 2025 Symposium. A multi-modal deep learning system using Clinical BioBERT and LSTM models to predict laboratory test ordering across multiple hospitals.
image: ./images/ml4labs.webp
technologies:
  - Python
  - Keras
  - Tensorflow
  - SQLAlchemy
  - Clinical BioBERT
  - GEMINI Dataset
  - LSTM
links:
  - text: AAAI SecureAI4Health Poster
    href: https://drive.google.com/file/d/1nLRisia6qJUaBRRlnuyLgC0ar0N1Mk15/view
  - text: Paper
    href: https://ojs.aaai.org/index.php/AAAI-SS/article/view/36924
  - text: Slides
    href: https://www.canva.com/design/DAG3TLvU31o/V4_Q2W_gjuzsPXY9QHWqgQ/view?utm_content=DAG3TLvU31o&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h361faae11e
---

Excessive laboratory testing contributes to significant healthcare costs and patient burden. This project develops a deep learning framework that predicts whether a glucose test will be ordered in the next AM/PM time bin, using the GEMINI dataset.

The model integrates **Clinical BioBERT embeddings** for unstructured notes with **Long Short-Term Memory (LSTM)** networks for temporal modeling, achieving **ROC-AUC 0.92**, **PR-AUC 0.67**, and **cross-hospital generalization 0.84 ROC-AUC**. Temporal recency cues further enhanced predictive stability.

The project was **presented at the AAAI SecureAI4Health Symposium 2025** (poster + lightning talk) and showcased at **Vector Remarkable 2025**, marking progress toward real-time decision support for reducing unnecessary lab tests.
