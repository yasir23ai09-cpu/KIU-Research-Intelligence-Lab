import { Department, SourceRegistryItem } from '../types';

export const OFFICIAL_KIU_SOURCES: SourceRegistryItem[] = [
  {
    id: 'kiu-main',
    sourceName: 'Karakoram International University Official Website',
    sourceUrl: 'https://www.kiu.edu.pk/',
    sourceType: 'KIU Official Portal',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Primary university portal; university governance, academic faculties, and news.'
  },
  {
    id: 'kiu-depts',
    sourceName: 'KIU Official Department Directory',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    sourceType: 'KIU Official Portal',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Authoritative source of truth for all 27 academic teaching and research departments.'
  },
  {
    id: 'kiu-cs',
    sourceName: 'KIU Department of Computer Science',
    sourceUrl: 'https://www.kiu.edu.pk/departments/department-of-computer-science',
    sourceType: 'KIU Official Portal',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'BS CS, MS CS, and PhD Computer Science programs and computing faculty.'
  },
  {
    id: 'kiu-dasr',
    sourceName: 'Directorate of Advanced Studies & Research (DASR)',
    sourceUrl: 'https://dasr.kiu.edu.pk/',
    sourceType: 'DASR Directorate',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Oversight body for postgraduate research, MS/PhD dissertations, ethics, and research grants.'
  },
  {
    id: 'kiu-dasr-functions',
    sourceName: 'DASR Functions & Regulatory Guidelines',
    sourceUrl: 'https://dasr.kiu.edu.pk/functions-of-the-dasr/',
    sourceType: 'DASR Directorate',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Statutory functions, thesis review procedures, plagiarism checking, and research compliance.'
  },
  {
    id: 'kiu-dasr-capacity',
    sourceName: 'DASR Research & Capacity Building',
    sourceUrl: 'https://dasr.kiu.edu.pk/research-capacity-building/',
    sourceType: 'DASR Directorate',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Faculty research grants, training workshops, Karakoram environmental and mountain studies.'
  },
  {
    id: 'kiu-kgs-cs',
    sourceName: 'KIU Graduate School — Computer Science',
    sourceUrl: 'https://kgs.kiu.edu.pk/department/department-of-computer-science/',
    sourceType: 'KIU Official Portal',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Graduate catalog, MS/PhD degree requirements, coursework, and thesis regulations.'
  },
  {
    id: 'kiu-admissions',
    sourceName: 'KIU Admissions Directorate',
    sourceUrl: 'https://admissions.kiu.edu.pk/',
    sourceType: 'KIU Official Portal',
    official: true,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Undergraduate and postgraduate eligibility, deadlines, and seat allocation.'
  },
  {
    id: 'scholarly-openalex',
    sourceName: 'OpenAlex Scholarly Graph',
    sourceUrl: 'https://openalex.org/',
    sourceType: 'OpenAlex',
    official: false,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Open bibliographic index of scholarly papers, authors, and citation networks.'
  },
  {
    id: 'scholarly-crossref',
    sourceName: 'Crossref Metadata Search',
    sourceUrl: 'https://www.crossref.org/',
    sourceType: 'Crossref',
    official: false,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Official digital object identifier (DOI) registry and metadata verification.'
  },
  {
    id: 'scholarly-arxiv',
    sourceName: 'arXiv Academic Open Access Repository',
    sourceUrl: 'https://arxiv.org/',
    sourceType: 'arXiv',
    official: false,
    lastChecked: '2026-10-05',
    status: 'Online & Verified',
    notes: 'Open-access preprint repository for Computer Science, AI, Physics, and Mathematics.'
  }
];

