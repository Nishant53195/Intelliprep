const gsSyllabus = [
  {
    id: "ancient-history",
    type: "GS",
    paper: "GS1",
    name: "Ancient History",

    topics: [
  {
    id: "prehistoric-period",
    name: "Prehistoric Period",
    subtopics: [
      {
        id: "paleolithic-period",
        name: "Paleolithic Period",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"RS Sharma: Human Evolution => TN NCERT: PreHistoric India (for Maps)"
      },
      {
        id: "mesolithic-period",
        name: "Mesolithic Period",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"RS Sharma: Human Evolution"
      },
      {
        id: "neolithic-period",
        name: "Neolithic Period",
        estimatedMinutes: 60,
        difficulty: 3,
        source :"RS Sharma: Neolithic Age "
      },
      {
        id: "chalcolithic-period",
        name: "Chalcolithic Period",
        estimatedMinutes: 60,
        difficulty: 3,
        source :"RS Sharma: Chalcolithic Cultures"
      },
    ],
  },
  {
    id: "indus-valley-civilization",
    name: "Indus Valley Civilization",
    subtopics: [
      {
        id: "introduction-of-IVC",
        name: "Introduction of IVC",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"RS Sharma: Harappan Culture"
      },
      {
        id: "town-planning",
        name: "Town Planning",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"RS Sharma: Harappan Culture"
      },
      {
        id: "society-IVC",
        name: "Society of IVC",
        estimatedMinutes: 45,
        difficulty: 3,
        source :"RS Sharma: Harappan Culture"
      },
      {
        id: "economy-ivc",
        name: "Economy of IVC",
        estimatedMinutes: 40,
        difficulty: 3,
        source :"RS Sharma: Harappan Culture"
      },
      {
        id: "theory-of-decline",
        name: "Theory of Decline",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"RS Sharma: Harappan Culture"
      },
      {
        id: "important-harrapan-sites",
        name: "Important Harrapan Sites",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"RS Sharma: Harappan Culture"
      },
    ],
  },
  {
    id: "vedic-age",
    name: "Vedic Age",
    subtopics: [
      {
        id: "arrival-of-indo-aryans",
        name: "Arrival of Indo Aryans",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"RS Sharma: The Age of the Rig Veda"
      },
      {
        id: "tribal-conflicts",
        name: "Tribal Conflicts",
        estimatedMinutes: 10,
        difficulty: 2,
        source :"RS Sharma: The Age of the Rig Veda"
      },
      {
        id: "cattle-rearing-ad-agriculture",
        name: "Cattle Rearing and Agriculture",
        estimatedMinutes: 10,
        difficulty: 2,
        source :"RS Sharma: The Age of the Rig Veda "
      },
      {
        id: "chief-and-family",
        name: "Chiefdom and Family",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: The Age of the Rig Veda "
      },
      {
        id: "religion-rig-vedic",
        name: "Religion of Rig Vedic Period",
        estimatedMinutes: 10,
        difficulty: 2,
        source :"RS Sharma: The Age of the Rig Veda "
      },
      {
        id: "later-vedic",
        name: "Expansion in Later Vedic Period and Use of Iron",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: The Later Vedic Phase "
      },
      {
        id: "agri-settle-vedic",
        name: "Agriculture and Settlements in Later Vedic",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: The Later Vedic Phase "
      },
      {
        id: "polity-later-vedic",
        name: "Polity in Later Vedic Period",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: The Later Vedic Phase "
      },
      {
        id: "social-later-vedic",
        name: "Society & Religion in Later Vedic Period",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: The Later Vedic Phase "
      },
    ],
  },
  {
    id: "jainism-and-buddhism",
    name: "Jainism and Buddhism",
    subtopics: [
      {
        id: "cause-of-origin",
        name: "Cause of Origin",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"RS Sharma: Jainism and Buddhism =>"
      },
      {
        id: "mahavira-jainism",
        name: "Mahavira and Jainism",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Jainism and Buddhism =>"
      },
      {
        id: "doctrine-spread-contribution-jainism",
        name: "Doctrine Spread and Contribution of Jainism",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: Jainism and Buddhism =>"
      },
      {
        id: "buddhism-gautama",
        name: "Gautama Buddha and Buddhism",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"RS Sharma: Jainism and Buddhism =>"
      },
      {
        id: "doctrine-spread-contribution-buddhism",
        name: "Doctrine Spread and Contribution of Buddhism",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: Jainism and Buddhism =>"
      },
      {
        id: "significance-influence",
        name: "Significance and Influence",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: Jainism and Buddhism =>"
      },
    ],
  },
  
  {
    id: "mahajanapadas-and-rise-of-magadha",
    name: "Mahajanapadas & Rise of Magadha",
    subtopics: [
      {
        id: "conditions-for-rise-of-large-states",
        name: "Conditions for rise of large states and Mahajanapadas",
        estimatedMinutes: 40,
        difficulty: 3,
        source :"RS Sharma: Territorial States and Rise of Magadha =>"
      },
      {
        id: "magadha-empire",
        name: "Magadha Empire",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"RS Sharma: Territorial States and Rise of Magadha =>"
      },
      {
        id: "magadha-success",
        name: "Cause of Magadha Success",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Territorial States and Rise of Magadha =>"
      },
    ],
  },
  {
    id: "iranian-and-macedonian-invasions",
    name: "Iranian & Macedonian Invasions",
    subtopics: [
      {
        id: "iranian-invasion",
        name: "Iranian Invasion",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Iranian & Macedonian Invasions =>"
      },
      {
        id: "alexanders-invasion",
        name: "Alexanders Invasion",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Iranian & Macedonian Invasions =>"
      },
      {
        id: "effects-of-the-invasion",
        name: "Effects of the invasion",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: Iranian & Macedonian Invasions =>"
      },
    ],
  },
  {
    id: "state-sttructure-and-varna-system",
    name: "State Structure and the Varna System in age of Buddha",
    subtopics: [
      {
        id: "second-urbanisation",
        name: "Second Urbanisation",
        estimatedMinutes: 40,
        difficulty: 3,
        source :"RS Sharma: State Structure and the Varna System in age of Buddha =>"
      },
      {
        id: "rural-economy",
        name: "Rural Economy",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: State Structure and the Varna System in age of Buddha =>"
      },
      {
        id: "admin-and-army",
        name: "Administration, Taxation and Army",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"RS Sharma: State Structure and the Varna System in age of Buddha =>"
      },
      {
        id: "republic-experiment",
        name: "Republican Experiment",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"RS Sharma: State Structure and the Varna System in age of Buddha =>"
      },
      {
        id: "social-order-legislations",
        name: "Social Orders and Legislation",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"RS Sharma: State Structure and the Varna System in age of Buddha =>"
      },
    ],
  },
  {
    id: "maurya-empire",
    name: "Maurya Empire",
    subtopics: [
      {
        id: "chandragupta-imperial-organisation",
        name: "Chandragupta and Imperial Organisations",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"RS Sharma: The Maurya Age =>"
      },
      {
        id: "ashoka-inscriptions",
        name: "Ashoka and Inscriptions",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: The Maurya Age =>"
      },
      {
        id: "impact-of-kalinga-war",
        name: "Impact of Kalinga War",
        estimatedMinutes: 20,
        difficulty: 4,
        source :"RS Sharma: The Maurya Age =>"
      },
      {
        id: "internal-policy-and-importance",
        name: "Internal Policy and Importance of Ashoka in History",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"RS Sharma: The Maurya Age =>"
      },
      {
        id: "state-control",
        name: "State Control",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"RS Sharma: Significance of The Maurya Rule =>"
      },
      {
        id: "economic-regulation",
        name: "Economic Regulation of Maurya",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"RS Sharma: Significance of The Maurya Rule =>"
      },
      {
        id: "spread-material-maurya",
        name: "Spread of Material Culture and State",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"RS Sharma: Significance of The Maurya Rule =>"
      },
      {
        id: "fall-of-maurya",
        name: "Cause of fall of Maurya",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: Significance of The Maurya Rule =>"
      },
    ],
  },
  {
    id: "central-asian-contact",
    name: "Central Asian Contact",
    subtopics: [
      {
        id: "political-aspect",
        name: "Political Aspect of Central Asian Contact",
        estimatedMinutes: 45,
        difficulty: 3,
        source :"RS Sharma: Central Asian Contact =>"
      },
      {
        id: "cultural-aspect",
        name: "Cultural Aspect of Central Asian Contact",
        estimatedMinutes: 60,
        difficulty: 2,
        source :"RS Sharma: Central Asian Contact =>"
      },
    ],
  },
  {
    id: "the-satvahana-phase",
    name: "The Satvahana Phase",
    subtopics: [
      {
        id: "satvahana-political-history",
        name: "Political history and Material Aspect",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"RS Sharma: The Satvahana Phase =>"
      },
      {
        id: "satvahana-social-organisation",
        name: "Social organisation",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"RS Sharma: The Satvahana Phase =>"
      },
      {
        id: "satvahana-administration-and-religion",
        name: "Administration, Religion and Architecture",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: The Satvahana Phase =>"
      },
    ],
  },
  {
    id: "history-in-deep-south",
    name: "History in deep south",
    subtopics: [
      {
        id: "megalithic-era",
        name: "Megalithic Era",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"RS Sharma: The Dawn of History in Deep South =>"
      },
      {
        id: "state-formation-and-development",
        name: "State, formation and development of civilisation",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"RS Sharma: The Dawn of History in Deep South =>"
      },
      {
        id: "the-three-early kingdoms",
        name: "The three early kingdoms",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"RS Sharma: The Dawn of History in Deep South =>"
      },
      {
        id: "rise-of-social-classes-south",
        name: "Rise of social classes",
        estimatedMinutes: 25,
        difficulty: 4,
        source :"RS Sharma: The Dawn of History in Deep South =>"
      },
      {
        id: "tamil-language-sangam-literature",
        name: "Tamil Language and Sangam Literature",
        estimatedMinutes: 70,
        difficulty: 4,
        source :"RS Sharma: The Dawn of History in Deep South =>TN NCERT: Sangam Age"
      },
    ],
  },
  {
    id: "crafts-commerce-and-urban-growth",
    name: "Crafts, Commerce and Urban Growth",
    subtopics: [
      {
        id: "crafts-and-craftsmen",
        name: "Crafts and Craftsmen",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"RS Sharma: Crafts Commerce and Urban Growth =>"
      },
      {
        id: "types-of-merchant",
        name: "Types of merchant",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"RS Sharma: Crafts Commerce and Urban Growth =>"
      },
      {
        id: "trade-routes-and-centers",
        name: "Trade routes and centers",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"RS Sharma: Crafts Commerce and Urban Growth =>"
      },
      {
        id: "money-economy-and-urban-growth",
        name: "money economy and urban growth",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"RS Sharma: Crafts Commerce and Urban Growth =>"
      },
    ],
  },
  {
    id: "gupta-empire",
    name: "Gupta Empire",
    subtopics: [
      {
        id: "gupta-history",
        name: "History of Gupta",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"RS Sharma: Rise and Growth of Gupta Empire =>"
      },
      {
        id: "kings-gupta",
        name: "Kings of Gupta",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"RS Sharma: Rise and Growth of Gupta Empire =>"
      },
      {
        id: "fall-gupta",
        name: "Fall of Gupta",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Rise and Growth of Gupta Empire =>"
      },
      {
        id: "administration-gupta",
        name: "System of Administration",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"RS Sharma: Life in the Gupta Age =>"
      },
      {
        id: "trade-agrarian-economy",
        name: "Trade and Agrarian Economy of Gupta",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Life in the Gupta Age =>"
      },
      {
        id: "social-gupta",
        name: "Social Developments of Gupta",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"RS Sharma: Life in the Gupta Age =>"
      },
      {
        id: "art-literature-foreigners-gupta",
        name: "Art Literature and Foreign Travellers",
        estimatedMinutes: 40,
        difficulty: 4,
        source :"RS Sharma: Life in the Gupta Age =>"
      },
    ],
  },
  {
    id: "spread-of-civilisation",
    name: "Spread of civilisation",
    subtopics: [
      {
        id: "orrisa-and-eastern-and-southern-mp",
        name: "Orrisa and Eastern and Southern MP",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"RS Sharma: Spread of Civilisation in Eastern India =>"
      },
      {
        id: "bengal-and-assam",
        name: "Bengal and Assam",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"RS Sharma: Spread of Civilisation in Eastern India =>"
      },
    ],
  },
  {
    id: "harsha-age",
    name: "Harsha Age",
    subtopics: [
      {
        id: "harsha-kingdom",
        name: "Harsha Kingdom",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Harsha and His Times =>"
      },
      {
        id: "harsha-administration",
        name: "Administration of Harsha",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: Harsha and His Times =>"
      },
      {
        id: "buddhism-under-harsha",
        name: "Buddhism under Harsha",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Harsha and His Times =>"
      },
    ],
  },
  {
    id: "rural-expansion-peasant-protest-age",
    name: "Brahmanization, Rural Expansion and Peasant Protest",
    subtopics: [
      {
        id: "state-deccan-south-india",
        name: "States of Deccan and South India",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Brahmanization, Rural Expansion and Peasant Protests =>"
      },
      {
        id: "kalabhra-revolt",
        name: "Kalabhra Revolt",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: Brahmanization, Rural Expansion and Peasant Protests =>"
      },
      {
        id: "pallavas-and-chalukyas",
        name: "Conflict between Pallavas and Chalukyas",
        estimatedMinutes: 70,
        difficulty: 2,
        source :"RS Sharma: Brahmanization, Rural Expansion and Peasant Protests =>TN NCERT: Pallavas, Chalukyas"
      },
      {
        id: "temple-landgrant-expansion",
        name: "Temples Land Grant and Rural Expansion",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"RS Sharma: Brahmanization, Rural Expansion and Peasant Protests =>"
      },
    ],
  },

  {
    id: "india-relation-with-asian-country-and-transition",
    name: "India relation with Asian country and transition",
    subtopics: [
      {
        id: "buddhism-in-srilanka-myanmar-and-china",
        name: "Buddhism in Srilanka, Myanmar and CHina",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: Cultural Interactions with Asian Countries =>"
      },
      {
        id: "christianity-and-west-asian-relations",
        name: "Christianity and West Asian Relations",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"RS Sharma: Cultural Interactions with Asian Countries =>"
      },
      {
        id: "social-crisis",
        name: "Social Crisis",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"RS Sharma: From Ancient to Medieval =>"
      },
      {
        id: "decline-of-trade-towns",
        name: "Decline of Trade and Towns",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: From Ancient to Medieval =>"
      },
      {
        id: "changes in-varna-system",
        name: "Changes in Varna system",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"RS Sharma: From Ancient to Medieval =>"
      },
      {
        id: "rise-of-regional-identities",
        name: "Rise of regional identities",
        estimatedMinutes: 20,
        difficulty: 4,
        source :"RS Sharma: From Ancient to Medieval =>"
      },
    ],
  },
],
  },

  {
     id: "medieval-history",
    type: "GS",
    paper: "GS1",
    name: "Medieval History",

    topics: [
  {
    id: "indian-and-the-world",
    name: "Indian and the World",
    subtopics: [
      {
        id: "europe",
        name: "Europe",
        estimatedMinutes: 20,
        difficulty: 1,
        source :"Satish Chandra: India and the World"
      },
      {
        id: "the-arab-world",
        name: "The Arab World",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: India and the World"
      },
      {
        id: "africa",
        name: "Africa",
        estimatedMinutes: 15,
        difficulty: 1,
        source :"Satish Chandra: India and the World"
      },
    ],
  },
  {
    id: "northern-india-and-age-of-three-empires",
    name: "Northern India and Age of three Empires",
    subtopics: [
      {
        id: "struggle-for-domination-in-north-india-and-palas",
        name: "Struggle for domination in North India and Palas",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Northern India"
      },
      {
        id: "the-pratiharas",
        name: "The Pratiharas",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Northern India"
      },
      {
        id: "the-rashtrakutas",
        name: "The Rashtrakutas",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Northern India"
      },
      {
        id: "political-ideas-and-organisation-three-empires",
        name: "Political Ideas and Organisation",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: Northern India"
      },
    ],
  },
  {
    id: "south-india-and-the-chola-empire",
    name: "South India and The Chola Empire",
    subtopics: [
      {
        id: "the-rise-of-chola-empire",
        name: "The rise of Chola Empire",
        estimatedMinutes: 10,
        difficulty: 2,
        source :"Satish Chandra: South India"
      },
      {
        id: "age-of-rajaraja-and-rajendra-i",
        name: "Age of Rajaraja and Rajendra I",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: South India"
      },
      {
        id: "chola-government-and-local-self-government",
        name: "Chola government and Local Self Government",
        estimatedMinutes: 35,
        difficulty: 4,
        source :"Satish Chandra: South India"
      },
      {
        id: "chola-cultural-life",
        name: "Cultural Life",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: South India"
      },
    ],
  },
  {
    id: "economic-and-social-life-during-1000-ad",
    name: "Economic and Social Life during 1000 AD",
    subtopics: [
      {
        id: "trade-and-commerce-1000ad",
        name: "Trade and Commerce",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"Satish Chandra: Economic and Social Life"
      },
      {
        id: "nature-of-society-and-caste-system-1000ad",
        name: "Nature of society and caste system",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"Satish Chandra: Economic and Social Life"
      },
      {
        id: "condition-of-women-1000ad",
        name: "Condition of Women",
        estimatedMinutes: 10,
        difficulty: 3,
        source :"Satish Chandra: Economic and Social Life"
      },
      {
        id: "dress-food-and-amusements-1000ad",
        name: "Dress, food and amusements",
        estimatedMinutes: 10,
        difficulty: 1,
        source :"Satish Chandra: Economic and Social Life"
      },
      {
        id: "education-science-and-religious-learning-1000ad",
        name: "Education, Science and Religious learning",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Economic and Social Life"
      },
    ],
  },
  {
    id: "the-age-of-conflicts",
    name: "The age of conflicts",
    subtopics: [
      {
        id: "the-ghaznavids",
        name: "The Ghaznavids",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: The Age of Conflict"
      },
      {
        id: "the-rajput-states",
        name: "The Rajput States",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"Satish Chandra: The Age of Conflict"
      },
      {
        id: "the-turkish-conquest",
        name: "The turkish conquest",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: The Age of Conflict"
      },
      {
        id: "the-battle-of-tarain",
        name: "The battle of Tarain",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: The Age of Conflict"
      },
      {
        id: "turkish-conquest-of-the-ganga-valley",
        name: "Turkish conquest of the Ganga valley",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: The Age of Conflict"
      },
      {
        id: "cause-of-the-defeat-of-the-rajputs",
        name: "Cause of the defeat of the Rajputs",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"Satish Chandra: The Age of Conflict"
      },
    ],
  },
  {
    id: "the-delhi-sultanate-till-1400",
    name: "The Delhi Sultanate till 1400",
    subtopics: [
      {
        id: "the-mameluks",
        name: "The mameluks",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Delhi Sultanate I"
      },
      {
        id: "iltutmish",
        name: "Iltutmish",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: Delhi Sultanate I"
      },
      {
        id: "raziya",
        name: "Raziya",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Delhi Sultanate I"
      },
      {
        id: "era-of-balban",
        name: "Era of Balban",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: Delhi Sultanate I"
      },
      {
        id: "the-mongols-and-problem-of-nw-frontier",
        name: "The mongols and problem of NW frontier",
        estimatedMinutes: 35,
        difficulty: 4,
        source :"Satish Chandra: Delhi Sultanate I"
      },
      {
        id: "internal-rebellions-mameluks",
        name: "Internal Rebellions",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: Delhi Sultanate I"
      },
    ],
  },
  {
    id: "the-delhi-sultanate-post-mameluks",
    name: "The Delhi Sultanate post Mameluks",
    subtopics: [
      {
        id: "the-khaljis",
        name: "The Khaljis",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: Delhi Sultanate II"
      },
      {
        id: "the-tughlaqs",
        name: "The Tughlaqs",
        estimatedMinutes: 30,
        difficulty: 4,
        source :"Satish Chandra: Delhi Sultanate II"
      },
      {
        id: "expansion-of-delhi-sultanate",
        name: "Expansion of Delhi Sultanate",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: Delhi Sultanate II"
      },
      {
        id: "internal-reforms-and-experiments",
        name: "Internal reforms and experiments",
        estimatedMinutes: 60,
        difficulty: 3,
        source :"Satish Chandra: Delhi Sultanate II"
      },
      {
        id: "disintegration-of-sultanate-and-firuz",
        name: "Disintegration of sultanate and Firuz",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: Delhi Sultanate II"
      },
    ],
  },
  {
    id: "delhi-sultanate-system",
    name: "Delhi Sultanate System",
    subtopics: [
      {
        id: "the-sultan",
        name: "The Sultan",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "central-administration-sultanate",
        name: "Central administration",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "local-administration-sultanate",
        name: "Local administration",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "economic-and-social-life-sultanate",
        name: "Economic and Social Life",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "peasants-and-rural-gentry",
        name: "Peasants and Rural Gentry",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "trade-industry-and-merchants-sultanate",
        name: "Trade, Industry and Merchants",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "the-nobles-sultanate",
        name: "The nobles",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "town-life-slaves-and-artisans",
        name: "Town life , Slaves and Artisans",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "caste-social-manners-and-customs-sultanate",
        name: "Caste, Social manners and Customs",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
      {
        id: "nature-of-state-and-religious-freedom",
        name: "Nature of State and Religious freedom",
        estimatedMinutes: 35,
        difficulty: 4,
        source :"Satish Chandra: Government and Economic and Social Life under Delhi Sultanate"
      },
    ],
  },
  {
    id: "the-age-of-vijayanagara-and-the-bahmanids",
    name: "The Age of Vijayanagara and the Bahmanids",
    subtopics: [
      {
        id: "the-vijayanagara-empire-foundation",
        name: "The Vijayanagara Empire foundation",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Vijayanagara Bahmanids and coming of Portuguese"
      },
      {
        id: "kings-of-vijayanagara",
        name: "Kings of Vijayanagara",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Vijayanagara Bahmanids and coming of Portuguese"
      },
      {
        id: "bahmani-conflict",
        name: "Bahmani conflict",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Vijayanagara Bahmanids and coming of Portuguese"
      },
      {
        id: "the-bahmani-kingdom",
        name: "The Bahmani kingdom",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Vijayanagara Bahmanids and coming of Portuguese"
      },
      {
        id: "mahmud-gawan",
        name: "Mahmud Gawan",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"Satish Chandra: Vijayanagara Bahmanids and coming of Portuguese"
      },
      {
        id: "climax-and-disintegration-of-empire-south",
        name: "Climax and disintegration of Empire",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Vijayanagara Bahmanids and coming of Portuguese"
      },
      {
        id: "the-advent of-portugese",
        name: "The advent of Portugese",
        estimatedMinutes: 45,
        difficulty: 2,
        source :"Satish Chandra: Vijayanagara Bahmanids and coming of Portuguese"
      },
    ],
  },
  {
    id: "struggle-for-empire-in-north-india",
    name: "Struggle for empire in North India",
    subtopics: [
      {
        id: "begal-assam-and-odisha",
        name: "Bengal, Assam and Odisha",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Struggle for Empire in NOrth India I"
      },
      {
        id: "gujarat-regional-state",
        name: "Gujarat",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Struggle for Empire in NOrth India I"
      },
      {
        id: "mahmud-begarha",
        name: "Mahmud Begarha",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "malwa-and-mewar",
        name: "Malwa and Mewar",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Struggle for Empire in NOrth India I"
      },
      {
        id: "northwest-and-north-india-regional",
        name: "Northwest and North India",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Struggle for Empire in NOrth India I"
      },
      {
        id: "kashmir-regional-state",
        name: "Kashmir",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: Struggle for Empire in NOrth India I"
      },
    ],
  },
  {
    id: "cultural-developments-medieval",
    name: "Cultural Developments",
    subtopics: [
      {
        id: "architecture-medieval",
        name: "Architecture",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: Cultural Development in India"
      },
      {
        id: "religious-ideas-and-beliefs-medieval",
        name: "Religious Ideas and Beliefs",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Cultural Development in India"
      },
      {
        id: "the-sufi-movement",
        name: "The Sufi movement",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"Satish Chandra: Cultural Development in India"
      },
      {
        id: "the-chisti-and-suharwardi-silsilahs",
        name: "The Chisti and Suharwardi Silsilahs",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"Satish Chandra: Cultural Development in India"
      },
      {
        id: "the-bhakti-movement",
        name: "The Bhakti movement",
        estimatedMinutes: 50,
        difficulty: 4,
        source :"Satish Chandra: Cultural Development in India"
      },
      {
        id: "the-vaishnavaite-movement",
        name: "The Vaishnavaite movement",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Cultural Development in India"
      },
      {
        id: "literature-fine-arts",
        name: "Literature and Fine Arts",
        estimatedMinutes: 40,
        difficulty: 3,
        source :"Satish Chandra: Cultural Development in India"
      },
    ],
  },
  {
    id: "mughal-empire-foundation",
    name: "Mughal Empire Foundation",
    subtopics: [
      {
        id: "central-asia-and-babur",
        name: "Central Asia and Babur",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Mughals and Afghans"
      },
      {
        id: "conquest-of-india-babur",
        name: "Conquest of India",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Mughals and Afghans"
      },
      {
        id: "the-battle-of-panipat-and-khanwa",
        name: "The battle of Panipat and Khanwa",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"Satish Chandra: Mughals and Afghans"
      },
      {
        id: "the-afghans-conflict",
        name: "The Afghans",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Mughals and Afghans"
      },
      {
        id: "humayun-conquest-of-gujarat",
        name: "Humayun conquest of Gujarat",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"Satish Chandra: Mughals and Afghans"
      },
      {
        id: "sher-shah-and-sur-empire",
        name: "Sher Shah and Sur empire",
        estimatedMinutes: 90,
        difficulty: 3,
        source :"Satish Chandra: Mughals and Afghans"
      },
    ],
  },
  {
    id: "mughal-empire-under-akbar",
    name: "Mughal Empire under Akbar",
    subtopics: [
      {
        id: "contest-with-the-nobility",
        name: "Contest with the nobility",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
      {
        id: "early-expansion-akbar",
        name: "Early expansion",
        estimatedMinutes: 30,
        difficulty: 2, 
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
      {
        id: "administration-akbar",
        name: "Administration",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
      {
        id: "mansabdari-and-army",
        name: "Mansabdari and Army",
        estimatedMinutes: 30,
        difficulty: 4,
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
      {
        id: "organisation-of-government-akbar",
        name: "Organisation of government",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
      {
        id: "relations-with-rajputs-akbar",
        name: "Relations with rajputs",
        estimatedMinutes: 45,
        difficulty: 3,
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
      {
        id: "rebellions-akbar",
        name: "Rebellions",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
      {
        id: "toward-integration-akbar",
        name: "Toward integration",
        estimatedMinutes: 50,
        difficulty: 3,
        source :"Satish Chandra: Consolidation of Mughal Empire under Akbar"
      },
    ],
  },
  {
    id: "mughals-deccan-and-south",
    name: "Deccan and South India",
    subtopics: [
      {
        id: "mughal-advance-towards-deccan",
        name: "Mughal advance towards Deccan",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"Satish Chandra: Deccan and South India"
      },
      {
        id: "conquest-of-berar-ahmadnagar",
        name: "Conquest of Berar, Ahmadnagar",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: Deccan and South India"
      },
      {
        id: "rise-of-malik-ambar",
        name: "Rise of Malik Ambar",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Deccan and South India"
      },
      {
        id: "extinction-of-ahmadnagar",
        name: "Extinction of Ahmadnagar",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"Satish Chandra: Deccan and South India"
      },
      {
        id: "cultural-contribution",
        name: "Cultural Contributions of Deccan",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"Satish Chandra: Deccan and South India"
      },
    ],
  },
  {
    id: "india-in-first-half-of-seventeenth-century",
    name: "India in first half of Seventeenth Century",
    subtopics: [
      {
        id: "political-and-administrative-developments-17th-early",
        name: "Political and Administrative Developments",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
      {
        id: "nur-jahan",
        name: "Nur Jahan",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
      {
        id: "shah-jahan",
        name: "Shah Jahan",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
      {
        id: "mahabat-khan",
        name: "Mahabat Khan",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
      {
        id: "foreign-policy",
        name: "Foreign Policy of Mughals",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
      {
        id: "shah-jahan-and-balkh-campaign",
        name: "Shah Jahan and Balkh campaign",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
      {
        id: "mughal-persian-relation",
        name: "Mughal-Persian relation",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
      {
        id: "growth-of-administration-17th-early",
        name: "Growth of administration",
        estimatedMinutes: 40,
        difficulty: 3,
        source :"Satish Chandra: India in first half of Seventeenth Century"
      },
    ],
  },
  {
    id: "life-under-mughals",
    name: "Life under Mughals",
    subtopics: [
      {
        id: "standard-of-living-mughal",
        name: "Standard of living",
        estimatedMinutes: 35,
        difficulty: 2,
        source :"Satish Chandra: Economic and Social life under Mughals"
      },
      {
        id: "the-ruling-classes-mughal",
        name: "The ruling classes",
        estimatedMinutes: 45,
        difficulty: 3,
        source :"Satish Chandra: Economic and Social life under Mughals"
      },
      {
        id: "the-middle-strata-mughal",
        name: "The middle strata",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"Satish Chandra: Economic and Social life under Mughals"
      },
      {
        id: "trade-and-commerce-mughal-life",
        name: "Trade and Commerce",
        estimatedMinutes: 40,
        difficulty: 3,
        source :"Satish Chandra: Economic and Social life under Mughals"
      },
      {
        id: "architecture-mughal",
        name: "Architecture of Mughals",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Cultural and Religious Developments"
      },
      {
        id: "painting-mughal",
        name: "Painting of Mughals",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Cultural and Religious Developments"
      },
      {
        id: "language-literature-music-mughal",
        name: "Language Literature and Music of Mughals",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"Satish Chandra: Cultural and Religious Developments"
      },
      {
        id: "ideas-beliefs-mughal",
        name: "Religius ideas and Beliefs of Mughals",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: Cultural and Religious Developments"
      },
    ],
  },
  {
    id: "climax-of-mughals",
    name: "Climax of Mughals",
    subtopics: [
      {
        id: "problem-of-succession-climax",
        name: "Problem of succession",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire I"
      },
      {
        id: "aurangzeb-reign",
        name: "Aurangzeb reign",
        estimatedMinutes: 80,
        difficulty: 3,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire I"
      },
      {
        id: "political-development-in-north-india-climax",
        name: "Poitical deveopment in North India",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire I"
      },
      {
        id: "developments-in-north-east-and-east-india",
        name: "Developments in North East and East India",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire I"
      },
      {
        id: "popular-revolts-jats-afghans-and-sikhs",
        name: "Popular Revolts , Jats , Afghans and Sikhs",
        estimatedMinutes: 45,
        difficulty: 3,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire I"
      },
      {
        id: "relation-with-rajputs-aurangzeb",
        name: "Relation with rajputs",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire I"
      },
    ],
  },
  {
    id: "marathas",
    name: "Marathas",
    subtopics: [
      {
        id: "rise-of-marathas",
        name: "Rise of Marathas",
        estimatedMinutes: 10,
        difficulty: 3,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire II"
      },
      {
        id: "shivaji",
        name: "Shivaji",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire II"
      },
      {
        id: "treaty-of-purandar",
        name: "Treaty of Purandar",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire II"
      },
      {
        id: "shivaji-administration-and-achievements",
        name: "Shivaji administration and achievements",
        estimatedMinutes: 35,
        difficulty: 4,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire II"
      },
      {
        id: "aurangzeb-and-deccani-states-phases",
        name: "Aurangzeb and Deccani States Phases",
        estimatedMinutes: 60,
        difficulty: 3,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire II"
      },
      {
        id: "decline-of-mughals",
        name: "Decline of Mughals",
        estimatedMinutes: 55,
        difficulty: 3,
        source :"Satish Chandra: Climax and Disintegration of Mughal Empire II"
      },
    ],
  },
]

},
 {
     id: "modern-history",
    type: "GS",
    paper: "GS1",
    name: "Modern History",
    topics: [
{
id: "the-decline-mughals",
name: "Decline of Mughal Empire",
subtopics: [
{
id: "later-mughals-sub",
name: "Later Mughals",
estimatedMinutes: 60,
difficulty: 2,
source :"Sonali Bansal: Decline of Mughal Empire"
},
],
},
{
id: "autonomous-states-rise",
name: "Autonomous States rise",
subtopics: [
{
id: "successor-states-hyderabad-carnatic-bengal-awadh",
name: "Successor states as Hyderabad, Carnatic, Bengal and Awadh",
estimatedMinutes:50,
difficulty: 2,
source :"Sonali Bansal: Rise of Autonomous States"
},
{
id: "new-states-marathas-sikhs-jats-afghans",
name: "New States as Marathas, Sikhs, Jats and Afghans",
estimatedMinutes: 60,
difficulty: 3,
source :"Sonali Bansal: Rise of Autonomous States"
},
{
id: "independent-kingdoms-mysore-kerala-rajputs",
name: "Independent Kingdoms of Mysore, Kerala and Rajputs",
estimatedMinutes: 40,
difficulty: 2,
source :"Sonali Bansal: Rise of Autonomous States"
},
{
id: "india-on-the-eve-of-british-conquest",
name: "India on the eve of British conquest",
estimatedMinutes: 35,
difficulty: 2,
source :"Sonali Bansal: Rise of Autonomous States"
},
],
},
{
id: "rise-of-british",
name: "Rise of British",
subtopics: [
{
id: "emergence-of-capitalism-imperialism-europe",
name: "Emergence of Capitalism and Imperialism in Europe",
estimatedMinutes: 50,
difficulty: 2,
source :"Sonali Bansal: Rise of British"
},
{
id: "the-portuguese",
name: "The Portuguese",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Rise of British"
},
{
id: "the-dutch",
name: "The Dutch",
estimatedMinutes: 15,
difficulty: 1,
source :"Sonali Bansal: Rise of British"
},
{
id: "the-english",
name: "The English",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Rise of British"
},
{
id: "the-danes",
name: "The Danes",
estimatedMinutes: 10,
difficulty: 1,
source :"Sonali Bansal: Rise of British"
},
{
id: "the-french",
name: "The French",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Rise of British"
},
],
},
{
id: "expansion-consolidation-british-power",
name: "Expansion and Consolidation of British Power",
subtopics: [
{
id: "carnatic-wars",
name: "Carnatic Wars",
estimatedMinutes: 60,
difficulty: 2,
source :"Sonali Bansal: Carnatic,Plassey and Buxar"
},
{
id: "british-conquest-bengal",
name: "British Conquest of Bengal",
estimatedMinutes: 60,
difficulty: 2,
source :"Sonali Bansal: Carnatic,Plassey and Buxar"
},
{
id: "british-conquest-bengal-consequence",
name: "Consequence of Bengal conquest",
estimatedMinutes: 60,
difficulty: 2,
source :"Sonali Bansal: Carnatic,Plassey and Buxar"
},
{
id: "anglo-mysore",
name: "Anglo Mysore Wars",
estimatedMinutes: 60,
difficulty: 2,
source :"Sonali Bansal: British Expansion in South India"
},
{
id: "anglo-maratha",
name: "Anglo Maratha Wars",
estimatedMinutes: 60,
difficulty: 2,
source :"Sonali Bansal: British Expansion in South India"
},
{
id: "conquest-sindh",
name: "Conquest of Sindh",
estimatedMinutes: 15,
difficulty: 2,
source :"Sonali Bansal: British Expansion in North India"
},
{
id: "conquest-punjab",
name: "Conquest of Punjab",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: British Expansion in North India"
},
{
id: "conquest-awadh",
name: "Conquest of Awadh",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: British Expansion in North India" 
},
],
},
{
id: "changes -impact-economy",
name: "Changes and Impact Indian Economy",
subtopics: [
{
id: "economic-model",
name: "Economic Model",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Economy" 
},
{
id: "changing-phase",
name: "Changing Phase of Colonialisation",
estimatedMinutes: 45,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Economy" 
},
{
id: "indian-agrarian-structure",
name: "Changes in Indian Agrarian Structure",
estimatedMinutes: 75,
difficulty: 2,
source :"Sonali Bansal: Changes and Impact Indian Economy" 
},
{
id: "impact-economy",
name: "Economic Impact",
estimatedMinutes: 35,
difficulty: 2,
source :"Sonali Bansal: Changes and Impact Indian Economy" 
},
],
},
{
id: "political-impact-till-1858",
name: "Political Impact till 1858",
subtopics: [
{
id: "regulating-act-1773",
name: "Regulating Act 1773",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
{
id: "pitts-india-act-1784",
name: "Pitt's India Act 1784",
estimatedMinutes: 15,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
{
id: "act-of-1786",
name: "Act of 1786",
estimatedMinutes: 10,
difficulty: 1,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
{
id: "charter-act-of-1793",
name: "Charter Act of 1793",
estimatedMinutes: 15,
difficulty: 2,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
{
id: "charter-act-of-1813",
name: "Charter Act of 1813",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
{
id: "charter-act-of-1833",
name: "Charter Act of 1833",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
{
id: "charter-act-of-1853",
name: "Charter Act of 1853",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
{
id: "government-of-india-act-1858",
name: "Government of India Act 1858",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Changes and Impact Indian Polity I"
},
],
},
{
id: "indian-administration-till-1858",
name: "Indian Administration till 1858",
subtopics: [
{
id: "indian-administration-under-british",
name: "Indian Administration under the British",
estimatedMinutes: 110,
difficulty: 2,
source :"Sonali Bansal: Changes and Impact Indian Administration"
},
],
},
{
id: "rise-of-national-consciousness",
name: "Rise of National Consciousness",
subtopics: [
{
id: "national-consciousness-factors",
name: "Factors",
estimatedMinutes: 45,
difficulty: 2,
source :"Sonali Bansal: Rise and Growth of National Consciousness"
},
{
id: "rise-of-national-movement",
name: "Rise of national movement",
estimatedMinutes: 35,
difficulty: 2,
source :"Sonali Bansal: Rise and Growth of National Consciousness"
},
],
},
{
id: "uprisings-upto-1857",
name: "Uprisings upto 1857",
subtopics: [
{
id: "bengal-east-india-revolts",
name: "Bengal and East India Revolts",
estimatedMinutes: 60,
difficulty: 3,
source :"Sonali Bansal: Popular Uprisings up to 1857"
},
{
id: "western-india-revolts",
name: "Western India revolts",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Popular Uprisings up to 1857"
},
{
id: "southern-india-revolts",
name: "Southern India revolts",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Popular Uprisings up to 1857"
},
{
id: "northern-india-revolts-early",
name: "Northern India revolts and Significance",
estimatedMinutes: 30,
difficulty: 2,
source :"Sonali Bansal: Popular Uprisings up to 1857"
},
],
},
{
id: "1857-revolt",
name: "1857 revolt",
subtopics: [
{
id: "1857-causes",
name: "Causes",
estimatedMinutes: 45,
difficulty: 3,
source :"Sonali Bansal: Revolt of 1857"
},
{
id: "1857-storm-centers-and-leaders",
name: "Storm centers and leaders",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Revolt of 1857"
},
{
id: "1857-defeat-and-cause",
name: "Defeat and its cause",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Revolt of 1857"
},
{
id: "1857-significance",
name: "Significance",
estimatedMinutes: 25,
difficulty: 4,
source :"Sonali Bansal: Revolt of 1857"
},
{
id: "1857-consequence",
name: "Conseuence of revolt",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Revolt of 1857"
},
],
},
{
id: "uprisings-post-1857",
name: "Uprisings post 1857",
subtopics: [
{
id: "popular-uprising-after-1857",
name: "Popular Uprisings after 1857",
estimatedMinutes: 75,
difficulty: 3,
source :"Sonali Bansal: Popular Uprisings After 1857"
},
{
id: "working-class-movements",
name: "Working class movements",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Popular Uprisings After 1857"
},
],
},
{
id: "socio-religious-movements-part-I",
name: "Socio Religious movements Part I",
subtopics: [
{
id: "factors-aim-classification-methods-reform",
name: "Factors, Aim, classification and methods of reform",
estimatedMinutes: 45,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
{
id: "reform-eastern-india",
name: "Reforms in Eastern India",
estimatedMinutes: 120,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
{
id: "reform-western-india",
name: "Reforms in Western India",
estimatedMinutes: 80,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
{
id: "reform-northern-india",
name: "Reforms in Northern India",
estimatedMinutes: 30,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
{
id: "reform-south-india",
name: "Reforms in Southern India",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
{
id: "reform-miscellaneous-india",
name: "Reforms in Miscellaneous India",
estimatedMinutes: 30,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
],
},
{
id: "socio-religious-movements-part-II",
name: "Socio Religious movements Part II",
subtopics: [
{
id: "muslims-movements",
name: "Muslims movements",
estimatedMinutes: 45,
difficulty: 3,
source :"Sonali Bansal: Social Religious Reform Movements Part II"
},
{
id: "sikh-and-parsi-movements",
name: "Sikh and Parsi movements",
estimatedMinutes: 45,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
{
id: "non-brahmin-movements",
name: "Non Brahmin movements",
estimatedMinutes: 60,
difficulty: 3,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
{
id: "miscellaneous-movements",
name: "Miscellaneous movements",
estimatedMinutes: 35,
difficulty: 2,
source :"Sonali Bansal: Social Religious Reform Movements Part I"
},
],
},
{
id: "india-before-congress",
name: "Political Association before Congress",
subtopics: [
{
id: "political-associations-bengal-presidency",
name: "Political Associations in Bengal Presidency",
estimatedMinutes: 30,
difficulty: 2,
source :"Sonali Bansal: Political Associations before INC"
},
{
id: "political-associations-bombay-presidency",
name: "Political Associations in Bombay Presidency",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Political Associations before INC"
},
{
id: "political-associations-madras-presidency",
name: "Political Associations in Madras Presidency",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Political Associations before INC"
},
{
id: "political-associations-england",
name: "Political Associations in England",
estimatedMinutes: 30,
difficulty: 2,
source :"Sonali Bansal: Political Associations before INC"
},
],
},
{
id: "formation-of-congress",
name: "Formation of Congress",
subtopics: [
{
id: "inc-formation",
name: "Formation of INC",
estimatedMinutes: 45,
difficulty: 2,
source :"Sonali Bansal: Formation of INC"
},
],
},
{
id: "moderate-phase",
name: "Moderate Phase",
subtopics: [
{
id: "moderate-composition-leaders",
name: "Composition and Leaders",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: The Moderate Phase"
},
{
id: "moderate-method-demands",
name: "Method and Demands",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: The Moderate Phase"
},
{
id: "moderate-british-reaction-evaluation",
name: "British reaction and evaluation",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: The Moderate Phase"
},
],
},
{
id: "extremists-phase",
name: "Extremists Phase",
subtopics: [
{
id: "extremist-cause-leaders",
name: "Cause and Leaders",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Rise of Extremists"
},
{
id: "extremist-demand-programmes",
name: "Demand and programmes",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Rise of Extremists"
},
{
id: "extremist-assessment",
name: "Assessment",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Rise of Extremists"
},
],
},
{
id: "swadeshi-movement",
name: "Partition of Bengal and Swadeshi Movement",
subtopics: [
{
id: "curzon-attack",
name: "Curzon Attack",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Extremist Phase I"
},
{
id: "bengal-partition",
name: "Bengal Partition",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Extremist Phase I"
},
{
id: "swadeshi-and-boycott-movement",
name: "Swadeshi and boycott movement",
estimatedMinutes: 40,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase I"
},
{
id: "swadeshi-polity-and-participations",
name: "polity and participations",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase I"
},
{
id: "swadeshi-decline-and-reason",
name: "Decline and reason for it",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase I"
},
{
id: "impact-of-swadeshi-movements",
name: "Impact of Swadeshi movements",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase I"
},
],
},
{
id: "revolutionary-movements",
name: "Revolutionary Movements",
subtopics: [
{
id: "revolutionary-reasons-methods",
name: "Reasons and Methods",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Extremist Phase II"
},
{
id: "revolutionary-activity-maharashtra",
name: "Activity in Maharashtra",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase II"
},
{
id: "revolutionary-activity-bengal",
name: "Activity in Bengal",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase II"
},
{
id: "revolutionary-activity-other-provinces",
name: "Activity in Other provinces",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Extremist Phase II"
},
{
id: "ghadar-movement",
name: "Ghadar movement",
estimatedMinutes: 70,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase II"
},
],
},
{
id: "home-rule-league",
name: "Home Rule League",
subtopics: [
{
id: "home-rule-factors-formation",
name: "Factors and Formation",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Extremist Phase II"
},
{
id: "home-rule-league-details",
name: "Home Rule League",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Extremist Phase II"
},
{
id: "declination-of-home-rule",
name: "Declination of Home Rule",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Extremist Phase II"
},
],
},
{
id: "gandhiji-in-south-africa",
name: "Gandhiji in South Africa",
subtopics: [
{
id: "gandhiji-early-life",
name: "Gandhiji Early life",
estimatedMinutes: 15,
difficulty: 1,
source :"Sonali Bansal: Emergence of Mahatama Gandhi"
},
{
id: "gandhiji-career-south-africa",
name: "Gandhiji career in South Africa",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Emergence of Mahatama Gandhi"
},
],
},
{
id: "gandhiji-in-india",
name: "Gandhiji in India",
subtopics: [
{
id: "champaran-ahmedabad-and-kheda",
name: "Champaran, Ahmedabad and Kheda",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Emergence of Mahatama Gandhi"
},
{
id: "rowlatt-satyagraha-and-jallianwala-bagh",
name: "Rowlatt Satyagraha and jallianwala bagh",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Emergence of Mahatama Gandhi"
},
{
id: "gandhi-early-evaluation",
name: "evaluation",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Emergence of Mahatama Gandhi"
},
],
},
{
id: "constitutional-developments",
name: "Constituional developments",
subtopics: [
{
id: "indian-councils-act-1861",
name: "Indian Councils Act 1861",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Constitutional Developments II"
},
{
id: "indian-councils-act-of-1892",
name: "Indian Councils Act of 1892",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Constitutional Developments II"
},
{
id: "morley-minto-reforms-1909",
name: "Morley-Minto Reforms 1909",
estimatedMinutes: 40,
difficulty: 4,
source :"Sonali Bansal: Constitutional Developments II"
},
{
id: "montague-chelmsford-reforms-1919",
name: "Montague-Chelmsford Reforms 1919",
estimatedMinutes: 45,
difficulty: 4,
source :"Sonali Bansal: Constitutional Developments II"
},
],
},
{
id: "khilafat-and-non-cooperation",
name: "Khilafat and Non Cooperation",
subtopics: [
{
id: "khilafat-movement-1919-22",
name: "Khilafat Movement (1919-22)",
estimatedMinutes: 35,
difficulty: 2,
source :"Sonali Bansal: Khilafat and NCM"
},
{
id: "non-cooperation-intro",
name: "Non-Cooperation Movement",
estimatedMinutes: 120,
difficulty: 2,
source :"Sonali Bansal: Khilafat and NCM"
},
{
id: "significance-of-non-cooperation-movement",
name: "Significance of Non-Cooperation Movement",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Khilafat and NCM"
},
],
},
{
id: "swarajists",
name: "Swarajists",
subtopics: [
{
id: "formation-of-swaraj-party",
name: "Formation of Swaraj party",
estimatedMinutes: 75,
difficulty: 2,
source :"Sonali Bansal: Swarajists and Constructive Works"
},
{
id: "swarajist-work-evaluation",
name: "Work and Evaluation of Swarajists",
estimatedMinutes: 60,
difficulty: 2,
},
],
},
{
id: "rise-of-communalism",
name: "Rise of communalism",
subtopics: [
{
id: "meaning-of-communalism",
name: "Meaning of Communalism",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Rise and Growth of Communalism upto WW2"
},
{
id: "factors-responsible-rise-growth-communalism",
name: "Factors Responsible for the Rise and Growth of Communalism in India",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Rise and Growth of Communalism upto WW2"
},
{
id: "growth-of-communalism-20th-century",
name: "Growth of Communalism in the 20th Century",
estimatedMinutes: 120,
difficulty: 3,
source :"Sonali Bansal: Rise and Growth of Communalism upto WW2"
},
],
},
{
id: "second-phase-of-revolutionary-movements",
name: "Second phase of revolutionary movements",
subtopics: [
{
id: "revolutionaries-northern-india",
name: "Revolutionaries in Northern India",
estimatedMinutes: 45,
difficulty: 2,
source :"Sonali Bansal: Second Phase of Revolutionary Movements"
},
{
id: "revolutionaries-bengal-phase2",
name: "Revolutionaries in Bengal",
estimatedMinutes: 35,
difficulty: 2,
source :"Sonali Bansal: Second Phase of Revolutionary Movements"
},
{
id: "rev-decline-and-significance-phase2",
name: "Decline and significance",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Second Phase of Revolutionary Movements"
},
],
},
{
id: "left-movements",
name: "Left Movements",
subtopics: [
{
id: "comminust-party",
name: "Formation of Communist Party",
estimatedMinutes: 50,
difficulty: 2,
source :"Sonali Bansal: Growth of the Left Movement in India"
},
{
id: "formation-of-congress-socialist-party-1934",
name: "Formation of the Congress Socialist Party (Bombay, October 1934)",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Growth of the Left Movement in India"
},
{
id: "minor-leftist-parties",
name: "Minor Leftist Parties",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Growth of the Left Movement in India"
},
{
id: "weaknesses-of-left-movement",
name: "Weaknesses of the Left Movement",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Growth of the Left Movement in India"
},
{
id: "congress-reaction-formation-csp",
name: "Congress Reaction to the Formation of Congress Socialist Party",
estimatedMinutes: 25,
difficulty: 3,
source :"Sonali Bansal: Growth of the Left Movement in India"
},
],
},
{
id: "growth-of-peasant-and-worker-movement",
name: "Growth of peasant and worker movement",
subtopics: [
{
id: "worker-movement",
name: "Worker Movements",
estimatedMinutes: 60,
difficulty: 2,
source :"Sonali Bansal: Growth of Peasant and Worker movement"
},
{
id: "peasant-movement",
name: "Peasant Movements",
estimatedMinutes: 90,
difficulty: 3,
source :"Sonali Bansal: Growth of Peasant and Worker movement"
},
],
},

{
id: "the-state-people-movement",
name: "The State People Movement",
subtopics: [
{
id: "british-relation-princely-states",
name: "British Relations with Princely States",
estimatedMinutes: 40,
difficulty: 2,
source :"Sonali Bansal: The State People Movement"
},
{
id: "princely-states-national-movement",
name: "Princely States and National Movement",
estimatedMinutes: 40,
difficulty: 2,
source :"Sonali Bansal: The State People Movement"
},
],
},

{
id: "simon-commission-topic",
name: "Simon Commission",
subtopics: [
{
id: "simon-commission-dates",
name: "Simon Commission (8 November 1927)",
estimatedMinutes: 35,
difficulty: 2,
source :"Sonali Bansal: Simon Commission"
},
{
id: "simon-boycott-movement",
name: "Simon Boycott Movement",
estimatedMinutes: 25,
difficulty: 2,
source :"Sonali Bansal: Simon Commission"
},
{
id: "delhi-proposals-1927",
name: "Delhi Proposals (December 1927)",
estimatedMinutes: 20,
difficulty: 3,
source :"Sonali Bansal: Simon Commission"
},
{
id: "all-parties-conference-nehru-report-jinnah-points",
name: "All Parties Conference, Nehru Report and Jinnah's Fourteen Points",
estimatedMinutes: 45,
difficulty: 4,
source :"Sonali Bansal: Simon Commission"
},
{
id: "delhi-manifesto",
name: "Delhi Manifesto",
estimatedMinutes: 15,
difficulty: 2,
source :"Sonali Bansal: Simon Commission"
},
{
id: "independence-pledge-1930",
name: "Independence Pledge (26 January 1930)",
estimatedMinutes: 15,
difficulty: 1,
source :"Sonali Bansal: Simon Commission"
},
{
id: "report-of-simon-commission-1930",
name: "Report of the Simon Commission (7th June 1930)",
estimatedMinutes: 20,
difficulty: 3,
source :"Sonali Bansal: Simon Commission"
},
],
},
{
id: "civil-disobedient-movement",
name: "Civil Disobedient Movement",
subtopics: [
{
id: "gandhiji-eleven-points",
name: "Gandhiji eleven points",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Civil Disobedience Movement"
},
{
id: "cdm",
name: "CDM",
estimatedMinutes: 70,
difficulty: 2,
source :"Sonali Bansal: Civil Disobedience Movement"
},
{
id: "first-rtc",
name: "First RTC",
estimatedMinutes: 50,
difficulty: 2,
source :"Sonali Bansal: Civil Disobedience Movement"
},
{
id: "second-rtc",
name: "Second RTC",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Civil Disobedience Movement"
},
{
id: "communal-award",
name: "Communa Award",
estimatedMinutes: 35,
difficulty: 4,
source :"Sonali Bansal: Civil Disobedience Movement"
},
{
id: "third-rtc",
name: "Third RTC",
estimatedMinutes: 15,
difficulty: 2,
source :"Sonali Bansal: Civil Disobedience Movement"
},
],
},
{
id: "constituional-developments-till-1935",
name: "Constituional developments till 1935",
subtopics: [
{
id: "act-of-1935-details",
name: "Act of 1935",
estimatedMinutes: 50,
difficulty: 4,
source :"Sonali Bansal: Constituional developments till 1935"
},
],
},
{
id: "election-of-1937",
name: "Election of 1937",
subtopics: [
{
id: "ministries-1937",
name: "ministries",
estimatedMinutes: 50,
difficulty: 3,
source :"Sonali Bansal: Elections of 1935 and Congress Ministry"
},
],
},
{
id: "quit-india-movement-topic",
name: "Quit India movement",
subtopics: [
{
id: "individual-satyagraha",
name: "Individual Satyagraha",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Quit India Movement"
},
{
id: "cripps-mission",
name: "Cripps mission",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Quit India Movement"
},
{
id: "qim-details",
name: "QIM",
estimatedMinutes: 45,
difficulty: 4,
source :"Sonali Bansal: Quit India Movement"
},
{
id: "rajaji-formula-desai-plan",
name: "Rajaji formula, Desai plan",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Quit India Movement"
},
],
},
{
id: "post-war-movements",
name: "Post war movements",
subtopics: [
{
id: "wavell-plan-and-shimla conference",
name: "Wavell plan and Shimla conference",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Post War National Movement"
},
{
id: "cabinet-missions",
name: "Cabinet Missions",
estimatedMinutes: 40,
difficulty: 4,
source :"Sonali Bansal: Post War National Movement"
},
{
id: "interim-government-details",
name: "Interim government",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Post War National Movement"
},
],
},
{
id: "freedom-topic",
name: "Freedom",
subtopics: [
{
id: "attlee-announcement",
name: "Attlee announcement",
estimatedMinutes: 20,
difficulty: 2,
source :"Sonali Bansal: Communalism Partition and Freedom"
},
{
id: "mountbatten-plan-details",
name: "Mountbatten Plan",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: Communalism Partition and Freedom"
},
{
id: "indian-independence-act-1947",
name: "Indian Independence Act 1947",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: Communalism Partition and Freedom"
},
],
},
{
id: "ina-and-rin",
name: "INA and RIN",
subtopics: [
{
id: "indian-national-army-details",
name: "Indian national army",
estimatedMinutes: 35,
difficulty: 3,
source :"Sonali Bansal: INA and RIN"
},
{
id: "royal-indian-navy-mutiny",
name: "Royal Indian Navy mutiny",
estimatedMinutes: 30,
difficulty: 3,
source :"Sonali Bansal: INA and RIN"
},
],
},
]
},
 {
     id: "post-independence",
    type: "GS",
    paper: "GS1",
    name: "Post Independence History",

    topics: [
  {
    id: "partition",
    name: "Partition",
    subtopics: [
      {
        id: "logic-and-reasoning-behind-partition",
        name: "Logic and Reasoning behind Partition",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Legacy of colonial rule and partition"
      },
      {
        id: "process-of-partition",
        name: "Process of partition",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Legacy of colonial rule and partition"
      },
      {
        id: "impact-of-partition",
        name: "Impact of partition",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Legacy of colonial rule and partition"
      },
    ],
  },
  {
    id: "integration-of-princely-states",
    name: "Integration of Princely States",
    subtopics: [
      {
        id: "lapse-of-paramountcy",
        name: "Lapse of paramountcy",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Integration of Princely States"
      },
      {
        id: "role-of-mountbatten-in-integration",
        name: "Role of mountbatten in integration",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Integration of Princely States"
      },
      {
        id: "sardar-patel-role",
        name: "Sardar Patel role",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Integration of Princely States"
      },
      {
        id: "process-of-integration",
        name: "Process of integration",
        estimatedMinutes: 75,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Integration of Princely States"
      },
    ],
  },
  {
    id: "integration-of-tribals",
    name: "Integration of tribals",
    subtopics: [
      {
        id: "planning-and-programmes-tribal",
        name: "Planning and Programmes",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Integration of Tribals"
      },
      {
        id: "tribal-development",
        name: "Tribal Development",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Integration of Tribals"
      },
      {
        id: "pandit-nehru-approach-and-measures-taken",
        name: "Pandit Nehru approach and measures taken",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Integration of Tribals"
      },
    ],
  },
  {
    id: "reorganization-of-states",
    name: "Reorganization of States",
    subtopics: [
      {
        id: "organisation-of-states-after-integration",
        name: "Organisation of states after integration",
        estimatedMinutes:50,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "outcome-of-linguistic-reorganisation",
        name: "outcome of linguistic reorganisation",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "challenges-created-by-state-reorganisation",
        name: "challenges created by State reorganisation",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "minority-languages",
        name: "Minority Languages",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "small-vs-big-size-states",
        name: "Small vs Big size States",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "issue-of-official-language",
        name: "Issue of official language",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "three-language-formula-nep-2020",
        name: "Three language formula NEP 2020",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "regionalism-growth",
        name: "Regionalism growth",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "nationalism-vs-regionalism",
        name: "Nationalism vs Regionalism",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
      {
        id: "federalism-and-regionalism",
        name: "Federalism and Regionalism",
        estimatedMinutes: 35,
        difficulty: 4,
        source :"ONLY IAS SAMPOORNA Post Independence: Reorganisation"
      },
    ],
  },
  {
    id: "achievements-post-independence",
    name: "Achievements Post independence",
    subtopics: [
      {
        id: "resettling-refugees-post-partition",
        name: "Resettling Refugees Post-Partition",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "making-an-electoral-democracy",
        name: "Making an Electoral Democracy",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "development-of-science-and-technology",
        name: "Development of Science and Technology",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "development-in-the-field-of-education",
        name: "Development in the Field of Education",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "dams-and-steel-plants-new-temples-of-india",
        name: "Dams and Steel Plants: New Temples of India",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "creating-democratic-institutions",
        name: "Creating Democratic Institutions",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "social-change-post-independence",
        name: "Social Change",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "community-development-programmes",
        name: "Community Development Programmes",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "socialism-and-communalism",
        name: "Socialism and Communalism",
        estimatedMinutes: 35,
        difficulty: 4,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "nam",
        name: "NAM",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
      {
        id: "relationship-with-neighbours-and-superpowers",
        name: "Relationship with Neighbours and superpowers",
        estimatedMinutes: 50,
        difficulty: 4,
        source :"ONLY IAS SAMPOORNA Post Independence: Achievements after Independence"
      },
    ],
  },
  {
    id: "shastri-jee-to-indira-gandhi",
    name: "Shastri Jee to Indira Gandhi",
    subtopics: [
      {
        id: "the-shastris-years",
        name: "The Shastris years",
        estimatedMinutes: 30,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: From Shashtri to Indira"
      },
      {
        id: "early-years-of-indira-gandhi",
        name: "Early years of Indira Gandhi",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: From Shashtri to Indira"
      },
    ],
  },
  {
    id: "emergence-of-multiparty-system",
    name: "Emergence of multiparty system",
    subtopics: [
      {
        id: "congress-system-1947-1967",
        name: "Congress System 1947-1967",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: One Party System End"
      },
      {
        id: "decline-of-congress",
        name: "Decline of congress",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: One Party System End"
      },
      {
        id: "opposition-parties",
        name: "Opposition parties",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: One Party System End"
      },
      {
        id: "market-polity-system",
        name: "Market polity system",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: One Party System End"
      },
      {
        id: "multiparty-system-details",
        name: "Multiparty system",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: One Party System End"
      },
      {
        id: "loose-bi-polar-alliance-system",
        name: "Loose Bi-polar Alliance system",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: One Party System End"
      },
    ],
  },
  {
    id: "emergence-of-indira-gandhi",
    name: "Emergence of Indira Gandhi",
    subtopics: [
      {
        id: "election-of-1967",
        name: "Election of 1967",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Emergence of Indira Gandhi"
      },
      {
        id: "congress-dominance",
        name: "Congress dominance",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Emergence of Indira Gandhi"
      },
      {
        id: "bangladesh-creation",
        name: "Bangladesh creation",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Emergence of Indira Gandhi"
      },
      {
        id: "pokhran-i",
        name: "Pokhran I",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Emergence of Indira Gandhi"
      },
    ],
  },
  {
    id: "jp-movement-and-era-of-emergency",
    name: "JP Movement & Era of emergency",
    subtopics: [
      {
        id: "early-protest-and-start-of-jp-movement",
        name: "Early protest and start of JP movement",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Emergency of Indira Gandhi"
      },
      {
        id: "era-of-emergency",
        name: "Era of emergency",
        estimatedMinutes: 45,
        difficulty: 4,
        source :"ONLY IAS SAMPOORNA Post Independence: Emergency of Indira Gandhi"
      },
      {
        id: "janta-dal-government",
        name: "Janta Dal government",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Emergency of Indira Gandhi"
      },
    ],
  },
  {
    id: "revival-of-congress-and-punjab-crisis",
    name: "Revival of Congress and Punjab Crisis",
    subtopics: [
      {
        id: "punjab-crisis",
        name: "Punjab crisis",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Revival of Congress"
      },
      {
        id: "operation-bluestar",
        name: "Operation bluestar",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Revival of Congress"
      },
    ],
  },
  {
    id: "era-of-rajiv-gandhi",
    name: "Era of Rajiv Gandhi",
    subtopics: [
      {
        id: "early-years-of-rajiv-gandhi",
        name: "Early years of Rajiv Gandhi",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Era of Rajiv Gandhi"
      },
      {
        id: "bhopal-gas-tragedy",
        name: "Bhopal Gas Tragedy",
        estimatedMinutes: 15,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Era of Rajiv Gandhi"
      },
      {
        id: "foreign-policy-of-rajiv-gandhi",
        name: "Foreign Policy of Rajiv Gandhi",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Era of Rajiv Gandhi"
      },
      {
        id: "assam-crisis-and-its-resolution",
        name: "Assam Crisis and its Resolution",
        estimatedMinutes: 30,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Era of Rajiv Gandhi"
      },
    ],
  },
  {
    id: "politics-after-rajiv-gandhi",
    name: "Politics after Rajiv Gandhi",
    subtopics: [
      {
        id: "the-national-front-government",
        name: "The National Front Government",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Era after Rajiv Gandhi"
      },
      {
        id: "united-front-government",
        name: "United Front Government",
        estimatedMinutes: 20,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Era after Rajiv Gandhi"
      },
      {
        id: "atal-bihari-government",
        name: "Atal Bihari Government",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Era after Rajiv Gandhi"
      },
    ],
  },
  {
    id: "land-reforms-and-cooperatives",
    name: "Land Reforms and Cooperatives",
    subtopics: [
      {
        id: "phases-of-land-reform",
        name: "Phases of land reform",
        estimatedMinutes: 45,
        difficulty: 4,
        source :"ONLY IAS SAMPOORNA Post Independence: Land Reforms"
      },
      {
        id: "bhoodan-movement",
        name: "Bhoodan movement",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Land Reforms"
      },
      {
        id: "cooperativity and-community",
        name: "Cooperativity and Community",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Land Reforms"
      },
    ],
  },
  {
    id: "green-revolution",
    name: "Green Revolution",
    subtopics: [
      {
        id: "start-of-green-revolution",
        name: "Start of Green Revolution",
        estimatedMinutes: 25,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Green Revolution"
      },
      {
        id: "phases-of-green-revolution",
        name: "Phases of Green Revolution",
        estimatedMinutes: 35,
        difficulty: 3,
        source :"ONLY IAS SAMPOORNA Post Independence: Green Revolution"
      },
    ],
  },
  {
    id: "indian-economy-since-independence",
    name: "Indian Economy since Independence",
    subtopics: [
      {
        id: "planning-commission",
        name: "Planning Commission",
        estimatedMinutes: 20,
        difficulty: 2,
        source :"ONLY IAS SAMPOORNA Post Independence: Economy since Independence"
      },
      {
        id: "five-years-plan",
        name: "Five Years Plan",
        estimatedMinutes: 45,
        difficulty: 4,
         source :"ONLY IAS SAMPOORNA Post Independence: Economy since Independence"
      },
      {
        id: "lpg-reform",
        name: "LPG reform",
        estimatedMinutes: 45,
        difficulty: 4,
        source :"ONLY IAS SAMPOORNA Post Independence: Economy since Independence"
      },
    ],
  },
  {
    id: "india-during-2000-to-2014",
    name: "India during 2000 to 2014",
    subtopics: [
      {
        id: "kandahar-incident",
        name: "Kandahar incident",
        estimatedMinutes: 15,
        difficulty: 2,
         source :"ONLY IAS SAMPOORNA Post Independence: India during 2000 to 2014"
      },
      {
        id: "agra-summit",
        name: "Agra summit",
        estimatedMinutes: 15,
        difficulty: 2,
         source :"ONLY IAS SAMPOORNA Post Independence: India during 2000 to 2014"
      },
      {
        id: "godhra-riots",
        name: "Godhra Riots",
        estimatedMinutes: 25,
        difficulty: 3,
         source :"ONLY IAS SAMPOORNA Post Independence: India during 2000 to 2014"
      },
      {
        id: "upa-government",
        name: "UPA government",
        estimatedMinutes: 35,
        difficulty: 3,
         source :"ONLY IAS SAMPOORNA Post Independence: India during 2000 to 2014"
      },
    ],
  },
]
},
{
     id: "world-history",
    type: "GS",
    paper: "GS1",
    name: "World History",

    topics: [
  {
    id: "feudalism-church-change",
    name: "Feudalism, Church and Changes",
    subtopics: [
      {
        id: "feudalism-church-change-1",
        name: "Feudalism, Church and Changes",
        estimatedMinutes: 80,
        difficulty: 2,
         source :"Vision IAS Notes"
      },
    ],
  },
  {
    id: "revolutions",
    name: "Revolutions",
    subtopics: [
      {
        id: "american-revolution",
        name: "American Revolution",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"Vision IAS Notes"
      },
      {
        id: "french-revolution",
        name: "French Revolution",
        estimatedMinutes: 40,
        difficulty: 2,
        source :"Vision IAS Notes"
      },
    ],
  },
  {
    id: "nationalism-ir-colonialism",
    name: "Nationalism, Industrial Revolution and Colonialism",
    subtopics: [
      {
        id: "nationalism",
        name: "Nationalism",
        estimatedMinutes: 15,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "unification-italy-germany",
        name: "Unification of Italy and Germany",
        estimatedMinutes: 25,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "industrial-revolution",
        name: "Industrial Revolution",
        estimatedMinutes: 45,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "colonialism-imperialism",
        name: "Colonialism and Imperialism",
        estimatedMinutes: 250,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
    ],
  },
  
  {
    id: "world-war-i",
    name: "World War I",
    subtopics: [
      {
        id: "events-that-shaped-ww-i-part-i",
        name: "Preceding events and WW1",
        estimatedMinutes: 70,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "impact-league-nations",
        name: "Impact of WW1 and League of Nations",
        estimatedMinutes: 80,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "events-after-the-world-war-i",
        name: "Events after the World War I",
        estimatedMinutes: 150,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
    ],
  },
  
  {
    id: "world-war-ii",
    name: "World War II",
    subtopics: [
      {
        id: "ww2-impact",
        name: "WW2 and Impact",
        estimatedMinutes: 100,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "socio-economic-systems",
        name: "Different socio-economic systems",
        estimatedMinutes: 300,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "italy-fascist",
        name: "Italy Rise of Mussolini",
        estimatedMinutes: 45,
        difficulty: 2,
        source :"Vision IAS Notes"
      },
      {
        id: "germany-hitler",
        name: "Germany and Hitler",
        estimatedMinutes: 60,
        difficulty: 4,
        source :"Vision IAS Notes"
      },
      {
        id: "nazism-fascism",
        name: "Nazism and Fascism",
        estimatedMinutes: 60,
        difficulty: 4,
        source :"Vision IAS Notes"
      },
    ],
  },
  {
    id: "cold-war-top",
    name: "Cold War",
    subtopics: [
      {
        id: "cold-war-st",
        name: "Cold War",
        estimatedMinutes: 300,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      
    ],
  },
  {
    id: "europe-1945",
    name: "Europe after 1945 and Decolonisation",
    subtopics: [
      {
        id: "europe-decolonisation",
        name: "Europe after 1945 and Decolonisation",
        estimatedMinutes: 360,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
      {
        id: "south-africa-apartheid",
        name: "South Africa Apartheid",
        estimatedMinutes: 100,
        difficulty: 3,
        source :"Vision IAS Notes"
      },
    ],
  },
]
},
{
     id: "art-culture",
    type: "GS",
    paper: "GS1",
    name: "Art & Culture",

   topics: [
  {
    id: "prehistoric-rock-painting",
    name: "Prehistoric Rock Painting",
    subtopics: [
      {
        id: "paleolithic-paint",
        name: "Paleolithic Painting",
        estimatedMinutes: 30,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
      {
        id: "mesolithic-chalcolithic-paint",
        name: "Mesolithic & Chalcolithic Painting",
        estimatedMinutes: 40,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
    ],
  },
  {
    id: "ivc-art",
    name: "Art of IVC",
    subtopics: [
      {
        id: "statues-bronze-terracotta",
        name: "Statues and Bronze Casting and Terracotta",
        estimatedMinutes: 30,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
      {
        id: "seals-pottery",
        name: "Seals and Pottery",
        estimatedMinutes: 50,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
    ],
  },
  {
    id: "mauryan-art",
    name: "Art of Mauryan Period",
    subtopics: [
      {
        id: "pillar-sculptures-rockcut",
        name: "Pillars, Sculptures and Rock Cut",
        estimatedMinutes: 90,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
    ],
  },
  {
    id: "post-mauryan-art",
    name: "Art of Post Mauryan Period",
    subtopics: [
      {
        id: "stupa-others",
        name: "Post Mauryan Architecture",
        estimatedMinutes: 300,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
    ],
  },
  {
    id: "later-murals",
    name: "Later Murals",
    subtopics: [
      {
        id: "murals-later",
        name: "Later Murals",
        estimatedMinutes: 80,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
    ],
  },
  {
    id: "temple-architecture-scultpture",
    name: "Temple Architecture and Sculpture",
    subtopics: [
      {
        id: "ta-s",
        name: "Temple and Sculptures",
        estimatedMinutes: 350,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
    ],
  },
  {
    id: "bronze-scultpture",
    name: "Bronze Sculpture",
    subtopics: [
      {
        id: "bronze-scult",
        name: "Bronze Sculpture",
        estimatedMinutes: 130,
        difficulty: 3,
         source :"NCERT Art Culture + Only IAS Sampoorna"
      },
    ],
  },
  {
    id: "indo-islamic",
    name: "Indo Islamic Architecture",
    subtopics: [
      {
        id: "ind-isl-arch",
        name: "Indo Islamic Architecture",
        estimatedMinutes: 80,
        difficulty: 3,
         source :"NCERT Art Culture"
      },
    ],
  },
  {
    id: "coins-in-india",
    name: "Coins in India",
    subtopics: [
      {
        id: "coins-ancient",
        name: "Coins in Ancient times",
        estimatedMinutes: 20,
        difficulty: 1,
        source :"Only IAS Sampoorna Art"
      },
      {
        id: "coins-medieval",
        name: "Coins in Medieval times",
        estimatedMinutes: 25,
        difficulty: 2,
         source :"Only IAS Sampoorna Art"
      },
    ],
  },
  {
    id: "pottery-tradition-in-india",
    name: "Pottery Tradition in India",
    subtopics: [
      {
        id: "types-of-pottery",
        name: "Types of pottery",
        estimatedMinutes: 30,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "time-period-of-pottery-and-downfall",
        name: "Time period of pottery and downfall",
        estimatedMinutes: 15,
        difficulty: 2,
         source :"Only IAS Sampoorna Art"
      },
    ],
  },
  {
    id: "paintings-in-india",
    name: "Paintings in India",
    subtopics: [
      {
        id: "manuscript",
        name: "Manuscript Painting Tradition",
        estimatedMinutes: 80,
        difficulty: 2,
        source :"NCERT Art Culture II"
      },
      {
        id: "rajasthani-school-paintings",
        name: "Rajasthani school",
        estimatedMinutes: 90,
        difficulty: 3,
        source :"NCERT Art Culture II"
      },
      {
        id: "mugal-school-paintings",
        name: "Mughal school",
        estimatedMinutes: 90,
        difficulty: 3,
        source :"NCERT Art Culture II"
      },
      {
        id: "deccan-school-paintings",
        name: "Deccani school",
        estimatedMinutes: 90,
        difficulty: 3,
        source :"NCERT Art Culture II"
      },
      {
        id: "pahari-school-paintings",
        name: "Pahari School",
        estimatedMinutes: 90,
        difficulty: 3,
        source :"NCERT Art Culture II"
      },
      {
        id: "modern-period-paintings",
        name: "Modern Period",
        estimatedMinutes: 90,
        difficulty: 2,
        source :"NCERT Art Culture II"
      },
    ],
  },
  {
    id: "literature-topic",
    name: "Literature",
    subtopics: [
      {
        id: "literature-basics",
        name: "Basics",
        estimatedMinutes: 10,
        difficulty: 1,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "vedic-literature",
        name: "Vedic Literature",
        estimatedMinutes: 35,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "pali-prakrit-literature",
        name: "Literature in Pali and Prakrit ",
        estimatedMinutes: 35,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "classical-sanskrit-literatures",
        name: "Classical Sanskrit Literatures",
        estimatedMinutes: 35,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "buddhist-literatures",
        name: "Buddhist Literatures",
        estimatedMinutes: 30,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "jain-literature",
        name: "Jain Literature",
        estimatedMinutes: 25,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "dravidian-literature",
        name: "Dravidian Literature",
        estimatedMinutes: 35,
        difficulty: 4,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "medieval-literature",
        name: "Medieval Literature",
        estimatedMinutes: 35,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "modern-literature",
        name: "Modern Literature",
        estimatedMinutes: 25,
        difficulty: 2,
         source :"Only IAS Sampoorna Art"
      },
    ],
  },
  {
    id: "philosophy-topic",
    name: "Philosophy",
    subtopics: [
      {
        id: "orthodox-school",
        name: "Orthodox school",
        estimatedMinutes: 45,
        difficulty: 4,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "heterodox-school",
        name: "Heterodox school",
        estimatedMinutes: 30,
        difficulty: 3,
         source :"Only IAS Sampoorna Art"
      },
    ],
  },
  {
    id: "awards-and-honors",
    name: "Awards & Honors",
    subtopics: [
      {
        id: "bharat-ratna",
        name: "Bharat Ratna",
        estimatedMinutes: 15,
        difficulty: 1,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "padma-awards",
        name: "Padma awards",
        estimatedMinutes: 15,
        difficulty: 1,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "sahitya-akademy-award",
        name: "Sahitya Akademy award",
        estimatedMinutes: 15,
        difficulty: 1,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "others-award",
        name: "Others",
        estimatedMinutes: 15,
        difficulty: 1,
         source :"Only IAS Sampoorna Art"
      },
    ],
  },
  {
    id: "music-and-dance",
    name: "Music and Dance",
    subtopics: [
      {
        id: "classical-music",
        name: "Classical Music",
        estimatedMinutes: 80,
        difficulty: 4,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "classical-dance",
        name: "Classical Dance",
        estimatedMinutes: 120,
        difficulty: 4,
         source :"Only IAS Sampoorna Art"
      },
      {
        id: "famous-personalities",
        name: "Famous Personalities",
        estimatedMinutes: 1,
        difficulty: 4,
         source :"Only IAS Sampoorna Art"
      },
    ],
  },
  {
    id: "others-art",
    name: "Others",
    subtopics: [
      {
        id: "other-subtopic",
        name: "Others",
        estimatedMinutes: 2,
        difficulty: 1,
      },
    ],
  },
]
},
{
     id: "physical-geography",
    type: "GS",
    paper: "GS1",
    name: "Physical Geography",

    topics: [
  {
    id: "interior-of-the-earth",
    name: "Interior of the Earth",
    subtopics: [
      {
        id: "direct-and-indirect-sources",
        name: "Direct and Indirect Sources",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "seismic-waves-and-its-types",
        name: "Seismic Waves and its types",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "internal-structure-of-earth",
        name: "Internal Structure of Earth",
        estimatedMinutes: 30,
        difficulty: 2,
      },
    ],
  },
  {
    id: "earths-magnetic-field",
    name: "Earths Magnetic Field",
    subtopics: [
      {
        id: "dynamo-theory",
        name: "Dynamo theory",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "magnetic-poles-and-reversal",
        name: "Magnetic Poles and Reversal",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "compass-and-geomagnetic-poles",
        name: "Compass and Geomagnetic Poles",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "auroras-and-geomagnetic-storms",
        name: "Auroras and Geomagnetic Storms",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "van-allen-belt",
        name: "Van Allen Belt",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "geomorphic-movements",
    name: "Geomorphic Movements",
    subtopics: [
      {
        id: "endogenic-movements-force",
        name: "Endogenic movements force",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "endogenic-movements-classification",
        name: "Endogenic movements classification",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "diastrophism",
        name: "Diastrophism",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "catastrophism",
        name: "Catastrophism",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "exogenic-movements-force",
        name: "Exogenic movements force",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "denudation",
        name: "Denudation",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "weathering",
        name: "Weathering",
        estimatedMinutes: 35,
        difficulty: 3,
      },
    ],
  },
  {
    id: "tectonics",
    name: "Tectonics",
    subtopics: [
      {
        id: "tectonics-concepts",
        name: "Concepts",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "continental-drift-theory",
        name: "Continental Drift Theory",
        estimatedMinutes: 35,
        difficulty: 2,
      },
      {
        id: "seafloor-spreading",
        name: "Seafloor Spreading",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "plate-tectonics-theory",
        name: "Plate Tectonics theory",
        estimatedMinutes: 45,
        difficulty: 4,
      },
      {
        id: "comparison-between-cdt-sf-pt",
        name: "Comparison between CDT, SF, PT",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "convergent-boundary",
    name: "Convergent Boundary",
    subtopics: [
      {
        id: "ocean-ocean-convergence",
        name: "Ocean-Ocean convergence",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "formation-of-different-island-arc",
        name: "Formation of different Island Arc",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "continent-ocean-convergence",
        name: "Continent-Ocean Convergence",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "formation-of-cordilleras",
        name: "Formation of Cordilleras",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "rockies-and-andes-formation",
        name: "Rockies and Andes formation",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "continent-continent-convergence",
        name: "Continent-Continent Convergence",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "himalayas-alps-urals-formation",
        name: "Himalayas, Alps, Urals formation",
        estimatedMinutes: 35,
        difficulty: 4,
      },
      {
        id: "new-guinea-convergence",
        name: "New Guinea Convergence",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
  {
    id: "divergent-boundary",
    name: "Divergent Boundary",
    subtopics: [
      {
        id: "rift-valleys",
        name: "Rift valleys",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "great-african-rift-valley",
        name: "Great African Rift Valley",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "mountains",
    name: "Mountains",
    subtopics: [
      {
        id: "fold-mountains",
        name: "Fold mountains",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "block-mountains",
        name: "Block mountains",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "volcanic-mountains",
        name: "Volcanic mountains",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "famous-peaks",
        name: "Famous Peaks",
        estimatedMinutes: 30,
        difficulty: 2,
      },
    ],
  },
  {
    id: "volcanism",
    name: "Volcanism",
    subtopics: [
      {
        id: "lava-types",
        name: "Lava types",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "extrusive-landforms",
        name: "Extrusive landforms",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "intrusive-landforms",
        name: "Intrusive Landforms",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "volcanism-types",
        name: "Volcanism types",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "hotspot-volcano",
        name: "Hotspot volcano",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "geysers-and-hot-spring",
        name: "Geysers and Hot Spring",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "volcanism-distribution",
        name: "Distribution",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "rocks",
    name: "Rocks",
    subtopics: [
      {
        id: "types-of-rock",
        name: "Types of Rock",
        estimatedMinutes: 30,
        difficulty: 2,
      },
      {
        id: "rock-cycle",
        name: "Rock Cycle",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "tsunami-ch",
    name: "Tsunami",
    subtopics: [
      {
        id: "tsunami-mechanism",
        name: "Mechanism",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "warning-system-in-india",
        name: "Warning System in India",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "erosions",
    name: "Erosions",
    subtopics: [
      {
        id: "water-erosion",
        name: "Water Erosion",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "landslides-ero",
        name: "Landslides",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "glacial-erosion",
        name: "Glacial Erosion",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "wind-erosion",
        name: "Wind erosion",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "fluvial-landforms",
    name: "Fluvial Landforms",
    subtopics: [
      {
        id: "fluvial-erosional-landforms",
        name: "Erosional landforms",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "fluvial-depositional-landforms",
        name: "Depositional landforms",
        estimatedMinutes: 35,
        difficulty: 3,
      },
    ],
  },
  {
    id: "karst-landforms",
    name: "Karst Landforms",
    subtopics: [
      {
        id: "karst-erosional-landforms",
        name: "Erosional landforms",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "karst-depositional-landforms",
        name: "Depositional landforms",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "marine-landforms",
    name: "Marine Landforms",
    subtopics: [
      {
        id: "marine-erosional-landforms",
        name: "Erosional landforms",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "marine-depositional-landforms",
        name: "Depositional landforms",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "glacial-landforms",
    name: "Glacial Landforms",
    subtopics: [
      {
        id: "glacial-erosional-landforms",
        name: "Erosional landforms",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "glacial-depositional-landforms",
        name: "Depositional landforms",
        estimatedMinutes: 30,
        difficulty: 3,
      },
    ],
  },
  {
    id: "arid-landforms",
    name: "Arid Landforms",
    subtopics: [
      {
        id: "arid-erosional-landforms",
        name: "Erosional landforms",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "arid-depositional-landforms",
        name: "Depositional landforms",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "motion-of-earth",
    name: "Motion of Earth",
    subtopics: [
      {
        id: "latitudes",
        name: "Latitudes",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "longitudes",
        name: "Longitudes",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "rotation",
        name: "Rotation",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "revolution",
        name: "Revolution",
        estimatedMinutes: 25,
        difficulty: 2,
      },
    ],
  },
  {
    id: "atmosphere",
    name: "Atmosphere",
    subtopics: [
      {
        id: "atmosphere-evolution",
        name: "Evolution",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "atmosphere-composition",
        name: "Composition",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "atmosphere-structure-and-importance",
        name: "Structure and Importance",
        estimatedMinutes: 35,
        difficulty: 3,
      },
    ],
  },
  {
    id: "temperature-distribution-on-earth",
    name: "Temperature Distribution on Earth",
    subtopics: [
      {
        id: "transfer-of-heat",
        name: "Transfer of heat",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "factors-affecting-temperature-distribution",
        name: "Factors affecting distribution",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "mean-annual-temperature",
        name: "Mean Annual Temperature",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "heat-balance",
        name: "Heat Balance",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "heat-budget",
        name: "Heat Budget",
        estimatedMinutes: 40,
        difficulty: 4,
      },
      {
        id: "lapse-rate-and-adiabatic-lapse-rate",
        name: "Lapse Rate and Adiabatic Lapse rate",
        estimatedMinutes: 35,
        difficulty: 4,
      },
      {
        id: "temperature-inversion",
        name: "Temperature inversion",
        estimatedMinutes: 30,
        difficulty: 3,
      },
    ],
  },
  {
    id: "pressure-and-wind-systems",
    name: "Pressure and Wind Systems",
    subtopics: [
      {
        id: "pressure-cells-intro",
        name: "Pressure Cells",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "isobars",
        name: "Isobars",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "factors-affecting-wind-movements",
        name: "Factors affecting wind movements",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "pressure-belts",
        name: "Pressure Belts",
        estimatedMinutes: 35,
        difficulty: 4,
      },
      {
        id: "cells-in-pressure-system",
        name: "Cells in pressure system",
        estimatedMinutes: 30,
        difficulty: 4,
      },
      {
        id: "primary-and-secondary-winds",
        name: "Primary and Secondary Winds",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "local-winds",
        name: "Local Winds",
        estimatedMinutes: 35,
        difficulty: 2,
      },
    ],
  },
  {
    id: "water-cycle",
    name: "Water Cycle",
    subtopics: [
      {
        id: "humidity",
        name: "Humidity",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "evaporation",
        name: "Evaporation",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "condensation-and-its-forms",
        name: "Condensation and its forms",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "cloud-and-types",
        name: "Cloud and types",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "precipitation-and-its-types",
        name: "Precipitation and its types",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "thunderstorm",
    name: "Thunderstorm",
    subtopics: [
      {
        id: "thunderstorm-stages",
        name: "Stages",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "thunderstorm-types",
        name: "Types",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "tornado",
        name: "Tornado",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "lightning",
        name: "Lightning",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "hailstorm",
        name: "Hailstorm",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "tropical-cyclone",
    name: "Tropical Cyclone",
    subtopics: [
      {
        id: "tropical-cyclone-conditions",
        name: "Conditions",
        estimatedMinutes: 30,
        difficulty: 4,
      },
      {
        id: "development-of-cyclone",
        name: "Development of cyclone",
        estimatedMinutes: 40,
        difficulty: 4,
      },
      {
        id: "path-of-cyclone",
        name: "Path of cyclone",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "damages-by-tropical-cyclone",
        name: "Damages by tropical cyclone",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "naming-of-cyclone",
        name: "Naming of cyclone",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "warning-of-cyclone",
        name: "Warning of cyclone",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "jet-stream",
    name: "Jet Stream",
    subtopics: [
      {
        id: "geostrophic-winds",
        name: "Geostrophic winds",
        estimatedMinutes: 25,
        difficulty: 4,
      },
      {
        id: "permanent-jet-streams",
        name: "Permanent Jet Streams",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "temporary-jet-streams",
        name: "Temporary Jet streams",
        estimatedMinutes: 25,
        difficulty: 4,
      },
      {
        id: "influence-of-jet-streams",
        name: "Influence of Jet streams",
        estimatedMinutes: 30,
        difficulty: 4,
      },
    ],
  },
  {
    id: "temperate-cyclones",
    name: "Temperate Cyclones",
    subtopics: [
      {
        id: "air-masses",
        name: "Air masses",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "front-and-its-types",
        name: "Front and its types",
        estimatedMinutes: 35,
        difficulty: 4,
      },
      {
        id: "origin-and-development-of-temperate-cyclones",
        name: "Origin and development of temperate cyclones",
        estimatedMinutes: 40,
        difficulty: 4,
      },
      {
        id: "polar-vortex",
        name: "Polar Vortex",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "el-nino",
    name: "El Nino",
    subtopics: [
      {
        id: "walker-cell",
        name: "Walker Cell",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "enso",
        name: "ENSO",
        estimatedMinutes: 40,
        difficulty: 4,
      },
      {
        id: "iod",
        name: "IOD",
        estimatedMinutes: 35,
        difficulty: 4,
      },
      {
        id: "modoki",
        name: "Modoki",
        estimatedMinutes: 25,
        difficulty: 4,
      },
      {
        id: "la-nina",
        name: "La Nina",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "tropical-humid-climates",
    name: "Tropical Humid Climates",
    subtopics: [
      {
        id: "tropical-wet",
        name: "Tropical Wet",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "tropical-monsoon",
        name: "Tropical Monsoon",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "savanna",
        name: "Savanna",
        estimatedMinutes: 25,
        difficulty: 2,
      },
    ],
  },
  {
    id: "dry-climate",
    name: "Dry Climate",
    subtopics: [
      {
        id: "hot-desert",
        name: "Hot Desert",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "mid-latitude",
        name: "Mid-Latitude",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "steppe",
        name: "Steppe",
        estimatedMinutes: 25,
        difficulty: 2,
      },
    ],
  },
  {
    id: "warm-temperature",
    name: "Warm Temperature",
    subtopics: [
      {
        id: "mediterranean",
        name: "Mediterranean",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "warm-temperate-eastern-margin",
        name: "Warm temperate Eastern Margin",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "british-type",
        name: "British Type",
        estimatedMinutes: 25,
        difficulty: 2,
      },
    ],
  },
  {
    id: "cold-snow",
    name: "Cold Snow",
    subtopics: [
      {
        id: "taiga",
        name: "Taiga",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "laurentian",
        name: "Laurentian",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "cold-climates",
    name: "Cold Climates",
    subtopics: [
      {
        id: "tundra-climate",
        name: "Tundra climate",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "ocean-reliefs",
    name: "Ocean Reliefs",
    subtopics: [
      {
        id: "ocean-major-reliefs",
        name: "Major reliefs",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "ocean-minor-reliefs",
        name: "Minor Reliefs",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "major-oceans-and-seas",
    name: "Major Oceans and Seas",
    subtopics: [
      {
        id: "oceans-by-size",
        name: "Oceans by size",
        estimatedMinutes: 10,
        difficulty: 1,
      },
      {
        id: "pacific-ocean",
        name: "Pacific Ocean",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "atlantic-ocean",
        name: "Atlantic Ocean",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "indian-ocean",
        name: "Indian Ocean",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "marginal-seas",
        name: "Marginal Seas",
        estimatedMinutes: 30,
        difficulty: 2,
      },
    ],
  },
  {
    id: "currents",
    name: "Currents",
    subtopics: [
      {
        id: "currents-pacific-ocean",
        name: "Pacific ocean",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "currents-atlantic-ocean",
        name: "Atlantic Ocean",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "currents-indian-ocean",
        name: "Indian Ocean",
        estimatedMinutes: 35,
        difficulty: 4,
      },
    ],
  },
  {
    id: "tides",
    name: "Tides",
    subtopics: [
      {
        id: "tides-bulges",
        name: "Bulges",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "tides-types",
        name: "Types",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "tidal-bores",
        name: "Tidal Bores",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
  {
    id: "temperature-distribution-of-oceans",
    name: "Temperature distribution of Oceans",
    subtopics: [
      {
        id: "ocean-source-of-heat",
        name: "Source of heat",
        estimatedMinutes: 10,
        difficulty: 1,
      },
      {
        id: "ocean-temp-factors",
        name: "Factors",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "ocean-vertical-distribution",
        name: "Vertical distribution",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "ocean-horizontal-distribution",
        name: "Horiizontal distribution",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "ocean-salinity",
    name: "Ocean Salinity",
    subtopics: [
      {
        id: "salinity-factors",
        name: "Factors",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "salinity-vertical-variation",
        name: "Vertical Variation",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
]
},
{
     id: "indian-geography",
    type: "GS",
    paper: "GS1",
    name: "Indian Geography",

    topics: [
  {
    id: "india-as-a-unit",
    name: "India as a unit",
    subtopics: [
      {
        id: "indias-frontier",
        name: "Indias frontier",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "major-physical-divisions-of-india",
        name: "Major Physical Divisions of India",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "rock-system",
    name: "Rock System",
    subtopics: [
      {
        id: "archaen-system",
        name: "Archaen system",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "dharwar-system",
        name: "Dharwar system",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "purana-system",
        name: "Purana System",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "dravidian-system",
        name: "Dravidian System",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "gondwana-system",
        name: "Gondwana System",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "jurrasic-system",
        name: "Jurrasic system",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "deccan-trap",
        name: "Deccan trap",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "tertiary-system",
        name: "Tertiary system",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "himalayan-ranges",
    name: "Himlayan Ranges",
    subtopics: [
      {
        id: "shiwaliks",
        name: "Shiwaliks",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "lesser-himalayas",
        name: "Lesser Himalayas",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "the-greater-himalayas",
        name: "The Greater Himalayas",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "trans-himalayas",
        name: "Trans Himalayas",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "purvanchal",
        name: "Purvanchal",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "himalayan-passes-and-valleys",
    name: "Himalayan Passes & Valleys",
    subtopics: [
      {
        id: "passes-in-greater-himalays",
        name: "Passes in Greater Himalays",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "valleys",
        name: "Valleys",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "glaciers",
        name: "Glaciers",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "indo-gangetic-brahmaputra-plain",
    name: "Indo-Gangetic-Brahmaputra plain",
    subtopics: [
      {
        id: "plain-formation",
        name: "Formation",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "plain-features",
        name: "Features",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "plain-divisions",
        name: "Divisions",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "plain-significance",
        name: "Significance",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "peninsular-plateau",
    name: "Peninsular Plateau",
    subtopics: [
      {
        id: "marwar-plateau",
        name: "Marwar Plateau",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "central-highland",
        name: "Central Highland",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "bundelkhand-and-baghelkhand",
        name: "Bundelkhand and Baghelkhand",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "malwa-and-chotanagpur",
        name: "Malwa and chotanagpur",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "meghalaya-and-deccan",
        name: "Meghalaya and Deccan",
        estimatedMinutes: 30,
        difficulty: 3,
      },
    ],
  },
  {
    id: "hill-ranges",
    name: "Hill Ranges",
    subtopics: [
      {
        id: "aravali",
        name: "Aravali",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "vindhyan",
        name: "Vindhyan",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "satpura",
        name: "Satpura",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "western-ghats",
        name: "Western Ghats",
        estimatedMinutes: 40,
        difficulty: 4,
      },
      {
        id: "eastern-ghats",
        name: "Eastern ghats",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "hill-ranges-significance",
        name: "Significance",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "coastlines-of-india",
    name: "Coastlines of India",
    subtopics: [
      {
        id: "east-coast",
        name: "East coast",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "west-coast",
        name: "West Coast",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "emergence-and-sumergence-coastlines",
        name: "Emergence and Sumergence coastlines",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "coastlines-significance",
        name: "Significance",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "indian-islands",
    name: "Indian Islands",
    subtopics: [
      {
        id: "andaman-and-nicobar",
        name: "Andaman and Nicobar",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "lakshadweep",
        name: "Lakshadweep",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "new-moore-island",
        name: "New moore Island",
        estimatedMinutes: 10,
        difficulty: 2,
      },
    ],
  },
  {
    id: "drainage-systems",
    name: "Drainage Systems",
    subtopics: [
      {
        id: "drainage-patterns",
        name: "Patterns",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "major-system-of-india",
        name: "Major system of India",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "himalayan-river-system",
    name: "Himalayan River System",
    subtopics: [
      {
        id: "indus-system",
        name: "Indus system",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "ganga-system",
        name: "Ganga",
        estimatedMinutes: 45,
        difficulty: 3,
      },
      {
        id: "brahmaputra-system",
        name: "Brahmaputra",
        estimatedMinutes: 35,
        difficulty: 3,
      },
    ],
  },
  {
    id: "peninsular-system",
    name: "Peninsular System",
    subtopics: [
      {
        id: "east-flowing-1",
        name: "East Flowing 1",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "east-flowing-2",
        name: "East Flowing 2",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "east-flowing-3",
        name: "East Flowing 3",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "west-flowing-rivers",
        name: "West Flowing",
        estimatedMinutes: 30,
        difficulty: 3,
      },
    ],
  },
  {
    id: "indian-monsoons",
    name: "Indian Monsoons",
    subtopics: [
      {
        id: "mechanism-of-monsoon",
        name: "Mechanism of monsoon",
        estimatedMinutes: 45,
        difficulty: 4,
      },
      {
        id: "role-of-itcz-jet-stream-and-stj",
        name: "Role of ITCZ,Jet Stream and STJ",
        estimatedMinutes: 50,
        difficulty: 5,
      },
      {
        id: "role-of-tibet-somali-and-iod",
        name: "Role of Tibet, Somali and IOD",
        estimatedMinutes: 45,
        difficulty: 5,
      },
    ],
  },
  {
    id: "indian-climate",
    name: "Indian Climate",
    subtopics: [
      {
        id: "features-of-rainfall",
        name: "Features of rainfall",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "factors-affecting-indian-climate",
        name: "factors affecting climate",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "indian-seasons",
        name: "Seasons",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "indian-climatic-regions",
        name: "Climatic Regions",
        estimatedMinutes: 40,
        difficulty: 4,
      },
    ],
  },
  {
    id: "natural-vegetation-of-india",
    name: "Natural Vegetation of India",
    subtopics: [
      {
        id: "moist-tropical-forest",
        name: "Moist Tropical Forest",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "dry-tropical-forest",
        name: "Dry Tropical Forest",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "montane-subtropical-forest",
        name: "Montane Subtropical forest",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "montane-temperate-forest",
        name: "Montane Temperate forest",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "alpine-forests",
        name: "Alpine Forests",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "soil-topic",
    name: "Soil",
    subtopics: [
      {
        id: "soil-types",
        name: "Soil types",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "soil-profile",
        name: "Soil profile",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "factors-affecting-soil-formation",
        name: "Factors affecting soil formation",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "soil-groups-of-india",
        name: "Soil groups of india",
        estimatedMinutes: 40,
        difficulty: 3,
      },
      {
        id: "soil-distribution-in-india",
        name: "Soil distribution in India",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
]
},
{
     id: "human-geography",
    type: "GS",
    paper: "GS1",
    name: "Human Geography",
    topics: [
  {
    id: "major-tribes-of-india",
    name: "Major Tribes of India",
    subtopics: [
      {
        id: "scheduled-tribes",
        name: "Scheduled Tribes",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "pvtgs",
        name: "Particularly Vulnerable Tribal Groups",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "tribes-of-himalayan-region",
        name: "Tribes of the Himalayan Region",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "tribes-of-north-east-region",
        name: "Tribes of North-East Region",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "tribes-of-central-india-region",
        name: "Tribes of Central India Region",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "tribes-of-eastern-india-region",
        name: "Tribes of Eastern India Region",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "tribes-of-western-india-region",
        name: "Tribes of Western India Region",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "tribes-of-southern-india-region",
        name: "Tribes of Southern India Region",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "tribes-of-the-island-region",
        name: "Tribes of the Island Region",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "population",
    name: "Population",
    subtopics: [
      {
        id: "factors-of-distribution",
        name: "Factors of distribution",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "trends-in-population-growth",
        name: "Trends in population growth",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "population-composition",
        name: "population composition",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "demographic-dividend",
        name: "demographic dividend",
        estimatedMinutes: 30,
        difficulty: 3,
      },
    ],
  },
  {
    id: "census-and-demographic-components",
    name: "Census and Demographic Components",
    subtopics: [
      {
        id: "india-census-2011",
        name: "India Census 2011",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "national-family-health-survey",
        name: "National Family Health Survey",
        estimatedMinutes: 25,
        difficulty: 2,
      },
    ],
  },
  {
    id: "migration",
    name: "Migration",
    subtopics: [
      {
        id: "streams-of-migration",
        name: "Streams of migration",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "migration-of-india",
        name: "migration of India",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "consequences-of-migration",
        name: "Consequences of migration",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "recommendations-to-address-issue-of-migrants",
        name: "Recommendations to address issue of migrants",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "human-settlements",
    name: "Human Settlements",
    subtopics: [
      {
        id: "types-and-patterns",
        name: "Types and Patterns",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "rural-settlements",
        name: "Rural settlements",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "urban-settlements",
        name: "Urban settlements",
        estimatedMinutes: 25,
        difficulty: 2,
      },
    ],
  },
  {
    id: "internation-trade",
    name: "Internation Trade",
    subtopics: [
      {
        id: "evolution-of-international-trade",
        name: "Evolution of International Trade",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "basis-of-international-trade",
        name: "Basis of International Trade",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "important-aspects-of-international-trade",
        name: "Important Aspects of International Trade",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "case-for-free-trade",
        name: "Case for Free Trade",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "gateways-of-international-trade",
        name: "Gateways of International Trade",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "india-international-trade",
        name: "India International Trade",
        estimatedMinutes: 25,
        difficulty: 2,
      },
    ],
  },
  {
    id: "major-ports-of-india",
    name: "Major Ports of India",
    subtopics: [
      {
        id: "ports-of-the-east-coast",
        name: "Ports of The East Coast",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "west-coast-ports",
        name: "West Coast",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "indian-ports-as-gateways-of-trade",
        name: "Indian Ports as Gateways of Trade",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "issues-and-challenges-with-indian-ports",
        name: "Issues and Challenges with Indian Ports",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "government-initiatives",
        name: "Government Initiatives",
        estimatedMinutes: 30,
        difficulty: 3,
      },
    ],
  },
  {
    id: "transport-and-communication",
    name: "Transport and Communication",
    subtopics: [
      {
        id: "land-transport",
        name: "Land Transport",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "water-transport",
        name: "Water Transport",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "communications",
        name: "Communications",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "transport-and-communication-in-india",
    name: "Transport and Communication in India",
    subtopics: [
      {
        id: "road-transport-in-india",
        name: "Road Transport in India",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "rail-transport-in-india",
        name: "Rail Transport in India",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "water-transport-in-india",
        name: "Water Transport",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "air-transport",
        name: "Air Transport",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "oil-and-gas-pipelines",
        name: "Oil and Gas Pipelines",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "communication-networks",
        name: "Communication Networks",
        estimatedMinutes: 20,
        difficulty: 2,
      },
    ],
  },
  {
    id: "planning-and-sustainable-development",
    name: "Planning and Sustainable Development",
    subtopics: [
      {
        id: "target-area-planning",
        name: "Target Area Planning",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
]
},
{
     id: "economic-geography",
    type: "GS",
    paper: "GS1",
    name: "Economic Geography",
    topics: [
      {
    id: "crops",
    name: "Crops",
    subtopics: [
      { id: "types-of-crops", name: "Types of crops", estimatedMinutes: 240, difficulty: 2 },
    ]
  },
  {
    id: "iron",
    name: "Iron",
    subtopics: [
      { id: "types-of-iron-ore", name: "Types of Iron Ore", estimatedMinutes: 15, difficulty: 2 },
      { id: "applications-of-iron-ore", name: "Applications of Iron Ore", estimatedMinutes: 10, difficulty: 1 },
      { id: "iron-ore-distribution-world", name: "Iron Ore Distribution Across the World", estimatedMinutes: 25, difficulty: 3 },
      { id: "iron-ore-distribution-india", name: "Iron Ore Distribution in India", estimatedMinutes: 25, difficulty: 3 },
      { id: "iron-ore-production-india", name: "Iron Ore Production in India", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "coal",
    name: "Coal",
    subtopics: [
      { id: "formation-of-coal", name: "Formation of Coal", estimatedMinutes: 15, difficulty: 2 },
      { id: "classification-of-coal", name: "Classification of Coal", estimatedMinutes: 15, difficulty: 2 },
      { id: "coking-vs-non-coking", name: "Coking Coal vs. Non-Coking Coal (Thermal Coal)", estimatedMinutes: 15, difficulty: 2 },
      { id: "coal-distribution-world", name: "Distribution of Coal Across the World", estimatedMinutes: 25, difficulty: 3 },
      { id: "coal-distribution-india", name: "Distribution of Coal in India", estimatedMinutes: 30, difficulty: 3 },
      { id: "coal-demand-supply", name: "Coal Demand, Production, Supply, and Import in India", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "petroleum-and-mineral-oil",
    name: "Petroleum and Mineral Oil",
    subtopics: [
      { id: "formation-petroleum-natural-gas", name: "Formation of Petroleum & Natural Gas", estimatedMinutes: 15, difficulty: 2 },
      { id: "world-distribution-petroleum", name: "World Distribution of Petroleum", estimatedMinutes: 25, difficulty: 3 },
      { id: "distribution-petroleum-india", name: "Distribution of Petroleum in India", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "natural-gas",
    name: "Natural Gas",
    subtopics: [
      { id: "natural-gas-intro", name: "Introduction", estimatedMinutes: 10, difficulty: 1 },
      { id: "formation-natural-gas", name: "Formation of Natural Gas", estimatedMinutes: 15, difficulty: 2 },
      { id: "natural-gas-storage", name: "Natural Gas Storage", estimatedMinutes: 15, difficulty: 2 },
      { id: "distribution-natural-gas", name: "Distribution of Natural Gas Across India and the World", estimatedMinutes: 25, difficulty: 3 },
      { id: "petroleum-gas-value-chain", name: "Petroleum and Gas Value Chain", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "unconventional-gas-reservoirs",
    name: "Unconventional Gas Reservoirs",
    subtopics: [
      { id: "unconventional-intro", name: "Introduction", estimatedMinutes: 10, difficulty: 1 },
      { id: "coal-bed-methane", name: "Coal Bed/Seam Methane", estimatedMinutes: 20, difficulty: 3 },
      { id: "shale-gas-oil", name: "Shale Gas/Oil", estimatedMinutes: 20, difficulty: 3 },
      { id: "tight-gas", name: "Tight Gas", estimatedMinutes: 15, difficulty: 3 },
      { id: "gas-hydrates", name: "Gas Hydrates", estimatedMinutes: 15, difficulty: 3 },
      { id: "underground-coal-gasification", name: "Underground Coal Gasification (UCG)", estimatedMinutes: 20, difficulty: 4 }
    ]
  },
  {
    id: "metals-and-ores",
    name: "Metals and Ores",
    subtopics: [
      { id: "lead-zinc-pyrites", name: "Lead, Zinc, and Pyrites", estimatedMinutes: 20, difficulty: 2 },
      { id: "gold-silver", name: "Gold and Silver", estimatedMinutes: 20, difficulty: 2 },
      { id: "manganese-tungsten-chromite", name: "Manganese, Tungsten, and Chromite", estimatedMinutes: 25, difficulty: 3 },
      { id: "copper-nickel", name: "Copper and Nickel", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "non-metals",
    name: "Non Metals",
    subtopics: [
      { id: "graphite-diamond-mica", name: "Graphite, Diamond, and Mica", estimatedMinutes: 20, difficulty: 2 },
      { id: "limestone-dolomite-magnesite", name: "Limestone, Dolomite, and Magnesite", estimatedMinutes: 25, difficulty: 2 },
      { id: "asbestos-kyanite-sillimanite-gypsum", name: "Asbestos, Kyanite, Sillimanite, and Gypsum", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "atomic-minerals",
    name: "Atomic Minerals",
    subtopics: [
      { id: "uranium", name: "Uranium", estimatedMinutes: 20, difficulty: 3 },
      { id: "thorium", name: "Thorium", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "strategic-minerals",
    name: "Strategic Minerals",
    subtopics: [
      { id: "critical-minerals", name: "Critical Minerals", estimatedMinutes: 20, difficulty: 3 },
      { id: "rare-earth-elements", name: "Rare Earth Elements", estimatedMinutes: 35, difficulty: 4 }
    ]
  },
  {
    id: "resource-from-ocean",
    name: "Resource from Ocean",
    subtopics: [
      { id: "ocean-deposits-marine-sediments", name: "Ocean Deposits & Marine sediments", estimatedMinutes: 20, difficulty: 3 },
      { id: "mineral-energy-resources", name: "Mineral and Energy resources", estimatedMinutes: 20, difficulty: 3 },
      { id: "deep-ocean-mission", name: "Deep Ocean Mission", estimatedMinutes: 25, difficulty: 3 },
      { id: "fresh-water-unclos", name: "Fresh Water & UNCLOS", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "economic-sectors",
    name: "Economic Sectors",
    subtopics: [
      { id: "primary-secondary", name: "Primary & Secondary Sector", estimatedMinutes: 15, difficulty: 2 },
      { id: "tertiary-quaternary", name: "Tertiary & Quaternary Sector", estimatedMinutes: 15, difficulty: 2 },
      { id: "factors-industry-locations", name: "Factors for industry locations", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "iron-steel-industry",
    name: "Iron & Steel Industry",
    subtopics: [
      { id: "iron-steel-factors", name: "Factors for location", estimatedMinutes: 20, difficulty: 3 },
      { id: "iron-steel-distribution", name: "Distribution", estimatedMinutes: 20, difficulty: 3 },
      { id: "iron-steel-india", name: "Situation in India", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "cotton-jute-industry",
    name: "Cotton & Jute Industry",
    subtopics: [
      { id: "cotton-jute-factors", name: "Factors affecting location", estimatedMinutes: 20, difficulty: 2 },
      { id: "cotton-jute-distribution", name: "Distribution", estimatedMinutes: 20, difficulty: 2 },
      { id: "cotton-jute-india", name: "Situation in India", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "woollen-silk-industry",
    name: "Woollen & Silk Industry",
    subtopics: [
      { id: "woollen-silk-factors", name: "Factors affecting location", estimatedMinutes: 15, difficulty: 2 },
      { id: "woollen-silk-distribution", name: "Distribution", estimatedMinutes: 15, difficulty: 2 },
      { id: "woollen-silk-india", name: "Situation in India", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "tea-coffee-industry",
    name: "Tea & Coffee Industry",
    subtopics: [
      { id: "tea-coffee-cultivation", name: "Steps in cultivation & processing", estimatedMinutes: 20, difficulty: 2 },
      { id: "tea-coffee-distribution", name: "Distributions", estimatedMinutes: 15, difficulty: 2 },
      { id: "tea-coffee-india", name: "Situation in India", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "sugar-industry",
    name: "Sugar Industry",
    subtopics: [
      { id: "sugar-factors", name: "Factors affecting location", estimatedMinutes: 20, difficulty: 3 },
      { id: "sugar-distribution", name: "Distribution", estimatedMinutes: 15, difficulty: 2 },
      { id: "sugar-india", name: "Situation in India", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "rubber-industry",
    name: "Rubber Industry",
    subtopics: [
      { id: "rubber-factors", name: "Factors affecting location", estimatedMinutes: 15, difficulty: 2 },
      { id: "rubber-distribution", name: "Distribution", estimatedMinutes: 15, difficulty: 2 },
      { id: "rubber-india", name: "Situation in India", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "lumbering-paper-pulp-industry",
    name: "Lumbering, Paper and Pulp Industry",
    subtopics: [
      { id: "paper-pulp-factors", name: "Factors affecting location", estimatedMinutes: 20, difficulty: 3 },
      { id: "paper-pulp-distribution", name: "Distribution", estimatedMinutes: 15, difficulty: 2 },
      { id: "paper-pulp-india", name: "Situation in India", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "sunrise-industries",
    name: "Sunrise Industries",
    subtopics: [
      { id: "sunrise-factors", name: "Factors affecting location", estimatedMinutes: 20, difficulty: 3 },
      { id: "sunrise-distribution", name: "Distribution", estimatedMinutes: 20, difficulty: 2 },
      { id: "sunrise-india", name: "Situation in India", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "indian-pharma-industry",
    name: "Indian Pharma Industry",
    subtopics: [
      { id: "pharma-factors", name: "Factors affecting location", estimatedMinutes: 20, difficulty: 3 },
      { id: "pharma-distribution", name: "Distribution", estimatedMinutes: 15, difficulty: 2 },
      { id: "pharma-india", name: "Situation in India", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "semiconductor-industry",
    name: "Semiconductor Industry",
    subtopics: [
      { id: "semiconductor-factors", name: "Factors affecting location", estimatedMinutes: 25, difficulty: 4 },
      { id: "semiconductor-distribution", name: "Distribution", estimatedMinutes: 20, difficulty: 3 },
      { id: "semiconductor-india", name: "Situation in India", estimatedMinutes: 25, difficulty: 4 }
    ]
  }
]
},
{
     id: "indian-society",
    type: "GS",
    paper: "GS1",
    name: "Indian Society",
    topics: [
  {
    id: "foundations-of-indian-society",
    name: "Foundations of Indian Society",
    subtopics: [
      { id: "foundations-key-data-facts", name: "Key Data and Facts", estimatedMinutes: 15, difficulty: 1 },
      { id: "principle-of-diversity", name: "Principle of diversity", estimatedMinutes: 20, difficulty: 2 },
      { id: "structure-of-hierarchy-caste", name: "Structure of hierarchy : The Caste System", estimatedMinutes: 25, difficulty: 3 },
      { id: "structure-of-community-family-kinship-village", name: "Structure of Community : Family, kinship and village", estimatedMinutes: 25, difficulty: 2 }
    ]
  },
  {
    id: "forces-of-changes-in-modern-india",
    name: "Forces of changes in Modern India",
    subtopics: [
      { id: "constitutionalism-democracy-law", name: "Constitutionalism, democracy and law", estimatedMinutes: 25, difficulty: 2 },
      { id: "planned-development-industrialization", name: "Planned development and industrialization", estimatedMinutes: 20, difficulty: 2 },
      { id: "urbanization-forces", name: "Urbanization", estimatedMinutes: 20, difficulty: 2 },
      { id: "modern-secular-education", name: "Modern Secular education", estimatedMinutes: 20, difficulty: 2 },
      { id: "technology-and-mass-media", name: "Technology and Mass Media", estimatedMinutes: 25, difficulty: 2 },
      { id: "globalization-forces", name: "Globalization", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "impact-and-transformation",
    name: "Impact and Transformation",
    subtopics: [
      { id: "caste-21st-century-fluidity-persistence", name: "Caste in 21st Century : Fluidity, Persistence and New Forms", estimatedMinutes: 30, difficulty: 4 },
      { id: "salience-of-sect", name: "Salience of Sect in Indian Society", estimatedMinutes: 20, difficulty: 3 },
      { id: "indian-family-in-flux", name: "Indian Family in Flux : Nuclearity, Marriage", estimatedMinutes: 25, difficulty: 3 },
      { id: "indian-culture-homogenization-hybridization", name: "Indian Culture : Homogenization or Hybridization", estimatedMinutes: 25, difficulty: 3 },
      { id: "dynamics-of-regionalism-impact", name: "Dynamics of Regionalism", estimatedMinutes: 25, difficulty: 3 },
      { id: "traditions-values-obscurantism", name: "Traditions Values and Challenge of Obscurantism", estimatedMinutes: 25, difficulty: 4 }
    ]
  },
  {
    id: "cross-cutting-issue-of-diversity",
    name: "Cross Cutting Issue of diversity",
    subtopics: [
      { id: "tribals-diversity-single-category", name: "Tribals : Between diversity and single category", estimatedMinutes: 30, difficulty: 3 },
      { id: "link-diversity-marginality", name: "Link between diversity and marginality", estimatedMinutes: 25, difficulty: 4 }
    ]
  },
  {
    id: "frameworks-for-understanding-gender",
    name: "Frameworks for understanding Gender",
    subtopics: [
      { id: "gender-key-facts-data", name: "Key Facts & data", estimatedMinutes: 15, difficulty: 1 },
      { id: "notion-of-gender", name: "Notion of Gender", estimatedMinutes: 20, difficulty: 2 },
      { id: "gender-equality-equity-empowerment", name: "Gender equality, equity and Womens empowerment", estimatedMinutes: 25, difficulty: 2 },
      { id: "structural-basis-inequality-patriarchy", name: "Structural basis of inequality : Patriarchy", estimatedMinutes: 25, difficulty: 3 },
      { id: "intersectionality-gender", name: "Intersectionality", estimatedMinutes: 35, difficulty: 4 }
    ]
  },
  {
    id: "key-sphere-of-women-discrimination",
    name: "Key Sphere of Women discrimination",
    subtopics: [
      { id: "demographic-health-challenges", name: "Demoraphic and Health challenges", estimatedMinutes: 25, difficulty: 3 },
      { id: "socio-cultural-challenges", name: "Socio-cultural challenges", estimatedMinutes: 25, difficulty: 2 },
      { id: "economic-challenges-discrimination", name: "Economic challenges", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "women-work-and-economics",
    name: "Women, Work and Economics",
    subtopics: [
      { id: "female-labour-force-participation", name: "Female Labour Force Participation", estimatedMinutes: 30, difficulty: 3 },
      { id: "formal-informal-burden-of-care", name: "Formal, Informal and burden of care", estimatedMinutes: 25, difficulty: 3 },
      { id: "economic-transformations-women", name: "Economic transformations", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "womens-movements-agency-participations",
    name: "Womens movements, agency and participations",
    subtopics: [
      { id: "womens-movement-in-india", name: "Womens movement in India", estimatedMinutes: 25, difficulty: 3 },
      { id: "historical-overview-womens-movements", name: "Historical overview", estimatedMinutes: 30, difficulty: 2 },
      { id: "problems-faced-by-womens-organisation", name: "Problems faced by womens organisation", estimatedMinutes: 20, difficulty: 2 },
      { id: "critiques-of-movements", name: "Critiques of movements", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "judgements-related-to-women-issues",
    name: "Judgements related to womens issues",
    subtopics: [
      { id: "judgements-privacy-dignity", name: "Right to privacy and dignity", estimatedMinutes: 20, difficulty: 3 },
      { id: "judgements-workplace-employment", name: "Right in workplace and employment", estimatedMinutes: 20, difficulty: 3 },
      { id: "judgements-reproductive-rights-liberty", name: "Reproductive rights and personal liberty", estimatedMinutes: 25, difficulty: 4 },
      { id: "judgements-marriage-family-choice", name: "Marriage, family and personal choice", estimatedMinutes: 20, difficulty: 3 },
      { id: "judgements-maternity-leave", name: "Maternity leave", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "political-empowerment",
    name: "Political Empowerment",
    subtopics: [
      { id: "political-womens-organisations", name: "Womens organisations", estimatedMinutes: 20, difficulty: 2 },
      { id: "engaging-men-gender-justice", name: "Engaging men for gender justice", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "state-law-way-forward-women",
    name: "The State, Law and way forward for women issues",
    subtopics: [
      { id: "role-of-state-legal-constitutional", name: "The role of state : legal and constitutional", estimatedMinutes: 25, difficulty: 2 },
      { id: "gender-mainstreaming-schemes", name: "Gender mainstreaming and schemes", estimatedMinutes: 25, difficulty: 3 },
      { id: "mission-shakti", name: "Mission Shakti", estimatedMinutes: 20, difficulty: 2 },
      { id: "five-prong-strategy", name: "Five pronged strategy", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "population-dynamics",
    name: "Population Dynamics",
    subtopics: [
      { id: "how-population-measured", name: "How Population is Measured", estimatedMinutes: 15, difficulty: 1 },
      { id: "key-determinants-population-change", name: "Key Determinants of Population Change", estimatedMinutes: 20, difficulty: 2 },
      { id: "important-theories-population-change", name: "Important Theories of Population Change", estimatedMinutes: 30, difficulty: 4 },
      { id: "understanding-population-structure", name: "Understanding Population Structure", estimatedMinutes: 20, difficulty: 2 },
      { id: "factors-population-growth-india", name: "Factors of Population Growth in India", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "demographic-dividend",
    name: "The Demographic Dividend",
    subtopics: [
      { id: "understanding-indias-youth-bulge", name: "Understanding India's Youth Bulge", estimatedMinutes: 20, difficulty: 2 },
      { id: "dividend-vs-disaster-challenge", name: "The Challenge: Dividend or Disaster?", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "population-socio-economic-issues",
    name: "Population and Key Socio-Economic Issues",
    subtopics: [
      { id: "poverty-population-nexus", name: "The Poverty-Population Nexus", estimatedMinutes: 25, difficulty: 3 },
      { id: "human-dev-vs-economic-growth", name: "Human Development vs. Economic Growth", estimatedMinutes: 25, difficulty: 3 },
      { id: "population-environmental-stress", name: "Population and Environmental Stress", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "gender-aging-migration",
    name: "Gender, Aging, and Migration",
    subtopics: [
      { id: "gendered-dimension-population", name: "The Gendered Dimension of Population", estimatedMinutes: 20, difficulty: 2 },
      { id: "aging-of-indias-population", name: "The Aging of India's Population", estimatedMinutes: 25, difficulty: 3 },
      { id: "migration-trends-challenges", name: "Migration Trends and Challenges", estimatedMinutes: 25, difficulty: 3 },
      { id: "social-capital", name: "Social Capital", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "population-policies-india",
    name: "Population Policies in India",
    subtopics: [
      { id: "national-population-policy-2000", name: "National Population Policy 2000", estimatedMinutes: 25, difficulty: 3 },
      { id: "way-forward-population-control", name: "Way Forward for Population Control", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "poverty-and-poverty-line",
    name: "Poverty and Poverty line",
    subtopics: [
      { id: "poverty-estimation", name: "Poverty estimation", estimatedMinutes: 25, difficulty: 3 },
      { id: "mpi-index", name: "MPI", estimatedMinutes: 20, difficulty: 3 },
      { id: "secc-data", name: "SECC", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "inequality-and-poverty",
    name: "Inequality and Poverty",
    subtopics: [
      { id: "nexus-poverty-inequality", name: "nexus between them", estimatedMinutes: 25, difficulty: 3 },
      { id: "vicious-circle-theory", name: "Vicious circle theory", estimatedMinutes: 20, difficulty: 3 },
      { id: "geographical-factors-poverty", name: "Geographical factors", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "poverty-alleviation",
    name: "Poverty Alleviation",
    subtopics: [
      { id: "consequences-of-poverty", name: "Consequences of poverty", estimatedMinutes: 20, difficulty: 2 },
      { id: "schemes-and-policies-poverty", name: "Schemes and Policies", estimatedMinutes: 30, difficulty: 3 },
      { id: "way-forward-poverty", name: "Way forward", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "urbanization-base",
    name: "Urbanization",
    subtopics: [
      { id: "urbanization-meaning", name: "Meaning", estimatedMinutes: 10, difficulty: 1 },
      { id: "urbanization-trends", name: "Trends", estimatedMinutes: 20, difficulty: 2 },
      { id: "social-psychological-dimensions-urban", name: "Social and Psychological dimensions", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "reason-and-impact-urban-growth",
    name: "Reason and Impact of Urban growth",
    subtopics: [
      { id: "drivers-of-urbanization", name: "Drivers of urbanization", estimatedMinutes: 20, difficulty: 2 },
      { id: "patterns-of-urban-growth", name: "Patterns of growth", estimatedMinutes: 20, difficulty: 2 },
      { id: "nature-societal-environmental-impacts", name: "Nature, Societal and Environmental impacts", estimatedMinutes: 25, difficulty: 3 },
      { id: "impact-family-marriage-kinship-urban", name: "Impact on family, marriage and kinship", estimatedMinutes: 20, difficulty: 3 },
      { id: "impact-on-women-urban", name: "Impact on women", estimatedMinutes: 20, difficulty: 3 },
      { id: "impact-on-children-urban", name: "Impact on children", estimatedMinutes: 15, difficulty: 2 },
      { id: "impact-on-health-urban", name: "Impact on health", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "urban-life",
    name: "Urban Life",
    subtopics: [
      { id: "social-hierarchy-city", name: "Social hierarchy in city", estimatedMinutes: 20, difficulty: 3 },
      { id: "segregation-marginalisation-urban", name: "Segregation and Marginalisation in urban spaces", estimatedMinutes: 25, difficulty: 4 },
      { id: "urban-poor-challenges", name: "Urban poor", estimatedMinutes: 25, difficulty: 3 },
      { id: "migrants-in-the-city", name: "Migrants in the city", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "urban-challenges",
    name: "Urban Challenges",
    subtopics: [
      { id: "urban-housing-crisis", name: "Urban housing crisis", estimatedMinutes: 25, difficulty: 3 },
      { id: "urban-infra-deficit", name: "Urban infra deficit", estimatedMinutes: 20, difficulty: 2 },
      { id: "urban-environment-issues", name: "Urban environment", estimatedMinutes: 20, difficulty: 3 },
      { id: "urban-overcrowding", name: "Overcrowding", estimatedMinutes: 15, difficulty: 2 },
      { id: "urban-cost-of-living", name: "Cost of living", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "urban-governance",
    name: "Urban Governance",
    subtopics: [
      { id: "urban-governance-india-base", name: "Urban governance in India", estimatedMinutes: 25, difficulty: 3 },
      { id: "urban-planning-development", name: "Urban Planning and Development", estimatedMinutes: 25, difficulty: 3 },
      { id: "rural-urban-integration", name: "Rural-Urban integration", estimatedMinutes: 20, difficulty: 3 },
      { id: "inclusive-development-smaller-cities", name: "Inclusive development of smaller cities", CanvasToken: true, estimatedMinutes: 20, difficulty: 3 },
      { id: "urban-global-best-practices", name: "Global best practices", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "globalisation-and-cultural-sphere",
    name: "Globalisation and cultural sphere",
    subtopics: [
      { id: "global-culture-key-facts", name: "Key Facts and Data", estimatedMinutes: 15, difficulty: 1 },
      { id: "shifting-social-landscape", name: "Shifting Social Landscape", estimatedMinutes: 20, difficulty: 2 },
      { id: "religious-transformations-global", name: "Religious Transformations", estimatedMinutes: 25, difficulty: 3 },
      { id: "evolving-lifestyles-global", name: "Evolving lifestyles", estimatedMinutes: 20, difficulty: 2 },
      { id: "homogenization-vs-hybridity-culture", name: "Homogenization vs Hybridity", estimatedMinutes: 25, difficulty: 3 },
      { id: "culture-of-consumption", name: "Culture of Consumption", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "impact-of-globalization",
    name: "Impact of globalization",
    subtopics: [
      { id: "impact-social-groups-global", name: "Impact on social groups", estimatedMinutes: 25, difficulty: 3 },
      { id: "impact-economy-gig-agrarian", name: "Impact on Economy : gig economy, Agrarian", estimatedMinutes: 30, difficulty: 4 },
      { id: "globalization-4-0", name: "Globalization 4.0", estimatedMinutes: 25, difficulty: 4 },
      { id: "environmental-impact-global", name: "Environmental Impact", estimatedMinutes: 20, difficulty: 2 },
      { id: "geopolitical-impact-global", name: "Geopolitical Impact", estimatedMinutes: 20, difficulty: 3 },
      { id: "culture-wars-global", name: "Culture Wars", estimatedMinutes: 35, difficulty: 4 }
    ]
  },
  {
    id: "secularism-topic",
    name: "Secularism",
    subtopics: [
      { id: "distinctiveness-indian-secularism", name: "Distinctiveness of Indian Secularism", estimatedMinutes: 25, difficulty: 3 },
      { id: "secular-legal-framework", name: "Legal framework", estimatedMinutes: 20, difficulty: 2 },
      { id: "secular-judicial-interventions", name: "Judicial Interventions", estimatedMinutes: 25, difficulty: 3 },
      { id: "ucc-debate-secularism", name: "UCC debate", estimatedMinutes: 30, difficulty: 4 },
      { id: "threats-from-majoritarianism", name: "Threats from Majoritanism", estimatedMinutes: 35, difficulty: 4 }
    ]
  },
  {
    id: "communalism-topic",
    name: "Communalism",
    subtopics: [
      { id: "communalism-concepts-features", name: "Concepts and features", estimatedMinutes: 20, difficulty: 2 },
      { id: "factors-aiding-communalism", name: "Factors aiding communalism", estimatedMinutes: 25, difficulty: 3 },
      { id: "forms-of-communalism", name: "Forms of communalism", estimatedMinutes: 20, difficulty: 3 },
      { id: "manifestation-consequences-communalism", name: "Manifestation And consequences of communalism", estimatedMinutes: 25, difficulty: 4 }
    ]
  },
  {
    id: "regionalism-topic",
    name: "Regionalism",
    subtopics: [
      { id: "concepts-of-regionalism-base", name: "Concepts of regionalism", estimatedMinutes: 20, difficulty: 2 },
      { id: "culture-economy-drivers-regionalism", name: "Culture and economy as drivers of regionalism", estimatedMinutes: 25, difficulty: 3 },
      { id: "regionalism-vs-state-formation", name: "Regionalism vs state formation", estimatedMinutes: 25, difficulty: 3 },
      { id: "regionalism-versus-national-unity", name: "Regionalism versus national unity", estimatedMinutes: 25, difficulty: 4 },
      { id: "regional-political-parties-role", name: "Regional political party and their role", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "social-media-and-society",
    name: "Social media And society",
    subtopics: [
      { id: "sm-impact-institutions-relationships", name: "Impact on social institutions and relationships", estimatedMinutes: 20, difficulty: 2 },
      { id: "sm-socio-cultural-psychological-impact", name: "Socio cultural and psychological impact", estimatedMinutes: 20, difficulty: 3 },
      { id: "sm-societal-disruptor", name: "Social media as a societal disruptor", estimatedMinutes: 25, difficulty: 3 },
      { id: "impact-of-ai-in-india", name: "Impact of AI In India", estimatedMinutes: 30, difficulty: 4 }
    ]
  }
]
},

{
     id: "indian-polity",
    type: "GS",
    paper: "GS2",
    name: "Indian Polity",
    topics: [
  {
    id: "making-of-constitution",
    name: "Making of Constitution",
    subtopics: [
      { id: "composition-of-constituent-assembly", name: "Composition of Constituent Assembly", estimatedMinutes: 25, difficulty: 2 },
      { id: "working-of-the-constituent-assembly", name: "Working of the Constituent Assembly", estimatedMinutes: 20, difficulty: 2 },
      { id: "committees-of-the-constituent-assembly", name: "Committees of the Constituent Assembly", estimatedMinutes: 25, difficulty: 3 },
      { id: "enactment-and-enforcement-of-the-constitution", name: "Enactment and Enforcement of the Constitution", estimatedMinutes: 15, difficulty: 2 },
      { id: "criticism-of-assembly", name: "Criticism of Assembly", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "concept-of-the-constituent",
    name: "Concept of the Constituent",
    subtopics: [
      { id: "meaning", name: "Meaning", estimatedMinutes: 15, difficulty: 1 },
      { id: "functions", name: "Functions", estimatedMinutes: 15, difficulty: 1 },
      { id: "classification-cns", name: "Classification", estimatedMinutes: 15, difficulty: 2 },
      { id: "constitutionalism", name: "Constitutionalism", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "salient-features-of-the-constitution",
    name: "Salient Features of the Constitution",
    subtopics: [
      { id: "salient-features", name: "Salient features", estimatedMinutes: 25, difficulty: 2 },
      { id: "criticism-of-the-constitution", name: "Criticism of the Constitution", estimatedMinutes: 15, difficulty: 2 },
      { id: "parts-of-constitution", name: "Parts of Constitution", estimatedMinutes: 15, difficulty: 2 },
      { id: "borrowed-features", name: "Borrowed features", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "preamble-of-the-constitution",
    name: "Preamble of the Constitution",
    subtopics: [
      { id: "text-of-preamble", name: "Text of preamble", estimatedMinutes: 15, difficulty: 1 },
      { id: "keywords-of-preamble", name: "Keywords of preamble", estimatedMinutes: 30, difficulty: 3 },
      { id: "significance", name: "Significance", estimatedMinutes: 15, difficulty: 2 },
      { id: "preamble-as-part-of-constitution", name: "Preamble as part of constitution", estimatedMinutes: 20, difficulty: 3 },
      { id: "amendability-of-constitution", name: "Amendability of constitution", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "union-and-its-territory",
    name: "Union and its territory",
    subtopics: [
      { id: "union-of-states", name: "Union of states", estimatedMinutes: 20, difficulty: 2 },
      { id: "reorganise-power-of-parliament", name: "Reorganise power of parliament", estimatedMinutes: 25, difficulty: 3 },
      { id: "exchange-of-territories-with-bangladesh", name: "Exchange of territories with Bangladesh", estimatedMinutes: 15, difficulty: 2 },
      { id: "evolution-of-states-and-union-territories-commissions", name: "Evolution of States and Union Territories (commissions)", estimatedMinutes: 30, difficulty: 3 },
      { id: "change-of-name", name: "Change of name", estimatedMinutes: 10, difficulty: 1 }
    ]
  },
  {
    id: "citizenship",
    name: "Citizenship",
    subtopics: [
      { id: "meaning-and-significance", name: "Meaning and Significance", estimatedMinutes: 15, difficulty: 2 },
      { id: "constitutional-provisions", name: "Constitutional Provisions", estimatedMinutes: 20, difficulty: 2 },
      { id: "citizenship-act-1955", name: "Citizenship Act 1955", estimatedMinutes: 35, difficulty: 4 },
      { id: "overseas-citizenship-of-india", name: "Overseas Citizenship of India", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "fundamental-rights-basics",
    name: "Fundamental Rights Basics",
    subtopics: [
      { id: "features-of-fr", name: "Features of FR", estimatedMinutes: 20, difficulty: 2 },
      { id: "state", name: "State", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "right-to-equality",
    name: "Right to Equality",
    subtopics: [
      { id: "equality-before-law-and-equal-protection-of-laws", name: "Equality before law and Equal Protection of Laws", estimatedMinutes: 25, difficulty: 3 },
      { id: "prohibition-of-discrimination-on-certain-grounds", name: "Prohibition of Discrimination on certain grounds", estimatedMinutes: 20, difficulty: 2 },
      { id: "reservations", name: "Reservations", estimatedMinutes: 30, difficulty: 4 },
      { id: "equality-of-oppurtunity", name: "Equality of Oppurtunity", estimatedMinutes: 20, difficulty: 3 },
      { id: "mandal-commission", name: "Mandal Commission", estimatedMinutes: 30, difficulty: 3 },
      { id: "abolition-of-untouchability", name: "Abolition of Untouchability", estimatedMinutes: 15, difficulty: 2 },
      { id: "abolition-of-titles", name: "Abolition of Titles", estimatedMinutes: 15, difficulty: 1 }
    ]
  },
  {
    id: "right-to-freedom",
    name: "Right to Freedom",
    subtopics: [
      { id: "protection-of-six-rights", name: "Protection of six rights", estimatedMinutes: 35, difficulty: 3 },
      { id: "protection-in-respect-of-conviction-for-offences", name: "Protection in respect of conviction for offences", estimatedMinutes: 25, difficulty: 4 },
      { id: "protection-of-life-and-personal-liberty", name: "Protection of Life and Personal Liberty", estimatedMinutes: 30, difficulty: 4 },
      { id: "right-to-education", name: "Right to Education", estimatedMinutes: 15, difficulty: 2 },
      { id: "protection-against-arrest-and-detention", name: "Protection against arrest and detention", estimatedMinutes: 30, difficulty: 4 }
    ]
  },
  {
    id: "right-against-exploitation",
    name: "Right against Exploitation",
    subtopics: [
      { id: "prohibition-of-traffic-in-human-beings-and-forced-labour", name: "Prohibition of Traffic in Human Beings and Forced Labour", estimatedMinutes: 20, difficulty: 2 },
      { id: "prohibition-of-employement-children", name: "Prohibition of Employement of Children", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "right-to-freedom-of-religion",
    name: "Right to freedom of religion",
    subtopics: [
      { id: "freedom-of-conscience-and-free-profession-practice-and-propagation-of-religion", name: "Freedom of Conscience and Free Profession, Practice and Propagation of Religion", estimatedMinutes: 25, difficulty: 3 },
      { id: "freedom-to-manage-religious-affairs", name: "Freedom to Manage Religious Affairs", estimatedMinutes: 20, difficulty: 3 },
      { id: "freedom-from-taxation-for-promotion-of-a-religion", name: "Freedom from taxation for promotion of a Religion", estimatedMinutes: 15, difficulty: 2 },
      { id: "freedom-from-attending-religious-instruction", name: "Freedom from Attending Religious Instruction", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "cultural-and-education-rights",
    name: "Cultural and Education Rights",
    subtopics: [
      { id: "protection-of-interest-of-minorities", name: "Protection of Interest of Minorities", estimatedMinutes: 20, difficulty: 3 },
      { id: "right-of-minorities-to-establish-and-administer-educational-institutions", name: "Right of Minorities to Establish and Administer Educational Institutions", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "right-to-constitutional-remedies",
    name: "Right to constitutional remedies",
    subtopics: [
      { id: "writs-types-and-scope", name: "Writs - types and scope", estimatedMinutes: 40, difficulty: 4 }
    ]
  },
  {
    id: "exceptions-and-criticism",
    name: "Exceptions and Criticism",
    subtopics: [
      { id: "armed-force-and-fr", name: "Armed force and FR", estimatedMinutes: 20, difficulty: 3 },
      { id: "martial-law-and-fr", name: "Martial Law and FR", estimatedMinutes: 20, difficulty: 3 },
      { id: "article-35", name: "Article 35", estimatedMinutes: 20, difficulty: 3 },
      { id: "other-exceptions", name: "Other exceptions", estimatedMinutes: 15, difficulty: 2 },
      { id: "criticism-exc", name: "Criticism", estimatedMinutes: 15, difficulty: 2 },
      { id: "rights-outside-part-iii", name: "Rights outside Part III", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "directive-principle-of-state-policy",
    name: "Directive principle of state policy",
    subtopics: [
      { id: "features-of-directive-principles", name: "Features of directive principles", estimatedMinutes: 20, difficulty: 2 },
      { id: "classification-of-directive-principles", name: "Classification of directive principles", estimatedMinutes: 25, difficulty: 2 },
      { id: "new-directive-principles", name: "New directive principles", estimatedMinutes: 15, difficulty: 2 },
      { id: "difference-between-fundamental-rights-and-directive-principle", name: "Difference between fundamental rights and directive principle", estimatedMinutes: 25, difficulty: 3 },
      { id: "criticism-of-directive-principle", name: "criticism of directive principle", estimatedMinutes: 15, difficulty: 2 },
      { id: "utility-of-directive-principle", name: "utility of directive principle", estimatedMinutes: 15, difficulty: 2 },
      { id: "conflict-between-fundamental-right-and-directive-principle", name: "Conflict between fundamental right and directive principle", estimatedMinutes: 30, difficulty: 4 },
      { id: "implementation-of-directive-principles", name: "Implementation of directive principles", estimatedMinutes: 25, difficulty: 3 },
      { id: "directives-outside-part-4", name: "Directives outside part 4", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "fundamental-duties",
    name: "Fundamental Duties",
    subtopics: [
      { id: "swaran-singh-committee", name: "Swaran Singh committee", estimatedMinutes: 15, difficulty: 2 },
      { id: "list-of-fundamental-duties", name: "List of fundamental duties", estimatedMinutes: 20, difficulty: 2 },
      { id: "features-of-fundamental-duties", name: "features of fundamental duties", estimatedMinutes: 15, difficulty: 2 },
      { id: "criticism-and-significance", name: "criticism and significance", estimatedMinutes: 15, difficulty: 2 },
      { id: "verma-committee", name: "Verma Committee", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "amendment-of-the-constitution",
    name: "Amendment of the constitution",
    subtopics: [
      { id: "procedure-for-amendment", name: "Procedure for amendment", estimatedMinutes: 30, difficulty: 3 },
      { id: "types-of-amendment", name: "types of amendment", estimatedMinutes: 25, difficulty: 3 },
      { id: "criticism-of-amendment-procedure", name: "criticism of amendment procedure", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "basic-structure",
    name: "Basic Structure",
    subtopics: [
      { id: "emergence-of-basic-structure", name: "Emergence of basic structure", estimatedMinutes: 35, difficulty: 4 },
      { id: "elements-of-basic-structure", name: "elements of basic structure", estimatedMinutes: 30, difficulty: 3 },
      { id: "evolution-of-basic-structure", name: "evolution of basic structure", estimatedMinutes: 40, difficulty: 4 }
    ]
  },
  {
    id: "parliamentary-and-presidential-system",
    name: "Parliamentary and Presidential System",
    subtopics: [
      { id: "features-of-parliamentary", name: "Features of Parliamentary", estimatedMinutes: 20, difficulty: 2 },
      { id: "features-of-presidential", name: "Features of Presidential", estimatedMinutes: 20, difficulty: 2 },
      { id: "merits-and-demerits-of-parliamentary", name: "Merits and Demerits of Parliamentary", estimatedMinutes: 25, difficulty: 2 },
      { id: "reasons-for-adopting-parliamentary", name: "Reasons for adopting Parliamentary", estimatedMinutes: 20, difficulty: 3 },
      { id: "indian-vs-british-models", name: "Indian vs British models", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "unitary-and-federal-system",
    name: "Unitary and Federal System",
    subtopics: [
      { id: "comparison", name: "Comparison", estimatedMinutes: 20, difficulty: 2 },
      { id: "federal-features-of-constitution", name: "Federal features of constitution", estimatedMinutes: 20, difficulty: 3 },
      { id: "unitary-features-of-constitution", name: "Unitary features of constitution", estimatedMinutes: 20, difficulty: 3 },
      { id: "critical-evaluation", name: "Critical Evaluation", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "centre-state-relations",
    name: "Centre-State Relations",
    subtopics: [
      { id: "legislative-relations", name: "Legislative relations", estimatedMinutes: 35, difficulty: 4 },
      { id: "administrative-relations", name: "Administrative Relations", estimatedMinutes: 35, difficulty: 4 },
      { id: "financial-relations", name: "Financial Relations", estimatedMinutes: 40, difficulty: 4 },
      { id: "tension-areas", name: "Tension Areas", estimatedMinutes: 25, difficulty: 3 },
      { id: "arcs", name: "ARCs", estimatedMinutes: 20, difficulty: 3 },
      { id: "rajamannar-committee", name: "Rajamannar Committee", estimatedMinutes: 20, difficulty: 3 },
      { id: "sarkaria-commission", name: "Sarkaria Commission", estimatedMinutes: 35, difficulty: 4 },
      { id: "punchhi-commission", name: "Punchhi Commission", estimatedMinutes: 35, difficulty: 4 }
    ]
  },
  {
    id: "inter-state-relations",
    name: "Inter - State Relations",
    subtopics: [
      { id: "inter-state-water-disputes", name: "Inter-state water disputes", estimatedMinutes: 25, difficulty: 3 },
      { id: "inter-state-councils", name: "Inter-state councils", estimatedMinutes: 25, difficulty: 3 },
      { id: "public-acts-records-and-judicial-proceedings", name: "Public Acts, Records and Judicial Proceedings", estimatedMinutes: 15, difficulty: 2 },
      { id: "inter-state-trade-and-commerce", name: "Inter-state trade and commerce", estimatedMinutes: 20, difficulty: 3 },
      { id: "zonal-councils", name: "Zonal councils", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "national-emergency",
    name: "National Emergency",
    subtopics: [
      { id: "grounds-of-declaration", name: "Grounds of declaration", estimatedMinutes: 25, difficulty: 3 },
      { id: "approval-and-duration", name: "Approval and duration", estimatedMinutes: 25, difficulty: 3 },
      { id: "revocation-of-proclamation", name: "Revocation of proclamation", estimatedMinutes: 15, difficulty: 2 },
      { id: "effects", name: "Effects", estimatedMinutes: 30, difficulty: 3 },
      { id: "article-358-vs-359", name: "Article 358 vs 359", estimatedMinutes: 30, difficulty: 4 }
    ]
  },
  {
    id: "presidents-rule",
    name: "Presidents Rule",
    subtopics: [
      { id: "grounds-of-imposition", name: "Grounds of Imposition", estimatedMinutes: 25, difficulty: 3 },
      { id: "approval-and-duration-pr", name: "Approval and duration", estimatedMinutes: 25, difficulty: 3 },
      { id: "consequence-of-presidents-rule", name: "Consequence of Presidents rule", estimatedMinutes: 20, difficulty: 3 },
      { id: "use-of-article-356", name: "Use of article 356", estimatedMinutes: 25, difficulty: 3 },
      { id: "scope-of-judicial-review", name: "Scope of Judicial review", estimatedMinutes: 30, difficulty: 4 },
      { id: "cases-of-proper-and-improper-use", name: "Cases of proper and improper use", estimatedMinutes: 30, difficulty: 4 }
    ]
  },
  {
    id: "financial-emergency",
    name: "Financial Emergency",
    subtopics: [
      { id: "grounds-of-imposition-fe", name: "Grounds of Imposition", estimatedMinutes: 15, difficulty: 2 },
      { id: "approval-and-duration-fe", name: "Approval and duration", estimatedMinutes: 15, difficulty: 2 },
      { id: "effects-and-criticism", name: "Effects and Criticism", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "president-and-governor",
    name: "President and Governor",
    subtopics: [
      { id: "election", name: "Election", estimatedMinutes: 30, difficulty: 3 },
      { id: "qualification-oath-and-conditions", name: "Qualification , Oath and Conditions", estimatedMinutes: 25, difficulty: 2 },
      { id: "term-impeachment-and-vacancy", name: "Term, Impeachment and Vacancy", estimatedMinutes: 30, difficulty: 3 },
      { id: "executive-legislative-and-financial-powers", name: "Executive, Legislative and Financial powers", estimatedMinutes: 35, difficulty: 3 },
      { id: "judicial-diplomatic-military-and-emergency-powers", name: "Judicial, Diplomatic, Military and Emergency powers", estimatedMinutes: 30, difficulty: 3 },
      { id: "ordinance-power", name: "Ordinance power", estimatedMinutes: 30, difficulty: 4 },
      { id: "pardoning-power", name: "Pardoning power", estimatedMinutes: 30, difficulty: 4 }
    ]
  },
  {
    id: "vice-president",
    name: "Vice-President",
    subtopics: [
      { id: "election-vp", name: "Election", estimatedMinutes: 20, difficulty: 2 },
      { id: "qualification-oath-and-conditions-vp", name: "Qualification,Oath and Conditions", estimatedMinutes: 20, difficulty: 2 },
      { id: "term-and-vacancy-vp", name: "Term and Vacancy", estimatedMinutes: 20, difficulty: 2 },
      { id: "powers-and-functions-vp", name: "Powers and functions", estimatedMinutes: 20, difficulty: 2 },
      { id: "indian-and-american-vice-presidents", name: "Indian and American vice presidents", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "prime-minister-and-chief-minister",
    name: "Prime minister and Chief minister",
    subtopics: [
      { id: "appointment", name: "Appointment", estimatedMinutes: 15, difficulty: 2 },
      { id: "oath-term-and-salary", name: "Oath, term and salary", estimatedMinutes: 15, difficulty: 2 },
      { id: "powers-and-functions", name: "Powers and Functions", estimatedMinutes: 25, difficulty: 2 },
      { id: "relationship-with-the-president", name: "Relationship with the President", estimatedMinutes: 20, difficulty: 2 },
      { id: "caretaker-government", name: "Caretaker government", estimatedMinutes: 15, difficulty: 3 }
    ]
  },
  {
    id: "council-of-ministers",
    name: "Council of Ministers",
    subtopics: [
      { id: "provisions", name: "Provisions", estimatedMinutes: 20, difficulty: 2 },
      { id: "nature-of-advice-by-ministers", name: "Nature of advice by ministers", estimatedMinutes: 20, difficulty: 3 },
      { id: "appointment-of-ministers", name: "Appointment of ministers", estimatedMinutes: 15, difficulty: 2 },
      { id: "oath-and-salary", name: "Oath and Salary", estimatedMinutes: 15, difficulty: 2 },
      { id: "responisbility-of-ministers", name: "Responisbility of Ministers", estimatedMinutes: 25, difficulty: 3 },
      { id: "composition", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "cabinet", name: "Cabinet", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "cabinet-committees",
    name: "Cabinet Committees",
    subtopics: [
      { id: "features", name: "Features", estimatedMinutes: 15, difficulty: 2 },
      { id: "list-and-functions-of-cabinet-committees", name: "List and functions of cabinet committees", estimatedMinutes: 20, difficulty: 2 },
      { id: "group-of-ministers", name: "Group of ministers", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "parliament-and-legislature",
    name: "Parliament and Legislature",
    subtopics: [
      { id: "organisation", name: "Organisation", estimatedMinutes: 15, difficulty: 1 },
      { id: "composition-of-upper-house", name: "Composition of Upper house", estimatedMinutes: 20, difficulty: 2 },
      { id: "composition-of-lower-house", name: "Composition of Lower house", estimatedMinutes: 20, difficulty: 2 },
      { id: "system-of-elections", name: "System of elections", estimatedMinutes: 25, difficulty: 3 },
      { id: "duration-of-two-houses", name: "Duration of two houses", estimatedMinutes: 15, difficulty: 2 },
      { id: "membership-of-parliament", name: "Membership of parliament", estimatedMinutes: 30, difficulty: 3 },
      { id: "oath-and-affirmations", name: "Oath and Affirmations", estimatedMinutes: 15, difficulty: 1 },
      { id: "salary-and-allowances", name: "Salary and Allowances", estimatedMinutes: 15, difficulty: 1 },
      { id: "speaker-powers", name: "Speaker powers", estimatedMinutes: 30, difficulty: 3 },
      { id: "speaker-independence", name: "Speaker Independence", estimatedMinutes: 25, difficulty: 3 },
      { id: "deputy-speaker", name: "Deputy Speaker", estimatedMinutes: 20, difficulty: 2 },
      { id: "panel-of-chairpersons", name: "Panel of chairpersons", estimatedMinutes: 15, difficulty: 2 },
      { id: "speaker-pro-tem", name: "Speaker Pro tem", estimatedMinutes: 15, difficulty: 2 },
      { id: "chairman-and-deputy-chairman-of-upper-house", name: "Chairman and deputy chairman of Upper house", estimatedMinutes: 25, difficulty: 2 },
      { id: "leaders", name: "Leaders", estimatedMinutes: 15, difficulty: 2 },
      { id: "sessions", name: "Sessions", estimatedMinutes: 25, difficulty: 3 },
      { id: "quorum-and-voting", name: "Quorum and voting", estimatedMinutes: 15, difficulty: 2 },
      { id: "majority-types", name: "Majority types", estimatedMinutes: 35, difficulty: 4 },
      { id: "devices-of-parliament", name: "Devices of parliament", estimatedMinutes: 30, difficulty: 3 },
      { id: "motions", name: "Motions", estimatedMinutes: 30, difficulty: 3 },
      { id: "bills-types", name: "Bills types", estimatedMinutes: 20, difficulty: 2 },
      { id: "bills-process", name: "Bills process", estimatedMinutes: 35, difficulty: 3 },
      { id: "money-bills", name: "Money bills", estimatedMinutes: 35, difficulty: 4 },
      { id: "financial-bills", name: "Financial bills", estimatedMinutes: 30, difficulty: 4 },
      { id: "budget", name: "Budget", estimatedMinutes: 35, difficulty: 4 },
      { id: "funds", name: "Funds", estimatedMinutes: 20, difficulty: 2 },
      { id: "legislative-executive-and-financial-powers", name: "Legislative, Executive and Financial powers", estimatedMinutes: 30, difficulty: 3 },
      { id: "constituent-judicial-electoral-powers", name: "Constituent, Judicial, Electoral powers", estimatedMinutes: 25, difficulty: 3 },
      { id: "equal-status-of-houses", name: "Equal status of houses", estimatedMinutes: 25, difficulty: 3 },
      { id: "parliamentary-privileges", name: "Parliamentary Privileges", estimatedMinutes: 30, difficulty: 4 },
      { id: "sovereignty-of-parliament", name: "Sovereignty of Parliament", estimatedMinutes: 25, difficulty: 4 }
    ]
  },
  {
    id: "parliamentary-committees",
    name: "Parliamentary Committees",
    subtopics: [
      { id: "classification-comm", name: "Classification", estimatedMinutes: 15, difficulty: 2 },
      { id: "public-accounts-committee", name: "Public accounts committee", estimatedMinutes: 25, difficulty: 3 },
      { id: "estimates-committee", name: "Estimates committee", estimatedMinutes: 20, difficulty: 3 },
      { id: "public-undertaking-committee", name: "Public undertaking committee", estimatedMinutes: 20, difficulty: 3 },
      { id: "department-related-committee", name: "Department related committee", estimatedMinutes: 25, difficulty: 2 },
      { id: "other-committees", name: "Other committees", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "parliamentary-group",
    name: "Parliamentary Group",
    subtopics: [
      { id: "composition-pg", name: "Composition", estimatedMinutes: 15, difficulty: 1 },
      { id: "objectives", name: "Objectives", estimatedMinutes: 15, difficulty: 1 },
      { id: "functions-pg", name: "Functions", estimatedMinutes: 15, difficulty: 1 },
      { id: "parliamentary-friendship-groups", name: "Parliamentary friendship groups", estimatedMinutes: 15, difficulty: 1 }
    ]
  },
  {
    id: "supreme-court-and-high-court",
    name: "Supreme Court and High Court",
    subtopics: [
      { id: "composition-sc-hc", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "appointment-sc-hc", name: "Appointment", estimatedMinutes: 35, difficulty: 4 },
      { id: "qualification-oath-and-salary", name: "Qualification, Oath and Salary", estimatedMinutes: 25, difficulty: 2 },
      { id: "tenure-and-removal", name: "Tenure and Removal", estimatedMinutes: 30, difficulty: 3 },
      { id: "acting-adhoc-and-retired", name: "Acting, adhoc and retired", estimatedMinutes: 25, difficulty: 3 },
      { id: "seat-and-procedure", name: "Seat and procedure", estimatedMinutes: 15, difficulty: 2 },
      { id: "independence-of-sc", name: "Independence of SC", estimatedMinutes: 25, difficulty: 3 },
      { id: "original-writ-appellate-jurisdiction", name: "Original, Writ , Appellate jurisdiction", estimatedMinutes: 35, difficulty: 4 },
      { id: "advisory-court-of-record-judicial-review-powers", name: "Advisory, Court of record, Judicial review powers", estimatedMinutes: 35, difficulty: 4 },
      { id: "constitutional-and-other-powers", name: "Constitutional and Other powers", estimatedMinutes: 25, difficulty: 3 },
      { id: "india-vs-us-sc", name: "India vs US SC", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "judicial-review-activism",
    name: "Judicial Review & activism",
    subtopics: [
      { id: "meaning-and-importance", name: "Meaning and Importance", estimatedMinutes: 25, difficulty: 3 },
      { id: "provisions-and-scope", name: "Provisions and Scope", estimatedMinutes: 25, difficulty: 3 },
      { id: "jr-of-ninth-schedule", name: "JR of ninth schedule", estimatedMinutes: 30, difficulty: 4 }
    ]
  },
  {
    id: "public-interest-litigation",
    name: "Public Interest Litigation",
    subtopics: [
      { id: "meaning-and-importance-pil", name: "Meaning and Importance", estimatedMinutes: 20, difficulty: 2 },
      { id: "provisions-and-scope-pil", name: "Provisions and Scope", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "state-judiciary",
    name: "State Judiciary",
    subtopics: [
      { id: "provisions-sj", name: "Provisions", estimatedMinutes: 20, difficulty: 2 },
      { id: "structure-and-jurisdiction", name: "Structure and Jurisdiction", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "tribunals",
    name: "Tribunals",
    subtopics: [
      { id: "administrative-tribunals", name: "Administrative Tribunals", estimatedMinutes: 25, difficulty: 3 },
      { id: "other-tribunals", name: "Other Tribunals", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "lok-adalat-and-other-courts",
    name: "Lok Adalat and other courts",
    subtopics: [
      { id: "nalsa", name: "NALSA", estimatedMinutes: 20, difficulty: 2 },
      { id: "lok-adalat-meaning-and-types", name: "Lok Adalat : meaning and types", estimatedMinutes: 25, difficulty: 2 },
      { id: "family-courts", name: "Family courts", estimatedMinutes: 15, difficulty: 2 },
      { id: "gram-nyayalayas", name: "Gram Nyayalayas", estimatedMinutes: 20, difficulty: 2 },
      { id: "commercial-courts", name: "Commercial courts", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "panchayati-raj",
    name: "Panchayati Raj",
    subtopics: [
      { id: "evolution", name: "Evolution", estimatedMinutes: 25, difficulty: 3 },
      { id: "committees", name: "Committees", estimatedMinutes: 25, difficulty: 3 },
      { id: "73rd-constitutional-amendement-act", name: "73rd Constitutional Amendement act", estimatedMinutes: 35, difficulty: 4 },
      { id: "features-powers", name: "Features, Powers", estimatedMinutes: 30, difficulty: 3 },
      { id: "11th-schedule", name: "11th Schedule", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "municipality",
    name: "Municipality",
    subtopics: [
      { id: "evolution-m", name: "Evolution", estimatedMinutes: 20, difficulty: 3 },
      { id: "committees-m", name: "Committees", estimatedMinutes: 20, difficulty: 3 },
      { id: "features-m", name: "Features", estimatedMinutes: 25, difficulty: 3 },
      { id: "powers-and-functions-m", name: "Powers and Functions", estimatedMinutes: 25, difficulty: 3 },
      { id: "planning-committee", name: "Planning Committee", estimatedMinutes: 20, difficulty: 3 },
      { id: "12th-schedule", name: "12th Schedule", estimatedMinutes: 20, difficulty: 2 },
      { id: "types-of-bodies", name: "Types of bodies", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "union-territories",
    name: "Union Territories",
    subtopics: [
      { id: "creation", name: "Creation", estimatedMinutes: 15, difficulty: 1 },
      { id: "administration", name: "Administration", estimatedMinutes: 20, difficulty: 2 },
      { id: "special-provision-for-delhi", name: "Special provision for Delhi", estimatedMinutes: 25, difficulty: 3 },
      { id: "states-vs-ut", name: "States vs UT", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "scheduled-and-tribal-areas",
    name: "Scheduled and Tribal Areas",
    subtopics: [
      { id: "administration-sata", name: "Administration", estimatedMinutes: 20, difficulty: 3 },
      { id: "5th-schedule", name: "5th Schedule", estimatedMinutes: 25, difficulty: 3 },
      { id: "6th-schedule", name: "6th Schedule", estimatedMinutes: 25, difficulty: 4 }
    ]
  },
  {
    id: "election-commission",
    name: "Election Commission",
    subtopics: [
      { id: "composition-ec", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "independence-ec", name: "Independence", estimatedMinutes: 20, difficulty: 3 },
      { id: "powers-and-functions-ec", name: "Powers and Functions", estimatedMinutes: 25, difficulty: 2 },
      { id: "mission-and-principles", name: "Mission and Principles", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "upsc-spsc",
    name: "UPSC & SPSC",
    subtopics: [
      { id: "composition-us", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "removal-us", name: "Removal", estimatedMinutes: 20, difficulty: 3 },
      { id: "independence-us", name: "Independence", estimatedMinutes: 20, difficulty: 3 },
      { id: "functions-us", name: "Functions", CanvasToken: true, estimatedMinutes: 25, difficulty: 2 },
      { id: "limitations-us", name: "Limitations", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "finance-commission",
    name: "Finance Commission",
    subtopics: [
      { id: "composition-fc", name: "Composition", estimatedMinutes: 15, difficulty: 2 },
      { id: "removal-fc", name: "Removal", estimatedMinutes: 15, difficulty: 3 },
      { id: "independence-fc", name: "Independence", estimatedMinutes: 15, difficulty: 3 },
      { id: "functions-fc", name: "Functions", estimatedMinutes: 15, difficulty: 3 },
      { id: "limitations-fc", name: "Limitations", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "gst-council",
    name: "GST Council",
    subtopics: [
      { id: "composition-gst", name: "Composition", estimatedMinutes: 15, difficulty: 2 },
      { id: "removal-gst", name: "Removal", estimatedMinutes: 15, difficulty: 3 },
      { id: "independence-gst", name: "Independence", estimatedMinutes: 15, difficulty: 3 },
      { id: "functions-gst", name: "Functions", estimatedMinutes: 15, difficulty: 3 },
      { id: "limitations-gst", name: "Limitations", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "ncsc-ncst-ncbc-special-linguistic-officer",
    name: "NCSC, NCST, NCBC, Special linguistic officer",
    subtopics: [
      { id: "evoltution", name: "Evoltution", estimatedMinutes: 25, difficulty: 3 },
      { id: "functions-nnnl", name: "Functions", estimatedMinutes: 25, difficulty: 3 },
      { id: "powers-nnnl", name: "Powers", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "cag-of-india",
    name: "CAG of India",
    subtopics: [
      { id: "appointment-and-term", name: "Appointment and term", estimatedMinutes: 20, difficulty: 2 },
      { id: "independence-cag", name: "Independence", estimatedMinutes: 20, difficulty: 3 },
      { id: "powers-cag", name: "Powers", estimatedMinutes: 25, difficulty: 3 },
      { id: "cag-and-corporation", name: "CAG and Corporation", estimatedMinutes: 20, difficulty: 3 },
      { id: "challenges-cag", name: "Challenges", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "attorney-advocate-and-solicitor-general",
    name: "Attorney, Advocate and Solicitor General",
    subtopics: [
      { id: "appointment-law", name: "Appointment", estimatedMinutes: 15, difficulty: 2 },
      { id: "duties", name: "Duties", estimatedMinutes: 20, difficulty: 2 },
      { id: "rights", name: "Rights", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "niti-aayog",
    name: "NITI Aayog",
    subtopics: [
      { id: "establishment", name: "Establishment", estimatedMinutes: 15, difficulty: 1 },
      { id: "rationale", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-niti", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "objectives-niti", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-niti", name: "Functions", estimatedMinutes: 20, difficulty: 2 },
      { id: "cooperative-federalism", name: "Cooperative Federalism", estimatedMinutes: 20, difficulty: 3 },
      { id: "planning-commission-niti", name: "Planning Commission", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "nhrc-and-shrc",
    name: "NHRC and SHRC",
    subtopics: [
      { id: "establishment-nhrc", name: "Establishment", estimatedMinutes: 15, difficulty: 2 },
      { id: "rationale-nhrc", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-nhrc", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "objectives-nhrc", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-nhrc", name: "Functions", estimatedMinutes: 20, difficulty: 2 },
      { id: "limitations-nhrc", name: "Limitations", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "ncw-ncpcr-ncm",
    name: "NCW,NCPCR,NCM",
    subtopics: [
      { id: "establishment-stat", name: "Establishment", estimatedMinutes: 20, difficulty: 2 },
      { id: "rationale-stat", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-stat", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "objectives-stat", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-stat", name: "Functions", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "cic-and-sic",
    name: "CIC and SIC",
    subtopics: [
      { id: "establishment-info", name: "Establishment", estimatedMinutes: 15, difficulty: 2 },
      { id: "rationale-info", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-info", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "objectives-info", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-info", name: "Functions", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "cvc-cbi",
    name: "CVC,CBI",
    subtopics: [
      { id: "establishment-vig", name: "Establishment", estimatedMinutes: 20, difficulty: 2 },
      { id: "rationale-vig", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-vig", name: "Composition", estimatedMinutes: 20, difficulty: 2 },
      { id: "objectives-vig", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-vig", name: "Functions", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "lokpal-and-lokayukta",
    name: "Lokpal and Lokayukta",
    subtopics: [
      { id: "establishment-lok", name: "Establishment", estimatedMinutes: 20, difficulty: 3 },
      { id: "rationale-lok", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-lok", name: "Composition", estimatedMinutes: 20, difficulty: 3 },
      { id: "objectives-lok", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-lok", name: "Functions", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "nia",
    name: "NIA",
    subtopics: [
      { id: "establishment-nia", name: "Establishment", estimatedMinutes: 15, difficulty: 2 },
      { id: "rationale-nia", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-nia", name: "Composition", estimatedMinutes: 15, difficulty: 2 },
      { id: "objectives-nia", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-nia", name: "Functions", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "ndma-and-sdma",
    name: "NDMA and SDMA",
    subtopics: [
      { id: "establishment-dis", name: "Establishment", estimatedMinutes: 15, difficulty: 2 },
      { id: "rationale-dis", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-dis", name: "Composition", estimatedMinutes: 15, difficulty: 2 },
      { id: "objectives-dis", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-dis", name: "Functions", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "delimitation-commission",
    name: "Delimitation Commission",
    subtopics: [
      { id: "establishment-del", name: "Establishment", estimatedMinutes: 20, difficulty: 3 },
      { id: "rationale-del", name: "Rationale", estimatedMinutes: 15, difficulty: 2 },
      { id: "composition-del", name: "Composition", estimatedMinutes: 15, difficulty: 2 },
      { id: "objectives-del", name: "Objectives", estimatedMinutes: 15, difficulty: 2 },
      { id: "functions-del", name: "Functions", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "cooperative-society",
    name: "Cooperative Society",
    subtopics: [
      { id: "provisions-coop", name: "Provisions", estimatedMinutes: 20, difficulty: 3 },
      { id: "election-coop", name: "Election", estimatedMinutes: 15, difficulty: 2 },
      { id: "supression", name: "Supression", estimatedMinutes: 15, difficulty: 3 },
      { id: "powers-coop", name: "Powers", estimatedMinutes: 15, difficulty: 2 },
      { id: "97th-amendment", name: "97th Amendment", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "other-provisions",
    name: "Other Provisions",
    subtopics: [
      { id: "official-language", name: "Official Language", estimatedMinutes: 25, difficulty: 3 },
      { id: "public-services", name: "Public Services", estimatedMinutes: 25, difficulty: 3 },
      { id: "right-and-liability-of-government", name: "Right and Liability of government", estimatedMinutes: 20, difficulty: 3 }
    ]
  }
]
},
{
     id: "governance",
    type: "GS",
    paper: "GS2",
    name: "Governance",
    topics: [
  {
    id: "governance-in-india",
    name: "Governance in India",
    subtopics: [
      { id: "governance-concept", name: "Governance concepts", estimatedMinutes: 60, difficulty: 2 },
      { id: "governance-india", name: "Governance in India", estimatedMinutes: 60, difficulty: 2 },
      { id: "tools-to-implement-good-governance", name: "Tools to implement good governance", estimatedMinutes: 90, difficulty: 3 },
      { id: "e-governance", name: "E governance", estimatedMinutes: 90, difficulty: 2 },
    ]
  },
  {
    id: "civil-services-role",
    name: "Role of Civil Services",
    subtopics: [
      { id: "civil-services", name: "Civil Services", estimatedMinutes: 60, difficulty: 1 },
      { id: "recent-reforms-in-civil-services", name: "Recent reforms in civil services", estimatedMinutes: 45, difficulty: 3 },
    ]
  },
  {
    id: "development-and-development-industry",
    name: "Development and Development industry",
    subtopics: [
      { id: "development-govern", name: "Development", estimatedMinutes: 30, difficulty: 2 },
      { id: "development-industry", name: "Development Industry NGO SHG Coop etc", estimatedMinutes: 180, difficulty: 3 },
    ]
  },
  {
    id: "govt-public-policy",
    name: "Government Public policy and Interventions",
    subtopics: [
      { id: "public-policy-formation", name: "Public policy Process", estimatedMinutes: 25, difficulty: 3 },
      { id: "public-policy-in-india", name: "public policy in India", estimatedMinutes: 25, difficulty: 3 },
      { id: "challenges-in-policy-formation", name: "challenges in policy formation", estimatedMinutes: 20, difficulty: 3 },
      { id: "strategies-for-improving-policy-formation", name: "Strategies for improving policy formation", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "pressure-groups",
    name: "Pressure groups",
    subtopics: [
      { id: "gov-pressure-groups", name: "Pressure groups", estimatedMinutes: 50, difficulty: 2 },
      { id: "characteristics-pressure-group", name: "Characteristics of Indian Pressure Groups", estimatedMinutes: 40, difficulty: 2 },
      { id: "pressure-group-and-democracy", name: "Pressure group and democracy", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "political-parties",
    name: "Political parties",
    subtopics: [
      { id: "party-system-in-india", name: "Party system in India", estimatedMinutes: 20, difficulty: 2 },
      { id: "national-party", name: "National party", estimatedMinutes: 15, difficulty: 1 },
      { id: "state-party", name: "State party", estimatedMinutes: 15, difficulty: 1 },
      { id: "role-of-regional-parties", name: "Role of regional parties", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "elections",
    name: "Elections",
    subtopics: [
      { id: "electoral-system", name: "Electoral system", estimatedMinutes: 25, difficulty: 3 },
      { id: "election-machinery", name: "Election machinery", estimatedMinutes: 20, difficulty: 2 },
      { id: "election-process", name: "Election process", estimatedMinutes: 25, difficulty: 2 }
    ]
  },
  {
    id: "election-laws",
    name: "Election Laws",
    subtopics: [
      { id: "rpa-1950", name: "RPA 1950", estimatedMinutes: 30, difficulty: 3 },
      { id: "rpa-1951", name: "RPA 1951", estimatedMinutes: 35, difficulty: 4 }
    ]
  },
  {
    id: "electoral-reforms",
    name: "Electoral reforms",
    subtopics: [
      { id: "committees-related", name: "Committees related", estimatedMinutes: 30, difficulty: 3 },
      { id: "reforms-before-1996", name: "Reforms before 1996", estimatedMinutes: 20, difficulty: 2 },
      { id: "reform-of-1996", name: "Reform of 1996", estimatedMinutes: 25, difficulty: 3 },
      { id: "reform-after-1996", name: "reform after 1996", estimatedMinutes: 20, difficulty: 2 },
      { id: "reform-since-2010", name: "Reform since 2010", estimatedMinutes: 25, difficulty: 3 },
      { id: "election-amendment-act-2021", name: "Election amendment act 2021", estimatedMinutes: 20, difficulty: 3 }
    ]
  }
]

},
{
     id: "social-justice",
    type: "GS",
    paper: "GS2",
    name: "Social Justice",
    topics: [
  {
    id: "women-in-india",
    name: "Women in India",
    subtopics: [
      { id: "women-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "women-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 30, difficulty: 3 }
    ]
  },
  {
    id: "children-in-india",
    name: "Children in India",
    subtopics: [
      { id: "children-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "children-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "youth-in-india",
    name: "Youth in India",
    subtopics: [
      { id: "youth-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "youth-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "elderly-in-india",
    name: "Elderly in India",
    subtopics: [
      { id: "elderly-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "elderly-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "sc-in-india",
    name: "SC in India",
    subtopics: [
      { id: "sc-challenges-faced", name: "Challenges faced", estimatedMinutes: 25, difficulty: 3 },
      { id: "sc-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 30, difficulty: 3 }
    ]
  },
  {
    id: "st-in-india",
    name: "ST in India",
    subtopics: [
      { id: "st-challenges-faced", name: "Challenges faced", estimatedMinutes: 25, difficulty: 3 },
      { id: "st-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 30, difficulty: 3 }
    ]
  },
  {
    id: "obcs-in-india",
    name: "OBCs in India",
    subtopics: [
      { id: "obcs-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "obcs-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "minorities-in-india",
    name: "Minorities in India",
    subtopics: [
      { id: "minorities-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "minorities-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "pwds-in-india",
    name: "PWDs in India",
    subtopics: [
      { id: "pwds-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "pwds-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "transgenders-in-india",
    name: "Transgenders in India",
    subtopics: [
      { id: "transgenders-challenges-faced", name: "Challenges faced", estimatedMinutes: 20, difficulty: 2 },
      { id: "transgenders-government-schemes-policies", name: "Government schemes and Policies", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "healthcare-infrastructure-in-india",
    name: "Healthcare infrastructure in India",
    subtopics: [
      { id: "indias-health-profile", name: "India's health profile", estimatedMinutes: 15, difficulty: 1 },
      { id: "challenges-to-india-health-care", name: "Challenges to India health care", estimatedMinutes: 25, difficulty: 3 },
      { id: "addressing-challenges-to-issues", name: "Addressing challenges to issues", estimatedMinutes: 20, difficulty: 2 },
      { id: "burden-of-disease", name: "Burden of disease", estimatedMinutes: 20, difficulty: 2 },
      { id: "communicable-and-noncommunicable-diseases", name: "Communicable and noncommunicable diseases", estimatedMinutes: 30, difficulty: 3 },
      { id: "mental-health-care", name: "Mental health care", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "schemes-of-healthcare",
    name: "Schemes of Healthcare",
    subtopics: [
      { id: "national-health-policy", name: "National health policy", estimatedMinutes: 25, difficulty: 3 },
      { id: "ayushmann-bharat", name: "Ayushmann Bharat", estimatedMinutes: 30, difficulty: 3 },
      { id: "national-medical-commission", name: "National Medical Commission", estimatedMinutes: 20, difficulty: 2 },
      { id: "human-resource-for-health", name: "human resource for health", estimatedMinutes: 20, difficulty: 2 },
      { id: "pandemic-preparedness-one-health-policy", name: "pandemic preparedness and one health policy", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "future-of-health",
    name: "Future of Health",
    subtopics: [
      { id: "digital-health-ecosystem", name: "Digital health ecosystem", estimatedMinutes: 20, difficulty: 2 },
      { id: "telemedicine", name: "telemedicine", estimatedMinutes: 15, difficulty: 2 },
      { id: "ai-and-robotics-in-health", name: "AI and robotics in health", estimatedMinutes: 20, difficulty: 3 },
      { id: "medical-tourism", name: "medical tourism", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "education-in-india",
    name: "Education in India",
    subtopics: [
      { id: "early-childhood-care-and-education", name: "Early Childhood care and education", estimatedMinutes: 20, difficulty: 2 },
      { id: "challenges-in-school-education", name: "Challenges in school education", estimatedMinutes: 20, difficulty: 2 },
      { id: "major-government-initiatives", name: "major government initiatives", estimatedMinutes: 30, difficulty: 3 },
      { id: "teachers-training", name: "teachers training", estimatedMinutes: 15, difficulty: 2 },
      { id: "state-of-higher-education", name: "state of higher education", estimatedMinutes: 20, difficulty: 2 },
      { id: "key-issues-in-higher-education", name: "key issues in higher education", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "miscellaneous-topics-for-education",
    name: "Miscellaneous topics for education",
    subtopics: [
      { id: "internationalisation-of-higher-education", name: "Internationalisation of higher education", estimatedMinutes: 15, difficulty: 2 },
      { id: "ai-in-education", name: "AI in education", estimatedMinutes: 20, difficulty: 3 },
      { id: "private-sector-in-education", name: "private sector in education", estimatedMinutes: 20, difficulty: 3 },
      { id: "vocational-education", name: "vocational education", estimatedMinutes: 20, difficulty: 2 },
      { id: "skill-development", name: "Skill development", estimatedMinutes: 25, difficulty: 3 },
      { id: "exam-paper-leak", name: "exam paper leak", estimatedMinutes: 15, difficulty: 2 },
      { id: "national-education-policy", name: "national education policy", estimatedMinutes: 35, difficulty: 4 }
    ]
  },
  {
    id: "poverty-and-development",
    name: "Poverty and Development",
    subtopics: [
      { id: "poverty-in-india", name: "Poverty in India", estimatedMinutes: 20, difficulty: 2 },
      { id: "hunger-and-malnutrition", name: "hunger and malnutrition", estimatedMinutes: 25, difficulty: 3 },
      { id: "govt-response-to-eliminate-poverty", name: "govt response to eliminate poverty", estimatedMinutes: 30, difficulty: 3 },
      { id: "multidimensional-poverty-index", name: "multidimensional poverty index", estimatedMinutes: 25, difficulty: 3 }
    ]
  }
]

},
{
     id: "international-relations",
    type: "GS",
    paper: "GS2",
    name: "International Relations",
    topics: [
  {
    id: "foreign-policy-in-india",
    name: "Foreign Policy in India",
    subtopics: [
      { id: "objective-principles", name: "Objective and Principles", estimatedMinutes: 15, difficulty: 2 },
      { id: "evolution-foreign", name: "Evolution of Foreign Policy", estimatedMinutes: 120, difficulty: 2 },
      { id: "attributes-foreign", name: "India different diplomatic attributes", estimatedMinutes: 40, difficulty: 2 },
      
      { id: "challenges-foreign", name: "Challenges of Foreign Policy", estimatedMinutes: 20, difficulty: 2 },
    ]
  },
  {
    id: "india-and-neighbours",
    name: "India and neighbours",
    subtopics: [
      { id: "intro-significance-challenges", name: "Introduction Significance and Challenges", estimatedMinutes: 60, difficulty: 2 },
      { id: "ind-ban", name: "India Bangladesh", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-pak", name: "India Pakistan", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-sl", name: "India Sri Lanka", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-afg", name: "India Afghanistan", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-chi", name: "India China", estimatedMinutes: 120, difficulty: 2 },
      { id: "ind-bh", name: "India Bhutan", estimatedMinutes: 40, difficulty: 2 },
      { id: "ind-nep", name: "India Nepal", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-myan", name: "India Myanmar", estimatedMinutes: 50, difficulty: 2 },
      { id: "ind-mal", name: "India Maldives", estimatedMinutes: 45, difficulty: 2 },
      { id: "ind-mau", name: "India Mauritius", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "india-extended-neighbourhood",
    name: "India & Extended Neighbourhood",
    subtopics: [
      { id: "ind-seasia", name: "India Southeast Asia", estimatedMinutes: 120, difficulty: 2 },
      { id: "ind-subregionalorg", name: "India and other SE Asia organisations", estimatedMinutes: 30, difficulty: 2 },
    ]
  },
  {
    id: "india-westasia-relation",
    name: "India & West Asia relation",
    subtopics: [
      { id: "ind-west", name: "India West Asia", estimatedMinutes: 40, difficulty: 2 },
      { id: "ind-arabia", name: "India Saudi Arabia", estimatedMinutes: 50, difficulty: 2 },
      { id: "ind-iran", name: "India Iran", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-israel", name: "India Israel", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-uae", name: "India UAE", estimatedMinutes: 50, difficulty: 2 },
      { id: "ind-otherwestasia", name: "India aand Other West Asia countries and Organisations", estimatedMinutes: 80, difficulty: 2 }
    ]
  },
  {
    id: "india-cetralasia",
    name: "India & Central Asia",
    subtopics: [
      { id: "central-asia", name: "India and Central Asia", estimatedMinutes: 150, difficulty: 3 },
    ]
  },
  {
    id: "india-importatcoutry",
    name: "India & Other Important Country",
    subtopics: [
      { id: "ind-USA", name: "India USA", estimatedMinutes: 120, difficulty: 2 },
      { id: "ind-russia", name: "India Russia", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-japan", name: "India Japan", estimatedMinutes: 75, difficulty: 2 },
      { id: "ind-korea", name: "India Korea", estimatedMinutes:30, difficulty: 2 },
      { id: "ind-aus", name: "India Australia", estimatedMinutes: 60, difficulty: 2 },
      { id: "ind-otherimpasia", name: "India and Other important countries", estimatedMinutes: 120, difficulty: 2 }
    ]
  },
  {
    id: "indian-groupigs",
    name: "Indian & Groupings",
    subtopics: [
      { id: "regionalism-multi", name: "Regionalism and Multilateralism", estimatedMinutes: 60, difficulty: 2 },
      { id: "regional-groupings", name: "Regional Groupings", estimatedMinutes: 200, difficulty: 2 },
      { id: "india-indianocean", name: "India and Indian Ocean", estimatedMinutes: 60, difficulty: 2 },
      { id: "multi-export-control", name: "Multilateral Export Control", estimatedMinutes: 60, difficulty: 3 },
      { id: "global-istitutions", name: "Global Institutions", estimatedMinutes: 80, difficulty: 3 },
      { id: "global-diaspora", name: "Global Diaspora", estimatedMinutes: 50, difficulty: 3 },
      { id: "curr-developments-ir", name: "Other Developments", estimatedMinutes: 180, difficulty: 3 },
    ]
  },
]

},
{
     id: "economy",
    type: "GS",
    paper: "GS3",
    name: "Economy",
    topics: [
  {
    id: "money",
    name: "Money",
    subtopics: [
      { id: "barter-system", name: "Barter System", estimatedMinutes: 10, difficulty: 1 },
      { id: "functions-of-money", name: "Functions of Money", estimatedMinutes: 10, difficulty: 2 },
      { id: "evolution-types-money", name: "Evolution and types of Money", estimatedMinutes: 20, difficulty: 2 },
      { id: "fiat-legal-tender", name: "Fiat Money and Legal Tender", estimatedMinutes: 15, difficulty: 2 },
      { id: "demonetization", name: "Demonitization", estimatedMinutes: 10, difficulty: 2 },
      { id: "bank-money", name: "Bank money", estimatedMinutes: 15, difficulty: 2 },
      { id: "digital-payments", name: "Digital Payments", estimatedMinutes: 15, difficulty: 1 },
      { id: "npci", name: "NPCI", estimatedMinutes: 15, difficulty: 2 },
      { id: "upi", name: "UPI", estimatedMinutes: 15, difficulty: 2 },
      { id: "pre-sanctioned-credit-line", name: "Pre-sanctioned credit line", estimatedMinutes: 15, difficulty: 2 },
      { id: "e-rupi", name: "e-RUPI", estimatedMinutes: 15, difficulty: 2 },
      { id: "plastic-money", name: "Plastic Money", estimatedMinutes: 15, difficulty: 1 },
      { id: "merchant-discount-rate", name: "Merchant Discount Rate", estimatedMinutes: 15, difficulty: 3 },
      { id: "global-money-transfer", name: "Global money transfer", estimatedMinutes: 15, difficulty: 2 },
      { id: "digital-payment-regulation", name: "Digital payment regulation", estimatedMinutes: 20, difficulty: 3 },
      { id: "cryptocurrency", name: "Cryptocurrency", estimatedMinutes: 25, difficulty: 3 },
      { id: "cbdc", name: "CBDC", estimatedMinutes: 15, difficulty: 3 },
      { id: "nft", name: "NFT", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "money-demand-and-supply",
    name: "Money Demand and Supply",
    subtopics: [
      { id: "demand-of-money", name: "Demand of money", estimatedMinutes: 15, difficulty: 3 },
      { id: "fixed-timed-deposits", name: "Fixed and Timed deposits", estimatedMinutes: 15, difficulty: 2 },
      { id: "money-supply", name: "Money supply", estimatedMinutes: 30, difficulty: 3 },
      { id: "money-multiplier", name: "Money multiplier", estimatedMinutes: 30, difficulty: 4 },
      { id: "m0-creation-of-money", name: "M0 : creation of money", estimatedMinutes: 20, difficulty: 4 },
      { id: "frbm-act", name: "FRBM act", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "monetary-policy",
    name: "Monetary Policy",
    subtopics: [
      { id: "crr-and-slr", name: "CRR and SLR", estimatedMinutes: 20, difficulty: 3 },
      { id: "net-interest-margin", name: "Net Interest Margin", estimatedMinutes: 20, difficulty: 3 },
      { id: "liquidity-overhang", name: "Liquidity overhang", estimatedMinutes: 20, difficulty: 3 },
      { id: "incremental-crr", name: "Incremental CRR", estimatedMinutes: 20, difficulty: 3 },
      { id: "laf", name: "LAF", estimatedMinutes: 20, difficulty: 3 },
      { id: "repo", name: "REPO", estimatedMinutes: 20, difficulty: 3 },
      { id: "omo", name: "OMO", estimatedMinutes: 20, difficulty: 3 },
      { id: "bond-yield-operation-twist", name: "Bond Yield and Operation twist", estimatedMinutes: 25, difficulty: 4 },
      { id: "qualitative-tools", name: "Qualitative tools", estimatedMinutes: 20, difficulty: 2 },
      { id: "priority-sector-lending", name: "Priority Sector Lending", estimatedMinutes: 25, difficulty: 3 },
      { id: "rbi-stance", name: "RBI stance", estimatedMinutes: 20, difficulty: 3 },
      { id: "bank-lending-rates", name: "Bank lending rates", estimatedMinutes: 25, difficulty: 3 },
      { id: "external-benchmark", name: "External benchmark", estimatedMinutes: 25, difficulty: 3 },
      { id: "limitations-of-monetary-policy", name: "Limitations of monetary policy", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "rbi",
    name: "RBI",
    subtopics: [
      { id: "rbi-compositions", name: "Compositions", estimatedMinutes: 15, difficulty: 2 },
      { id: "rbi-functions", name: "Functions", estimatedMinutes: 25, difficulty: 2 },
      { id: "rbi-portals", name: "Portals", estimatedMinutes: 15, difficulty: 2 },
      { id: "agency-banks", name: "Agency banks", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "schedule-banks",
    name: "Schedule Banks",
    subtopics: [
      { id: "commercial-banks-nationalization", name: "Commercial banks nationalization", estimatedMinutes: 20, difficulty: 2 },
      { id: "consolidation-of-psbs", name: "Consolidation of Public sector banks", estimatedMinutes: 20, difficulty: 2 },
      { id: "commercial-banks", name: "Commercial banks", estimatedMinutes: 15, difficulty: 2 },
      { id: "private-banks", name: "Private banks", estimatedMinutes: 15, difficulty: 2 },
      { id: "foreign-banks", name: "Foreign Banks", estimatedMinutes: 15, difficulty: 2 },
      { id: "small-finance-banks", name: "Small Finance Banks", estimatedMinutes: 20, difficulty: 3 },
      { id: "india-post-payment-banks", name: "India Post Payment Banks", estimatedMinutes: 15, difficulty: 2 },
      { id: "payment-banks", name: "Payment Banks", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "cooperative-banks",
    name: "Cooperative Banks",
    subtopics: [
      { id: "coop-types", name: "Types", estimatedMinutes: 15, difficulty: 2 },
      { id: "urban-cooperative", name: "Urban Cooperative", estimatedMinutes: 20, difficulty: 3 },
      { id: "rural-cooperatives", name: "Rural Cooperatives", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "nbfc",
    name: "NBFC",
    subtopics: [
      { id: "development-finance-institutions", name: "Development finance institutions", estimatedMinutes: 20, difficulty: 3 },
      { id: "nbfc-bad-bank", name: "Bad bank", estimatedMinutes: 20, difficulty: 3 },
      { id: "all-india-finance-institutions", name: "All India Finance institutions", estimatedMinutes: 20, difficulty: 2 },
      { id: "fintech-company", name: "Fintech compan", estimatedMinutes: 15, difficulty: 2 },
      { id: "self-regulatory-organisation", name: "self regulatory organisation", estimatedMinutes: 15, difficulty: 2 },
      { id: "credit-info-company-rating-agency", name: "credit info company and credit rating agency", estimatedMinutes: 20, difficulty: 3 },
      { id: "shadow-banking-nbfc", name: "Shadow banking", estimatedMinutes: 25, difficulty: 3 },
      { id: "informal-financial-intermediary", name: "informal financial intermediary", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "bad-loans-and-npa",
    name: "Bad Loans and NPA",
    subtopics: [
      { id: "loan-types", name: "Loan types", estimatedMinutes: 15, difficulty: 2 },
      { id: "npa-classification", name: "NPA", estimatedMinutes: 25, difficulty: 3 },
      { id: "sarfaesi-act", name: "SARFAESI Act", estimatedMinutes: 30, difficulty: 4 },
      { id: "insolvency-and-bankruptcy-code", name: "Insolvency and bankruptcy code", estimatedMinutes: 35, difficulty: 4 },
      { id: "insolvent-vs-willful-defaulter", name: "Insolvent vs willful defaulter", estimatedMinutes: 20, difficulty: 3 },
      { id: "voluntary-liquidation-companies", name: "Voluntary liquidation of companies", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "credit-rating-and-monitoring",
    name: "Credit Rating and Monitoring",
    subtopics: [
      { id: "national-financial-information-registry", name: "National financial information registry", estimatedMinutes: 15, difficulty: 2 },
      { id: "unified-lending-interface", name: "Unified lending interface", estimatedMinutes: 15, difficulty: 2 },
      { id: "ebkray-auction-platform", name: "EBKRAY auction platform", estimatedMinutes: 15, difficulty: 2 },
      { id: "reserve-bank-innovation-hub", name: "Reserve bank innovation hub", estimatedMinutes: 15, difficulty: 2 },
      { id: "legal-entity-identifier", name: "Legal entity identifier", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "bad-banks",
    name: "Bad Banks",
    subtopics: [
      { id: "dicgc-act", name: "DICGC Act", estimatedMinutes: 20, difficulty: 3 },
      { id: "badbank-structure", name: "Badbank", estimatedMinutes: 25, difficulty: 3 },
      { id: "prompt-corrective-action", name: "prompt corrective action", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "basel-norms",
    name: "Basel Norms",
    subtopics: [
      { id: "crar", name: "CRAR", estimatedMinutes: 30, difficulty: 4 },
      { id: "basel-iii-norms", name: "Basel iii norms", estimatedMinutes: 35, difficulty: 4 },
      { id: "recapitalization-psbs", name: "Recapitalization Public sector banks", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "bank-governance",
    name: "Bank Governance",
    subtopics: [
      { id: "bank-board-bureau-fsib", name: "Bank board bureau And FSIB", estimatedMinutes: 20, difficulty: 2 },
      { id: "shadow-banking-gov", name: "Shadow banking", estimatedMinutes: 20, difficulty: 3 },
      { id: "pnb-swift-nirav-modi", name: "PNB Swift and Nirav Modi", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "capital-and-securities",
    name: "Capital and Securities",
    subtopics: [
      { id: "capital-types", name: "Capital types", estimatedMinutes: 20, difficulty: 2 },
      { id: "debt-instruments", name: "Debt instruments", estimatedMinutes: 25, difficulty: 3 },
      { id: "short-term-debt-instruments", name: "Short term debt instruments", estimatedMinutes: 20, difficulty: 3 },
      { id: "interest-rate-benchmarks", name: "Interest rate benchmarks", estimatedMinutes: 25, difficulty: 4 },
      { id: "long-term-debt-instruments", name: "long term debt instruments", estimatedMinutes: 20, difficulty: 3 },
      { id: "bond-issued-by-government", name: "Bond issued by government", estimatedMinutes: 25, difficulty: 3 },
      { id: "long-term-debt-companies", name: "long term debt instruments by companies", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "bonds",
    name: "Bonds",
    subtopics: [
      { id: "bond-types", name: "Bond types", estimatedMinutes: 25, difficulty: 3 },
      { id: "long-term-special-purpose-bonds", name: "Long term special purpose bonds", estimatedMinutes: 20, difficulty: 3 },
      { id: "electoral-bond", name: "electoral bond", estimatedMinutes: 20, difficulty: 2 },
      { id: "miscellaneous-bonds", name: "miscellaneous bonds", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "equity",
    name: "Equity",
    subtopics: [
      { id: "equity-instruments", name: "Equity instruments", estimatedMinutes: 20, difficulty: 3 },
      { id: "account-types", name: "account types", estimatedMinutes: 15, difficulty: 2 },
      { id: "ratio-compare-companies", name: "Ratio to compare the companies", estimatedMinutes: 30, difficulty: 4 },
      { id: "method-issuing-shares", name: "Method of issuing shares", estimatedMinutes: 20, difficulty: 3 },
      { id: "central-counterparties", name: "Central counterparties", estimatedMinutes: 20, difficulty: 3 },
      { id: "types-of-investors", name: "types of investors", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "stock-market",
    name: "Stock market",
    subtopics: [
      { id: "sensex-other-indices", name: "Sensex and other indices", estimatedMinutes: 20, difficulty: 2 },
      { id: "market-theories", name: "market theories", estimatedMinutes: 25, difficulty: 3 },
      { id: "alpha-and-beta-values", name: "alpha and beta values", estimatedMinutes: 25, difficulty: 4 },
      { id: "sebi-reforms", name: "sebi reforms", estimatedMinutes: 20, difficulty: 3 },
      { id: "adani-hindenburg", name: "Adani Hindenburg", estimatedMinutes: 15, difficulty: 2 },
      { id: "arbitrage-concepts", name: "arbitrage and concepts", estimatedMinutes: 30, difficulty: 4 },
      { id: "online-trading-platforms", name: "online trading platforms", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "investment-and-mutual-funds",
    name: "Investment and Mutual Funds",
    subtopics: [
      { id: "mutual-funds", name: "Mutual funds", estimatedMinutes: 20, difficulty: 2 },
      { id: "hedge-funds", name: "hedge funds", estimatedMinutes: 20, difficulty: 3 },
      { id: "exchange-credit-funds", name: "exchange credit funds", estimatedMinutes: 20, difficulty: 3 },
      { id: "alternative-investment-funds", name: "alternative investment funds", estimatedMinutes: 20, difficulty: 3 },
      { id: "forward-contracts-options", name: "forward contracts and options", estimatedMinutes: 35, difficulty: 4 },
      { id: "derivatives-swaps", name: "derivatives and swaps", estimatedMinutes: 35, difficulty: 4 },
      { id: "commodity-market", name: "commodity market", estimatedMinutes: 20, difficulty: 3 },
      { id: "tax-on-investment", name: "Tax on investment", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "organsations-and-laws",
    name: "Organsations and Laws",
    subtopics: [
      { id: "sebi", name: "SEBI", estimatedMinutes: 20, difficulty: 2 },
      { id: "fsdc", name: "Financial stability and development council", estimatedMinutes: 20, difficulty: 3 },
      { id: "corporate-governance", name: "Corporate governance", estimatedMinutes: 20, difficulty: 3 },
      { id: "company-types", name: "Company types", estimatedMinutes: 20, difficulty: 2 },
      { id: "csr", name: "Corporate social responsibility", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "insurance",
    name: "Insurance",
    subtopics: [
      { id: "history-of-insurance", name: "History of insurance", estimatedMinutes: 15, difficulty: 1 },
      { id: "life-insurance-types", name: "life insurance types", estimatedMinutes: 20, difficulty: 2 },
      { id: "lic", name: "LIC", estimatedMinutes: 15, difficulty: 2 },
      { id: "general-insurance", name: "general insurance", estimatedMinutes: 15, difficulty: 2 },
      { id: "health-insurance-schemes", name: "health insurance schemes", estimatedMinutes: 20, difficulty: 2 },
      { id: "general-insurance-other-than-health", name: "General insurance other than health", estimatedMinutes: 15, difficulty: 2 },
      { id: "irdai", name: "IRDAI", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "pension",
    name: "Pension",
    subtopics: [
      { id: "epfo", name: "Epfo", estimatedMinutes: 20, difficulty: 2 },
      { id: "gov-schemes-epfo", name: "Government schemes for EPFO", estimatedMinutes: 20, difficulty: 2 },
      { id: "employment-link-incentive", name: "Employment link incentive scheme", estimatedMinutes: 20, difficulty: 2 },
      { id: "gov-employees-pension", name: "government employees pension", estimatedMinutes: 20, difficulty: 2 },
      { id: "unified-pension-scheme", name: "unified pension scheme", estimatedMinutes: 25, difficulty: 3 },
      { id: "mps-private-person", name: "mps for private person", estimatedMinutes: 15, difficulty: 2 },
      { id: "senior-citizen-pension", name: "Senior citizen pension", estimatedMinutes: 15, difficulty: 2 },
      { id: "pfrda", name: "Pfrda", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "financial-inclusion",
    name: "Financial Inclusion",
    subtopics: [
      { id: "financial-inclusion-intro", name: "Financial inclusion", estimatedMinutes: 20, difficulty: 2 },
      { id: "investment-other-than-bank", name: "Investment other than bank", estimatedMinutes: 15, difficulty: 2 },
      { id: "loan-fi", name: "Loan", estimatedMinutes: 15, difficulty: 2 },
      { id: "mudra", name: "Mudra", estimatedMinutes: 20, difficulty: 2 },
      { id: "vishva-karma-scheme", name: "Vishva Karma is scheme", estimatedMinutes: 20, difficulty: 2 },
      { id: "insurance-financial-inclusion", name: "Insurance for financial inclusion", estimatedMinutes: 15, difficulty: 2 },
      { id: "pension-financial-inclusion", name: "pension for financial inclusion", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "budget",
    name: "Budget",
    subtopics: [
      { id: "fiscal-policy-budget", name: "Fiscal policy", estimatedMinutes: 25, difficulty: 3 },
      { id: "budget-process", name: "Budget", estimatedMinutes: 25, difficulty: 3 },
      { id: "finance-ministry-dept", name: "Financial ministry and department", estimatedMinutes: 20, difficulty: 2 },
      { id: "types-of-budget", name: "Types of budget", estimatedMinutes: 20, difficulty: 3 },
      { id: "gender-budget", name: "gender budget", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "direct-tax",
    name: "Direct Tax",
    subtopics: [
      { id: "types-of-tax", name: "Types of tax", estimatedMinutes: 15, difficulty: 2 },
      { id: "types-direct-tax", name: "types of direct tax", estimatedMinutes: 20, difficulty: 2 },
      { id: "merits-demerits-direct-tax", name: "Merit Sandy Merits of direct tax", estimatedMinutes: 20, difficulty: 3 },
      { id: "cess-and-surcharge", name: "sis and surcharge", estimatedMinutes: 20, difficulty: 3 },
      { id: "corporation-tax", name: "Corporation tax", estimatedMinutes: 20, difficulty: 3 },
      { id: "mat", name: "minimum alternate tax", estimatedMinutes: 25, difficulty: 4 },
      { id: "google-tax", name: "Google text", estimatedMinutes: 20, difficulty: 3 },
      { id: "ddt", name: "dividend distribution tax", estimatedMinutes: 20, difficulty: 3 },
      { id: "capital-gains-tax", name: "capital gains tax", estimatedMinutes: 25, difficulty: 3 },
      { id: "income-tax", name: "income tax", estimatedMinutes: 20, difficulty: 2 },
      { id: "tds-tcs", name: "tds tcs", estimatedMinutes: 20, difficulty: 3 },
      { id: "tax-refund", name: "tax refund", estimatedMinutes: 15, difficulty: 2 },
      { id: "tobin-tax", name: "Tobin tax", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "indirect-tax",
    name: "Indirect tax",
    subtopics: [
      { id: "indirect-tax-types", name: "Indirect tax types", estimatedMinutes: 20, difficulty: 2 },
      { id: "indirect-tax-merits-demerits", name: "indirect tax merits and demerits", estimatedMinutes: 20, difficulty: 3 },
      { id: "pigovian-tax", name: "pigobean tax", estimatedMinutes: 20, difficulty: 3 },
      { id: "issues-indirect-tax", name: "Issues related to indirect tax", estimatedMinutes: 20, difficulty: 3 },
      { id: "gst", name: "Gst", estimatedMinutes: 30, difficulty: 3 },
      { id: "input-tax-credit", name: "Input tax credit", estimatedMinutes: 30, difficulty: 4 },
      { id: "gst-council-tax", name: "GST Council", estimatedMinutes: 20, difficulty: 2 },
      { id: "gst-rates", name: "GST rates", estimatedMinutes: 15, difficulty: 2 },
      { id: "gst-2-0-intro", name: "gst 2.0 intro", estimatedMinutes: 20, difficulty: 3 },
      { id: "gst-2-0-origin", name: "gst 2.0 origin", estimatedMinutes: 15, difficulty: 2 },
      { id: "gst-2-0-criticism", name: "gst 2.0 criticism", estimatedMinutes: 20, difficulty: 3 },
      { id: "reverse-charge-mechanism", name: "Reverse charge mechanism", estimatedMinutes: 25, difficulty: 4 },
      { id: "gst-benefits", name: "GST benefits", estimatedMinutes: 15, difficulty: 2 },
      { id: "gst-related-orgs", name: "gst related organisation", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "black-money",
    name: "Black Money",
    subtopics: [
      { id: "black-money-intro", name: "Black money", estimatedMinutes: 15, difficulty: 2 },
      { id: "tax-evasion", name: "tax evasion", estimatedMinutes: 15, difficulty: 2 },
      { id: "pmla-act", name: "PMLA act", estimatedMinutes: 25, difficulty: 3 },
      { id: "tax-avoidance", name: "Tax avoidance", estimatedMinutes: 20, difficulty: 3 },
      { id: "gov-announcement-tax-evasion", name: "Government announcement for tax evasion", estimatedMinutes: 15, difficulty: 2 },
      { id: "retrospective-tax", name: "retrospective tax", estimatedMinutes: 25, difficulty: 3 },
      { id: "global-minimum-tax", name: "global minimum tax", estimatedMinutes: 25, difficulty: 3 },
      { id: "reforms-tax-terrorism", name: "reforms to reduce tax terrorism", estimatedMinutes: 20, difficulty: 3 },
      { id: "direct-tax-code", name: "direct tax code", estimatedMinutes: 20, difficulty: 3 },
      { id: "global-treaties-taxation", name: "global treaties and agreements for taxation", estimatedMinutes: 20, difficulty: 3 },
      { id: "black-money-demonetization", name: "Black money and demonetization", estimatedMinutes: 20, difficulty: 2 },
      { id: "revenue-shortfall", name: "revenue shortfall", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "fiscal-policy",
    name: "Fiscal Policy",
    subtopics: [
      { id: "revenue-expenditure", name: "Revenue expenditure", estimatedMinutes: 20, difficulty: 3 },
      { id: "capital-receipt", name: "Capital receipt", estimatedMinutes: 20, difficulty: 3 },
      { id: "capital-expenditure", name: "capital expenditure", estimatedMinutes: 20, difficulty: 3 },
      { id: "revenue-receipt", name: "revenue receipt", estimatedMinutes: 20, difficulty: 3 },
      { id: "types-of-deficit", name: "Types of deficit", estimatedMinutes: 25, difficulty: 3 },
      { id: "revenue-deficit", name: "Revenue deficit", estimatedMinutes: 20, difficulty: 3 },
      { id: "effective-revenue-deficit", name: "Effective revenue deficit", estimatedMinutes: 25, difficulty: 4 },
      { id: "financing-the-deficit", name: "Financing the deficit", estimatedMinutes: 30, difficulty: 4 },
      { id: "counters-cyclical-policy", name: "counters cyclical policy", estimatedMinutes: 30, difficulty: 4 },
      { id: "fiscal-stimulus", name: "Fiscal stimulus", estimatedMinutes: 25, difficulty: 3 },
      { id: "frbm-act-fiscal", name: "FRBM Act", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "balance-of-payments",
    name: "Balance of Payments",
    subtopics: [
      { id: "types-of-economies", name: "Types of economies", estimatedMinutes: 15, difficulty: 2 },
      { id: "modes-int-business", name: "Modes and types of international business", estimatedMinutes: 20, difficulty: 2 },
      { id: "bop-concept", name: "Balance of payment", estimatedMinutes: 35, difficulty: 4 },
      { id: "top-import-export", name: "top import and export", estimatedMinutes: 15, difficulty: 2 },
      { id: "reports-indices", name: "reports and indices", estimatedMinutes: 15, difficulty: 2 },
      { id: "remittance", name: "remittance", estimatedMinutes: 15, difficulty: 2 },
      { id: "import-oil", name: "Import of oil", estimatedMinutes: 15, difficulty: 2 },
      { id: "import-gold", name: "import of gold", estimatedMinutes: 15, difficulty: 2 },
      { id: "gi-tag", name: "GI tag", estimatedMinutes: 15, difficulty: 2 },
      { id: "sez", name: "SEZ", estimatedMinutes: 20, difficulty: 3 },
      { id: "foreign-trade-policy", name: "Foreign trade policy", estimatedMinutes: 20, difficulty: 3 },
      { id: "export-improvement", name: "Export improvement", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "capital-account-bop",
    name: "Capital Account BOP",
    subtopics: [
      { id: "fdi", name: "FDI", estimatedMinutes: 25, difficulty: 3 },
      { id: "fpi", name: "FPI", estimatedMinutes: 25, difficulty: 3 },
      { id: "foreign-investments", name: "Foreign investments", estimatedMinutes: 20, difficulty: 3 },
      { id: "gift-city", name: "gift city", estimatedMinutes: 20, difficulty: 2 },
      { id: "external-debt", name: "External debt", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "forex",
    name: "Forex",
    subtopics: [
      { id: "india-bop-crisis", name: "India balance of payment crisis", estimatedMinutes: 25, difficulty: 3 },
      { id: "foreign-exchange-reserve", name: "Foreign exchange reserve", estimatedMinutes: 20, difficulty: 3 },
      { id: "currency-exchange-rate", name: "Currency exchange rate", estimatedMinutes: 30, difficulty: 4 },
      { id: "exchange-rate-theory", name: "exchange rate theory", estimatedMinutes: 35, difficulty: 4 },
      { id: "exchange-rate-regime", name: "Exchange rate regime", estimatedMinutes: 25, difficulty: 3 },
      { id: "sdr", name: "Special drawing rights", estimatedMinutes: 25, difficulty: 3 },
      { id: "currency-convertibility", name: "Currency convertibility", estimatedMinutes: 25, difficulty: 4 },
      { id: "currency-swap", name: "Currency swap", estimatedMinutes: 25, difficulty: 3 },
      { id: "de-dollarization", name: "Toleration and de dollarization", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "world-bank",
    name: "World Bank",
    subtopics: [
      { id: "bretton-woods", name: "Britain would", estimatedMinutes: 20, difficulty: 2 },
      { id: "multilateral-development-bank", name: "Multilateral development bank", estimatedMinutes: 20, difficulty: 2 },
      { id: "imf", name: "IMF", estimatedMinutes: 25, difficulty: 3 },
      { id: "world-bank-org", name: "World Bank", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "wto",
    name: "WTO",
    subtopics: [
      { id: "world-trade-organisation", name: "World trade organisation", estimatedMinutes: 20, difficulty: 2 },
      { id: "wto-functions", name: "functions", estimatedMinutes: 20, difficulty: 2 },
      { id: "non-tariff-barriers", name: "non tariff barriers", estimatedMinutes: 25, difficulty: 3 },
      { id: "technical-barriers", name: "technical barriers", estimatedMinutes: 25, difficulty: 3 },
      { id: "notable-agreements", name: "Notable agreements", estimatedMinutes: 30, difficulty: 3 },
      { id: "disputes-involving-india", name: "disputes involving India", estimatedMinutes: 25, difficulty: 3 },
      { id: "negotiation-summit-packages", name: "negotiation summit and packages", estimatedMinutes: 25, difficulty: 3 },
      { id: "ministerial-conferences", name: "ministerial conferences", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "international-trade",
    name: "International Trade",
    subtopics: [
      { id: "fta-current", name: "FTA current", estimatedMinutes: 20, difficulty: 3 },
      { id: "burning-issues-int-trade", name: "Burning issues in international trade", estimatedMinutes: 25, difficulty: 3 },
      { id: "usa-list-related-trade", name: "USA list related to trade", estimatedMinutes: 20, difficulty: 3 },
      { id: "mekong-ganga-corp", name: "Mekong Gandhab Corporation", estimatedMinutes: 15, difficulty: 2 },
      { id: "brics", name: "BRICS", estimatedMinutes: 20, difficulty: 2 },
      { id: "g20", name: "G20", estimatedMinutes: 20, difficulty: 2 },
      { id: "g7", name: "G7", estimatedMinutes: 15, difficulty: 2 },
      { id: "mineral-groups", name: "Mineral related groups", estimatedMinutes: 20, difficulty: 2 },
      { id: "oil-groups", name: "Oil groups", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "agriculture-inputs",
    name: "Agriculture Inputs",
    subtopics: [
      { id: "agri-intro", name: "Introduction", estimatedMinutes: 15, difficulty: 1 },
      { id: "cooperative-society-agri", name: "cooperative society", estimatedMinutes: 20, difficulty: 2 },
      { id: "land", name: "Land", estimatedMinutes: 20, difficulty: 2 },
      { id: "seeds", name: "seeds", estimatedMinutes: 20, difficulty: 2 },
      { id: "water-irrigation", name: "water irrigation", estimatedMinutes: 20, difficulty: 2 },
      { id: "fertilizer", name: "Fataliser", estimatedMinutes: 25, difficulty: 3 },
      { id: "pesticide-weedicide", name: "Pesticide and VD side", estimatedMinutes: 20, difficulty: 2 },
      { id: "zbnf-organic", name: "Zero budget natural farming and organic farming", estimatedMinutes: 25, difficulty: 3 },
      { id: "farm-mechanisation", name: "farm mechanisation", estimatedMinutes: 20, difficulty: 2 },
      { id: "agri-loans", name: "loans", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "agriculture-outputs",
    name: "Agriculture Outputs",
    subtopics: [
      { id: "apmc", name: "APMC", estimatedMinutes: 25, difficulty: 3 },
      { id: "enam", name: "E agriculture market", estimatedMinutes: 20, difficulty: 2 },
      { id: "msp", name: "Msp", estimatedMinutes: 30, difficulty: 3 },
      { id: "pm-asha", name: "PM Asha", estimatedMinutes: 25, difficulty: 3 },
      { id: "fci", name: "Food Corporation of India", estimatedMinutes: 25, difficulty: 3 },
      { id: "pds", name: "PDS", estimatedMinutes: 25, difficulty: 3 },
      { id: "pm-kisan", name: "PM Kisan", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "food-inflation",
    name: "Food inflation",
    subtopics: [
      { id: "food-inflation-onion-veg", name: "Food inflation in onion and vegetables", estimatedMinutes: 20, difficulty: 3 },
      { id: "gov-initiatives-inflation", name: "government initiatives", estimatedMinutes: 20, difficulty: 2 },
      { id: "inflation-in-oil", name: "inflation in oil", estimatedMinutes: 20, difficulty: 3 },
      { id: "essential-commodity-act", name: "essential commodity act", estimatedMinutes: 25, difficulty: 3 },
      { id: "agri-production-processing", name: "Agriculture production and processing", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "food-processing",
    name: "Food Processing",
    subtopics: [
      { id: "animal-husbandry", name: "Animal husbandry", estimatedMinutes: 20, difficulty: 2 },
      { id: "fisheries", name: "Fisheries", estimatedMinutes: 20, difficulty: 2 },
      { id: "food-processing-sector", name: "Food processing", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    subtopics: [
      { id: "lpg-reforms", name: "Liberalisation privatisation globalisation", estimatedMinutes: 25, difficulty: 3 },
      { id: "4th-industrial-revolution", name: "4th industrial revolution", estimatedMinutes: 20, difficulty: 2 },
      { id: "circular-economy", name: "circular economy", estimatedMinutes: 20, difficulty: 2 },
      { id: "national-manufacturing-policy", name: "national manufacturing policy", estimatedMinutes: 20, difficulty: 3 },
      { id: "industrial-corridor", name: "industrial corridor", estimatedMinutes: 20, difficulty: 2 },
      { id: "make-in-india", name: "make in India", estimatedMinutes: 20, difficulty: 2 },
      { id: "assemble-in-india", name: "assemble in India", estimatedMinutes: 15, difficulty: 2 },
      { id: "startup-india", name: "startup India", estimatedMinutes: 15, difficulty: 2 },
      { id: "national-policy-electronics", name: "national policy and electronics", estimatedMinutes: 20, difficulty: 3 },
      { id: "semiconductors-mfg", name: "semiconductors", estimatedMinutes: 25, difficulty: 3 },
      { id: "ipr", name: "Intellectual property right", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "ease-of-doing-business-and-labour-laws",
    name: "Ease of doing business and labour laws",
    subtopics: [
      { id: "ease-of-doing-business", name: "Ease of doing business", estimatedMinutes: 20, difficulty: 2 },
      { id: "labour-reforms", name: "labour reforms", estimatedMinutes: 25, difficulty: 3 },
      { id: "4-labour-codes", name: "4 labour codes", estimatedMinutes: 30, difficulty: 4 },
      { id: "minimum-wages", name: "minimum wages", estimatedMinutes: 20, difficulty: 3 },
      { id: "industrial-dispute-act", name: "industrial dispute act", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "textile-and-msme",
    name: "Textile and MSME",
    subtopics: [
      { id: "textile-ministry", name: "Textile ministry", estimatedMinutes: 15, difficulty: 2 },
      { id: "msme-sector", name: "Msme", estimatedMinutes: 20, difficulty: 3 },
      { id: "odop", name: "one district one product", estimatedMinutes: 15, difficulty: 2 },
      { id: "initiatives-for-msme", name: "initiatives for MSME", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "service-sector",
    name: "Service Sector",
    subtopics: [
      { id: "service-sector-intro", name: "Service sector", estimatedMinutes: 20, difficulty: 2 },
      { id: "orange-economy", name: "Orange economy", estimatedMinutes: 15, difficulty: 2 },
      { id: "sunrise-sector", name: "sunrise sector", estimatedMinutes: 15, difficulty: 2 },
      { id: "ecommerce", name: "ecommerce", estimatedMinutes: 20, difficulty: 2 },
      { id: "quality-standards-bodies", name: "Bodies for quality standards", estimatedMinutes: 20, difficulty: 3 },
      { id: "consumer-protection-act", name: "consumer Protection Act", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "economic-planning",
    name: "Economic Planning",
    subtopics: [
      { id: "economic-systems", name: "Economic systems", estimatedMinutes: 20, difficulty: 2 },
      { id: "economic-planning-intro", name: "economic planning", estimatedMinutes: 25, difficulty: 3 },
      { id: "industrial-policy-resolution", name: "industrial policy Resolution", estimatedMinutes: 25, difficulty: 3 },
      { id: "planning-commission-plann", name: "Planning Commission", estimatedMinutes: 20, difficulty: 2 },
      { id: "neeti-aayog", name: "Neeti Aayog", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "unemployement",
    name: "Unemployement",
    subtopics: [
      { id: "indicators-of-unemployment", name: "Indicators of unemployment", estimatedMinutes: 20, difficulty: 3 },
      { id: "ilo", name: "International Labour organisation", estimatedMinutes: 15, difficulty: 2 },
      { id: "wage-theory", name: "wage theory", estimatedMinutes: 25, difficulty: 4 },
      { id: "types-of-unemployment", name: "types of unemployment", estimatedMinutes: 20, difficulty: 3 },
      { id: "plfs", name: "periodic labour force survey", estimatedMinutes: 25, difficulty: 3 },
      { id: "worker-types", name: "worker types", estimatedMinutes: 15, difficulty: 2 },
      { id: "gig-worker", name: "gig worker", estimatedMinutes: 20, difficulty: 2 },
      { id: "ai-and-unemployment", name: "AI and Unemployment", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "national-income",
    name: "National Income",
    subtopics: [
      { id: "gdp-via-expenditure", name: "GDP Calculation Via expenditure", estimatedMinutes: 30, difficulty: 4 },
      { id: "gdp-via-production", name: "gdp via production", estimatedMinutes: 30, difficulty: 4 },
      { id: "gdp-via-income", name: "gdp via income", estimatedMinutes: 30, difficulty: 4 },
      { id: "growth-rate-and-deflator", name: "growth rate and deflator", estimatedMinutes: 30, difficulty: 4 },
      { id: "new-base", name: "new base", estimatedMinutes: 20, difficulty: 3 },
      { id: "economic-cycle", name: "Economic cycle", estimatedMinutes: 25, difficulty: 3 },
      { id: "5-trillion-economy", name: "5 trillion economy", estimatedMinutes: 15, difficulty: 2 },
      { id: "challenges-to-gdp", name: "Challenges to GDP", estimatedMinutes: 20, difficulty: 3 },
      { id: "national-income-concepts", name: "National income", estimatedMinutes: 25, difficulty: 3 },
      { id: "other-measures-ni", name: "Other measures of National income", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "inflation",
    name: "Inflation",
    subtopics: [
      { id: "inflation-types", name: "Inflation types", estimatedMinutes: 25, difficulty: 3 },
      { id: "inflation-base-effect", name: "Inflation base effect", estimatedMinutes: 25, difficulty: 4 },
      { id: "cpi", name: "CPI", estimatedMinutes: 25, difficulty: 3 },
      { id: "wpi", name: "wpi", estimatedMinutes: 25, difficulty: 3 },
      { id: "iip", name: "Index of industrial production", estimatedMinutes: 20, difficulty: 3 },
      { id: "index-of-eight-core-industries", name: "index of eight core industries", estimatedMinutes: 20, difficulty: 2 },
      { id: "household-consumption-exp-survey", name: "household consumption expenditure survey", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "infrastructure-mining",
    name: "Infrastructure Mining",
    subtopics: [
      { id: "mining-infrastructure", name: "Mining infrastructure", estimatedMinutes: 20, difficulty: 2 },
      { id: "royalty-rates", name: "Royalty rates", estimatedMinutes: 20, difficulty: 3 },
      { id: "mmdr-amendment", name: "MMDR Amendment", estimatedMinutes: 25, difficulty: 3 },
      { id: "critical-minerals-infra", name: "Critical Minerals", estimatedMinutes: 20, difficulty: 3 },
      { id: "offshore-area-mineral", name: "offshore area mineral", estimatedMinutes: 20, difficulty: 3 },
      { id: "coal-mining", name: "Coal", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "energy-and-electricity",
    name: "Energy and electricity",
    subtopics: [
      { id: "national-electricity-dist-company", name: "National electricity distribution company", estimatedMinutes: 20, difficulty: 3 },
      { id: "one-nation-one-grid", name: "1 nation 1 grid", estimatedMinutes: 20, difficulty: 2 },
      { id: "ipds", name: "Integrated power development scheme", estimatedMinutes: 20, difficulty: 3 },
      { id: "schemes-electricity", name: "Schemes related to electricity", estimatedMinutes: 20, difficulty: 2 },
      { id: "green-credit-programme", name: "Green credit programme", estimatedMinutes: 20, difficulty: 3 },
      { id: "led-renewable-programmes", name: "LED programme Next Renewable energy programmes", estimatedMinutes: 25, difficulty: 3 },
      { id: "fossil-fuel", name: "fossil fuel", estimatedMinutes: 15, difficulty: 2 },
      { id: "atomic-energy", name: "Atomic energy", estimatedMinutes: 20, difficulty: 3 },
      { id: "swachh-bharat-mission", name: "Swachh Bharat Mission", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "water-transport-infrastructure",
    name: "Water transport infrastructure",
    subtopics: [
      { id: "inland-waterways", name: "Inland waterways", estimatedMinutes: 20, difficulty: 3 },
      { id: "shipping", name: "shipping", estimatedMinutes: 15, difficulty: 2 },
      { id: "ports", name: "ports", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "road-and-railway",
    name: "Road and railway",
    subtopics: [
      { id: "nhai", name: "NHAI", estimatedMinutes: 15, difficulty: 2 },
      { id: "pmgsy", name: "Pradhan Mantri Gramme Sadak Yojana", estimatedMinutes: 20, difficulty: 2 },
      { id: "electric-vehicle", name: "Electric vehicle", estimatedMinutes: 20, difficulty: 2 },
      { id: "motor-vehicle-amendment-act", name: "motor vehicle amendment act", estimatedMinutes: 25, difficulty: 3 },
      { id: "bridges-and-tunnel", name: "bridges and tunnel", estimatedMinutes: 15, difficulty: 2 },
      { id: "obor", name: "1 belt one road", estimatedMinutes: 20, difficulty: 3 },
      { id: "railway-corporations", name: "Railway corporations", estimatedMinutes: 15, difficulty: 2 },
      { id: "railway-reforms", name: "Railway reforms", estimatedMinutes: 25, difficulty: 3 },
      { id: "railway-modernization", name: "railway modernization", estimatedMinutes: 20, difficulty: 2 },
      { id: "aviation-policy", name: "Aviation policy", estimatedMinutes: 20, difficulty: 3 },
      { id: "udaan-scheme", name: "Udaan scheme", estimatedMinutes: 20, difficulty: 2 },
      { id: "scheme-aviation", name: "scheme related to aviation", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "tourism",
    name: "Tourism",
    subtopics: [
      { id: "ministry-of-tourism", name: "Ministry of tourism", estimatedMinutes: 15, difficulty: 2 },
      { id: "prasad-and-hriday", name: "Prasad and HRIDAY", estimatedMinutes: 20, difficulty: 2 },
      { id: "dharamsala-declaration", name: "Dharamsala declaration", estimatedMinutes: 15, difficulty: 2 },
      { id: "medical-tourism-eco", name: "Medical tourism", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "urban",
    name: "Urban",
    subtopics: [
      { id: "urban-definition", name: "Urban definition", estimatedMinutes: 15, difficulty: 2 },
      { id: "amrut-mission", name: "Amrut mission", estimatedMinutes: 20, difficulty: 2 },
      { id: "smart-city-mission", name: "Smart City mission", estimatedMinutes: 20, difficulty: 2 },
      { id: "housing-for-all", name: "housing for all", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "rural",
    name: "Rural",
    subtopics: [
      { id: "rashtriya-gram-swaraj-abhiyan", name: "Rashtriya Gramme Swaraj Abhiyan", estimatedMinutes: 20, difficulty: 2 },
      { id: "mplads", name: "MPLADS", estimatedMinutes: 25, difficulty: 3 },
      { id: "adarsh-gram-yojana", name: "Adarsh Gramme Yojana", estimatedMinutes: 15, difficulty: 2 },
      { id: "badp", name: "border area development programme", estimatedMinutes: 20, difficulty: 2 },
      { id: "disaster-strategic-affairs", name: "disaster and Strategic Affairs", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "ppp-model",
    name: "PPP Model",
    subtopics: [
      { id: "private-public-partnership", name: "Private public partnership", estimatedMinutes: 25, difficulty: 3 },
      { id: "infrastructure-funds", name: "infrastructure funds", estimatedMinutes: 20, difficulty: 3 },
      { id: "nip", name: "national infrastructure pipeline", estimatedMinutes: 25, difficulty: 3 },
      { id: "gati-sakti", name: "Gati Sakti", estimatedMinutes: 25, difficulty: 3 },
      { id: "types-of-ppp", name: "types of ppp", estimatedMinutes: 30, difficulty: 4 }
    ]
  }
]
},

{
     id: "environment",
    type: "GS",
    paper: "GS3",
    name: "Environment & Ecology",
    topics: [
  {
    id: "environment-basics",
    name: "Environment",
    subtopics: [
      { id: "environment-basics", name: "Environment Basics", estimatedMinutes: 40, difficulty: 1 },
      { id: "componets-ecosystem", name: "Components of Ecosystme", estimatedMinutes: 40, difficulty: 1 },
    ]
  },
  {
    id: "ecology",
    name: "Ecology",
    subtopics: [
      { id: "level-of-organisations", name: "Level of organisations", estimatedMinutes: 60, difficulty: 2 },
      { id: "principles-of-ecology", name: "Principles of Ecology", estimatedMinutes: 60, difficulty: 2 },
    ]
  },
  {
    id: "ecosystem-functions",
    name: "Ecosystem Functions",
    subtopics: [
      { id: "homeostasis", name: "Homeostasis", estimatedMinutes: 15, difficulty: 2 },
      { id: "ecological-sucession", name: "Ecological Sucession", estimatedMinutes: 20, difficulty: 3 },
      { id: "trophic-levels", name: "Trophic Levels", estimatedMinutes: 60, difficulty: 1 },
      { id: "biochemical-cycles", name: "Biochemical Cycles", estimatedMinutes: 80, difficulty: 1 },
    ]
  },
  
  {
    id: "natural-ecosystems",
    name: "Natural Ecosystems",
    subtopics: [
      { id: "terrestrial-ecosystem", name: "Terrestrial Ecosystems", estimatedMinutes: 80, difficulty: 2 },
      { id: "aquatic-ecosystem", name: "Aquatic Ecosystems", estimatedMinutes: 70, difficulty: 2 },
      { id: "eco-services", name: "Ecosystem Services", estimatedMinutes: 30, difficulty: 2 },
      ]
  },

  {
    id: "wetland-ecosystem",
    name: "Wetland ecosystem",
    subtopics: [
      { id: "estuarine-wetland", name: "Estuarine Wetland", estimatedMinutes: 40, difficulty: 2 },
      { id: "mangroves-wetland", name: "Mangroves", estimatedMinutes: 90, difficulty: 2 },
      { id: "importance-measures-wetland", name: "Importance and Measures for Wetland", estimatedMinutes: 90, difficulty: 2 },
    ]
  },
  {
    id: "biodiversity",
    name: "Biodiversity",
    subtopics: [
      { id: "biodiversity-terms", name: "Biodiversity Terms", estimatedMinutes: 45, difficulty: 1 },
      { id: "biodiversity-hotspots", name: "Biodiversity hotspots", estimatedMinutes: 25, difficulty: 3 },
      { id: "biod-india", name: "Biodiversity of India", estimatedMinutes: 60, difficulty: 2 },
      { id: "biodiversity-loss", name: "Biodiversity Loss", estimatedMinutes: 25, difficulty: 3 },
      { id: "biodiversity-loss-cause", name: "Biodiversity Loss Cause", estimatedMinutes: 60, difficulty: 3 },
      { id: "biodiversity-loss-consequence", name: "Biodiversity Loss Consequence", estimatedMinutes: 35, difficulty: 3 },
        ]
  },
  {
    id: "biod-conservation",
    name: "Biodiversity Conservation",
    subtopics: [
      { id: "in-situ-conserve", name: "In-Situ Conservation", estimatedMinutes: 70, difficulty: 2 },
      { id: "ex-situ-conserve", name: "Ex-Situ Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "national-initiatives-conserve", name: "National Initiatives for Conservation", estimatedMinutes:40, difficulty: 2 },
      { id: "cbd-conserve", name: "Convention on Biological Diversity", estimatedMinutes: 60, difficulty: 2 },
      { id: "other-conserve", name: "Other Efforts Conservation", estimatedMinutes: 35, difficulty: 2 },
        ]
  },

  {
    id: "wildlife-conservation",
    name: "Wildlife Conservation International",
    subtopics: [
      { id: "regulating-trade-wildlife", name: "Regulating Trade in Wildlife", estimatedMinutes: 90, difficulty: 4 },
      { id: "cms", name: "CMS", estimatedMinutes: 25, difficulty: 3 },
      { id: "iucn", name: "IUCN", estimatedMinutes: 30, difficulty: 4 }
    ]
  },
  {
    id: "species-conservation",
    name: "Species Conservation",
    subtopics: [
      { id: "tiger-conservation", name: "Tiger Conservation", estimatedMinutes: 120, difficulty: 2 },
      { id: "elephant-conservation", name: "Elephant Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "snow-conservation", name: "Snow Leopard Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "rhino-conservation", name: "Rhino Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "dolphin-conservation", name: "Dolphin Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "crocodile-conservation", name: "Crocodile Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "turtle-conservation", name: "Turtle Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "vulture-conservation", name: "Vulture Conservation", estimatedMinutes: 25, difficulty: 2 },
      { id: "other-species-conservation", name: "Other Species Conservation", estimatedMinutes: 25, difficulty: 2 },
    ]
  },
  
  {
    id: "air-pollution",
    name: "Air Pollution",
    subtopics: [
      { id: "air-poll-pollutants", name: "Air Pollution Causes and Pollutants", estimatedMinutes: 180, difficulty: 2 },
      { id: "air-poll-effects", name: "Air Pollution Effects", estimatedMinutes: 150, difficulty: 2 },
      { id: "air-poll-measures", name: "Air Pollution Measures", estimatedMinutes: 200, difficulty: 3 },
    ]
  },
  {
    id: "water-pollution",
    name: "Water Pollution",
    subtopics: [
      { id: "water-poll-pollutants", name: "Water Pollution Causes and Pollutants", estimatedMinutes: 80, difficulty: 2 },
      { id: "water-poll-effects", name: "Water Pollution Effects", estimatedMinutes: 60, difficulty: 2 },
      { id: "water-poll-measures", name: "Water Pollution Measures", estimatedMinutes: 150, difficulty: 3 },
    ]
  },
  {
    id: "other-pollution",
    name: "Other Pollution",
    subtopics: [
      { id: "plastic-poll", name: "Plastic Pollution", estimatedMinutes: 90, difficulty: 2 },
      { id: "solid-poll", name: "Solid Waste", estimatedMinutes: 30, difficulty: 2 },
      { id: "hazardous-poll", name: "Hazardous Pollution", estimatedMinutes: 120, difficulty: 3 },
      { id: "heavy-poll", name: "Heavy Metal and e-waste Pollution", estimatedMinutes: 90, difficulty: 3 },
    ]
  },
  {
    id: "land-degradation",
    name: "Land Degradation",
    subtopics: [
      { id: "cause-land-degradation", name: "Cause of Land Degradation", estimatedMinutes: 100, difficulty: 2 },
      { id: "desertification", name: "Desertification", estimatedMinutes: 120, difficulty: 2 },
    ]
  },
  {
    id: "ghg-cc",
    name: "Global Warming and Climate Change",
    subtopics: [
      { id: "ghg-gw", name: "Global Warming Concepts", estimatedMinutes: 120, difficulty: 2 },
      { id: "current-state-emission", name: "Current State of Emissions", estimatedMinutes: 60, difficulty: 2 },
      { id: "ghg-impacts", name: "Global Warming Impact", estimatedMinutes: 300, difficulty: 3 },
      { id: "ghg-measures", name: "Global Warming Measures", estimatedMinutes: 200, difficulty: 3 },
    ]
  },
  {
    id: "international-conventions",
    name: "International Conventions",
    subtopics: [
      { id: "pre-unfccc", name: "Before UNFCCC", estimatedMinutes: 120, difficulty: 2 },
      { id: "unfccc-till-paris", name: "UNFCCC till Paris", estimatedMinutes: 150, difficulty: 2 },
      { id: "unfccc-post-paris", name: "UNFCCC post Paris", estimatedMinutes: 150, difficulty: 2 },
      { id: "others-unfccc", name: "Other Conventions", estimatedMinutes: 30, difficulty: 2 },
     ]
  },
  {
    id: "national-conventions",
    name: "National Conventions",
    subtopics: [
      { id: "epa", name: "Environment Protection Act", estimatedMinutes: 30, difficulty: 2 },
      { id: "wpa", name: "Wildlife Protection Act", estimatedMinutes: 50, difficulty: 2 },
      { id: "forest-right", name: "Forest Rights", estimatedMinutes: 150, difficulty: 2 },
      { id: "others-national", name: "Other National Conventions", estimatedMinutes: 250, difficulty: 2 },
     ]
  },
  {
    id: "green-revolutions",
    name: "Green Revolutions",
    subtopics: [
      { id: "green-revolution", name: "Green Revolution", estimatedMinutes: 50, difficulty: 2 },
      { id: "sustainable-agri", name: "Sustainable Agriculture", estimatedMinutes: 180, difficulty: 2 },
      { id: "modern-agri-prac", name: "Modern Agricultural Practices", estimatedMinutes: 80, difficulty: 2 },
     ]
  },
  {
    id: "water-conservation",
    name: "Water Conservation",
    subtopics: [
      { id: "india-water", name: "India Water Situation", estimatedMinutes: 40, difficulty: 2 },
      { id: "national-water-conservation", name: "National Water Conservation Measures", estimatedMinutes: 200, difficulty: 2 },
     ]
  },
  {
    id: "energy-sources-renewable",
    name: "Energy Sources and Conservation",
    subtopics: [
      { id: "conventional-unconventional", name: "Conventional and Unconventional", estimatedMinutes: 50, difficulty: 2 },
      { id: "clean-energy", name: "Clean Energy", estimatedMinutes: 30, difficulty: 2 },
      { id: "solar-energy", name: "Solar Energy", estimatedMinutes: 90, difficulty: 2 },
      { id: "wind-energy", name: "Wind Energy", estimatedMinutes: 50, difficulty: 2 },
      { id: "biofuel-energy", name: "Biofuel Energy", estimatedMinutes: 90, difficulty: 2 },
      { id: "hydrogen-energy", name: "Hydrogen Energy", estimatedMinutes: 60, difficulty: 2 },
      { id: "nuclear-energy", name: "Nuclear Energy", estimatedMinutes: 60, difficulty: 2 },
      { id: "radioactive-pollution", name: "Radioactive Pollution", estimatedMinutes: 60, difficulty: 2 },
      { id: "challenges-measures", name: "Challenges Measures", estimatedMinutes: 90, difficulty: 2 },
     ]
  },
]
},
{
     id: "internal-security",
    type: "GS",
    paper: "GS3",
    name: "Internal Security",
    topics: [
  {
    id: "extremism-in-india",
    name: "Extremism in India",
    subtopics: [
      { id: "left-wing-extremism-nexus", name: "Left wing extremism nexus", estimatedMinutes: 20, difficulty: 2 },
      { id: "multi-layered-counterstrategy-lwe", name: "Multi-layered counterstrategy for LWE", estimatedMinutes: 25, difficulty: 3 },
      { id: "role-of-security-forces", name: "Role of security forces", estimatedMinutes: 15, difficulty: 2 },
      { id: "role-of-civil-administration", name: "Role of civil administration", estimatedMinutes: 15, difficulty: 2 },
      { id: "perception-management-political", name: "Perception management and political engagement", estimatedMinutes: 20, difficulty: 3 },
      { id: "current-status-lwe", name: "Current Status", estimatedMinutes: 15, difficulty: 2 },
      { id: "geographical-spread-lwe", name: "Geographical Spread", estimatedMinutes: 15, difficulty: 2 },
      { id: "emerging-issues-challenges-lwe", name: "Emerging Issues and Challenges", estimatedMinutes: 20, difficulty: 3 },
      { id: "corrective-strategies-lwe", name: "Corrective Strategies", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "north-east-insurgency",
    name: "North-East Insurgency",
    subtopics: [
      { id: "ne-root-causes", name: "Root causes", estimatedMinutes: 25, difficulty: 3 },
      { id: "state-wise-overview-ne", name: "State wise overview", estimatedMinutes: 30, difficulty: 4 },
      { id: "approach-handle-insurgency-ne", name: "Approach to handle insurgency", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "jammu-kashmir-insurgency",
    name: "Jammu Kashmir Insurgency",
    subtopics: [
      { id: "jk-root-cause", name: "Root cause", estimatedMinutes: 25, difficulty: 3 },
      { id: "approach-handling-insurgency-jk", name: "Approach to handling insurgency", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "external-threat-india-security",
    name: "External threat to India Security",
    subtopics: [
      { id: "state-actors-violent-non-actors", name: "State actors and violent non actors", estimatedMinutes: 20, difficulty: 2 },
      { id: "pakistan-threat", name: "Pakistan", estimatedMinutes: 25, difficulty: 3 },
      { id: "china-threat", name: "China", estimatedMinutes: 30, difficulty: 4 },
      { id: "spillover-challenges", name: "Spillover challenges from other neighbours", estimatedMinutes: 20, difficulty: 3 }
    ]
  },
  {
    id: "non-state-actors-and-terrorism",
    name: "Non State Actors and Terrorism",
    subtopics: [
      { id: "terrorism-intro", name: "Terrorism", estimatedMinutes: 15, difficulty: 2 },
      { id: "classifying-terrorist-threat", name: "Classifying terrorist threat", estimatedMinutes: 20, difficulty: 2 },
      { id: "two-front-war-on-terror", name: "Two front war on terror", estimatedMinutes: 20, difficulty: 3 },
      { id: "technology-as-weapon", name: "New threats : technology as weapon", estimatedMinutes: 25, difficulty: 3 },
      { id: "border-to-cities", name: "New threats : from border to cities", estimatedMinutes: 20, difficulty: 2 },
      { id: "grey-zone-warfare", name: "New threats : grey-zone warfare", estimatedMinutes: 25, difficulty: 4 },
      { id: "military-target-to-civilians", name: "New threats : from military target to civilians", estimatedMinutes: 20, difficulty: 3 },
      { id: "mobilization-diaspora-terrorism", name: "Mobilization of diaspora for terrorism", estimatedMinutes: 20, difficulty: 3 },
      { id: "multi-pronged-counter-strategy", name: "Multi ptonged counter strategy to terrorism", estimatedMinutes: 25, difficulty: 3 },
      { id: "national-security-strategy", name: "National Security Strategy : India urgent need", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "communication-networks-cyberspace",
    name: "Communication Networks and Cyberspace",
    subtopics: [
      { id: "criticality-communication-networks", name: "Criticality of communication networks for national security", estimatedMinutes: 20, difficulty: 2 },
      { id: "state-sponsored-cyber-warfare", name: "State sponsored cyber warfare and espionage", estimatedMinutes: 25, difficulty: 3 },
      { id: "cyber-warfare-assault", name: "Cyber warfare state sponsored assault", estimatedMinutes: 20, difficulty: 3 },
      { id: "cyber-espionage", name: "Cyber Espionage covert theft of sensitive data", estimatedMinutes: 20, difficulty: 3 },
      { id: "cyber-crime-extortion", name: "Cyber crime extortion based attack", estimatedMinutes: 20, difficulty: 2 },
      { id: "theft-fraud-based-attacks", name: "Theft and fraud based attacks", estimatedMinutes: 15, difficulty: 2 },
      { id: "cyber-terrorism", name: "Cyber terrorism", estimatedMinutes: 20, difficulty: 3 },
      { id: "security-implication-5g", name: "Security implication of 5G technology", estimatedMinutes: 25, difficulty: 3 },
      { id: "ai-dual-use-technology", name: "AI as dual use technology", estimatedMinutes: 25, difficulty: 3 },
      { id: "building-digital-resilience", name: "Building digital resilience", estimatedMinutes: 20, difficulty: 3 },
      { id: "role-media-social-networking", name: "Role of media and social networking sites", estimatedMinutes: 20, difficulty: 2 },
      { id: "govt-measures-social-media", name: "Goverment measures to counter social media threats", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "money-laundering",
    name: "Money Laundering",
    subtopics: [
      { id: "three-stage-process", name: "Three stage process", estimatedMinutes: 15, difficulty: 2 },
      { id: "evolving-modus-operandi", name: "Evolving Modus Operandi", estimatedMinutes: 20, difficulty: 3 },
      { id: "multifaceted-impact", name: "Multifaceted impact", estimatedMinutes: 15, difficulty: 2 },
      { id: "key-challenges-prevention", name: "Key challenges in prevention", estimatedMinutes: 20, difficulty: 3 },
      { id: "fatf", name: "FATF", estimatedMinutes: 25, difficulty: 3 },
      { id: "key-international-conventions", name: "Key international conventions", estimatedMinutes: 20, difficulty: 3 },
      { id: "pmla-2002", name: "PMLA 2002", estimatedMinutes: 30, difficulty: 4 },
      { id: "institutional-mechanism-aml", name: "Institutional mechanism against money laundering", estimatedMinutes: 25, difficulty: 3 }
    ]
  },
  {
    id: "linkage-organised-crime-terrorism",
    name: "Linkage of organised crime with terrorism",
    subtopics: [
      { id: "major-forms-organized-crime", name: "Major forms of organized crime", estimatedMinutes: 15, difficulty: 2 },
      { id: "linkage-crime-terrorism", name: "linkage between organized crime and terrorism", estimatedMinutes: 25, difficulty: 3 },
      { id: "fighting-organized-crime", name: "Fighting organized crime", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "border-management",
    name: "Border Management",
    subtopics: [
      { id: "foundations-border-management", name: "Foundations of border management", estimatedMinutes: 20, difficulty: 2 },
      { id: "key-challenges-border", name: "Key challenges", estimatedMinutes: 20, difficulty: 3 },
      { id: "western-frontier-analysis", name: "Western frontier analysis", estimatedMinutes: 25, difficulty: 3 },
      { id: "northern-frontier", name: "Northern frontier", estimatedMinutes: 25, difficulty: 3 },
      { id: "eastern-frontiers", name: "Eastern frontiers", estimatedMinutes: 25, difficulty: 3 },
      { id: "open-borders", name: "Open borders", estimatedMinutes: 20, difficulty: 3 },
      { id: "comprehensive-border-management", name: "India comprehensive border management strategy", estimatedMinutes: 25, difficulty: 3 },
      { id: "coastal-security-management", name: "Coastal Security Management", estimatedMinutes: 25, difficulty: 3 },
      { id: "indian-coast-guard", name: "Indian Coast Guard", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "various-security-forces",
    name: "Various security forces",
    subtopics: [
      { id: "multi-layered-security-arch", name: "Multi layered security architecture", estimatedMinutes: 15, difficulty: 2 },
      { id: "national-security-architecture", name: "National security architecture", estimatedMinutes: 20, difficulty: 3 },
      { id: "ib", name: "IB", estimatedMinutes: 15, difficulty: 2 },
      { id: "raw", name: "R&AW", estimatedMinutes: 15, difficulty: 2 },
      { id: "ntro", name: "NTRO", estimatedMinutes: 15, difficulty: 2 },
      { id: "primary-investigative-agencies", name: "Primary Investigative Agencies", estimatedMinutes: 20, difficulty: 2 },
      { id: "law-enforcement-agencies", name: "Law enforcement agencies", estimatedMinutes: 15, difficulty: 2 },
      { id: "capf", name: "CAPF", estimatedMinutes: 15, difficulty: 2 },
      { id: "bsf", name: "BSF", estimatedMinutes: 15, difficulty: 2 },
      { id: "itbp", name: "ITBP", estimatedMinutes: 15, difficulty: 2 },
      { id: "ssb", name: "SSB", estimatedMinutes: 15, difficulty: 2 },
      { id: "ar", name: "AR", estimatedMinutes: 15, difficulty: 2 },
      { id: "crpf", name: "CRPF", estimatedMinutes: 15, difficulty: 2 },
      { id: "cisf", name: "CISF", estimatedMinutes: 15, difficulty: 2 },
      { id: "nsg", name: "NSG", estimatedMinutes: 15, difficulty: 2 },
      { id: "role-of-armed-forces", name: "Role of armed forces", estimatedMinutes: 20, difficulty: 2 },
      { id: "state-police-forces", name: "State police forces and mandate", estimatedMinutes: 20, difficulty: 2 },
      { id: "challenges-reforms-security-apparatus", name: "Challenges and reforms in India Security Apparatus", estimatedMinutes: 25, difficulty: 3 }
    ]
  }
]
},
{
     id: "disaster-management",
    type: "GS",
    paper: "GS3",
    name: "Disaster Management",
    topics: [
  {
    id: "introduction-to-disaster-management",
    name: "Introduction to disaster management",
    subtopics: [
      { id: "disasters", name: "Disasters", estimatedMinutes: 15, difficulty: 1 },
      { id: "hazards-vulnerabilities-risk", name: "Hazards, Vulnerabilities and Risk", estimatedMinutes: 20, difficulty: 2 },
      { id: "classification-of-disasters", name: "Classification of Disasters", estimatedMinutes: 15, difficulty: 1 }
    ]
  },
  {
    id: "disaster-management-cycle",
    name: "Disaster Management Cycle",
    subtopics: [
      { id: "dm-cycle-intro", name: "Introduction", estimatedMinutes: 15, difficulty: 1 },
      { id: "disaster-preparedness", name: "Disaster Preparedness", estimatedMinutes: 20, difficulty: 2 },
      { id: "disaster-risk-reduction-planning", name: "Disaster Risk Reduction and Planning", estimatedMinutes: 25, difficulty: 3 },
      { id: "relief-and-rehabilitation", name: "Relief and Rehabilitation", estimatedMinutes: 20, difficulty: 2 },
      { id: "post-disaster-recovery", name: "Post disaster recovery", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "disaster-management-in-india",
    name: "Disaster Management in India",
    subtopics: [
      { id: "legal-institutional-framework", name: "Legal and Institutional framework", estimatedMinutes: 35, difficulty: 3 },
      { id: "vulnerability-profile-india", name: "Vulnerability profile of India", estimatedMinutes: 25, difficulty: 2 }
    ]
  },
  {
    id: "natural-hazards",
    name: "Natural Hazards",
    subtopics: [
      { id: "earthquake", name: "Earthquake", estimatedMinutes: 30, difficulty: 3 },
      { id: "tsunami-nat", name: "Tsunami", estimatedMinutes: 25, difficulty: 3 },
      { id: "volcano", name: "Volcano", estimatedMinutes: 20, difficulty: 2 },
      { id: "floods", name: "Floods", estimatedMinutes: 30, difficulty: 3 },
      { id: "urban-floods", name: "Urban Floods", estimatedMinutes: 25, difficulty: 3 },
      { id: "landslides", name: "Landslides", estimatedMinutes: 25, difficulty: 3 },
      { id: "cloudburst", name: "Cloudburst", estimatedMinutes: 20, difficulty: 2 },
      { id: "cyclone", name: "Cyclone", estimatedMinutes: 30, difficulty: 3 },
      { id: "drought", name: "Drought", estimatedMinutes: 25, difficulty: 3 },
      { id: "heat-wave", name: "Heat Wave", estimatedMinutes: 20, difficulty: 2 },
      { id: "cold-wave", name: "Cold Wave", estimatedMinutes: 15, difficulty: 2 },
      { id: "wild-fire", name: "Wild Fire", estimatedMinutes: 20, difficulty: 2 }
    ]
  },
  {
    id: "anthropogenic-disasters",
    name: "Anthropogenic disasters",
    subtopics: [
      { id: "biological-disasters", name: "Biological Disasters", estimatedMinutes: 25, difficulty: 3 },
      { id: "industrial-chemical-disasters", name: "Industrial Chemical Disasters", estimatedMinutes: 25, difficulty: 3 },
      { id: "nuclear-disasters", name: "Nuclear Disasters", estimatedMinutes: 20, difficulty: 3 },
      { id: "oil-spills", name: "Oil Spills", estimatedMinutes: 20, difficulty: 2 },
      { id: "stampedes", name: "Stampedes", estimatedMinutes: 15, difficulty: 2 }
    ]
  },
  {
    id: "frameworks",
    name: "Frameworks",
    subtopics: [
      { id: "evolution-global-framework", name: "Evolution of global framework", estimatedMinutes: 25, difficulty: 3 },
      { id: "international-cooperation-dm", name: "International Cooperation on Disaster Management", estimatedMinutes: 20, difficulty: 2 }
    ]
  }
]
},
{
     id: "science-tech",
    type: "GS",
    paper: "GS3",
    name: "Science & Technology",
    topics: [
      {
    id: "particle-science",
    name: "Particle Science",
    subtopics: [
      { 
        id: "standard-model", 
        name: "Standard Model of Particle Physics", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "subatomic-particles", 
        name: "Subatomic Particles", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "lhc", 
        name: "Large Hadron Collider", 
        estimatedMinutes: 20, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
  {
    id: "waves-science",
    name: "Waves Science",
    subtopics: [
      { 
        id: "electromagnetic-spectrum", 
        name: "Electromagnetic Spectrum", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "radar-sonar-lidar", 
        name: "Radar Sonar and Lidar", 
        estimatedMinutes: 40, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "four-forces", 
        name: "Four fundamental forces", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
  {
    id: "astronomy-science",
    name: "Astronomy Science",
    subtopics: [
      { 
        id: "universe-model", 
        name: "Universe", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "life-cycle", 
        name: "Big Bang and Life Cycle", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "black-holes", 
        name: "Black Holes and Gravitational waves", 
        estimatedMinutes: 35, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "dark-matter", 
        name: "Dark Matter and Dark Energy", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
   {
    id: "matter-science",
    name: "Matter Chemistry and Materials",
    subtopics: [
      { 
        id: "atoms", 
        name: "Atoms & Molecules", 
        estimatedMinutes: 20, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "state-matter", 
        name: "States of Matter", 
        estimatedMinutes: 20, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "element-compound", 
        name: "Element Compound Mixture", 
        estimatedMinutes: 20, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "rare-earth", 
        name: "Rare Earth nd Colloids", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
  {
    id: "biological-classification",
    name: "Biological Classification",
    subtopics: [
      { 
        id: "five-kingdom", 
        name: "Five Kingdom System", 
        estimatedMinutes: 40, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "bacteria", 
        name: "Bacteria", 
        estimatedMinutes: 25, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "virus", 
        name: "Viruses", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "fungi", 
        name: "Fungi", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
  {
    id: "molecular-biology",
    name: "Cell and Molecular Biology",
    subtopics: [
      { 
        id: "dna-rna", 
        name: "DNA and RNA", 
        estimatedMinutes: 40, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "plant-animal", 
        name: "Plant and Animal cell", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "mitosis-meosis", 
        name: "Mitosis and Meiosis", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "tools-modern-biotech", 
        name: "Tools of Modern Biotechnology", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
  {
    id: "disease-immunity",
    name: "Disease Immunity and Health",
    subtopics: [
      { 
        id: "communicable-noncommunicable", 
        name: "Communicable and Non Communicable", 
        estimatedMinutes: 40, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "immunity-blood", 
        name: "Immunity and Immune System", 
        estimatedMinutes: 40, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "defeciency-disease", 
        name: "Deficiency Disease", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "nutrients", 
        name: "Nutrients", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
  {
    id: "i-c-t",
    name: "Information and Communication Technology",
    subtopics: [
      { 
        id: "overview-ict", 
        name: "Overview", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "5g-6g", 
        name: "5G and 6G", 
        estimatedMinutes: 35, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "space-satellite-internet", 
        name: "Space and Satellite Internet", 
        estimatedMinutes: 40, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "supercomputers", 
        name: "Supercomputers", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "wifi-lan-wan", 
        name: "Wifi LAN WAN Tech", 
        estimatedMinutes: 40, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "india-stack", 
        name: "India Stack and DPI", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
  {
    id: "biotechnology",
    name: "Biotechnology",
    subtopics: [
      { 
        id: "core-biotech", 
        name: "Core Biotechnologyy concepts", 
        estimatedMinutes: 240, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "botech-medcine", 
        name: "Biotech in Medicine", 
        estimatedMinutes: 180, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "biotech-agri", 
        name: "Biotech in Agriculture", 
        estimatedMinutes: 180, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "traditional-knowledge", 
        name: "Traditional Knowledge", 
        estimatedMinutes: 45, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
    {
    id: "nanotechnology",
    name: "Nanotechnology",
    subtopics: [
      { 
        id: "nanotech-nano", 
        name: "Core Nanotechnology concepts", 
        estimatedMinutes: 180, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
    {
    id: "clean-energy-tech",
    name: "Clean Technology and Energy",
    subtopics: [
      { 
        id: "fuel cells", 
        name: "Fuel Cells, Hydrogen Cells", 
        estimatedMinutes: 60, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "green-h2", 
        name: "Green Hydrogen", 
        estimatedMinutes: 45, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "solar-tech", 
        name: "Solar Technology", 
        estimatedMinutes: 30, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "battery-biofuels", 
        name: "Batteries and BioFuels", 
        estimatedMinutes: 75, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
    {
    id: "space-tech",
    name: "Space Technology",
    subtopics: [
      { 
        id: "orbit-satellite", 
        name: "Orbits and Satellites", 
        estimatedMinutes: 240, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "launch-vehicle", 
        name: "Launch Vehicle and Propulsion", 
        estimatedMinutes: 200, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "indian-isro", 
        name: "ISRO and Indian Space Programmes", 
        estimatedMinutes: 200, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "global-mission", 
        name: "Global Space Missions", 
        estimatedMinutes: 120, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
    {
    id: "nuclear-tech",
    name: "Nuclear Technology",
    subtopics: [
      { 
        id: "core-nuclear", 
        name: "Core Nuclear concepts", 
        estimatedMinutes: 150, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
    {
    id: "emerging-tech",
    name: "Emerging Technology",
    subtopics: [
      { 
        id: "emerging-tech-ch", 
        name: "Emerging Technologies", 
        estimatedMinutes: 240, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
    {
    id: "defence-tech",
    name: "Defence Technology",
    subtopics: [
      { 
        id: "missile-defence", 
        name: "Missile and Missile Defence", 
        estimatedMinutes: 240, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "aircraft-submarine", 
        name: "Aircraft and Submarines", 
        estimatedMinutes: 180, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
      { 
        id: "exercises-defence", 
        name: "Exercises Defence", 
        estimatedMinutes: 180, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
    {
    id: "IPR",
    name: "Intellectual Property Rights",
    subtopics: [
      { 
        id: "core-ipr", 
        name: "Core IPR concepts", 
        estimatedMinutes: 175, 
        difficulty: 3 ,
        source:"legacyias.com"
      },
   ]
  },
]
},

{
     id: "ethics",
    type: "GS",
    paper: "GS4",
    name: "Ethics",
    topics: [
  {
    id: "essence-determinant-role-ethics",
    name: "Essence, Determinant and Role of Ethics",
    subtopics: [
      {
        id: "meaning-of-ethics",
        name: "Meaning of Ethics",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "intuition-vs-reason",
        name: "Intuition vs Reason",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "absolute-vs-relative-ethics",
        name: "Absolute vs Relative ethics",
        estimatedMinutes: 15,
        difficulty: 4,
      },
      {
        id: "ethics-vs-law",
        name: "Ethics vs law",
        estimatedMinutes: 10,
        difficulty: 3,
      },
      {
        id: "ethics-vs-morality",
        name: "Ethics vs Morality",
        estimatedMinutes: 10,
        difficulty: 3,
      },
      {
        id: "determinants-individual-situational",
        name: "Determinant of Ethics: Individual, Situational and other factors",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "divine-command-theory",
        name: "Divine Command Theory",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "role-of-ethics",
        name: "Role of Ethics",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "western-religious-and-indian-ethics",
    name: "Western Religious and Indian Ethics",
    subtopics: [
      {
        id: "biblical-traditions",
        name: "Biblical Traditions",
        estimatedMinutes: 10,
        difficulty: 3,
      },
      {
        id: "roman-catholic-ethics",
        name: "Roman Catholic Ethics",
        estimatedMinutes: 10,
        difficulty: 3,
      },
      {
        id: "protestant-eastern-orthodox",
        name: "Protestant and Eastern Orthodox Ethics",
        estimatedMinutes: 10,
        difficulty: 3,
      },
      {
        id: "mahabharata-ethics",
        name: "Indian Ethics: Mahabharata",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "ramayana-ethics",
        name: "Indian Ethics: Ramayana",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "historic-indian-ethics",
        name: "Historic Indian Ethics",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "bhakti-sufi-movement",
        name: "Bhakti and Sufi movement",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "islamic-sikh-ethics",
        name: "Islamic and Sikh ethics",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "jain-buddhist-ethics",
        name: "Jain and Buddhist ethics",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
  {
    id: "ethical-theories",
    name: "Ethical Theories",
    subtopics: [
      {
        id: "aristotle-plato-theories",
        name: "Aristotle & Plato",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "kant-deontology-categorical-imperative",
        name: "Kant Deontology and Categorical Imperative",
        estimatedMinutes: 30,
        difficulty: 4,
      },
      {
        id: "teleology-consequentialism",
        name: "Teleology and Consequentialism",
        estimatedMinutes: 40,
        difficulty: 4,
      },
      {
        id: "knower-doer-split",
        name: "Knower-Doer Split by Dayanand Saraswati",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "double-effect-doctrine",
        name: "Double Effect doctrine",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "other-ethical-theories",
        name: "Other theories",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
  {
    id: "applied-ethics-and-private-public-life",
    name: "Applied Ethics & Ethics in Private-Public Life",
    subtopics: [
      {
        id: "applied-ethics-basics",
        name: "Bioethics, Business ethics, Organizational ethics, Political ethics",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "ethics-in-public-life",
        name: "Ethics in public life",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "nolan-seven-principles",
        name: "Nolan seven principles of public life",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "ethics-in-private-life",
        name: "Ethics in private life",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "roles-public-servants",
        name: "Roles of public servants",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "human-values-and-inculcation",
    name: "Human Values & Inculcating Values",
    subtopics: [
      {
        id: "human-values-meaning",
        name: "Meaning of Human Values",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-vs-belief-vs-attitude",
        name: "Value vs Belief vs Attitude",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "importance-of-values",
        name: "Importance of values",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "lack-of-values",
        name: "Lack of values",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "classification-of-values",
        name: "Classification of values",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-education",
        name: "Value education",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "developing-values",
        name: "Developing Values",
        estimatedMinutes: 30,
        difficulty: 4,
      },
      {
        id: "role-of-schools",
        name: "Role of schools in Inculcating Values",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "role-of-teachers",
        name: "Role of teachers in Inculcating Values",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "role-of-society",
        name: "Role of society in Inculcating Values",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "role-of-parents",
        name: "Role of parents in Inculcating Values",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "administration-today-world",
        name: "Administration in today world",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
  {
    id: "indian-leaders-and-philosophers",
    name: "Indian Leaders and Philosophers",
    subtopics: [
      {
        id: "leader-buddha",
        name: "Buddha",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "leader-mahavir",
        name: "Mahavir",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "leader-kautilya",
        name: "Kautilya",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "leader-guru-nanak",
        name: "Guru Nanak",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "leaders-kabir-tulsi-das",
        name: "Kabir das & Tulsi das",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "leader-rabindranath-tagore",
        name: "Rabindranath Tagore",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "leaders-roy-dayanand-vivekananda",
        name: "Raja Ram Mohan Roy, Swami Dayanand, Swami Vivekananda",
        estimatedMinutes: 20,
        difficulty: 2,
      },
      {
        id: "leaders-aurobindo-gandhi",
        name: "Aurobindo & Mahatma Gandhi",
        estimatedMinutes: 25,
        difficulty: 2,
      },
      {
        id: "leader-radhakrishnan",
        name: "Radhakrishnan",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "leader-br-ambedkar",
        name: "BR Ambedkar",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "leaders-abul-kalam-deen-dayal",
        name: "Abul Kalam & Deen Dayal",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "leader-ram-manohar-lohia",
        name: "Ram Manohar Lohia",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "leaders-lama-teresa-sen",
        name: "Dalai Lama, Mother Teresa, Amartya Sen",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "leader-abdul-kalam",
        name: "Abdul Kalam",
        estimatedMinutes: 10,
        difficulty: 2,
      },
    ],
  },
  {
    id: "attitude-and-public-service",
    name: "Attitude, Behaviour and Public Service",
    subtopics: [
      {
        id: "attitude-meaning",
        name: "Meaning of Attitude",
        estimatedMinutes: 5,
        difficulty: 1,
      },
      {
        id: "attitude-vs-opinion-vs-beliefs",
        name: "Attitude vs Opinion vs Beliefs",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "attitude-content",
        name: "Attitude Content",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "attitude-structure-ambivalence",
        name: "Attitude Structure & Ambivalence",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "attitude-functions",
        name: "Attitude Functions",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "attitude-behaviour-situation",
        name: "Attitude-Behaviour-Situation",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "attitude-formation",
        name: "Attitude Formation",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "attitude-change",
        name: "Attitude Change",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "positive-attitude-public-service",
        name: "Positive Attitude and Public Service",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "attitude-behaviour-therapy",
        name: "Attitude and Behaviour: Therapy",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "attitude-predict-behaviour",
        name: "Attitude predict Behaviour",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "cognitive-dissonance-theory",
        name: "Cognitive Dissonance Theory",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "political-moral-attitudes",
        name: "Political & Moral Attitudes: Meaning and Dimensions",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "attitudes-ideologies-examples",
        name: "Ideologies and Examples",
        estimatedMinutes: 35,
        difficulty: 3,
      },
    ],
  },
  {
    id: "social-influence-and-persuasion",
    name: "Social Influence and Persuasion",
    subtopics: [
      {
        id: "social-influence-meaning",
        name: "Meaning of Social Influence",
        estimatedMinutes: 5,
        difficulty: 1,
      },
      {
        id: "social-influence-types",
        name: "Types of Social Influence",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "social-influence-factors",
        name: "Factors of Social Influence",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "persuasion-meaning",
        name: "Meaning of Persuasion",
        estimatedMinutes: 5,
        difficulty: 1,
      },
      {
        id: "persuasion-elements",
        name: "Elements of Persuasion",
        estimatedMinutes: 5,
        difficulty: 1,
      },
      {
        id: "persuasion-factors",
        name: "Factors of Persuasion",
        estimatedMinutes: 15,
        difficulty: 1,
      },
      {
        id: "persuasion-methods",
        name: "Methods of Persuasion",
        estimatedMinutes: 35,
        difficulty: 3,
      },
      {
        id: "resisting-persuasion",
        name: "Resisting Persuasion",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "ethical-persuasion",
        name: "Ethical Persuasion",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "stereotypes",
        name: "Stereotypes",
        estimatedMinutes: 15,
        difficulty: 2,
      },
    ],
  },
  {
    id: "aptitude-and-foundational-values",
    name: "Aptitude and Foundational Values for Civil Services",
    subtopics: [
      {
        id: "aptitude-introduction",
        name: "Introduction to Aptitude",
        estimatedMinutes: 5,
        difficulty: 1,
      },
      {
        id: "intelligence-aptitudes-skills",
        name: "Intelligence, Aptitudes, Skills",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-integrity",
        name: "Integrity",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "value-honesty",
        name: "Honesty",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "value-objectivity",
        name: "Objectivity",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "value-impartiality",
        name: "Impartiality",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "value-non-partisanship",
        name: "Non-Partisanship",
        estimatedMinutes: 25,
        difficulty: 3,
      },
    ],
  },
  {
    id: "professional-values-and-virtues",
    name: "Professional Values, Cardinal Virtues and Bureaucracy",
    subtopics: [
      {
        id: "dedication-public-service",
        name: "Dedication to Public Service",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-compassion",
        name: "Compassion",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "value-tolerance",
        name: "Tolerance",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-perseverance",
        name: "Perseverance",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-loyalty",
        name: "Loyalty",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-collegiality",
        name: "Collegiality",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "value-inter-dependence",
        name: "Inter-Dependence,Confedentiality and Innovation",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "virtue-prudence",
        name: "Cardinal Virtues: Prudence",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "virtue-justice",
        name: "Cardinal Virtues: Justice",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "virtue-fortitude",
        name: "Cardinal Virtues: Fortitude",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "virtue-temperance",
        name: "Cardinal Virtues: Temperance",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "bureaucratic-wisdom",
        name: "Bureaucratic Wisdom",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "values-from-arc",
        name: "Values from ARC",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "weber-good-bureaucrat",
        name: "Weber on good Bureaucrat",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "civil-service-day-speech",
        name: "Civil Service Day Speech",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "commandments-conduct-bureaucrat",
        name: "Excerpts from 19 Commandments for Conduct of Bureaucrat",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "commitment-character-conduct",
        name: "Commitment, Character , Conduct",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "constitutional-values",
        name: "Constitutional Values",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "constitutional-morality",
        name: "Constitutional Morality",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "code-of-ethics-bureaucracy",
        name: "Code of Ethics",
        estimatedMinutes: 5,
        difficulty: 2,
      },
    ],
  },
  {
    id: "emotional-intelligence",
    name: "Emotional Intelligence",
    subtopics: [
      {
        id: "classic-intelligence",
        name: "Classic Intelligence",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "emotional-intelligence-concept",
        name: "Emotional Intelligence",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "goleman-model",
        name: "Goleman Model",
        estimatedMinutes: 30,
        difficulty: 4,
      },
      {
        id: "marshmallow-experiment",
        name: "Marshmallow Experiment",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "model-msceit",
        name: "Other Models of EI: MSCEIT",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "model-tei",
        name: "Other Models of EI: TEI",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "six-seconds-eq",
        name: "Six seconds EQ",
        estimatedMinutes: 10,
        difficulty: 3,
      },
      {
        id: "emotions-public-admin-intro",
        name: "Emotions & Public Administration Introduction",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "emotions-ethics-values",
        name: "Emotions-Ethics-Values",
        estimatedMinutes: 30,
        difficulty: 4,
      },
      {
        id: "ei-quotes",
        name: "Quotes",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
  {
    id: "moral-thinkers",
    name: "Moral Thinkers",
    subtopics: [
      {
        id: "thinker-socrates",
        name: "Socrates",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-plato",
        name: "Plato",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-aristotle",
        name: "Aristotle",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-martin-luther",
        name: "Martin Luther",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-confucius",
        name: "Confucius",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-locke",
        name: "Locke",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-hobbes",
        name: "Hobbes",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-adam-smith",
        name: "Adam Smith",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-durkheim",
        name: "Durkheim",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-rousseau",
        name: "Rousseau",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-kant",
        name: "Kant",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-mill",
        name: "Mill",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-hegel",
        name: "Hegel",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-marx",
        name: "Marx",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "thinker-rawls",
        name: "Rawls",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "thinker-machiavelli",
        name: "Machiavelli",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "thinker-epicurus",
        name: "Epicurus",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "thinker-kierkegaard",
        name: "Kierkegaard",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "thinker-lincoln",
        name: "Lincoln",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "thinker-carol-gilligan",
        name: "Carol Gilligan",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "thinker-nelson-mandela",
        name: "Nelson Mandela",
        estimatedMinutes: 15,
        difficulty: 3,
      },
    ],
  },
  {
    id: "public-service-values-and-dilemmas",
    name: "Public Service Values, Concerns and Ethical Dilemmas",
    subtopics: [
      {
        id: "public-service-values-history",
        name: "History of Public Service Values",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "public-service-values-importance",
        name: "Importance of Public Service Values",
        estimatedMinutes: 5,
        difficulty: 2,
      },
      {
        id: "public-service-values-challenges",
        name: "Problems and Challenges",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "conflict-of-interest",
        name: "Conflict of Interest",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "nature-of-ethical-dilemma",
        name: "Nature of ethical dilemma",
        estimatedMinutes: 15,
        difficulty: 4,
      },
      {
        id: "discretion-corruption-secrecy",
        name: "Discretion, Corruption, Secrecy",
        estimatedMinutes: 10,
        difficulty: 3,
      },
      {
        id: "nepotism-leaks-accountability",
        name: "Nepotism, Leaks, Accountability, Policy Dilemma",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "solving-ethical-dilemmas",
        name: "Solving Ethical Dilemmas",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "source-conscience",
        name: "Sources of Ethical Guidance: Conscience",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "source-laws-rules-regulations",
        name: "Sources of Ethical Guidance: Laws, Rules and Regulations",
        estimatedMinutes: 10,
        difficulty: 3,
      },
    ],
  },
  {
    id: "accountability-governance-corporate",
    name: "Accountability, Ethical & Corporate Governance",
    subtopics: [
      {
        id: "governance-accountability",
        name: "Accountability",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "governance-e-ethical",
        name: "Governance, e Governance and Ethical governance",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "strengthening-ethical-moral-values",
        name: "Strengthening Ethical and Moral values",
        estimatedMinutes: 25,
        difficulty: 3,
      },
      {
        id: "ethical-issues-international-relations",
        name: "Ethical Issues in International Relations",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "corporate-governance-meaning",
        name: "Corporate Governance: Meaning and Objectives",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "corporate-social-responsibility",
        name: "Corporate Social Responsibility (CSR)",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "ethical-issues-corporate-governance",
        name: "Ethical Issues in Corporate governance",
        estimatedMinutes: 20,
        difficulty: 3,
      },
    ],
  },
  {
    id: "probity-governance-and-fund-utilization",
    name: "Probity in Governance & Public Service Administration",
    subtopics: [
      {
        id: "probity-governance-meaning",
        name: "Probity in Governance: Meaning and Elements",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "probity-philosophy-objective",
        name: "Philosophy and Objective of Probity",
        estimatedMinutes: 15,
        difficulty: 2,
      },
      {
        id: "probity-challenges-solutions",
        name: "Challenges and Solutions",
        estimatedMinutes: 10,
        difficulty: 2,
      },
      {
        id: "concept-public-service-social-contract",
        name: "Concept of Public Service: Theory of Social Contract",
        estimatedMinutes: 30,
        difficulty: 2,
      },
      {
        id: "transparency-rti-act",
        name: "Information sharing and transparency in government: RTI act",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "code-of-conduct-ethics",
        name: "Code of Conduct & Ethics",
        estimatedMinutes: 40,
        difficulty: 3,
      },
      {
        id: "work-culture",
        name: "Work Culture",
        estimatedMinutes: 30,
        difficulty: 3,
      },
      {
        id: "citizen-charter-concept",
        name: "Citizen Charter",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "quality-service-delivery",
        name: "Quality of Service Delivery",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "service-delivery-india",
        name: "Service delivery in India",
        estimatedMinutes: 20,
        difficulty: 3,
      },
      {
        id: "utilization-public-funds",
        name: "Utilization of Public funds",
        estimatedMinutes: 15,
        difficulty: 3,
      },
      {
        id: "corruption-governance",
        name: "Corruption",
        estimatedMinutes: 40,
        difficulty: 3,
      },
    ],
  },
  {
    id: "case-studies-and-exercises",
    name: "Case Studies and Exercises",
    subtopics: [
      {
        id: "case-study-practice",
        name: "Practice Case Studies and Exercises",
        estimatedMinutes: 360,
        difficulty: 4,
      },
    ],
  },
]
}
];

      
export default gsSyllabus;