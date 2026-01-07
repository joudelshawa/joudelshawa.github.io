Natural Sciences and Engineering Research Council of Canada (NSERC) Undergraduate Student Research Award Project - Done under the supervision of Dr. Yalda Mohsenzadeh, Associate Professor at Western University and Faculty Member at the Vector Institute

Manual detection and tracing of tumor boundaries are impractical due to their tedious, time-consuming, and subjective nature, leading to inconsistencies and inefficiencies in clinical applications. To overcome these challenges, we explored and aimed to improve existing automated segmentation methods using machine learning. We focused on addressing the challenges in accurately identifying brain tumor boundaries in MRI images, particularly for Glioblastoma (GBM) and diffuse astrocytic glioma, the most aggressive malignant primary tumors of the central nervous system.

Utilizing the Brats2021 dataset, we began to improve upon an existing Denoising Autoencoder model that was trained on healthy brain images with added noise. To help the autoencoder become better at detecting anomalies, some random noise is added to the healthy brain images during the training process. The autoencoder is then trained to remove this noise and reconstruct the original healthy image without the added noise.

By reconstructing these images and identifying reconstruction errors, our model aimed to effectively highlight anomalies, thus improving segmentation accuracy. However, this project was shelved in favour of ML4Labs, my undergraduate thesis research project, which took priority.

Note: This project was shelved to prioritize ML4Labs, my undergraduate thesis research project.
