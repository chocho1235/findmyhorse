import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle, HelpCircle, Loader2, ChevronRight, Quote } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MetaTags from '@/components/seo/MetaTags';
import HorseSilhouette from '@/components/HorseSilhouette';

// Import recharts for visualization
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';

import horseDiagram from '../../assets/horse-diagram.svg';

// Define types for our findings
type Finding = {
  category: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  explanation: string;
  implications: string[];
  recommendations: string[];
  commonPhrases?: string[]; // Additional phrases that might indicate this condition
};

// Risk phrases to identify concerning language patterns
const riskPhrases = {
  high: [
    "life-threatening",
    "critical condition",
    "severely",
    "highly",
    "chronically",
    "irreversible",
    "unsuitable for sale",
    "not fit for purpose",
    "disregarded advice",
    "failure to medicate",
    "neglected"
  ],
  medium: [
    "potentially",
    "possibly",
    "may indicate",
    "suggests",
    "appears to be",
    "uncertain",
    "tentative",
    "mildly",
    "waiting period",
    "prior injury"
  ],
  low: [
    "likely",
    "might be",
    "cannot rule out",
    "presumed",
    "inconclusive"
  ]
};

// Negation phrases that indicate absence of a condition
const negationPhrases = [
  "no",
  "not",
  "without",
  "absent",
  "negative",
  "none",
  "resolved",
  "normal",
  "unremarkable",
  "free from",
  "clear of"
];

// Context modifiers that affect interpretation
const contextModifiers = {
  severity: {
    mild: 0.5,    // reduces risk level
    slight: 0.5,
    minimal: 0.5,
    moderate: 0.75,
    marked: 1.5,   // increases risk level
    severe: 2,
    significant: 2
  },
  temporality: {
    previous: 0.75,
    historical: 0.5,
    chronic: 1.5,
    acute: 1.25,
    intermittent: 1
  },
  progression: {
    improving: 0.5,
    resolving: 0.25,
    worsening: 2,
    progressing: 1.5,
    unchanged: 1
  }
};

// Helper function to assess risk level based on language
const assessRiskLevel = (text: string): 'high' | 'medium' | 'low' => {
  const words = text.toLowerCase().split(' ');
  
  for (const word of words) {
    if (riskPhrases.high.includes(word)) return 'high';
    if (riskPhrases.medium.includes(word)) return 'medium';
    if (riskPhrases.low.includes(word)) return 'low';
  }
  
  return 'low';
};

// Enhanced negation detection
const isNegated = (text: string, phrase: string): boolean => {
  const words = text.toLowerCase().split(/\s+/);
  const phraseWords = phrase.toLowerCase().split(/\s+/);
  
  // Find all occurrences of the phrase
  const phraseIndices: number[] = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i] === phraseWords[0]) {
      const matches = phraseWords.every((word, j) => words[i + j] === word);
      if (matches) phraseIndices.push(i);
    }
  }
  
  // Check for negations before each occurrence
  return phraseIndices.some(index => {
    const start = Math.max(0, index - 10);
    const contextBefore = words.slice(start, index);
    
    // Check for direct negations
    const hasDirectNegation = negationPhrases.some(negation => 
      contextBefore.includes(negation.toLowerCase())
    );
    
    // Check for compound negations (e.g., "no signs of lameness")
    const hasCompoundNegation = contextBefore.some((word, i) => {
      if (negationPhrases.includes(word)) {
        const nextFewWords = contextBefore.slice(i, i + 3).join(' ');
        return nextFewWords.includes('signs of') || 
               nextFewWords.includes('evidence of') ||
               nextFewWords.includes('indication of');
      }
      return false;
    });
    
    return hasDirectNegation || hasCompoundNegation;
  });
};

// Helper function to analyze context modifiers
const analyzeContext = (text: string, phrase: string): number => {
  // Get the surrounding context (10 words before and after)
  const words = text.toLowerCase().split(/\s+/);
  const phraseWords = phrase.toLowerCase().split(/\s+/);
  const phraseIndex = words.findIndex(word => word === phraseWords[0]);
  
  if (phraseIndex === -1) return 1;
  
  const start = Math.max(0, phraseIndex - 10);
  const end = Math.min(words.length, phraseIndex + phraseWords.length + 10);
  const context = words.slice(start, end).join(' ');
  
  let modifier = 1;
  
  // Check for severity modifiers
  Object.entries(contextModifiers.severity).forEach(([term, value]) => {
    if (context.includes(term)) modifier *= value;
  });
  
  // Check for temporal modifiers
  Object.entries(contextModifiers.temporality).forEach(([term, value]) => {
    if (context.includes(term)) modifier *= value;
  });
  
  // Check for progression modifiers
  Object.entries(contextModifiers.progression).forEach(([term, value]) => {
    if (context.includes(term)) modifier *= value;
  });
  
  return modifier;
};

