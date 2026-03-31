import { Party } from './party.model';

export interface Candidate {
  id: number;
  name: string;
  position: string;
  candidateImg: string;
  partyId: number;
  party?: Party;
}