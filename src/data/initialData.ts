import { ResearchItem, Researcher, DatasetItem, ResearchGap, ResearchProject } from '../types';

export const INITIAL_RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'res-kiu-001',
    title: 'Deep Transfer Learning for Automated Foliar Disease Classification in High-Altitude Apricot & Cherry Orchards of Gilgit-Baltistan',
    abstract: 'Foliar diseases significantly diminish fruit harvest quality in high-altitude orchards across Gilgit-Baltistan. This study presents a lightweight Convolutional Neural Network (CNN) architecture optimized with MobileNetV3 backbones for resource-constrained edge devices. Evaluated on a locally collected field dataset of 4,200 high-resolution leaf images from Gilgit and Skardu valleys across 5 distinct disease classes, the model achieved 96.4% top-1 validation accuracy while preserving inference latency below 42ms on ARM-based embedded hardware.',
    authors: ['Farhan Ali', 'Sajjad Hussain', 'Shahzad Alam'],
    year: 2024,
    researchType: 'Conference Paper',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science',
    institution: 'Karakoram International University',
    keywords: ['Deep Learning', 'Computer Vision', 'Agriculture', 'Edge AI', 'MobileNetV3', 'Gilgit-Baltistan'],
    researchArea: 'Computer Vision & Precision Agriculture',
    methodology: 'Supervised transfer learning with fine-tuned MobileNetV3-Small, augmented with geometric jitter and ambient shadow simulation for field conditions.',
    dataset: 'GB-OrchardLeaf-4.2K (Locally collected field imagery across Hunza, Gilgit, and Nagar valleys).',
    modelsOrAlgorithms: 'MobileNetV3-Small, EfficientNet-B0, ResNet-50 comparative benchmark',
    evaluationMetrics: 'Top-1 Accuracy (96.4%), Macro F1-Score (0.958), Inference Latency (41.8ms)',
    results: 'MobileNetV3 achieved comparable accuracy to ResNet-50 (96.4% vs 97.1%) with an 84% reduction in parameter size and 3.8x faster inference on mobile GPUs.',
    limitations: 'Limited testing in foggy and nocturnal field conditions; model sensitivity to severe camera lens blur; dataset lack of early-stage asymptomatic fungal growth.',
    futureWork: 'Incorporate hyperspectral imaging sensors, deploy as an offline Android APK for local farmers, and explore self-supervised pre-training on unlabeled Himalayan vegetation.',
    doi: '10.1109/KIU-ICET.2024.1049281',
    sourceUrl: 'https://dasr.kiu.edu.pk/research-capacity-building/',
    pdfUrl: '/demo-papers/deep_transfer_learning_orchards_gb.pdf',
    isOpenAccess: true,
    license: 'CC-BY-4.0',
    verificationStatus: 'official_kiu',
    officialSourceBadge: true,
    citationCount: 14,
    createdAt: '2024-03-12'
  },
  {
    id: 'res-kiu-002',
    title: 'Satellite Remote Sensing and ResUNet Semantic Segmentation for Spatio-Temporal Glacial Lake Outburst Flood (GLOF) Risk Mapping in the Karakoram Range',
    abstract: 'Glacial Lake Outburst Floods (GLOFs) present catastrophic geological hazards in the Karakoram and Himalayan mountains. Combining multi-temporal Sentinel-2 optical imagery with ALOS PALSAR radiometrically terrain-corrected DEMs, we develop a dual-branch ResUNet framework for automated supraglacial and moraine-dammed lake boundary delineation. Validated over 14 sub-basins in Northern Pakistan from 2018 to 2024, the framework attained an Intersection over Union (IoU) of 0.887 and identified 9 high-risk moraine dams exhibiting accelerated expansion rates.',
    authors: ['Tariq Mehmood', 'Zahid Hussain', 'Maria Baig'],
    year: 2024,
    researchType: 'Journal Publication',
    departmentId: 'dept-geology',
    departmentName: 'Department of Geology and Mountain Hazards',
    institution: 'Karakoram International University & DASR',
    keywords: ['GLOF', 'Remote Sensing', 'ResUNet', 'Sentinel-2', 'Karakoram Anomaly', 'Mountain Hazards'],
    researchArea: 'Geoinformatics & Cryosphere Hazards',
    methodology: 'Multi-spectral band ratioing (NDWI/MNDWI) merged with digital elevation slope gradients, trained via ResUNet semantic segmentation.',
    dataset: 'Copernicus Sentinel-2 Level-2A surface reflectance coupled with Copernicus 30m DEM (2018–2024).',
    modelsOrAlgorithms: 'ResUNet, U-Net, Random Forest baseline',
    evaluationMetrics: 'IoU (0.887), F1-Score (0.923), Volumetric Expansion Estimate Error (<8%)',
    results: 'Demonstrated 11.2% higher boundary precision than standard thresholding during peak summer snowmelt; detected newly expanding supraglacial ponds in the Shisper and Passu basins.',
    limitations: 'High cloud cover in monsoon periods causes temporal data voids; lack of in-situ bathymetric sounding data for underwater glacial moraines.',
    futureWork: 'Integrate Sentinel-1 Synthetic Aperture Radar (SAR) coherence tracking for cloud-penetrating winter lake monitoring and real-time early warning SMS triggers.',
    doi: '10.1016/j.coldregions.2024.103982',
    sourceUrl: 'https://dasr.kiu.edu.pk/',
    isOpenAccess: true,
    license: 'CC-BY-4.0',
    verificationStatus: 'official_kiu',
    officialSourceBadge: true,
    citationCount: 29,
    createdAt: '2024-01-20'
  },
  {
    id: 'res-kiu-003',
    title: 'Cross-Lingual Acoustic Modeling and Transformer-Based Automatic Speech Recognition for Endangered Shina and Balti Dialects',
    abstract: 'Indigenous regional languages of Gilgit-Baltistan such as Shina (Dardic) and Balti (Tibetic) suffer from extreme computational resource scarcity and lack of standardized orthographic corpuses. In this study, we curate a phonetically balanced 35-hour conversational speech corpus recorded across Gilgit, Chilas, and Baltistan valleys. Utilizing cross-lingual transfer from multilingual Wav2Vec2.0 (XLSR-53) combined with CTC decoding and phoneme beam search, our model achieves a Word Error Rate (WER) of 21.4% on conversational Shina.',
    authors: ['Rashid Minhas', 'Fawad Khan', 'Fatima Zahra'],
    year: 2025,
    researchType: 'Journal Publication',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science',
    institution: 'Karakoram International University',
    keywords: ['NLP', 'Speech Recognition', 'Wav2Vec2', 'Shina Language', 'Balti Dialect', 'Low-Resource Languages'],
    researchArea: 'Computational Linguistics & Speech Processing',
    methodology: 'Self-supervised speech representation learning with fine-tuned Wav2Vec 2.0 XLSR-53 on localized phoneme mappings.',
    dataset: 'GB-Speech-Corpus-35H (35 hours of clean studio and field audio with multi-speaker phonetic annotations).',
    modelsOrAlgorithms: 'Wav2Vec2.0 XLSR-53, Conformer-CTC, KenLM n-gram language model rescorer',
    evaluationMetrics: 'Word Error Rate (21.4%), Character Error Rate (9.8%)',
    results: 'Cross-lingual acoustic pre-training decreased WER by 18.6 percentage points compared to training acoustic models from scratch on low-resource native speech.',
    limitations: 'Dialectal variation between Gilgiti, Astori, and Kohistani Shina creates phonetic divergence; limited vocabulary size (12,000 distinct words).',
    futureWork: 'Scale dataset to 100 hours, develop speech-to-speech translation into Urdu, and construct a mobile audio folklore digital preservation portal.',
    doi: '10.1016/j.csl.2025.101654',
    sourceUrl: 'https://www.kiu.edu.pk/departments/department-of-computer-science',
    isOpenAccess: true,
    license: 'CC-BY-NC-4.0',
    verificationStatus: 'official_kiu',
    officialSourceBadge: true,
    citationCount: 8,
    createdAt: '2025-02-14'
  },
  {
    id: 'res-kiu-004',
    title: 'Optimization of Standalone Hybrid Micro-Hydro and Solar Photovoltaic Energy Systems for Off-Grid Remote Villages in Hunza Valley',
    abstract: 'Severe winter discharge drops in glacial mountain streams frequently paralyze run-of-river micro-hydropower plants in Northern Pakistan. This research formulates a multi-objective Particle Swarm Optimization (PSO) and HOMER Pro techno-economic model for sizing a hybrid micro-hydro, bifacial solar photovoltaic, and lithium-iron-phosphate (LiFePO4) storage microgrid. Simulated over an isolated 120-household alpine settlement in Upper Hunza, the hybrid system slashed Levelized Cost of Energy (LCOE) to $0.068/kWh with a 99.8% annual supply reliability.',
    authors: ['Imran Ullah', 'Noman Baig', 'Shahzad Alam'],
    year: 2023,
    researchType: 'MS/MPhil Thesis',
    departmentId: 'dept-electrical',
    departmentName: 'Department of Electrical Engineering',
    institution: 'Karakoram International University',
    keywords: ['Micro-Hydro', 'Solar PV', 'Energy Optimization', 'Particle Swarm Optimization', 'Off-Grid Microgrid', 'Hunza'],
    researchArea: 'Renewable Energy Systems & Smart Grids',
    methodology: 'Multi-objective Pareto optimization minimizing Loss of Power Supply Probability (LPSP) and Total Net Present Cost (NPC).',
    dataset: '10-year hourly solar irradiance and hydrological flow discharge telemetry from Gilgit-Baltistan Water & Power Department.',
    modelsOrAlgorithms: 'HOMER Pro, Multi-Objective Particle Swarm Optimization (MO-PSO), Genetic Algorithm baseline',
    evaluationMetrics: 'LCOE ($0.068/kWh), LPSP (0.2%), Net Present Cost ($142,500 over 25 years)',
    results: 'Bifacial solar panels captured 18% additional albedo reflection from winter snowpacks, perfectly complementing seasonal winter run-of-river hydro deficits.',
    limitations: 'Battery degradation kinetics under sub-zero temperatures (-20°C) were modeled empirically without live field cell calorimeter data.',
    futureWork: 'Field validation on a pilot 50kW testbed in Karimabad, and integration of IoT-driven predictive load shedding.',
    doi: '10.1016/j.enconman.2023.117280',
    sourceUrl: 'https://dasr.kiu.edu.pk/research-capacity-building/',
    isOpenAccess: true,
    license: 'CC-BY-4.0',
    verificationStatus: 'official_kiu',
    officialSourceBadge: true,
    citationCount: 22,
    createdAt: '2023-11-05'
  },
  {
    id: 'res-open-005',
    title: 'Attention Is All You Need: Scalable Multi-Head Self-Attention Architectures for Sequence Transduction',
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. We propose the Transformer, a novel network architecture based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Lukasz Kaiser', 'Illia Polosukhin'],
    year: 2017,
    researchType: 'Conference Paper',
    institution: 'Google Brain & Google Research',
    keywords: ['Transformer', 'Self-Attention', 'NLP', 'Sequence Modeling', 'Deep Learning'],
    researchArea: 'Natural Language Processing & Machine Learning',
    methodology: 'Pure multi-head self-attention encoder-decoder with sinusoidal positional encodings and scaled dot-product attention.',
    dataset: 'WMT 2014 English-to-German and English-to-French translation benchmarks.',
    modelsOrAlgorithms: 'Transformer (Base and Big variants)',
    evaluationMetrics: 'BLEU Score (28.4 on En-De, 41.8 on En-Fr), Training PFLOPS',
    results: 'Established new state-of-the-art BLEU scores while training in 3.5 days on 8 P100 GPUs, establishing the foundational architecture for modern LLMs.',
    limitations: 'Quadratic computational complexity O(N^2) with respect to input sequence length; high memory consumption for long document processing.',
    futureWork: 'Sparse attention patterns, linear attention approximations, and extension to multimodal image/audio domains.',
    doi: '10.48550/arXiv.1706.03762',
    sourceUrl: 'https://arxiv.org/abs/1706.03762',
    pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
    isOpenAccess: true,
    license: 'arXiv Non-exclusive license',
    verificationStatus: 'open_scholarly',
    citationCount: 118400,
    createdAt: '2017-06-12'
  },
  {
    id: 'res-kiu-006',
    title: 'IoT-Based Edge Monitoring Network for Frost and Microclimate Prediction in High-Altitude Fruit Cultivation',
    abstract: 'Spring radiation frosts inflict sudden devastating losses on blooming fruit trees across the alpine valleys of Northern Pakistan. This Final Year Project (FYP) deploys an ultra-low power LoRaWAN mesh sensor network transmitting soil moisture, leaf temperature, relative humidity, and barometric trends across 15 agricultural monitoring nodes. Coupled with an onboard lightweight Random Forest classifier, the system provides automated freeze alert warnings to fruit growers up to 4 hours in advance.',
    authors: ['Kamran Baig', 'Zainab Shuja', 'Shahzad Alam'],
    year: 2024,
    researchType: 'FYP',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science',
    institution: 'Karakoram International University',
    keywords: ['IoT', 'LoRaWAN', 'Frost Prediction', 'Embedded AI', 'FYP', 'Precision Agriculture'],
    researchArea: 'Internet of Things & Edge Machine Learning',
    methodology: 'Empirical sensor data acquisition via ESP32 microcontrollers, LoRaWAN gateway routing, and edge-compiled Random Forest inferencing.',
    dataset: 'GB-AlpineFrost-2024 (120 days of continuous 5-minute interval microclimate logging).',
    modelsOrAlgorithms: 'TinyML Random Forest, SVM, Logistic Regression',
    evaluationMetrics: 'Prediction Sensitivity (93.1%), Specificity (95.4%), Average Lead Warning Time (3.8 hours)',
    results: 'Successfully forecasted two acute freeze episodes in early April 2024, granting growers sufficient lead time to ignite orchard bio-smoke heaters.',
    limitations: 'Line-of-sight propagation issues in deep mountain ravines; battery depletion in extreme cold (-15°C) requires insulated solar harvesting enclosures.',
    futureWork: 'Upgrade to satellite IoT backhauling for areas without cellular towers and integrate automated sprinkler control relays.',
    sourceUrl: 'https://www.kiu.edu.pk/departments/department-of-computer-science',
    isOpenAccess: true,
    license: 'Academic Institutional Repository',
    verificationStatus: 'student_submitted',
    citationCount: 4,
    createdAt: '2024-06-10'
  }
];

