export type RedFlagCategory = 'Behaviour' | 'Health' | 'Seller' | 'Vagueness' | 'Disclaimer' | 'Training' | 'Experience' | 'Environment & Handling';

export interface RedFlag {
  id: string;
  pattern: RegExp;
  category: RedFlagCategory;
  severity: 1 | 2 | 3; // 1: Caution, 2: Concern, 3: Critical
  label: string;
  explanation: string;
  advice: string;
  checkNegations?: boolean;
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
    advice: 'Get the full history of this behaviour: triggers, frequency, and severity. A professional assessment is highly recommended. Do not try the horse without an experienced instructor.',
    checkNegations: true
  },
  {
    id: 'health_history',
    pattern: /history of lameness|previous injury|kissing spine|navicular|sarcoid/i,
    category: 'Health',
    severity: 3,
    label: 'Significant Health History',
    explanation: 'Disclosure of serious past injuries or chronic conditions (lameness, KS, navicular, sarcoids) requires careful consideration and expert opinion.',
    advice: 'Request all vet records related to this issue. Your vet must perform a thorough examination with these specific conditions in mind.',
    checkNegations: true
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
    advice: 'This term is meaningless without clarification. Ask the seller to list every single "quirk" they are referring to.',
    checkNegations: true
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
    advice: 'Ask what makes the horse nervous and how it manifests. Assess whether you have the skills and environment to manage a sensitive horse.',
    checkNegations: true
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
    advice: 'This is too vague. Ask the seller for concrete examples of this "cheeky" behaviour. What exactly does the horse do?',
    checkNegations: true
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
    advice: 'Clarify exactly what training the horse has had. "Broken in" can mean very different things to different people. Assess if its education level matches your abilities.',
    checkNegations: true
  },
  {
    id: 'price_negotiable',
    pattern: /price negotiable|OBO|ONO/i,
    category: 'Seller',
    severity: 1,
    label: 'Price Heavily Negotiable',
    explanation: 'Most horse prices are negotiable, but heavily emphasising it (e.g., "ONO") can sometimes accompany an urgent sale.',
    advice: 'Consider this in the context of the whole ad. If combined with other urgency flags, proceed with your standard due diligence.'
  },
  {
    id: 'forward_going',
    pattern: /forward going|loves to work|plenty of engine|not a kick along/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Forward-Going',
    explanation: 'This can mean the horse is responsive and energetic, which is a positive. However, it can also be a euphemism for a horse that is strong, fast, and potentially difficult to stop.',
    advice: 'Clarify whether "forward" means responsive or strong. Ensure the horse has good brakes and is not beyond your comfort level.',
    checkNegations: true
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
  },

  // --- NEWLY ADDED TERMS ---

  // --- Severity 1: CAUTION (Minor Flags) ---
  {
    id: 'lacks_education',
    pattern: /lacks education|needs schooling|uneducated|lacking miles|more schooling/i,
    category: 'Training',
    severity: 1,
    label: 'Lacks Education / Needs Schooling',
    explanation: 'Indicates the horse has basic training but is not a finished product. It requires a rider capable of continuing its education.',
    advice: 'Determine the exact level of training. "Needs schooling" can range from needing a tune-up to having significant gaps in its foundation.'
  },
  {
    id: 'takes_confidence',
    pattern: /takes confidence from|needs a confident handler|needs reassurance/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Takes Confidence from Rider/Handler',
    explanation: 'This horse is likely to be insecure or anxious and relies on the human to be its leader. It may be spooky or hesitant without a strong, calm handler.',
    advice: 'Assess if your own confidence and skill level are a good match. This type of horse may not be suitable for a nervous or inexperienced person.'
  },
  {
    id: 'capable_rider',
    pattern: /capable rider|competent rider|knowledgeable home/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Needs a Capable/Competent Rider',
    explanation: 'A step below "experienced rider," this suggests the horse is not suitable for beginners but may be fine for an intermediate rider who understands horse behaviour.',
    advice: 'This is less of a red flag than "experienced rider" but still warrants asking what specifically requires a capable hand.'
  },
  {
    id: 'can_be_excitable',
    pattern: /can be excitable|gets excited|can be buzzy|can be fizzy|lights up/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Can Be Excitable / Fizzy',
    explanation: 'The horse has moments of high energy, particularly in new environments, at shows, or in groups. This could be fun for some but challenging for others.',
    advice: 'Ask about the triggers for this excitement and how it is managed. Is it playful energy or does it border on uncontrollable?',
    checkNegations: true
  },
  {
    id: 'not_for_sharing',
    pattern: /not for sharing|one-person horse|bonds with one person/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Not for Sharing / One-Person Horse',
    explanation: 'This can indicate the horse is difficult or untrusting with new people, or may have specific handling requirements that a single owner has adapted to.',
    advice: 'If you plan to have multiple people handling the horse (e.g., in a livery yard), investigate this further. It may not be suitable for a family.'
  },
  {
    id: 'prefers_company',
    pattern: /prefers company|hates being alone|needs a companion/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Prefers Company / Hates Being Alone',
    explanation: 'This suggests potential separation anxiety, which can manifest as calling, fence-walking, or stress when other horses leave.',
    advice: 'Consider your stabling situation. Will the horse have constant companionship? This can be a significant management challenge.'
  },
  {
    id: 'travels_better_in_company',
    pattern: /travels better in company|prefers a companion for travel/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Travels Better in Company',
    explanation: 'This horse may be anxious or difficult to load and travel when alone. This can be restrictive if you frequently travel to lessons or shows by yourself.',
    advice: 'If you need to travel alone, this is a significant consideration. Ask if the horse *can* travel alone, even if it "prefers" not to.'
  },
  {
    id: 'good_in_traffic',
    pattern: /good in traffic|bombproof in traffic/i,
    category: 'Training',
    severity: 1,
    label: '"Good in Traffic"',
    explanation: 'Like "no vices," this is a subjective claim. "Good" could mean it tolerates cars but not tractors or bikes. "Bombproof" is a marketing term, not a guarantee.',
    advice: 'Don\'t assume this is 100% accurate. Ask specific questions about what kind of traffic it has been exposed to and how it reacts.'
  },
  {
    id: 'would_excel_in',
    pattern: /would excel in|potential to|will go far|could go to the top/i,
    category: 'Vagueness',
    severity: 1,
    label: 'Speculation on Potential ("Would Excel In...")',
    explanation: 'This is speculative marketing language. The horse has not yet achieved this, and there is no guarantee that it will. It focuses on future potential rather than current, proven ability.',
    advice: 'Base your decision on the horse\'s current, demonstrated abilities and temperament, not on unproven potential. What is it doing right now?'
  },
  {
    id: 'for_sale_due_to',
    pattern: /due to change in circumstances|rider giving up|loss of grazing|change in direction/i,
    category: 'Seller',
    severity: 1,
    label: 'Vague Reason for Sale',
    explanation: 'These are common and often genuine reasons for a sale. However, they can occasionally be used to hide the real reason, such as a difficult horse or an impending health issue.',
    advice: 'This is a mild flag. Consider it in the context of the whole ad. If the seller seems genuine, it\'s likely not an issue. Trust your gut feeling during conversations.'
  },

  // --- BATCH 2 - SEVERITY 2 (CONCERN) ---
  {
    id: 'can_be_strong',
    pattern: /can be strong|gets strong|a lot of horse/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Can Be Strong',
    explanation: 'This is often a euphemism for a horse that pulls, is difficult to stop, or is generally hard to manage physically. It can be a safety issue for a rider who is not strong enough.',
    advice: 'Clarify in what situations the horse is strong (e.g., jumping, hacking in a group). Ensure you are physically capable of handling it.',
    checkNegations: true
  },
  {
    id: 'needs_sedation',
    pattern: /needs sedation for|sedated for/i,
    category: 'Health',
    severity: 2,
    label: 'Needs Sedation',
    explanation: 'The horse requires medication for routine procedures like clipping, dentistry, or shoeing. This indicates high anxiety or difficult behaviour that makes these essential tasks challenging and potentially dangerous.',
    advice: 'Ask exactly what procedures require sedation and why. This adds complexity and cost to the horse\'s general upkeep.'
  },
  {
    id: 'doesnt_like_schooling',
    pattern: /doesn't enjoy schooling|hates the school|sour in the school/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Doesn\'t Enjoy Schooling',
    explanation: 'This can be a sign of boredom, but it can also indicate physical discomfort (e.g., back pain, ulcers) or a resistant attitude to work.',
    advice: 'Investigate the reason. Has a vet checked for underlying pain? This could be a significant training or health issue.'
  },
  {
    id: 'marish',
    pattern: /marish|mareish|moody mare|hormonal/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Marish / Hormonal',
    explanation: 'Indicates challenging behaviour related to a mare\'s reproductive cycle. This can range from mild irritability to being difficult to handle or ride at certain times.',
    advice: 'Ask for specifics on her behaviour and how it\'s managed. Does she require supplements or specific handling? This can impact rideability and competition plans.',
    checkNegations: true
  },
  {
    id: 'on_behalf_of_client',
    pattern: /on behalf of a client|client's horse/i,
    category: 'Seller',
    severity: 2,
    label: 'For Sale on Behalf of Client',
    explanation: 'The seller is acting as an agent and may have limited, secondhand knowledge of the horse\'s full history, temperament, and any vices.',
    advice: 'Insist on speaking directly with the owner who has lived with the horse day-to-day. Get the history from the primary source.'
  },
  {
    id: 'not_a_plod',
    pattern: /not a plod|not a kick-along/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Not a Plod',
    explanation: 'Similar to "forward-going" but with a stronger implication that the horse is fast and may lack relaxation. It is definitely not for a rider wanting a calm, steady ride.',
    advice: 'Be sure this energy level matches what you are looking for. This is the opposite of a horse you can relax on.'
  },
  {
    id: 'can_be_pushy',
    pattern: /can be pushy|can be bolshy|needs a firm hand/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Can be Pushy / Needs a Firm Hand',
    explanation: 'This suggests the horse may have issues with ground manners, invading personal space, or generally testing the handler. It indicates a lack of respect for boundaries.',
    advice: 'Assess the horse\'s ground manners carefully. A horse that is pushy on the ground can be difficult and dangerous to handle.',
    checkNegations: true
  },
  {
    id: 'not_a_fan_of',
    pattern: /not a fan of the vet|dislikes the farrier|tricky to clip|difficult to shoe/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Difficult for Routine Care',
    explanation: 'This flags difficulty with essential procedures. It can pose a danger to handlers, the vet, or the farrier, and may lead to extra charges or the need for sedation.',
    advice: 'Ask for a demonstration. See how the horse behaves for the farrier or during a mock clipping. This is a significant management issue.'
  },
  
  // --- BATCH 2 - SEVERITY 1 (CAUTION) ---
  {
    id: 'honest_horse',
    pattern: /honest horse|tries his heart out|genuine horse/i,
    category: 'Vagueness',
    severity: 1,
    label: 'Honest / Genuine Horse',
    explanation: 'This is a subjective and emotionally appealing term. It implies the horse is trustworthy, but it\'s not a substitute for facts about its behaviour and training.',
    advice: 'Ask for concrete examples that demonstrate this "honesty." What does it do when faced with a challenge or a mistake from the rider?'
  },
  {
    id: 'sweet_temperament',
    pattern: /sweet temperament|kind nature|lovely natured/i,
    category: 'Vagueness',
    severity: 1,
    label: 'Sweet Temperament / Kind Nature',
    explanation: 'A very common, subjective description. A horse can be sweet on the ground but challenging to ride, or vice versa.',
    advice: 'Verify this for yourself in different situations—in the stable, on the ground, and under saddle. Don\'t rely on the seller\'s definition of "sweet."'
  },
  {
    id: 'been_there_done_that',
    pattern: /been there and done it|done it all|the schoolmaster type/i,
    category: 'Training',
    severity: 1,
    label: '"Been There, Done That"',
    explanation: 'Implies a wealth of experience, making the horse seem safe and reliable. However, the extent and level of this experience can be exaggerated.',
    advice: 'Ask for specifics: Where has it been? What has it done? Are there any results or records to verify its competition history?'
  },
  {
    id: 'safe_sane_sound',
    pattern: /safe, sane, and sound/i,
    category: 'Disclaimer',
    severity: 1,
    label: '"Safe, Sane, and Sound"',
    explanation: 'The classic marketing slogan for a horse. These are three huge claims rolled into one, and they are all subjective and require thorough verification.',
    advice: 'This is a marketing phrase, not a vet certificate. Your job is to have each of these qualities independently assessed by yourself and your vet.'
  },
  {
    id: 'good_to_box_shoe_clip',
    pattern: /good to box|good to shoe|good to clip/i,
    category: 'Behaviour',
    severity: 1,
    label: '"Good to Box/Shoe/Clip"',
    explanation: 'This is a common and positive claim, but "good" is subjective. It might mean "stands still with a haynet and a firm hand" or it could mean "walks on without a fuss."',
    advice: 'Ask to see these things for yourself. A quick demonstration of loading or turning clippers on near the horse can be very revealing.'
  },
  {
    id: 'never_sick_or_sorry',
    pattern: /never sick or sorry|always healthy|no health issues/i,
    category: 'Health',
    severity: 1,
    label: '"Never Sick or Sorry"',
    explanation: 'A bold and unverifiable claim about a horse\'s entire health history. It is highly unlikely to be literally true.',
    advice: 'Ignore this as a guarantee. Your vet is the only person qualified to assess the horse\'s current health and look for signs of past issues.'
  },
  {
    id: 'sadly_outgrown',
    pattern: /sadly outgrown|rider has lost interest/i,
    category: 'Seller',
    severity: 1,
    label: 'Sadly Outgrown / Rider Lost Interest',
    explanation: 'One of the most common and often genuine reasons for selling a pony or horse. However, it can also mean the rider was over-horsed or couldn\'t handle the horse\'s behaviour.',
    advice: 'Observe the current rider on the horse. Does their story seem consistent with what you see? Does the horse seem a suitable match for them?'
  },
  {
    id: 'price_includes_tack',
    pattern: /price includes tack|comes with full wardrobe/i,
    category: 'Seller',
    severity: 1,
    label: 'Price Includes Tack/Wardrobe',
    explanation: 'Can be a good value proposition, but can also be a way to distract from other issues or to get rid of ill-fitting tack. An ill-fitting saddle can cause significant problems.',
    advice: 'Assess the quality and, most importantly, the fit of the tack, especially the saddle. Have a professional check the saddle fit if you are not experienced.'
  },

  // --- BATCH 3 - More nuanced flags from user feedback ---

  // --- Severity 2 (Concern) ---
  {
    id: 'not_for_nervous',
    pattern: /not for a nervous rider|not for the faint hearted/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Not for a Nervous Rider',
    explanation: 'An explicit warning that the horse requires a high degree of rider confidence, likely because it is spooky, sharp, or has challenging behaviours.',
    advice: 'Take this warning very seriously. This is not a suitable horse for anyone looking to build their confidence.'
  },
  {
    id: 'can_get_fresh',
    pattern: /can get fresh|gets fizzy if not in work|can be cold-backed/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Can Get Fresh / Cold-Backed',
    explanation: 'Indicates the horse may be prone to excitability, bucking, or leaping, especially when it hasn\'t been exercised regularly. "Cold-backed" can also hint at a physical issue.',
    advice: 'Ask for a demonstration of the horse being ridden after a day off. Consider if you have the time and ability to manage a horse that requires consistent work.',
    checkNegations: true
  },
  {
    id: 'works_better_at_home',
    pattern: /works better at home|prefers his own arena/i,
    category: 'Behaviour',
    severity: 2,
    label: 'Works Better at Home',
    explanation: 'A classic sign that the horse becomes tense, anxious, or difficult in new environments like competitions. The horse you see at home may not be the one you get at a show.',
    advice: 'Ask for videos of the horse at shows or in different environments. If possible, arrange a viewing at a different location to assess its behaviour.'
  },
  {
    id: 'passed_2_stage_vetting',
    pattern: /passed a 2-stage vet|passed 2 stage vetting/i,
    category: 'Health',
    severity: 2,
    label: 'Passed a 2-Stage Vetting',
    explanation: 'Mentioning a limited (2-stage) vet check can be a way of downplaying the need for a full 5-stage examination. It can suggest the seller wants to avoid flexion tests or strenuous exercise phases where issues might appear.',
    advice: 'Do not rely on the seller\'s vet check. Always commission your own independent, 5-stage pre-purchase examination for a riding horse.'
  },
  {
    id: 'old_injury',
    pattern: /has old injury|previous injury/i,
    category: 'Health',
    severity: 2,
    label: 'Has Old Injury',
    explanation: 'This is a vague disclosure that requires immediate and detailed follow-up. The nature and severity of the old injury could have long-term implications for the horse\'s soundness and career.',
    advice: 'Demand the full veterinary history related to the injury. Your own vet must be made aware of it to assess its relevance to your intended use.',
    checkNegations: true
  },

  // --- Severity 1 (Caution) ---
  {
    id: 'needs_consistent_work',
    pattern: /needs consistent work|needs consistent handling|thrives on routine/i,
    category: 'Training',
    severity: 1,
    label: 'Needs Consistent Work/Handling',
    explanation: 'Indicates that the horse\'s good behaviour or training is dependent on a strict, regular schedule. It may become difficult or lose its training without it.',
    advice: 'Be realistic about your own schedule. Can you provide the level of consistency this horse requires to behave well?'
  },
  {
    id: 'work_in_progress',
    pattern: /work in progress|a fun project/i,
    category: 'Training',
    severity: 1,
    label: 'Work in Progress',
    explanation: 'Similar to "project horse," but often used for horses with a better foundation. It still means the horse is not a finished product and requires further education.',
    advice: 'Clarify what aspects are "in progress." Is it flatwork, jumping, or general behaviour? Assess if you have the skills to complete the work.'
  },
  {
    id: 'come_back_into_work',
    pattern: /just come back into work|returning to work|has been turned away|had time off/i,
    category: 'Health',
    severity: 1,
    label: 'Recently Back in Work',
    explanation: 'The horse has had a break. Its current fitness level will be low, and its behaviour under saddle may not be representative of when it is in full work. There may be an undisclosed reason for the time off.',
    advice: 'Ask why the horse had time off and for how long. The price should reflect its current condition, not its past performance.'
  },
  {
    id: 'non_specific_treatment',
    pattern: /previously treated for/i,
    category: 'Health',
    severity: 1,
    label: 'Vague Previous Treatment',
    explanation: 'Mentioning treatment without specifying what it was for is evasive. It forces the buyer to ask for details that should have been disclosed upfront.',
    advice: 'Do not proceed until the seller provides the full details of what the horse was treated for, when, and by which vet.'
  },
  {
    id: 'partial_vaccinations',
    pattern: /up to date with most vaccinations|vaccinations lapsed/i,
    category: 'Health',
    severity: 1,
    label: 'Incomplete Vaccinations',
    explanation: 'Suggests a potential lack of thoroughness in the horse\'s general care. It may require you to restart the entire vaccination course.',
    advice: 'Check the horse\'s passport and vet records. Factor in the cost and time of getting vaccinations up to date.'
  },
  {
    id: 'conformational_fault',
    pattern: /pigeon-toed|over at the knee|cow-hocked/i,
    category: 'Health',
    severity: 1,
    label: 'Minor Conformational Fault',
    explanation: 'The seller is disclosing a known conformational issue. While many horses perform well with minor faults, they can have long-term soundness implications.',
    advice: 'Discuss the specific fault with your vet and farrier to understand its potential impact on the type of work you intend to do.',
    checkNegations: true
  },
  {
    id: 'no_known_issues',
    pattern: /no known issues|no known problems/i,
    category: 'Disclaimer',
    severity: 1,
    label: '"No Known Issues"',
    explanation: 'This phrase can be evasive. The key word is "known" - the seller is protecting themselves by suggesting there may be issues they are simply not aware of.',
    advice: 'This statement adds no value. Your due diligence and vet check are what will uncover any "unknown" issues.'
  },
  {
    id: 'green_for_age',
    pattern: /green for age|behind for his age/i,
    category: 'Training',
    severity: 1,
    label: 'Green for Age',
    explanation: 'Indicates the horse has not had the amount of training or experience typical for a horse of its age. This could be for various reasons, including past injury or difficulty.',
    advice: 'Ask why the horse is behind in its training. Assess the horse based on its current training level, not its age.'
  },
  {
    id: 'early_training',
    pattern: /started over poles|just backed/i,
    category: 'Training',
    severity: 1,
    label: 'Very Early Training Stage',
    explanation: 'These phrases describe a horse at the very beginning of its ridden career. This sets a clear expectation that the horse is inexperienced.',
    advice: 'Ensure this level of inexperience is suitable for your own skill level. The horse will require a knowledgeable rider to continue its education correctly.'
  },
  {
    id: 'low_mileage',
    pattern: /low mileage|limited mileage/i,
    category: 'Experience',
    severity: 1,
    label: 'Low Mileage',
    explanation: 'Indicates the horse has had limited exposure to different environments and situations. While this can mean less wear and tear, it also means the horse is inexperienced and may not be reliable in new situations.',
    advice: 'Assess if this level of experience matches your needs. A low-mileage horse requires a rider who can confidently continue its education.'
  },
  {
    id: 'limited_experience',
    pattern: /ridden inconsistently|not done much recently|not been off the property/i,
    category: 'Experience',
    severity: 1,
    label: 'Limited Recent Experience',
    explanation: 'The horse lacks recent, consistent exposure to work or new environments. Its behaviour may not reflect that of a horse in a regular program.',
    advice: 'Factor in the time it will take to build the horse\'s fitness and exposure. It may be spooky or anxious in new situations initially.'
  },
  {
    id: 'needs_patience',
    pattern: /good to load with patience|needs time to settle in|prefers a routine/i,
    category: 'Environment & Handling',
    severity: 1,
    label: 'Requires Patience or Routine',
    explanation: 'The horse may be anxious or difficult in specific situations (like loading) or when its routine is changed. This requires a patient handler and potentially a more managed environment.',
    advice: 'Consider if you have the time, patience, and environment to accommodate these needs. This may not be suitable for a busy competition yard.'
  },
  {
    id: 'spooky_in_wind',
    pattern: /spooky in wind|can be spooky/i,
    category: 'Behaviour',
    severity: 1,
    label: 'Can Be Spooky',
    explanation: 'A common trait, but one that needs to be understood. It suggests the horse is reactive to its environment.',
    advice: 'Ask what the horse spooks at and how it reacts - does it just jump sideways, or does it spin and bolt? Assess if this is within your comfort zone.',
    checkNegations: true
  },
  {
    id: 'sales_pressure',
    pattern: /first to see will buy|too good to miss|bargain price for quick sale/i,
    category: 'Seller',
    severity: 1,
    label: 'Sales Pressure Language',
    explanation: 'These are classic marketing tactics designed to create a sense of urgency and encourage a quick decision. They are often used to rush buyers and discourage thorough checks.',
    advice: 'Completely ignore this language. It has no bearing on the quality of the horse. Stick to your own timeline and process of due diligence.'
  }
];

