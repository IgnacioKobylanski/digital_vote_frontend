import { Party } from './party.model';
import { Position } from './position.model';

export interface Candidate {
  id: number;
  name: string;
  candidateImg: string;
  positionId: number;
  position?: Position;
  partyId: number;
  party?: Party;
}