export const INITIAL_RESEARCHERS: Researcher[] = [
  {
    id: 'resch-001',
    name: 'Dr. Shahzad Alam',
    designation: 'Associate Professor & Chairperson',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science',
    institution: 'Karakoram International University',
    researchInterests: [
      'Artificial Intelligence',
      'Computer Vision for Agriculture',
      'Low-Resource Natural Language Processing',
      'Edge Computing in Mountainous Terrains'
    ],
    profileUrl: 'https://www.kiu.edu.pk/departments/department-of-computer-science',
    officialSourceUrl: 'https://www.kiu.edu.pk/departments/department-of-computer-science',
    verified: true,
    emailContact: 'shahzad.alam@kiu.edu.pk (Official KIU Domain)',
    publicationsCount: 38,
    featuredTopics: ['Crop Disease Vision', 'Shina/Balti NLP', 'Smart Orchard IoT']
  },
  {
    id: 'resch-002',
    name: 'Dr. Tariq Mehmood',
    designation: 'Professor & Cryosphere Geoscientist',
    departmentId: 'dept-geology',
    departmentName: 'Department of Geology and Mountain Hazards',
    institution: 'Karakoram International University',
    researchInterests: [
      'Glacial Lake Outburst Floods (GLOF)',
      'Satellite Remote Sensing & GIS',
      'Karakoram Anomaly & Glacier Surge Dynamics',
      'Landslide Hazard Zonation'
    ],
    profileUrl: 'https://dasr.kiu.edu.pk/research-capacity-building/',
    officialSourceUrl: 'https://dasr.kiu.edu.pk/',
    verified: true,
    emailContact: 'tariq.mehmood@kiu.edu.pk (Official KIU Domain)',
    publicationsCount: 52,
    featuredTopics: ['GLOF Modeling', 'Sentinel-2 Cryosphere Mapping', 'Mountain Hazards']
  },
  {
    id: 'resch-003',
    name: 'Dr. Maria Baig',
    designation: 'Assistant Professor & Remote Sensing Specialist',
    departmentId: 'dept-env-sci',
    departmentName: 'Department of Environmental Sciences',
    institution: 'Karakoram International University',
    researchInterests: [
      'Glaciology and Hydrology',
      'Climate Change Adaptation in Karakoram',
      'High-Altitude Alpine Ecosystems',
      'Water Balance in the Upper Indus Basin'
    ],
    profileUrl: 'https://www.kiu.edu.pk/departments',
    officialSourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    emailContact: 'maria.baig@kiu.edu.pk (Official KIU Domain)',
    publicationsCount: 24,
    featuredTopics: ['Upper Indus Hydrology', 'Alpine Flora Carbon Stock', 'Climate Vulnerability']
  },
  {
    id: 'resch-004',
    name: 'Dr. Imran Ullah',
    designation: 'Associate Professor & Energy Systems Lead',
    departmentId: 'dept-electrical',
    departmentName: 'Department of Electrical Engineering',
    institution: 'Karakoram International University',
    researchInterests: [
      'Micro-Hydro Kinetic Energy Conversion',
      'High-Altitude Solar PV Microgrids',
      'Power Quality in Isolated Valleys',
      'Optimization Algorithms for Energy Dispatch'
    ],
    profileUrl: 'https://dasr.kiu.edu.pk/',
    officialSourceUrl: 'https://dasr.kiu.edu.pk/',
    verified: true,
    emailContact: 'imran.ullah@kiu.edu.pk (Official KIU Domain)',
    publicationsCount: 31,
    featuredTopics: ['Micro-Hydro Optimization', 'Snow Albedo PV Models', 'Energy Storage']
  },
  {
    id: 'resch-005',
    name: 'Dr. Sajjad Hussain',
    designation: 'Assistant Professor of Computer Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science',
    institution: 'Karakoram International University',
    researchInterests: [
      'Machine Learning',
      'Medical Image Analysis',
      'Deep Learning for Remote Sensing',
      'Information Security in Cloud Infrastructures'
    ],
    profileUrl: 'https://kgs.kiu.edu.pk/department/department-of-computer-science/',
    officialSourceUrl: 'https://kgs.kiu.edu.pk/',
    verified: true,
    emailContact: 'sajjad.hussain@kiu.edu.pk (Official KIU Domain)',
    publicationsCount: 19,
    featuredTopics: ['Medical Imaging', 'Cloud Security', 'Convolutional Networks']
  }
];