// Common veterinary terms and their implications
const vetTerms: { [key: string]: Finding } = {
  // MUSCULOSKELETAL - LIMBS
  "effusion": {
    category: "Musculoskeletal - Joints",
    description: "Joint effusion/swelling",
    riskLevel: "medium",
    explanation: "Fluid accumulation in joints can indicate inflammation or injury",
    implications: [
      "May indicate active inflammation",
      "Could be temporary or chronic",
      "May affect performance",
      "Could be sign of overuse or injury"
    ],
    recommendations: [
      "Further diagnostic imaging recommended",
      "Consider joint medication history",
      "Monitor for changes in gait",
      "Regular assessment by veterinarian"
    ],
    commonPhrases: [
      "joint distension",
      "synovial effusion",
      "filled",
      "distended joint"
    ]
  },

  "positive flexion": {
    category: "Musculoskeletal - Joints",
    description: "Positive flexion test",
    riskLevel: "medium",
    explanation: "Pain or discomfort when joint is flexed, indicating potential joint issues",
    implications: [
      "May indicate joint inflammation",
      "Could suggest early arthritis",
      "Might affect performance",
      "May require management"
    ],
    recommendations: [
      "Further investigation recommended",
      "Consider joint supplements",
      "Regular monitoring needed",
      "Discuss management options"
    ],
    commonPhrases: [
      "flexion test positive",
      "reacts to flexion",
      "lame after flexion",
      "responds to flexion"
    ]
  },

  "navicular": {
    category: "Musculoskeletal - Foot",
    description: "Navicular changes",
    riskLevel: "high",
    explanation: "Changes in the navicular bone can indicate degenerative condition",
    implications: [
      "May cause ongoing lameness",
      "Could require regular management",
      "May limit athletic performance",
      "Progressive condition requiring monitoring"
    ],
    recommendations: [
      "Detailed radiographic examination",
      "Consider MRI for detailed assessment",
      "Discuss management options with vet",
      "Regular farrier attention essential"
    ],
    commonPhrases: [
      "navicular changes",
      "navicular syndrome",
      "cyst-like lesions",
      "increased navicular flexor surface",
      "navicular bone changes"
    ]
  },

  // CARDIOVASCULAR
  "murmur": {
    category: "Cardiovascular",
    description: "Heart murmur",
    riskLevel: "high",
    explanation: "Abnormal heart sounds that may indicate valve issues",
    implications: [
      "May affect exercise tolerance",
      "Could progress over time",
      "May require ongoing monitoring",
      "Could impact performance capacity"
    ],
    recommendations: [
      "Cardiac ultrasound recommended",
      "Exercise tolerance testing",
      "Regular cardiac monitoring",
      "Discuss exercise limitations"
    ],
    commonPhrases: [
      "grade 1-6 murmur",
      "systolic murmur",
      "diastolic murmur",
      "cardiac murmur"
    ]
  },

  // BACK AND SPINE
  "kissing spine": {
    category: "Musculoskeletal - Back",
    description: "Kissing spines",
    riskLevel: "high",
    explanation: "Impinging dorsal spinous processes in the back",
    implications: [
      "Can cause back pain",
      "May affect rideability",
      "Could require ongoing management",
      "May limit certain disciplines"
    ],
    recommendations: [
      "Consider bone scan or x-rays",
      "Evaluate saddle fit",
      "Discuss treatment options",
      "Physical therapy assessment"
    ],
    commonPhrases: [
      "impinging dorsal spinous processes",
      "overriding dorsal spinous processes",
      "dorsal spinous process impingement",
      "spine crowding"
    ]
  },

  // JOINTS AND ARTHRITIS
  "arthritis": {
    category: "Musculoskeletal - Joints",
    description: "Arthritic changes",
    riskLevel: "medium",
    explanation: "Degenerative changes in joints indicating wear and tear",
    implications: [
      "May require joint management",
      "Could affect long-term soundness",
      "Might need regular medication",
      "Could limit high-impact activities"
    ],
    recommendations: [
      "Regular joint monitoring",
      "Consider joint supplements",
      "Discuss management plan",
      "Appropriate exercise program"
    ],
    commonPhrases: [
      "degenerative joint disease",
      "DJD",
      "osteoarthritis",
      "joint remodelling",
      "arthritic changes"
    ]
  },

  // RESPIRATORY
  "wind": {
    category: "Respiratory",
    description: "Respiratory noise/abnormal wind",
    riskLevel: "medium",
    explanation: "Abnormal breathing sounds that may indicate upper airway issues",
    implications: [
      "Could affect performance",
      "May worsen with exercise",
      "Might require surgical intervention",
      "Could impact high-level work"
    ],
    recommendations: [
      "Endoscopic examination",
      "Exercise testing recommended",
      "Monitor during work",
      "Consider specialist referral"
    ],
    commonPhrases: [
      "respiratory noise",
      "abnormal breathing sounds",
      "roaring",
      "whistling"
    ]
  },

  // SKIN CONDITIONS
  "sarcoid": {
    category: "Dermatological",
    description: "Sarcoids present",
    riskLevel: "medium",
    explanation: "Common skin tumours in horses that can be locally aggressive",
    implications: [
      "May require treatment",
      "Could spread or grow",
      "Mainly cosmetic concern",
      "Insurance implications"
    ],
    recommendations: [
      "Monitor size and appearance",
      "Discuss treatment options",
      "Consider insurance impact",
      "Regular vet checks"
    ],
    commonPhrases: [
      "sarcoid lesions",
      "skin tumours",
      "nodular sarcoids",
      "fibroblastic sarcoids"
    ]
  },

  // EYES
  "cataract": {
    category: "Ophthalmological",
    description: "Cataracts observed",
    riskLevel: "medium",
    explanation: "Opacity in the lens of the eye affecting vision",
    implications: [
      "May affect vision",
      "Could be progressive",
      "Might affect confidence",
      "Safety considerations"
    ],
    recommendations: [
      "Regular eye examinations",
      "Monitor for changes",
      "Consider specialist opinion",
      "Discuss management strategies"
    ],
    commonPhrases: [
      "lens opacity",
      "nuclear sclerosis",
      "lens changes",
      "visual impairment"
    ]
  },

  // HOOF RELATED
  "hoof balance": {
    category: "Musculoskeletal - Foot",
    description: "Poor hoof balance",
    riskLevel: "medium",
    explanation: "Uneven or poor hoof conformation that may affect soundness",
    implications: [
      "May affect movement",
      "Could lead to lameness",
      "Requires careful farriery",
      "May impact performance"
    ],
    recommendations: [
      "Regular farrier attention",
      "Consider remedial shoeing",
      "Monitor for changes",
      "Balanced trimming schedule"
    ],
    commonPhrases: [
      "mediolateral imbalance",
      "poor hoof pastern axis",
      "broken back hoof axis",
      "asymmetrical hooves"
    ]
  },

  // TENDON ISSUES
  "tendon": {
    category: "Musculoskeletal - Soft Tissue",
    description: "Tendon abnormalities",
    riskLevel: "high",
    explanation: "Changes in tendon structure or appearance indicating damage or strain",
    implications: [
      "May affect soundness",
      "Could require rehabilitation",
      "Risk of reinjury",
      "May limit future use"
    ],
    recommendations: [
      "Ultrasound examination",
      "Controlled exercise plan",
      "Regular monitoring",
      "Consider rehabilitation options"
    ],
    commonPhrases: [
      "tendon enlargement",
      "SDFT lesion",
      "tendon thickening",
      "tendinopathy"
    ]
  },

  // LIGAMENT ISSUES
  "suspensory": {
    category: "Musculoskeletal - Soft Tissue",
    description: "Suspensory ligament issues",
    riskLevel: "high",
    explanation: "Changes or damage to the suspensory ligament structure",
    implications: [
      "May cause lameness",
      "Could affect performance",
      "May require extended rest",
      "Risk of recurrence"
    ],
    recommendations: [
      "Ultrasound assessment",
      "Controlled exercise program",
      "Regular monitoring",
      "Consider shock wave therapy"
    ],
    commonPhrases: [
      "suspensory enlargement",
      "branch lesion",
      "desmitis",
      "ligament enlargement"
    ]
  },

  // BEHAVIOURAL/NEUROLOGICAL
  "ataxia": {
    category: "Neurological",
    description: "Ataxic symptoms",
    riskLevel: "high",
    explanation: "Incoordination or abnormal gait suggesting neurological issues",
    implications: [
      "Safety concern for riding",
      "May be progressive",
      "Could affect basic functions",
      "May limit use significantly"
    ],
    recommendations: [
      "Neurological examination",
      "Consider cervical x-rays",
      "Specialist consultation",
      "Regular monitoring"
    ],
    commonPhrases: [
      "wobbly gait",
      "incoordination",
      "neurological deficits",
      "proprioception issues"
    ]
  },

  // DENTAL
  "dental": {
    category: "Dental",
    description: "Dental abnormalities",
    riskLevel: "low",
    explanation: "Issues with teeth or dental alignment",
    implications: [
      "May affect eating",
      "Could impact bitting",
      "Regular maintenance needed",
      "Generally manageable"
    ],
    recommendations: [
      "Regular dental checks",
      "Appropriate dental care",
      "Monitor eating habits",
      "Consider bit comfort"
    ],
    commonPhrases: [
      "wave mouth",
      "sharp edges",
      "hooks",
      "dental irregularities"
    ]
  },

  "digital pulse": {
    category: "Musculoskeletal - Foot",
    description: "Increased digital pulses",
    riskLevel: "high",
    explanation: "Increased digital pulses can indicate inflammation or pain in the foot, often associated with laminitis, abscess, or other foot pain",
    implications: [
      "May indicate active inflammation in the foot",
      "Could be sign of developing laminitis",
      "May affect soundness",
      "Requires immediate veterinary attention"
    ],
    recommendations: [
      "Immediate veterinary assessment recommended",
      "Monitor for signs of laminitis",
      "Consider radiographs of the feet",
      "Review diet and management"
    ],
    commonPhrases: [
      "mild digital pulses were palpable",
      "digital pulses were palpable in both forelimbs",
      "more notably in the left fore",
      "strong digital pulse",
      "bounding digital pulses",
      "increased digital pulse"
    ]
  },

  "hoof tester": {
    category: "Musculoskeletal - Foot",
    description: "Positive to hoof testers",
    riskLevel: "high",
    explanation: "Pain response to hoof testers indicates sensitivity within the foot structure",
    implications: [
      "Indicates active pain in the foot",
      "May affect soundness",
      "Could be sign of various foot conditions",
      "May require further investigation"
    ],
    recommendations: [
      "Radiographic examination recommended",
      "Further investigation of foot pain needed",
      "Consider MRI if persistent",
      "Review shoeing protocol"
    ],
    commonPhrases: [
      "reacted to hoof testers over the medial sole",
      "positive to hoof testers",
      "sensitive to hoof testers",
      "response to hoof testers"
    ]
  },

  "growth rings": {
    category: "Musculoskeletal - Foot",
    description: "Growth rings present",
    riskLevel: "medium",
    explanation: "Growth rings can indicate past episodes of metabolic disturbance or laminitis",
    implications: [
      "May indicate previous laminitic episodes",
      "Could suggest metabolic issues",
      "Requires careful monitoring",
      "May need dietary management"
    ],
    recommendations: [
      "Review complete health history",
      "Assess metabolic status",
      "Regular farrier attention",
      "Consider dietary restrictions"
    ],
    commonPhrases: [
      "growth rings were noted around the hoof wall",
      "rings in hoof wall",
      "hoof wall rings",
      "divergent growth rings"
    ]
  },

  "lameness": {
    category: "Musculoskeletal - Limbs",
    description: "Lameness observed",
    riskLevel: "high",
    explanation: "Active lameness indicates pain or dysfunction in the musculoskeletal system",
    implications: [
      "Affects current soundness",
      "May require investigation and treatment",
      "Could impact future use",
      "May be temporary or chronic"
    ],
    recommendations: [
      "Full lameness investigation needed",
      "Consider nerve blocks and imaging",
      "Evaluate treatment options",
      "Regular monitoring required"
    ],
    commonPhrases: [
      "2/5 lameness was observed on a hard surface",
      "increased asymmetry on the lunge",
      "lameness was observed",
      "grade 2 lameness"
    ]
  },

  "thoracolumbar": {
    category: "Musculoskeletal - Back",
    description: "Back pain/stiffness",
    riskLevel: "medium",
    explanation: "Pain or stiffness in the thoracolumbar region can affect performance and comfort",
    implications: [
      "May affect rideability",
      "Could indicate underlying issues",
      "May require ongoing management",
      "Could impact performance"
    ],
    recommendations: [
      "Consider back x-rays or ultrasound",
      "Evaluate saddle fit",
      "Physical therapy assessment",
      "Regular monitoring needed"
    ],
    commonPhrases: [
      "mild thoracolumbar stiffness on palpation",
      "thoracolumbar stiffness",
      "back pain",
      "back stiffness"
    ]
  },

  "shortened stride": {
    category: "Musculoskeletal - Limbs",
    description: "Shortened stride length",
    riskLevel: "medium",
    explanation: "Shortened stride can indicate pain, discomfort or mechanical limitation in movement",
    implications: [
      "May indicate compensatory movement",
      "Could be related to pain",
      "May affect performance",
      "Requires investigation"
    ],
    recommendations: [
      "Full lameness examination needed",
      "Consider joint/foot evaluation",
      "Assess for pain or restriction",
      "Monitor for changes"
    ],
    commonPhrases: [
      "exhibited a shortened stride in front",
      "shortened stride",
      "reduced stride length",
      "short striding"
    ]
  },

  "flexion test": {
    category: "Musculoskeletal - Joints",
    description: "Positive flexion tests",
    riskLevel: "medium",
    explanation: "Positive response to joint flexion indicates potential joint inflammation or early arthritic changes",
    implications: [
      "May indicate joint inflammation",
      "Could suggest early arthritis",
      "May affect performance",
      "Requires monitoring"
    ],
    recommendations: [
      "Further diagnostic imaging recommended",
      "Consider joint supplements",
      "Monitor for progression",
      "Discuss management options"
    ],
    commonPhrases: [
      "positive response in both front fetlocks",
      "mild positive response",
      "flexion tests produced",
      "positive to flexion"
    ]
  },

  "vital signs normal": {
    category: "General Health",
    description: "Normal vital signs",
    riskLevel: "low",
    explanation: "Temperature, heart rate, respiratory rate, and mucous membranes within normal limits indicates good general health",
    implications: [
      "Indicates normal physiological function",
      "No signs of systemic illness",
      "Good circulatory health",
      "Appropriate hydration"
    ],
    recommendations: [
      "Continue regular health monitoring",
      "Maintain good management practices",
      "Record baseline for future reference",
      "Regular veterinary check-ups"
    ],
    commonPhrases: [
      "within normal limits",
      "temperature, heart rate, and respiratory rate were all within normal limits",
      "mucous membranes were pink and moist",
      "capillary refill time was under two seconds"
    ]
  },

  "body condition": {
    category: "General Health",
    description: "Ideal body condition",
    riskLevel: "low",
    explanation: "Body condition score of 5/9 indicates ideal weight and muscle condition",
    implications: [
      "Good nutritional status",
      "Appropriate weight management",
      "Suitable for intended use",
      "Easy to maintain"
    ],
    recommendations: [
      "Maintain current feeding program",
      "Regular condition scoring",
      "Adjust diet with workload",
      "Monitor weight seasonally"
    ],
    commonPhrases: [
      "body condition score of 5 out of 9",
      "condition score 5/9",
      "ideal body condition",
      "moderate condition"
    ]
  },

  "bright alert responsive": {
    category: "General Health",
    description: "Good mental status",
    riskLevel: "low",
    explanation: "Horse shows appropriate alertness and responsiveness, indicating good neurological and general health",
    implications: [
      "Normal neurological status",
      "Good mental well-being",
      "Appropriate energy levels",
      "Suitable temperament"
    ],
    recommendations: [
      "Maintain regular exercise",
      "Continue mental stimulation",
      "Monitor for changes",
      "Regular health checks"
    ],
    commonPhrases: [
      "bright, alert, and responsive",
      "BAR",
      "alert and responsive",
      "good demeanor"
    ]
  }
};

