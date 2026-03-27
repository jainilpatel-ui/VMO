export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type Party = 'Supplier' | 'Buyer' | 'Both';
export type Status = 'Pending Review' | 'In Knowledge Base';

export interface Clause {
  id: string;
  name: string;
  category: string;
  risk: RiskLevel;
  partyObligated: Party;
  enforceableBy: Party;
  obligationType: string;
  deviation: string;
  description: string;
  tags: string[];
  similarity: number;
  status: 'ALIGNED' | 'NEEDS IMPROVEMENT';
  recommendations: string[];
  text: string;
  standardText: string;
}

export interface Contract {
  id: string;
  name: string;
  supplier: string;
  uploadedDate: string;
  pages: number;
  clauseCount: number;
  status: Status;
  clauses: Clause[];
}

export const dummyContracts: Contract[] = [
  {
    id: 'c1',
    name: 'LTIMindtree ADM Services SOW',
    supplier: 'LTIMindtree Limited',
    uploadedDate: '2024-04-26',
    pages: 400,
    clauseCount: 24,
    status: 'Pending Review',
    clauses: [
      {
        id: 'cl1',
        name: 'Services Provision',
        category: 'Services & Scope',
        risk: 'LOW',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Performance',
        deviation: 'Standard',
        description: 'Supplier shall provide the services as described in the Statement of Work.',
        tags: ['Scope', 'Delivery'],
        similarity: 95,
        status: 'ALIGNED',
        recommendations: [],
        text: 'Supplier agrees to provide the ADM services in accordance with the specifications and timelines set forth in this SOW.',
        standardText: 'Supplier agrees to provide the services in accordance with the specifications and timelines set forth in the applicable SOW.'
      },
      {
        id: 'cl2',
        name: 'Disabling Device Prevention',
        category: 'Security & Data Protection',
        risk: 'HIGH',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Compliance',
        deviation: 'Minor Deviation',
        description: 'Supplier warrants that no disabling devices or malicious code will be introduced into the Buyer systems.',
        tags: ['Security', 'Malware', 'Warranties'],
        similarity: 91,
        status: 'ALIGNED',
        recommendations: [
          'Clause is well-aligned. Consider adding a specific 48-hour breach notification requirement.'
        ],
        text: 'Supplier warrants that it will not introduce any viruses, worms, Trojan horses, or other malicious code or disabling devices into Buyer\'s systems or software.',
        standardText: 'Supplier warrants that it will not introduce any viruses, worms, Trojan horses, or other malicious code or disabling devices into Buyer\'s systems or software. Supplier shall notify Buyer within 48 hours of any suspected breach.'
      },
      {
        id: 'cl3',
        name: 'IP Ownership',
        category: 'Intellectual Property',
        risk: 'HIGH',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Rights Transfer',
        deviation: 'Major Deviation',
        description: 'Defines the ownership of Intellectual Property created during the engagement.',
        tags: ['IP', 'Ownership', 'Deliverables'],
        similarity: 48,
        status: 'NEEDS IMPROVEMENT',
        recommendations: [
          'Add explicit clause transferring ownership of custom deliverables to Buyer upon full payment.',
          'Distinguish clearly between Supplier background IP and custom foreground IP developed for Buyer.',
          'Include a license grant for any background IP embedded in deliverables.'
        ],
        text: 'Supplier retains all rights, title, and interest in and to any intellectual property developed or provided under this SOW. Buyer is granted a non-exclusive license to use the deliverables.',
        standardText: 'Buyer shall own all rights, title, and interest in and to any custom deliverables developed specifically for Buyer under this SOW upon full payment. Supplier retains ownership of its pre-existing background IP, and grants Buyer a perpetual, non-exclusive license to use such background IP to the extent incorporated into the deliverables.'
      },
      {
        id: 'cl4',
        name: 'Non-Compete for Key Personnel',
        category: 'Personnel & Staffing',
        risk: 'MEDIUM',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Restriction',
        deviation: 'Standard',
        description: 'Restricts key personnel from working for direct competitors during the engagement.',
        tags: ['Staffing', 'Key Personnel'],
        similarity: 85,
        status: 'ALIGNED',
        recommendations: [],
        text: 'Supplier agrees that Key Personnel assigned to this project will not be reassigned to a direct competitor of Buyer for a period of 6 months following their roll-off.',
        standardText: 'Supplier agrees that Key Personnel assigned to this project will not be reassigned to a direct competitor of Buyer for a period of 12 months following their roll-off.'
      },
      {
        id: 'cl5',
        name: 'Benchmarking Rights',
        category: 'Benchmarking',
        risk: 'MEDIUM',
        partyObligated: 'Buyer',
        enforceableBy: 'Supplier',
        obligationType: 'Right',
        deviation: 'Minor Deviation',
        description: 'Grants Buyer the right to benchmark pricing and services against market rates.',
        tags: ['Pricing', 'Audit'],
        similarity: 78,
        status: 'NEEDS IMPROVEMENT',
        recommendations: ['Specify that benchmarking can occur annually rather than once per term.'],
        text: 'Buyer may, at its own expense, engage an independent third party to benchmark the fees and services provided hereunder once during the term of the agreement.',
        standardText: 'Buyer may, at its own expense, engage an independent third party to benchmark the fees and services provided hereunder annually.'
      },
      {
        id: 'cl6',
        name: 'Innovation Fund',
        category: 'Innovation & Transformation',
        risk: 'LOW',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Financial',
        deviation: 'Standard',
        description: 'Supplier commits to an innovation fund to drive continuous improvement.',
        tags: ['Financial', 'Continuous Improvement'],
        similarity: 98,
        status: 'ALIGNED',
        recommendations: [],
        text: 'Supplier shall allocate 2% of the annual fees to an Innovation Fund to be used for mutually agreed transformation projects.',
        standardText: 'Supplier shall allocate 2% of the annual fees to an Innovation Fund to be used for mutually agreed transformation projects.'
      },
      {
        id: 'cl7',
        name: 'Termination Assistance',
        category: 'Termination & Disentanglement',
        risk: 'HIGH',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Performance',
        deviation: 'Minor Deviation',
        description: 'Supplier obligations upon termination of the agreement.',
        tags: ['Termination', 'Transition'],
        similarity: 82,
        status: 'ALIGNED',
        recommendations: ['Ensure transition period is at least 180 days.'],
        text: 'Upon termination, Supplier will provide reasonable transition assistance for a period of up to 90 days to ensure a smooth handover of services.',
        standardText: 'Upon termination, Supplier will provide reasonable transition assistance for a period of up to 180 days to ensure a smooth handover of services.'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Cognizant Cloud Services Agreement',
    supplier: 'Cognizant Technology Solutions',
    uploadedDate: '2024-02-10',
    pages: 180,
    clauseCount: 18,
    status: 'In Knowledge Base',
    clauses: [
      {
        id: 'cl8',
        name: 'Cloud Availability SLA',
        category: 'Service Levels',
        risk: 'LOW',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Performance',
        deviation: 'Standard',
        description: 'Supplier guarantees 99.9% uptime for cloud services.',
        tags: ['SLA', 'Uptime'],
        similarity: 100,
        status: 'ALIGNED',
        recommendations: [],
        text: 'Supplier guarantees that the Cloud Services will be available 99.9% of the time in any given calendar month.',
        standardText: 'Supplier guarantees that the Cloud Services will be available 99.9% of the time in any given calendar month.'
      },
      {
        id: 'cl9',
        name: 'Data Breach Notification',
        category: 'Security & Data Protection',
        risk: 'HIGH',
        partyObligated: 'Supplier',
        enforceableBy: 'Buyer',
        obligationType: 'Compliance',
        deviation: 'Standard',
        description: 'Supplier must notify Buyer within 24 hours of any confirmed data breach.',
        tags: ['Security', 'Breach', 'Notification'],
        similarity: 95,
        status: 'ALIGNED',
        recommendations: [],
        text: 'In the event of a confirmed data breach affecting Buyer Data, Supplier shall notify Buyer without undue delay and in no event later than 24 hours after discovery.',
        standardText: 'In the event of a confirmed data breach affecting Buyer Data, Supplier shall notify Buyer without undue delay and in no event later than 24 hours after discovery.'
      }
    ]
  }
];