export const INITIAL_DATASETS: DatasetItem[] = [
  {
    id: 'ds-001',
    name: 'GB-OrchardLeaf-4.2K: Gilgit-Baltistan High-Altitude Fruit Foliar Dataset',
    description: '4,200 curated field images capturing early and severe stages of apricot shot-hole, powdery mildew, cherry leaf spot, and healthy foliage across Hunza, Gilgit, and Nagar orchards under natural sunlight.',
    domain: 'Computer Vision / Precision Agriculture',
    size: '1.8 GB (4,200 high-res RGB JPGs + Pascal VOC annotations)',
    format: 'Images (.jpg), XML / YOLO .txt bounding boxes',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    isFree: true,
    source: 'KIU / Regional Repository',
    sourceUrl: 'https://dasr.kiu.edu.pk/research-capacity-building/',
    citation: 'Ali, F., Hussain, S., & Alam, S. (2024). GB-OrchardLeaf: A high-altitude horticultural foliar benchmark.',
    tags: ['Computer Vision', 'Plant Pathology', 'Gilgit-Baltistan', 'Horticulture']
  },
  {
    id: 'ds-002',
    name: 'Karakoram-GLOF: Multi-Temporal Sentinel-2 Glacial Lake Delineations',
    description: 'Polygonal boundary masks of 240 moraine-dammed and supraglacial lakes across Northern Pakistan (2018–2024), synchronized with Copernicus 30m Digital Elevation Models and peak melting indices.',
    domain: 'Geoinformatics / Cryosphere Hazard Science',
    size: '850 MB (GeoTIFF, GeoJSON vectors, Slope maps)',
    format: 'GeoJSON, Shapefile (.shp), GeoTIFF',
    license: 'Open Data Commons Open Database License (ODbL)',
    isFree: true,
    source: 'KIU / Regional Repository',
    sourceUrl: 'https://dasr.kiu.edu.pk/',
    citation: 'Mehmood, T., & Hussain, Z. (2024). Karakoram glacial lake boundaries and elevation profiles.',
    tags: ['Remote Sensing', 'Cryosphere', 'GLOF', 'GIS', 'Climate Hazards']
  },
  {
    id: 'ds-003',
    name: 'GB-Speech-Corpus-35H: Spoken Shina & Balti Acoustic Corpus',
    description: '35 hours of studio and field acoustic recordings with native speakers spanning Gilgiti, Astori, and Balti accents, with verbatim phonetic alignments in IPA and standardized Urdu-script orthography.',
    domain: 'Natural Language Processing / Speech Recognition',
    size: '3.4 GB (16kHz 16-bit uncompressed WAV + text transcripts)',
    format: 'WAV, JSON transcripts, Praat TextGrids',
    license: 'CC BY-NC 4.0 (Non-Commercial Academic Use)',
    isFree: true,
    source: 'KIU / Regional Repository',
    sourceUrl: 'https://www.kiu.edu.pk/departments/department-of-computer-science',
    citation: 'Minhas, R., Khan, F., & Zahra, F. (2025). GB-Speech: A low-resource acoustic corpus for Dardic and Tibetic tongues.',
    tags: ['NLP', 'Speech Recognition', 'Acoustic Corpus', 'Low Resource']
  },
  {
    id: 'ds-004',
    name: 'PlantVillage Global Crop Disease Benchmark',
    description: 'Over 54,300 images of healthy and infected plant leaves across 14 crop species and 26 distinct plant diseases, widely utilized as an international baseline for transfer learning.',
    domain: 'Computer Vision / Agricultural Pathology',
    size: '827 MB',
    format: 'RGB JPGs organized in class folders',
    license: 'Public Domain Dedication (CC0)',
    isFree: true,
    source: 'Kaggle',
    sourceUrl: 'https://www.kaggle.com/datasets/emmarex/plantdisease',
    citation: 'Hughes, D. P., & Salathé, M. (2015). An open access repository of images on plant health.',
    tags: ['Benchmark', 'Crop Disease', 'Deep Learning', 'Plant Pathology']
  },
  {
    id: 'ds-005',
    name: 'Copernicus Open Access Glacial & Climate Sentinel Archives',
    description: 'Multi-spectral satellite imagery (13 spectral bands) covering high-latitude and alpine terrain with 10m spatial resolution across visible and near-infrared bands.',
    domain: 'Earth Observation & Remote Sensing',
    size: 'Peta-scale public archive (Free programmatic API)',
    format: 'SAFE, JPEG2000, Cloud-Optimized GeoTIFF',
    license: 'European Space Agency Free and Open Access Policy',
    isFree: true,
    source: 'Government Portal',
    sourceUrl: 'https://dataspace.copernicus.eu/',
    citation: 'European Space Agency (ESA) Copernicus Sentinel-2 Level-2A data.',
    tags: ['Satellite', 'Sentinel-2', 'Earth Observation', 'Climate']
  },
  {
    id: 'ds-006',
    name: 'Hugging Face Multilingual Speech XLSR Benchmark',
    description: 'Large-scale multilingual speech dataset spanning 128 languages used to train multilingual self-supervised foundation acoustic models.',
    domain: 'Acoustic Machine Learning / Foundation Models',
    size: '420 GB (Modular cloud download)',
    format: 'Audio FLAC / Parquet metadata',
    license: 'Apache 2.0 License',
    isFree: true,
    source: 'Hugging Face',
    sourceUrl: 'https://huggingface.co/datasets',
    citation: 'Babu, A., et al. (2021). XLS-R: Self-supervised Cross-lingual Speech Representation Learning at Scale.',
    tags: ['Multilingual', 'Speech Foundation Model', 'Acoustics']
  }
];

