export interface Vote {
  id?: number;
  voterId: number;
  candidateId: number;
  partyId?: number;
  votedAt?: Date;
}