// Helper function to group findings by body system
const groupFindingsBySystem = (findings: Finding[]) => {
  const grouped: { [key: string]: Finding[] } = {};
  findings.forEach(finding => {
    const category = finding.category || 'Other';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(finding);
  });
  return grouped;
};

// Horse anatomical regions with professional SVG paths
const horseAnatomy = {
  head: `M 80 50 C 85 45 95 42 105 45 C 115 48 120 55 118 65 L 115 75 C 112 82 108 85 102 86 C 96 87 90 85 87 80 L 85 70 C 82 65 75 55 80 50 Z`,
  
  neck: `M 87 80 C 95 85 100 95 102 110 C 104 125 103 140 100 150 C 97 160 92 165 85 167 C 78 169 72 165 68 158 C 64 151 62 140 65 125 C 68 110 75 95 87 80 Z`,
  
  shoulder: `M 85 167 C 92 170 97 180 100 195 C 103 210 102 225 98 235 C 94 245 88 250 80 252 C 72 254 65 250 60 242 C 55 234 53 220 55 205 C 57 190 65 175 85 167 Z`,
  
  frontLeg: `M 80 252 L 85 300 C 86 308 84 315 80 320 C 76 325 70 327 65 325 L 60 300 L 65 252 C 70 250 75 250 80 252 Z`,
  
  chest: `M 98 235 C 108 240 115 250 120 265 C 125 280 127 295 125 310 C 123 325 118 335 110 340 C 102 345 95 343 90 338 C 85 333 82 325 80 315 C 78 305 77 295 80 285 C 83 275 90 265 98 235 Z`,
  
  barrel: `M 125 310 C 145 315 165 320 180 330 C 195 340 202 355 200 370 C 198 385 190 395 175 400 C 160 405 145 407 130 405 C 115 403 102 398 90 390 C 78 382 72 372 70 360 C 68 348 70 335 80 315 Z`,
  
  back: `M 100 150 C 120 155 140 160 155 170 C 170 180 178 195 175 210 C 172 225 165 235 150 240 C 135 245 120 247 105 245 C 90 243 80 238 98 235 Z`,
  
  hindquarter: `M 200 370 C 210 375 217 385 220 400 C 223 415 222 430 217 445 C 212 460 205 470 195 475 C 185 480 175 482 165 480 C 155 478 148 473 145 465 C 142 457 140 450 142 442 C 144 434 148 427 155 420 C 162 413 170 405 175 400 Z`,
  
  hindLeg: `M 165 480 L 170 528 C 171 536 169 543 165 548 C 161 553 155 555 150 553 L 145 528 L 150 480 C 155 478 160 478 165 480 Z`,
  
  withers: `M 100 150 C 110 145 120 143 130 145 C 140 147 148 153 155 170 C 145 175 135 177 125 175 C 115 173 107 167 100 150 Z`
};