export const OFFICIAL_KIU_DEPARTMENTS: Department[] = [
  {
    id: 'dept-cs',
    name: 'Department of Computer Science',
    faculty: 'Faculty of Life Sciences and Computing',
    officialUrl: 'https://www.kiu.edu.pk/departments/department-of-computer-science',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Computer Science', 'MS Computer Science', 'PhD Computer Science'],
    researchAreas: ['Artificial Intelligence', 'Computer Vision', 'Regional NLP', 'IoT for Mountain Climates', 'Cloud Computing', 'Cybersecurity'],
    headOfDepartment: 'Dr. Shahzad Alam (Verified Public Faculty)',
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-ai-ds',
    name: 'Department of Artificial Intelligence and Data Science',
    faculty: 'Faculty of Life Sciences and Computing',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Artificial Intelligence', 'BS Data Science', 'MS Data Science'],
    researchAreas: ['Deep Learning', 'Glacier Satellite Remote Sensing', 'Agricultural Disease Detection', 'Bioinformatics', 'Predictive Modeling'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-se',
    name: 'Department of Software Engineering',
    faculty: 'Faculty of Life Sciences and Computing',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Software Engineering'],
    researchAreas: ['Empirical Software Engineering', 'Automated Testing', 'Smart Health Systems', 'Mountain Tourism Applications'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-it',
    name: 'Department of Information Technology',
    faculty: 'Faculty of Life Sciences and Computing',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Information Technology'],
    researchAreas: ['Network Infrastructures in Rugged Terrain', 'Enterprise Information Systems', 'Digital Governance'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-env-sci',
    name: 'Department of Environmental Sciences',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Environmental Sciences', 'MS Environmental Sciences', 'PhD Environmental Sciences'],
    researchAreas: ['Karakoram Glacier Mass Balance', 'Climate Change Impact in Northern Pakistan', 'Water Quality Assessment', 'Alpine Ecosystems'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-geology',
    name: 'Department of Geology and Mountain Hazards',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Geology', 'MS Geology and Mountain Hazards'],
    researchAreas: ['GLOF (Glacial Lake Outburst Floods)', 'Seismic Hazard Assessment', 'Landslide Susceptibility Mapping', 'Mineral Exploration'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-mining',
    name: 'Department of Mining Engineering',
    faculty: 'Faculty of Engineering and Technology',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BSc Mining Engineering'],
    researchAreas: ['Sustainable Gemstone Extraction', 'Rock Mechanics', 'Tunneling in High-Altitude Terrains', 'Mine Safety'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-electrical',
    name: 'Department of Electrical Engineering',
    faculty: 'Faculty of Engineering and Technology',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BSc Electrical Engineering'],
    researchAreas: ['Micro-Hydro Power Generation', 'Solar Photovoltaic Microgrids in Isolated Valleys', 'Smart Grid Monitoring'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-civil',
    name: 'Department of Civil Engineering and Technology',
    faculty: 'Faculty of Engineering and Technology',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BSc Civil Engineering Technology'],
    researchAreas: ['Earthquake-Resistant Vernacular Architecture', 'Highway Slope Stability', 'Cold-Weather Concrete Technology'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-agri-food',
    name: 'Department of Agriculture and Food Technology',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BSc (Hons) Agriculture', 'MSc (Hons) Food Technology'],
    researchAreas: ['High-Altitude Horticulture (Cherries, Apricots)', 'Post-Harvest Preservation', 'Organic Fruit Processing'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-forestry',
    name: 'Department of Forestry, Range and Wildlife Management',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Forestry', 'MS Wildlife Management'],
    researchAreas: ['Snow Leopard Habitat Preservation', 'Sub-Alpine Forest Regeneration', 'Biodiversity Conservation in Gilgit-Baltistan'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-math',
    name: 'Department of Mathematics',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Mathematics', 'MPhil Mathematics', 'PhD Mathematics'],
    researchAreas: ['Fluid Dynamics in Mountain Channels', 'Fractional Calculus', 'Optimization Algorithms in Energy Dispatch'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-physics',
    name: 'Department of Physics',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Physics', 'MS Physics'],
    researchAreas: ['Condensed Matter Physics', 'Atmospheric Physics in High Elevations', 'Renewable Energy Physics'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-chemistry',
    name: 'Department of Chemistry',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Chemistry', 'MS Chemistry', 'PhD Chemistry'],
    researchAreas: ['Natural Products from Mountain Herbs', 'Heavy Metal Analysis in Glacial Streams', 'Phytochemistry'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-plant-sci',
    name: 'Department of Plant Science',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Botany', 'MS Plant Sciences'],
    researchAreas: ['Ethnobotany of High-Altitude Flora', 'Medicinal Plants of Gilgit-Baltistan', 'Plant Physiology'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-animal-sci',
    name: 'Department of Animal Sciences',
    faculty: 'Faculty of Natural Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Animal Sciences'],
    researchAreas: ['Yak Breeding & Nutrition', 'High-Altitude Livestock Diseases', 'Poultry Farming Adaptation in Cold Regions'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-mgmt-sci',
    name: 'Department of Management Sciences',
    faculty: 'Faculty of Social Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BBA', 'MBA', 'MS Management Sciences'],
    researchAreas: ['Ecotourism Management in Northern Areas', 'Supply Chain Bottlenecks on Karakoram Highway', 'Social Entrepreneurship'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-economics',
    name: 'Department of Economics',
    faculty: 'Faculty of Social Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Economics', 'MS Economics'],
    researchAreas: ['CPEC Economic Impacts on Local Communities', 'Rural Livelihoods in Mountain Valleys', 'Remittances and Poverty Dynamics'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-urdu-reg',
    name: 'Department of Urdu and Regional Languages',
    faculty: 'Faculty of Humanities',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Urdu', 'MS Urdu'],
    researchAreas: ['Computational Linguistics for Shina, Burushaski, Balti and Wakhi', 'Oral Heritage Digitization', 'Urdu Literature Analysis'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-linguistics',
    name: 'Department of Linguistics & Literature',
    faculty: 'Faculty of Humanities',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS English Linguistics', 'BS English Literature', 'MS Linguistics'],
    researchAreas: ['Endangered Language Documentation', 'Acoustic Phonetics of Northern Pakistani Tongues', 'Second Language Acquisition'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-sociology',
    name: 'Department of Sociology & Anthropology',
    faculty: 'Faculty of Social Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Sociology', 'BS Anthropology'],
    researchAreas: ['Indigenous Mountain Knowledge Systems', 'Cultural Continuity and Modernization in Gilgit-Baltistan', 'Disaster Resilience'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-media',
    name: 'Department of Media and Communication',
    faculty: 'Faculty of Social Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Media and Communication'],
    researchAreas: ['Community Radios in Remote Alpine Valleys', 'Environmental Journalism & Climate Reporting', 'Digital Media in Mountain Communities'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-psychology',
    name: 'Department of Psychology and Human Development',
    faculty: 'Faculty of Social Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Psychology', 'MS Clinical Psychology'],
    researchAreas: ['Post-Trauma Resilience in Hazard-Prone Valleys', 'Youth Mental Health in Remote Geographic Locations', 'Cognitive Development'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-education',
    name: 'Department of Educational Development',
    faculty: 'Faculty of Social Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['B.Ed (Hons)', 'M.Phil Education'],
    researchAreas: ['Distance Learning in Geographically Isolated Schools', 'Mother-Tongue Multilingual Education Policies', 'Teacher Professional Development'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-allied-health',
    name: 'Department of Allied Health Sciences',
    faculty: 'Faculty of Life Sciences and Computing',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Medical Lab Technology', 'BS Radiology'],
    researchAreas: ['High-Altitude Hypoxia Adaptations', 'Epidemiology of Goiter and Waterborne Pathogens in Glacial Runoff', 'Telemedicine Networks'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-sports',
    name: 'Department of Sports Sciences and Physical Education',
    faculty: 'Faculty of Social Sciences',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BS Sports Sciences'],
    researchAreas: ['Physiological Performance in High-Altitude Mountaineering', 'Indigenous Winter Sports (Polo, Ice Hockey) Biomechanics'],
    lastChecked: '2026-10-05'
  },
  {
    id: 'dept-integ-tech',
    name: 'Department of Integrated Technologies',
    faculty: 'Faculty of Engineering and Technology',
    officialUrl: 'https://www.kiu.edu.pk/departments',
    sourceUrl: 'https://www.kiu.edu.pk/departments',
    verified: true,
    programs: ['BSc Integrated Technologies'],
    researchAreas: ['Automation in Cold Storages', 'Smart Instrumentation for Mountain Meteorological Stations', 'Renewable Micro-Sensors'],
    lastChecked: '2026-10-05'
  }
];
