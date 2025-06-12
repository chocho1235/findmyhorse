export const newsArticles = [
  {
    id: "lame-horse-return",
    title: "The Lame Horse Return",
    summary: "Buyer discovers lameness 2 weeks after purchase - here's what happened next",
    content: [
      { type: 'paragraph', text: "A buyer purchased a horse for £15,000, which was described as 'sound and ready for competition'. Within two weeks, the horse showed signs of intermittent lameness." },
      { type: 'paragraph', text: "A veterinary examination revealed a pre-existing condition that was not disclosed by the seller, a registered dealer. The buyer contacted the seller and, after initial resistance, successfully exercised their short-term right to reject under the Consumer Rights Act 2015, receiving a full refund." },
      { type: 'quote', text: "The case highlighted the importance of a pre-purchase vetting, even when buying from a reputable source." }
    ],
    outcome: "Successful Return",
    amount: "£15,000",
    duration: "3 weeks",
    location: "Yorkshire",
    category: "Health Issues",
    featured: true,
    outcomeType: "positive"
  },
  {
    id: "deposit-dispute-verbal-agreement",
    title: "£21,000 Deposit Dispute Highlights Risks of Verbal Agreements",
    summary: "A buyer paid a £21,500 deposit for a show pony, but the sale was terminated after the pony failed a pre-purchase vetting. The seller's refusal to return the deposit led to a court case, highlighting the dangers of verbal agreements.",
    content: [
        { type: 'paragraph', text: 'A legal case involving a £21,000 deposit for a show pony that was ultimately not sold has underscored the importance of written contracts in private horse sales.' },
        { type: 'paragraph', text: 'In June 2022, Theresa Bearman agreed to purchase Letterkeen Bettyn, a 138cm showjumping pony, from Raquel Eldridge-Keenan for £85,000. Mrs Bearman paid a £21,500 deposit with the understanding that the balance would be paid after a satisfactory veterinary check. In a message exchange, Ms Eldridge-Keenan had stated that if the pony "breaks a leg etc, I will refund all of it."' },
        { type: 'paragraph', text: 'It was agreed that "Betty" would move after competing at the Horse of the Year Show in October. However, shortly after the event, a pre-purchase veterinary exam was abandoned when the pony was found to be lame. Mrs Bearman declined to proceed and requested her deposit back. Ms Eldridge-Keenan claimed it was a holding deposit and non-refundable.' },
        { type: 'subheading', text: 'The Court\'s Decision' },
        { type: 'paragraph', text: 'At a court hearing on 20 March 2024, the judge ruled in favour of Mrs Bearman. He held that the failed vetting entitled her to treat the agreement as terminated and recover her deposit. While Betty later returned to competition and performed well, the judge noted that her subsequent success was not relevant to the contract dispute.' },
        { type: 'quote', source: 'The Judge', text: 'This unfortunate and expensive case should never have arisen. While contracts may not prevent all disputes, they help clarify the rights and obligations of both parties.' },
        { type: 'subheading', text: 'Expert Commentary' },
        { type: 'paragraph', text: 'Jacqui Dark of Equine Law UK, who represented Mrs Bearman, said her client hopes the ruling will raise awareness about the need for written contracts.' },
        { type: 'quote', source: 'Jacqui Dark, Equine Law UK', text: 'Too many equine sales rely on informal arrangements or trust. Without a signed agreement, you\\\'re left relying on texts and assumptions, which often end in costly litigation.' },
        { type: 'paragraph', text: 'A representative for Ms Eldridge-Keenan said they believe the pony\'s continued soundness justified their position but accepted that a proper contract would have avoided any confusion.' },
        { type: 'quote', source: 'British Horse Society', text: 'While horse purchases are exciting, buyers and sellers should use written receipts and formal agreements to ensure transparency and protection.' }
    ],
    outcome: "Full Deposit Returned",
    amount: "£21,500",
    duration: "17 months",
    location: "United Kingdom",
    category: "Contract Law",
    featured: true,
    outcomeType: "positive"
  },
  {
    id: "trial-period-injury",
    title: "Trial Period Gone Wrong",
    summary: "Horse injured during trial period - who was responsible for vet bills?",
    content: [
      { type: 'paragraph', text: "A horse on a one-week trial was injured in a field accident. The trial agreement was verbal and did not specify liability for injuries." },
      { type: 'paragraph', text: "The owner and the potential buyer disputed who should cover the £3,200 veterinary bill. The matter was settled through mediation, with both parties agreeing to split the cost." },
      { type: 'quote', text: "This case shows the critical need for comprehensive, written trial agreements that explicitly cover insurance, liability for injury, and emergency protocols." }
    ],
    outcome: "Shared Responsibility",
    amount: "£3,200",
    duration: "6 weeks",
    location: "Gloucestershire",
    category: "Trial Periods",
    featured: false,
    outcomeType: "neutral"
  },
  {
    id: "misrepresented-training",
    title: "Misrepresented Training Level",
    summary: "\"Broke to ride\" horse turns out to be dangerous - the buyer's legal options",
    content: [
      { type: 'paragraph', text: "A horse advertised as 'well-schooled and suitable for an amateur' was purchased for £8,500. The new owner discovered the horse had significant behavioural issues, making it dangerous to ride." },
      { type: 'paragraph', text: "A professional trainer assessed the horse as 'green and unsuitable for a novice'. The buyer engaged a solicitor, and after negotiation, the seller agreed to a partial refund of £4,000 to reflect the horse's true value and the cost of remedial training." },
      { type: 'quote', text: "This avoided court and highlighted the legal weight of descriptions in adverts." }
    ],
    outcome: "Partial Refund",
    amount: "£8,500",
    duration: "2 months",
    location: "Kentucky",
    category: "Misrepresentation",
    featured: false,
    outcomeType: "neutral"
  },
  {
    id: "age-fraud-discovery",
    title: "Age Fraud Discovery",
    summary: "Vet check reveals horse is 5 years older than advertised in a private sale",
    content: [
      { type: 'paragraph', text: "A buyer purchased a horse advertised as being 8 years old. A later dental examination during a routine vet visit estimated the horse's age to be closer to 13." },
      { type: 'paragraph', text: "As the sale was private, the buyer's primary recourse was the Misrepresentation Act. Given the clear factual inaccuracy in the advert, the seller agreed to a full refund plus transport costs to avoid legal action." }
    ],
    outcome: "Full Refund + Costs",
    amount: "£12,000",
    duration: "4 weeks",
    location: "Florida",
    category: "Fraud",
    featured: false,
    outcomeType: "positive"
  },
  {
    id: "transport-injury-dispute",
    title: "Transport Injury Dispute",
    summary: "Horse injured during shipping - a complex liability case between multiple parties",
    content: [
      { type: 'paragraph', text: "A valuable competition horse sustained a severe injury during transport by a professional company. The transport contract had clauses limiting the company's liability." },
      { type: 'paragraph', text: "The dispute involved the owner, the transport company, and their respective insurance providers. The case was resolved through a complex insurance settlement, with the horse's insurer covering the majority of the loss." },
      { type: 'quote', text: "It served as a lesson on carefully reviewing transporter liability and ensuring adequate insurance coverage." }
    ],
    outcome: "Insurance Settlement",
    amount: "£22,000",
    duration: "8 months",
    location: "Colorado",
    category: "Transport Issues",
    featured: false,
    outcomeType: "positive"
  },
  {
    id: "breeding-rights-confusion",
    title: "Breeding Rights Confusion",
    summary: "Mare sold with unclear breeding restrictions leads to costly legal conflict",
    content: [
      { type: 'paragraph', text: "A broodmare was sold for £35,000 with a verbal agreement that the seller would retain rights to future embryos. When the new owner prepared to flush an embryo for their own use, the original seller filed for an injunction." },
      { type: 'paragraph', text: "The resulting court case hinged on the vague and unwritten nature of the agreement. The court ultimately sided with the new owner, as the seller could not provide sufficient proof of the retained rights." },
      { type: 'quote', text: "The legal costs for both parties far exceeded the value of the disputed embryo." }
    ],
    outcome: "Court Decision",
    amount: "£35,000",
    duration: "14 months",
    location: "Virginia",
    category: "Breeding Rights",
    featured: false,
    outcomeType: "negative"
  }
]; 