type RegionPosition = {
  top: string;
  left: string;
  width: string;
  height: string;
};

const HORSE_REGIONS: Record<string, RegionPosition> = {
  head: {
    top: '8%',
    left: '70%',
    width: '15%',
    height: '15%'
  },
  neck: {
    top: '15%',
    left: '65%',
    width: '15%',
    height: '20%'
  },
  back: {
    top: '25%',
    left: '60%',
    width: '20%',
    height: '15%'
  },
  shoulder: {
    top: '25%',
    left: '50%',
    width: '15%',
    height: '20%'
  },
  frontLeg: {
    top: '45%',
    left: '48%',
    width: '12%',
    height: '25%'
  },
  barrel: {
    top: '35%',
    left: '55%',
    width: '20%',
    height: '20%'
  },
  hindquarter: {
    top: '45%',
    left: '60%',
    width: '15%',
    height: '20%'
  },
  hindLeg: {
    top: '65%',
    left: '58%',
    width: '12%',
    height: '25%'
  }
};

const HorseDiagram = ({ findings }: { findings: Finding[] }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [regionFindings, setRegionFindings] = useState<Finding[]>([]);

  const getRegionRisk = (region: string) => {
    const relevantTerms = {
      head: ['head', 'poll', 'facial', 'jaw', 'dental', 'teeth', 'mouth', 'eye', 'ears'],
      neck: ['neck', 'cervical', 'throatlatch', 'jugular'],
      shoulder: ['shoulder', 'scapula', 'point of shoulder'],
      frontLeg: ['front leg', 'forelimb', 'knee', 'carpus', 'fetlock', 'pastern', 'hoof', 'digital'],
      chest: ['chest', 'thorax', 'ribs', 'sternum'],
      barrel: ['barrel', 'abdomen', 'flank', 'belly'],
      back: ['back', 'thoracolumbar', 'lumbar', 'spine', 'vertebrae', 'dorsal'],
      hindquarter: ['hindquarter', 'hip', 'pelvis', 'sacrum', 'gluteal'],
      hindLeg: ['hind leg', 'hindlimb', 'hock', 'stifle', 'gaskin'],
      withers: ['withers', 'thoracic', 'base of neck']
    };

    const regionFindings = findings.filter(f => {
      const description = f.description.toLowerCase();
      return relevantTerms[region as keyof typeof relevantTerms]?.some(term => 
        description.includes(term.toLowerCase())
      );
    });

    if (regionFindings.some(f => f.riskLevel === 'high')) return '#ef4444';
    if (regionFindings.some(f => f.riskLevel === 'medium')) return '#f59e0b';
    return '#22c55e';
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(prev => prev === region ? null : region);
  };

  useEffect(() => {
    if (selectedRegion) {
      const relevantTerms = {
        head: ['head', 'poll', 'facial', 'jaw', 'dental', 'teeth', 'mouth', 'eye', 'ears'],
        neck: ['neck', 'cervical', 'throatlatch', 'jugular'],
        shoulder: ['shoulder', 'scapula', 'point of shoulder'],
        frontLeg: ['front leg', 'forelimb', 'knee', 'carpus', 'fetlock', 'pastern', 'hoof', 'digital'],
        chest: ['chest', 'thorax', 'ribs', 'sternum'],
        barrel: ['barrel', 'abdomen', 'flank', 'belly'],
        back: ['back', 'thoracolumbar', 'lumbar', 'spine', 'vertebrae', 'dorsal'],
        hindquarter: ['hindquarter', 'hip', 'pelvis', 'sacrum', 'gluteal'],
        hindLeg: ['hind leg', 'hindlimb', 'hock', 'stifle', 'gaskin'],
        withers: ['withers', 'thoracic', 'base of neck']
      };

      const filtered = findings.filter(f => {
        const description = f.description.toLowerCase();
        return relevantTerms[selectedRegion as keyof typeof relevantTerms]?.some(term => 
          description.includes(term.toLowerCase())
        );
      });

      setRegionFindings(filtered);
    } else {
      setRegionFindings([]);
    }
  }, [selectedRegion, findings]);

  return (
    <div className="relative w-full bg-white rounded-lg p-4">
      <div className="flex gap-8">
        <div className="w-2/3">
          <div className="relative w-full h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[500px] h-[500px]">
                <HorseSilhouette className="w-full h-full text-black" />
                <svg
                  viewBox="0 0 1000 1000"
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: 'none' }}
                >
                  {selectedRegion && (
                    <path
                      d={document.getElementById(selectedRegion)?.getAttribute('d') || ''}
                      fill={getRegionRisk(selectedRegion)}
                      opacity="0.3"
                    />
                  )}
                </svg>
                <svg
                  viewBox="0 0 1000 1000"
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: 'all' }}
                >
                  {['head', 'neck', 'back', 'shoulder', 'frontLeg', 'barrel', 'hindquarter', 'hindLeg'].map((region) => (
                    <path
                      key={region}
                      d={document.getElementById(region)?.getAttribute('d') || ''}
                      fill="transparent"
                      stroke={selectedRegion === region ? '#3b82f6' : 'transparent'}
                      strokeWidth="2"
                      className="cursor-pointer hover:stroke-gray-400 transition-colors duration-200"
                      onClick={() => handleRegionClick(region)}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">High Risk</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Low Risk</span>
            </div>
          </div>
          {selectedRegion && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 capitalize">{selectedRegion.replace(/([A-Z])/g, ' $1').trim()}</h3>
              {regionFindings.length > 0 ? (
                <div className="space-y-2">
                  {regionFindings.map((finding, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <p className="text-sm">{finding.description}</p>
                      <span className={`text-xs font-medium ${
                        finding.riskLevel === 'high' ? 'text-red-500' :
                        finding.riskLevel === 'medium' ? 'text-amber-500' :
                        'text-green-500'
                      }`}>
                        {finding.riskLevel.charAt(0).toUpperCase() + finding.riskLevel.slice(1)} Risk
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No findings for this region</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced risk distribution chart
const RiskDistributionChart = ({ findings }: { findings: Finding[] }) => {
  const data = [
    { name: 'High Risk', value: findings.filter(f => f.riskLevel === 'high').length, color: '#ef4444' },
    { name: 'Medium Risk', value: findings.filter(f => f.riskLevel === 'medium').length, color: '#f59e0b' },
    { name: 'Low Risk', value: findings.filter(f => f.riskLevel === 'low').length, color: '#22c55e' }
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component for findings by body system
const SystemFindings = ({ 
  system, 
  findings 
}: { 
  system: string; 
  findings: Finding[] 
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold flex items-center">
        <span className="w-4 h-4 rounded-full mr-2" 
              style={{ 
                backgroundColor: findings.some(f => f.riskLevel === 'high') 
                  ? '#ef4444' 
                  : findings.some(f => f.riskLevel === 'medium') 
                    ? '#f59e0b' 
                    : '#22c55e' 
              }} 
        />
        {system}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {findings.map((finding, index) => (
          <div key={index} className="border-l-4 pl-4" style={{
            borderColor: finding.riskLevel === 'high' 
              ? '#ef4444' 
              : finding.riskLevel === 'medium' 
                ? '#f59e0b' 
                : '#22c55e'
          }}>
            <h4 className="font-medium mb-2">{finding.description}</h4>
            <p className="text-sm text-muted-foreground mb-2">{finding.explanation}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium mb-1">Implications</h5>
                <ul className="text-sm list-disc pl-4">
                  {finding.implications.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-1">Recommendations</h5>
                <ul className="text-sm list-disc pl-4">
                  {finding.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Component for findings summary
const FindingsSummary = ({ findings }: { findings: Finding[] }) => {
  const highRisk = findings.filter(f => f.riskLevel === 'high');
  const mediumRisk = findings.filter(f => f.riskLevel === 'medium');
  const lowRisk = findings.filter(f => f.riskLevel === 'low');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {highRisk.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-semibold text-red-700 mb-2">High Risk Findings ({highRisk.length})</h3>
          <ul className="text-sm space-y-1">
            {highRisk.map((finding, i) => (
              <li key={i} className="text-red-600">{finding.description}</li>
            ))}
          </ul>
        </div>
      )}
      {mediumRisk.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <h3 className="font-semibold text-amber-700 mb-2">Medium Risk Findings ({mediumRisk.length})</h3>
          <ul className="text-sm space-y-1">
            {mediumRisk.map((finding, i) => (
              <li key={i} className="text-amber-600">{finding.description}</li>
            ))}
          </ul>
        </div>
      )}
      {lowRisk.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h3 className="font-semibold text-green-700 mb-2">Low Risk Findings ({lowRisk.length})</h3>
          <ul className="text-sm space-y-1">
            {lowRisk.map((finding, i) => (
              <li key={i} className="text-green-600">{finding.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Component for finding with quote
const DetailedFinding = ({ finding, reportText }: { finding: Finding; reportText: string }) => {
  // Find the relevant quote from the report
  const findQuote = () => {
    const allPhrases = [finding.description, ...(finding.commonPhrases || [])];
    for (const phrase of allPhrases) {
      const index = reportText.toLowerCase().indexOf(phrase.toLowerCase());
      if (index !== -1) {
        // Get surrounding context (up to 100 chars before and after)
        const start = Math.max(0, index - 100);
        const end = Math.min(reportText.length, index + phrase.length + 100);
        const quote = reportText.slice(start, end).trim();
        // Find sentence boundaries
        const sentences = quote.match(/[^.!?]+[.!?]+/g) || [quote];
        return sentences.find(s => s.toLowerCase().includes(phrase.toLowerCase())) || quote;
      }
    }
    return null;
  };

  const quote = findQuote();

  return (
    <div className={`border-l-4 p-4 rounded mb-4 ${
      finding.riskLevel === 'high' 
        ? 'border-red-500 bg-red-50' 
        : finding.riskLevel === 'medium'
          ? 'border-amber-500 bg-amber-50'
          : 'border-green-500 bg-green-50'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{finding.description}</h3>
        <Badge className={`${getRiskColor(finding.riskLevel)}`}>
          {finding.riskLevel}
        </Badge>
      </div>
      
      {quote && (
        <div className="bg-white bg-opacity-50 p-3 rounded mb-4 flex items-start">
          <Quote className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
          <p className="text-sm italic">{quote}</p>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-4">{finding.explanation}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Key Implications:</h4>
          <ul className="text-sm list-disc pl-4 space-y-1">
            {finding.implications.map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
          <ul className="text-sm list-disc pl-4 space-y-1">
            {finding.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper function for risk colors
const getRiskColor = (risk: 'high' | 'medium' | 'low'): string => {
  switch (risk) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-500';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-500';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-500';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-500';
  }
};

const VeterinaryReportAnalyser = () => {
  const [reportText, setReportText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [overallRisk, setOverallRisk] = useState<'low' | 'medium' | 'high' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeReport = async () => {
    try {
      console.log('Starting analysis with text length:', reportText.length);
      setError(null);
      setIsAnalyzing(true);
      setFindings([]);
      setOverallRisk(null);

      // Simulate async operation to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 100));

      const foundFindings: Finding[] = [];
      let highRiskCount = 0;
      let mediumRiskCount = 0;

      // First assess the general language risk
      const languageRisk = assessRiskLevel(reportText);
      
      // Then look for specific findings with context
      Object.entries(vetTerms).forEach(([term, finding]) => {
        const allPhrases = [term, ...(finding.commonPhrases || [])];
        
        for (const phrase of allPhrases) {
          if (reportText.toLowerCase().includes(phrase.toLowerCase())) {
            // Check for negations
            if (isNegated(reportText, phrase)) {
              continue; // Skip this phrase if it's negated
            }
            
            // Analyze context modifiers
            const contextModifier = analyzeContext(reportText, phrase);
            
            // Adjust risk level based on context
            let adjustedRisk = finding.riskLevel;
            if (contextModifier > 1.5) {
              adjustedRisk = 'high';
            } else if (contextModifier < 0.5) {
              adjustedRisk = 'low';
            }
            
            // Add finding with context
            foundFindings.push({
              ...finding,
              riskLevel: adjustedRisk,
              explanation: `${finding.explanation} (Context: ${
                contextModifier > 1 ? 'Increased' : 
                contextModifier < 1 ? 'Decreased' : 
                'Normal'} significance)`
            });
            
            break; // Found a match, no need to check other phrases
          }
        }
      });

      // Sort findings by adjusted risk level
      foundFindings.sort((a, b) => {
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      });

      // Calculate overall risk
      let risk: 'low' | 'medium' | 'high' = 'low';
      if (foundFindings.some(f => f.riskLevel === 'high')) {
        risk = 'high';
      } else if (foundFindings.some(f => f.riskLevel === 'medium')) {
        risk = 'medium';
      }

      console.log('Analysis complete:', { foundFindings, risk });
      setFindings(foundFindings);
      setOverallRisk(risk);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('An error occurred while analyzing the report. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    console.log('Text changed, new length:', newText.length);
    setReportText(newText);
    // Reset results when text changes
    setFindings([]);
    setOverallRisk(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Veterinary Report Analyser - FindMyHorse"
        description="Analyse pre-purchase veterinary examination reports with our intelligent tool."
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-equine-navy mb-6">
            Veterinary Report Analyser
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Paste Veterinary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Textarea
                  placeholder="Paste your veterinary report here..."
                  className="min-h-[200px] font-mono text-sm"
                  value={reportText}
                  onChange={handleTextChange}
                />

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={() => void analyzeReport()}
                  disabled={reportText.trim().length === 0 || isAnalyzing}
                  className="w-full bg-equine-accent hover:bg-equine-accent/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analysing Report...
                    </>
                  ) : (
                    'Analyse Report'
                  )}
                </Button>

                {reportText.trim().length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please paste a veterinary report to analyze
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {findings.length > 0 && (
            <div className="space-y-8">
              <Alert className={`${getRiskColor(overallRisk || 'low')}`}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Overall Assessment</AlertTitle>
                <AlertDescription>
                  This report indicates {findings.length} clinical {findings.length === 1 ? 'finding' : 'findings'} with an overall {overallRisk} level of risk.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RiskDistributionChart findings={findings} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Anatomical Risk Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HorseDiagram findings={findings} />
                  </CardContent>
                </Card>
              </div>

              <FindingsSummary findings={findings} />

              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
                {findings.map((finding, index) => (
                  <DetailedFinding 
                    key={index} 
                    finding={finding} 
                    reportText={reportText}
                  />
                ))}
              </div>

              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  This analysis is a guide only and should not replace professional veterinary advice. Always consult with your veterinarian for a complete assessment.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {findings.length === 0 && !isAnalyzing && reportText.trim().length > 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>No Findings</AlertTitle>
              <AlertDescription>
                No significant findings were detected in the report. This could mean either the report is clear or it uses terminology our system doesn't recognize. Please consult with your veterinarian for a professional interpretation.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VeterinaryReportAnalyser;