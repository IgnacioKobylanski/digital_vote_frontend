import { Party } from './party.model';

export interface Candidate {
  id: number;
  name: string;
  position: string;
  candidateImg: string; // Matchea con el .cs
  partyId: number;
  party?: Party;
}