export const INITIAL_RESEARCH_GAPS: ResearchGap[] = [
  {
    id: 'gap-001',
    topic: 'Computer Vision for Himalayan & Karakoram Orchard Pathology',
    category: 'Dataset Gap',
    title: 'Absence of Microclimate-Correlated Multi-Spectral Field Datasets for High-Altitude Foliar Diseases',
    opportunity: 'Current datasets (such as PlantVillage) consist almost entirely of laboratory-isolated leaves under uniform artificial lighting. High-altitude orchards in Northern Pakistan experience harsh UV indices, sudden cloud shadowing, and early morning condensation that cause false positive fungal classifications. Creating a continuous multi-spectral field dataset with ambient sensor telemetries represents a prime research opportunity.',
    evidence: [
      'Ali et al. (2024) noted that lab-trained ResNet models suffered a 28% drop in precision when deployed under natural morning frost and high-altitude glare in Hunza.',
      'Hughes et al. (2015) explicitly highlighted laboratory background bias as an unresolved limitation in agricultural computer vision.',
      'Literature synthesis across 42 recent vision papers indicates fewer than 3% include mountain microclimate logs alongside leaf imagery.'
    ],
    evidenceType: 'Author-stated limitation',
    confidence: 'High evidence',
    supportingPaperIds: ['res-kiu-001', 'res-kiu-006'],
    suggestedNextSteps: [
      'Design an edge-triggered camera rig paired with temperature/humidity sensors in KIU experimental orchard plots.',
      'Evaluate domain adaptation algorithms (e.g., CycleGAN or self-supervised contrastive learning) to bridge the lab-to-field domain gap.'
    ]
  },
  {
    id: 'gap-002',
    topic: 'Glacial Lake Outburst Flood (GLOF) Early Warning Systems',
    category: 'Deployment Gap',
    title: 'Lack of Real-Time Edge-Computed SAR Coherence Triggers for Cloud-Covered Monsoon Periods',
    opportunity: 'Existing GLOF monitoring in the Karakoram relies predominantly on optical satellite imagery (Sentinel-2, Landsat-8). During the peak summer monsoon (July–August), continuous cloud cover obscures glacial valleys for weeks precisely when thermal melting peaks. Deploying automated SAR (Synthetic Aperture Radar) phase coherence processing directly on mountain base stations or edge gateways can enable cloud-penetrating early warnings.',
    evidence: [
      'Mehmood et al. (2024) reported data voids of up to 21 consecutive days during critical July melt phases due to monsoon cloud layers.',
      'DASR Capacity Building report (2024) emphasized the urgent need for zero-latency, all-weather telemetry for vulnerable downstream villages like Passu and Shishper.'
    ],
    evidenceType: 'Geographic limitation',
    confidence: 'High evidence',
    supportingPaperIds: ['res-kiu-002'],
    suggestedNextSteps: [
      'Formulate a dual-polarization Sentinel-1 GRD differential pipeline for automated moraine displacement detection.',
      'Test LoRaWAN packet burst transmission across non-line-of-sight mountain passes.'
    ]
  },
  {
    id: 'gap-003',
    topic: 'Computational Linguistics for Dardic & Regional Languages',
    category: 'Methodological Gap',
    title: 'Limited Subword Tokenization and Zero-Shot Translation Models for Unstandardized Orthographies (Shina & Burushaski)',
    opportunity: 'Modern LLMs fail catastrophically on regional Pakistani mountain languages due to character vocabulary divergence and lack of standardized spelling. Developing phonetic-aware subword tokenizers (e.g. Byte-fallback BPE trained on phonemic transcriptions) and evaluating cross-lingual zero-shot instruction tuning via Urdu and Persian parent models provides an open academic frontier.',
    evidence: [
      'Minhas et al. (2025) demonstrated that standard multilingual models have out-of-vocabulary (OOV) rates exceeding 64% on colloquial Shina spoken dialogues.',
      'Oral heritage studies by KIU Urdu & Regional Languages Dept emphasize rapid erosion without automated speech archiving.'
    ],
    evidenceType: 'Methodological comparison',
    confidence: 'Moderate evidence',
    supportingPaperIds: ['res-kiu-003'],
    suggestedNextSteps: [
      'Construct a 50,000-sentence parallel Shina-Urdu text corpus using standard orthographic guidelines.',
      'Fine-tune an open LLM (such as Llama-3 or Gemma) with low-rank adaptation (LoRA) on phonetic romanized and Perso-Arabic scripts.'
    ]
  }
];

