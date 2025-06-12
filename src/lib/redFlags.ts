export type RedFlagCategory = 'Behaviour' | 'Health' | 'Seller' | 'Vagueness' | 'Disclaimer' | 'Training';

export interface RedFlag {
  id: string;
  pattern: RegExp;
  category: RedFlagCategory;
  severity: 1 | 2 | 3; // 1: Caution, 2: Concern, 3: Critical
  label: string;
  explanation: string;
  advice: string;
}

export const redFlags: RedFlag[] = [
  // --- Severity 3: CRITICAL ---
  {
    id: 'sold_as_seen',
    pattern: /sold as seen|as is(?![a-zA-Z])/i,
    category: 'Disclaimer',
    severity: 3,
    label: 'Sold As Seen / As Is',
    explanation: 'This is a major red flag. A business seller is attempting to waive your statutory rights under the Consumer Rights Act. For a private seller, it signals they want no future liability.',
    advice: 'For business sales, be aware your rights likely still stand. For private sales, this hugely increases your risk. A pre-purchase vetting is essential.'
  },
  {
    id: 'no_returns',
    pattern: /no returns|return policy/i,
    category: 'Disclaimer',
    severity: 3,
    label: 'No Returns',
    explanation: 'A business seller cannot legally enforce a blanket "no returns" policy for faulty or misdescribed goods. Stating this suggests they are either unaware of the law or are actively trying to mislead.',
    advice: 'Ask why they have this policy. This indicates a potentially difficult seller if issues arise post-purchase.'
  },
  {
    id: 'dangerous_behaviour',
    pattern: /bolts?|rears?|naps?|bucking|kicks|bites/i,
    category: 'Behaviour',
    severity: 3,
    label: 'Known Dangerous Behaviours',
    explanation: 'The ad mentions specific, dangerous habits like bolting, rearing, napping, bucking, kicking, or biting. These are serious safety risks and can be difficult and costly to resolve.',
    advice: 'Get the full history of this behaviour: triggers, frequency, and severity. A professional assessment is highly recommended. Do not try the horse without an experienced instructor.'
  },
  {
    id: 'health_history',
    pattern: /history of lameness|previous injury|kissing spine|navicular|sarcoid/i,
    category: 'Health',
    severity: 3,
    label: 'Significant Health History',
    explanation: 'Disclosure of serious past injuries or chronic conditions (lameness, KS, navicular, sarcoids) requires careful consideration and expert opinion.',
    advice: 'Request all vet records related to this issue. Your vet must perform a thorough examination with these specific conditions in mind.'
  },

  // --- Severity 2: CONCERN ---
  {
    id: 'project_horse',
    pattern: /project horse|for a project/i,
    category: 'Training',
    severity: 2,
    label: 'Project Horse',
    explanation: 'Often a euphemism for a horse with significant training gaps, behavioural issues, or health problems. It implies time, money, and expertise are needed.',
    advice: 'Request a transparent list of what makes this horse a "project." What training has it had? What are its specific issues?'
  },
  {
    id: 'experienced_rider',
    pattern: /experienced rider|not for a? novices?|no novices?|no beginners?|confident rider|not a novice ride/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Experienced/Confident Rider Needed',
    explanation: 'Often used to downplay a horse that is sharp, spooky, strong, or complex. It suggests the horse is not straightforward or forgiving.',
    advice: 'Ask for specific examples of why this type of rider is necessary. What does the horse do that a novice couldn\'t handle?'
  },
  {
    id: 'quirks',
    pattern: /quirky|has quirks|character/i,
    category: 'Vagueness',
    severity: 2,
    label: 'Quirky / Has Character',
    explanation: 'An extremely vague term that can hide a wide range of undesirable behaviours, from mild habits to more serious issues like being difficult to catch, load, or clip.',
    advice: 'This term is meaningless without clarification. Ask the seller to list every single "quirk" they are referring to.'
  },
  {
    id: 'urgent_sale',
    pattern: /must go|quick sale|urgent sale|sad sale|reduced for quick sale/i,
    category: 'Seller',
    severity: 2,
    label: 'Urgent Sale',
    explanation: 'Urgency can create pressure to rush. It may be genuine, but it can also be a tactic to offload a horse before a problem (like intermittent lameness) appears.',
    advice: 'Do not let the seller\'s situation rush you. Stick to your timeline for viewings, vetting, and checks.'
  },
  {
    id: 'nervous_behaviour',
    pattern: /nervous|spooky|sharp|sensitive|worry|anxious|flighty/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Nervous/Anxious Traits',
    explanation: 'These words indicate the horse may not be confident and could be prone to spooking or reacting unpredictably, which can be a safety concern.',
    advice: 'Ask what makes the horse nervous and how it manifests. Assess whether you have the skills and environment to manage a sensitive horse.'
  },
  {
    id: 'requires_maintenance',
    pattern: /requires maintenance|needs management|special shoeing/i,
    category: 'Health',
    severity: 2,
    label: 'Requires Maintenance',
    explanation: 'This indicates ongoing costs and care requirements are necessary to keep the horse sound or healthy. This could refer to injections, special shoeing, supplements, etc.',
    advice: 'Get a precise breakdown of the required maintenance, including frequency and cost. Discuss the long-term prognosis with your vet.'
  },
  {
    id: 'cheeky_behaviour',
    pattern: /cheeky|can be naughty|has his moments|opinionated|has a mind of his own/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Cheeky / Opinionated',
    explanation: 'A common euphemism used to downplay more serious behavioural issues such as stubbornness, lack of respect for the handler, or specific unwanted actions.',
    advice: 'This is too vague. Ask the seller for concrete examples of this "cheeky" behaviour. What exactly does the horse do?'
  },
  {
    id: 'quieter_life',
    pattern: /quieter life|low-level|hacking home|step down|less demanding home/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Prefers a Quieter Life',
    explanation: 'This can indicate that the horse struggles with the stress of competition, travel, or busy environments. It may also be used to mask an underlying soundness or health issue.',
    advice: 'Ask why the horse needs a quieter life. Is it due to temperament, soundness, or another issue? Has a vet recommended this?'
  },

  // --- Severity 1: CAUTION ---
  {
    id: 'no_vices',
    pattern: /no vices/i,
    category: 'Health',
    severity: 1,
    label: '"No Vices"',
    explanation: 'While sounding positive, this is a bold, absolute claim that is often untrue or subjective. It can create a false sense of security.',
    advice: 'Don\'t take this statement at face value. Be extra vigilant in checking for common vices (crib-biting, weaving, box-walking) yourself.'
  },
  {
    id: 'green',
    pattern: /green|unbroken|needs bringing on|needs more miles|just broken/i,
    category: 'Training',
    severity: 1,
    label: 'Green / Inexperienced',
    explanation: 'Indicates the horse is at the very beginning of its ridden career. This is not a red flag if you are experienced, but can be misused to excuse poor behaviour.',
    advice: 'Clarify exactly what training the horse has had. "Broken in" can mean very different things to different people. Assess if its education level matches your abilities.'
  },
  {
    id: 'price_negotiable',
    pattern: /price negotiable|OBO|ONO/i,
    category: 'Seller',
    severity: 1,
    label: 'Price Heavily Negotiable',
    explanation: 'Most horse prices are negotiable, but heavily emphasizing it (e.g., "ONO") can sometimes accompany an urgent sale.',
    advice: 'Consider this in the context of the whole ad. If combined with other urgency flags, proceed with your standard due diligence.'
  },
  {
    id: 'forward_going',
    pattern: /forward going|loves to work|plenty of engine|not a kick along/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Forward-Going',
    explanation: 'This can mean the horse is responsive and energetic, which is a positive. However, it can also be a euphemism for a horse that is strong, fast, and potentially difficult to stop.',
    advice: 'Clarify whether "forward" means responsive or strong. Ensure the horse has good brakes and is not beyond your comfort level.'
  },
  {
    id: 'sold_from_field',
    pattern: /sold from the field|out of work/i,
    category: 'Training',
    severity: 1,
    label: 'Sold from Field / Out of Work',
    explanation: 'The horse is not in regular work, so its behaviour and fitness under saddle are unknown. There may be a reason it\'s not being worked.',
    advice: 'Ask why the horse is out of work and for how long. It will need to be brought back into work slowly and carefully. The price should reflect this.'
  },
  {
    id: 'low_price',
    pattern: /cheap|bargain|low price|priced to sell/i,
    category: 'Seller',
    severity: 2,
    label: 'Suspiciously Low Price',
    explanation: 'A price that seems "too good to be true" often is. It can be a tactic to sell a horse with significant issues (health, behaviour, etc.) that are not immediately apparent.',
    advice: 'Question why the horse is priced so low compared to the market. Be extra thorough with your pre-purchase vetting and checks. Do not let a low price cause you to skip crucial due diligence steps.'
  },
  {
    id: 'no_fault_of_own',
    pattern: /no fault of his own|no fault of her own/i,
    category: 'Seller',
    severity: 1,
    label: 'For Sale Through No Fault of Their Own',
    explanation: 'A classic phrase used to preemptively deny that the horse has any issues. While often true, its frequent use warrants careful checking.',
    advice: 'This phrase doesn\'t change your due diligence. Continue to ask all the necessary questions about the horse\'s history, health, and behaviour.'
  }
]; 