export interface GreenFlag {
  id: string;
  pattern: RegExp;
  category: 'Temperament' | 'Training' | 'Experience' | 'Health' | 'Management';
  label: string;
  explanation: string;
}

export const greenFlags: GreenFlag[] = [
  {
    id: 'snaffle_mouth',
    pattern: /snaffle mouth|ridden in a snaffle/i,
    category: 'Training',
    label: 'Ridden in a Snaffle',
    explanation: 'This is a positive indicator that the horse is well-trained, responsive, and does not require strong bits to be manageable. It suggests a good foundation of education.'
  },
  {
    id: 'confidence_giver',
    pattern: /confidence giver|confidence builder|confidence booster/i,
    category: 'Temperament',
    label: 'Confidence Giver',
    explanation: 'A highly sought-after trait, this suggests the horse is reliable, forgiving, and has a temperament that helps its rider feel safe and secure.'
  },
  {
    id: 'schoolmaster',
    pattern: /schoolmaster|been there and done it|knows the job|the schoolmaster type/i,
    category: 'Experience',
    label: 'Schoolmaster / Experienced',
    explanation: 'Indicates a horse with extensive experience, which is invaluable for a rider looking to learn or compete. This type of horse is often forgiving of rider errors.'
  },
  {
    id: 'bombproof',
    pattern: /bombproof|unflappable|seen it all/i,
    category: 'Temperament',
    label: 'Bombproof / Unflappable',
    explanation: 'While no horse is truly "bombproof," this language strongly suggests the horse is exceptionally calm, sensible, and not easily spooked. This is a significant positive for safety.'
  },
  {
    id: 'easy_to_do',
    pattern: /easy to do in all ways|a pleasure to have|no trouble|good to box|good to shoe|good to clip/i,
    category: 'Temperament',
    label: 'Easy to Handle',
    explanation: 'This implies the horse has good ground manners and is straightforward to manage in a day-to-day setting (catching, loading, shoeing, clipping etc.), making it a more enjoyable ownership experience.'
  },
  {
    id: 'hacks_alone',
    pattern: /hacks alone confidently|great to hack alone|hacks alone or in company/i,
    category: 'Training',
    label: 'Hacks Alone Confidently',
    explanation: 'A horse that is genuinely happy and safe to hack alone is a huge bonus. It shows independence and a solid, non-spooky temperament.'
  },
  {
    id: 'honest_genuine',
    pattern: /honest horse|tries his heart out|genuine horse/i,
    category: 'Temperament',
    label: 'Honest / Genuine',
    explanation: 'A positive description suggesting the horse is trustworthy and tries its best for the rider, even when faced with new challenges or rider error.'
  },
  {
    id: 'sweet_temperament',
    pattern: /sweet temperament|kind nature|lovely natured/i,
    category: 'Temperament',
    label: 'Sweet Temperament',
    explanation: 'Indicates the horse is pleasant and kind to be around on the ground. This is a very desirable trait for an amateur or family horse.'
  },
  {
    id: 'lunges_well',
    pattern: /lunges well|great on the lunge/i,
    category: 'Training',
    label: 'Lunges Well',
    explanation: 'Shows a good foundation of groundwork and training, suggesting the horse is obedient and understands voice commands.'
  },
  {
    id: 'lightly_competed',
    pattern: /lightly competed|low level competition experience/i,
    category: 'Experience',
    label: 'Lightly Competed',
    explanation: 'A positive for many buyers, this means the horse has seen the competition environment without having excessive wear and tear. It shows potential and a willingness to perform.'
  },
  {
    id: 'sadly_outgrown',
    pattern: /sadly outgrown|rider has lost interest|no fault of his own/i,
    category: 'Experience',
    label: 'Genuine Reason for Sale',
    explanation: 'Indicates a genuine reason for the sale that is not related to the horse having problems (e.g., child has outgrown their pony). This can suggest the horse is well-loved.'
  },
  {
    id: 'includes_tack',
    pattern: /price includes tack|comes with full wardrobe/i,
    category: 'Experience',
    label: 'Includes Tack & Wardrobe',
    explanation: 'A nice bonus that can save initial expense. Ensure the saddle is a good fit, as this is the most critical component.'
  },
  {
    id: 'calm_and_gentle',
    pattern: /calm|gentle|easy-going|quiet|relaxed/i,
    category: 'Temperament',
    label: 'Calm and Gentle',
    explanation: 'Indicates a horse with a mild, calm, and relaxed disposition, suggesting it is safe and pleasant to be around.'
  },
  {
    id: 'willing_and_brave',
    pattern: /willing|brave|eager to please|happy character|great personality|tries hard/i,
    category: 'Temperament',
    label: 'Willing and Brave',
    explanation: 'Suggests the horse has a positive attitude towards work, is not easily frightened, and is keen to please its rider.'
  },
  {
    id: 'smart_and_sensible',
    pattern: /smart|sensible|trustworthy|reliable/i,
    category: 'Temperament',
    label: 'Smart and Sensible',
    explanation: 'A highly desirable combination suggesting the horse is intelligent, makes good decisions, and can be depended upon.'
  },
  {
    id: 'patient_and_sociable',
    pattern: /patient|sociable|friendly|good with children|bonds easily/i,
    category: 'Temperament',
    label: 'Patient and Sociable',
    explanation: 'Indicates the horse is good-natured with people and other animals, making it a good fit for a family or busy yard.'
  },
  {
    id: 'well_mannered',
    pattern: /well-mannered|mannerly|respectful of boundaries|no bad habits|not marish/i,
    category: 'Temperament',
    label: 'Well-Mannered',
    explanation: 'Implies the horse has good ground manners, respects handlers, and does not have problematic behaviours like being "marish".'
  },
  {
    id: 'novice_friendly',
    pattern: /suitable for novices|first pony|first horse|great for beginners|safe hack|steady ride|forgiving ride/i,
    category: 'Temperament',
    label: 'Novice Friendly',
    explanation: 'A key indicator for less experienced riders, suggesting the horse is safe, reliable, and forgiving of mistakes.'
  },
  {
    id: 'child_oap_suitable',
    pattern: /ridden by children|ridden by oaps|mother\/daughter share/i,
    category: 'Temperament',
    label: 'Suitable for Children / OAPs',
    explanation: 'Suggests a particularly safe and reliable temperament, suitable for a wide range of riders including the very young or older.'
  },
  {
    id: 'push_button_ride',
    pattern: /push-button ride|easy off the leg|voice responsive/i,
    category: 'Training',
    label: 'Push-Button / Responsive Ride',
    explanation: 'Indicates a well-trained horse that is highly responsive to the rider\'s aids, making it easy and enjoyable to ride.'
  },
  {
    id: 'bombproof_and_steady',
    pattern: /bombproof|steady in open spaces|doesn\'t hot up|good in traffic|not spooky/i,
    category: 'Temperament',
    label: 'Bombproof and Steady',
    explanation: 'While no horse is truly bombproof, this group of terms strongly suggests an exceptionally calm and reliable horse that isn\'t easily frightened.'
  },
  {
    id: 'well_schooled',
    pattern: /well-schooled|light in the hand|soft mouth|works in an outline|correct transitions|established paces|balanced paces/i,
    category: 'Training',
    label: 'Well-Schooled',
    explanation: 'Indicates a high level of training in flatwork, suggesting the horse is balanced, responsive, and understands rider aids.'
  },
  {
    id: 'advanced_training',
    pattern: /laterally trained|knows lateral work|flying changes/i,
    category: 'Training',
    label: 'Advanced Training',
    explanation: 'Shows the horse has more advanced dressage training, which is a significant bonus for competitive riders.'
  },
  {
    id: 'competition_experience',
    pattern: /competed at|eventing potential|dressage prospect|jumping machine|placed regularly|used to shows/i,
    category: 'Experience',
    label: 'Competition Experience / Potential',
    explanation: 'A strong positive for competitive riders, indicating the horse has experience in a competition environment or shows clear potential.'
  },
  {
    id: 'brave_jumper',
    pattern: /willing jumper|careful over fences|brave jumper|doesn't rush fences|jumps fillers|xc schooled/i,
    category: 'Training',
    label: 'Confident Jumper',
    explanation: 'These phrases describe an ideal jumping horse that is brave, careful, and straightforward to ride over fences.'
  },
  {
    id: 'good_to_hack',
    pattern: /hacks alone|hacks in company|good in traffic|ridden on roads|beach rides|forestry hacks/i,
    category: 'Experience',
    label: 'Good to Hack',
    explanation: 'A major advantage for pleasure riders, indicating the horse is confident and safe when ridden out in various environments.'
  },
  {
    id: 'consistent_work',
    pattern: /in consistent work|regularly ridden|fit and ready|in full work/i,
    category: 'Training',
    label: 'In Consistent Work',
    explanation: 'Suggests the horse is fit, has recently been in a regular work program, and is ready to continue its job.'
  },
  {
    id: 'well_bred',
    pattern: /well-bred|top bloodlines|registered/i,
    category: 'Health',
    label: 'Well-Bred / Registered',
    explanation: 'Indicates the horse has a known and potentially strong pedigree, which can be a predictor of talent and quality.'
  },
  {
    id: 'sound_and_healthy',
    pattern: /sound|never sick or sorry|up to date with vaccinations|up to date with worming|clean legs|no lumps or bumps/i,
    category: 'Health',
    label: 'Sound and Healthy',
    explanation: 'While "never sick or sorry" needs verification, this group of terms suggests good general health and soundness.'
  },
  {
    id: 'good_conformation',
    pattern: /good feet|straight mover|excellent conformation|great topline|well-balanced/i,
    category: 'Health',
    label: 'Good Conformation',
    explanation: 'Suggests the horse has a correct physical structure, which is crucial for long-term soundness and athletic ability.'
  },
  {
    id: 'vetting_welcome',
    pattern: /vetting welcome|recent 5-stage vet passed/i,
    category: 'Health',
    label: 'Vetting Welcomed / Passed',
    explanation: 'Shows transparency from the seller and confidence in the horse\'s health. A recent pass is a bonus, but you should always use your own vet.'
  },
  {
    id: 'easy_to_manage',
    pattern: /easy to manage|easy to keep|low maintenance|good doer|hardy/i,
    category: 'Management',
    label: 'Easy to Manage / Keep',
    explanation: 'A significant practical benefit, indicating the horse is straightforward in its daily care and doesn\'t require intensive management.'
  },
  {
    id: 'good_to_handle',
    pattern: /good to catch|good to groom|good to tack up|easy to shoe|good to clip|stands for vet\/farrier|ties well/i,
    category: 'Management',
    label: 'Good to Handle',
    explanation: 'Implies the horse is well-behaved for all routine handling and care procedures, making daily life much easier.'
  },
  {
    id: 'easy_loader',
    pattern: /easy to load|loads first time|travels in trailer|travels in lorry|travels well/i,
    category: 'Management',
    label: 'Easy Loader and Traveller',
    explanation: 'A huge advantage for anyone wanting to travel. This suggests the horse is not stressed by loading or travelling.'
  },
  {
    id: 'good_in_stable',
    pattern: /good with stable routine|quiet in stable|no stable vices|turns out with mares or geldings|lives in or out/i,
    category: 'Management',
    label: 'Good in the Stable / Field',
    explanation: 'Indicates the horse is adaptable to different living situations and is well-behaved, whether stabled or turned out.'
  }
];