export const INITIAL_RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-001',
    userId: 'usr-student-1',
    title: 'Edge-AI Orchard Sentry: Real-Time Mobile Foliar Disease Diagnosis for Hunza Valley Growers',
    description: 'Investigating lightweight neural network quantization and pruning techniques to execute real-time disease segmentation on low-cost Android smartphones without requiring active internet connectivity.',
    departmentId: 'dept-cs',
    researchArea: 'Computer Vision & Edge Computing',
    problem: 'Farmers in remote valleys suffer catastrophic yield cuts due to delayed fungal diagnosis and lack of local agricultural extension specialists.',
    objectives: [
      'Collect and annotate 2,000 high-resolution leaf images under varying natural mountain sunlight.',
      'Optimize MobileNetV3 and YOLOv8-Nano to operate under 30MB RAM footprint.',
      'Evaluate offline inference latency and accuracy on $100 Android smartphones.',
      'Validate usability with 15 local orchard managers.'
    ],
    researchQuestions: [
      'How does 8-bit integer quantization (INT8) impact classification accuracy on fine-grained fungal lesions?',
      'Can synthetic shadow and dew augmentation eliminate lab-to-field generalization drops?'
    ],
    dataset: 'GB-OrchardLeaf-4.2K + Supplementary field captures',
    methodology: 'Supervised transfer learning with Post-Training Quantization (PTQ) and Quantization-Aware Training (QAT) using TensorFlow Lite.',
    relatedPaperIds: ['res-kiu-001', 'res-kiu-006'],
    status: 'Development',
    notes: [
      { id: 'n1', content: 'Completed initial data collection in Karimabad. Collected 480 apricot leaf samples.', date: '2026-09-15', tag: 'Data Collection' },
      { id: 'n2', content: 'Met with Dr. Shahzad Alam; supervisor advised adding asymptomatic leaves to reduce false positive alerts.', date: '2026-09-28', tag: 'Supervisor Guidance' }
    ],
    updatedAt: '2026-09-28'
  }
];
