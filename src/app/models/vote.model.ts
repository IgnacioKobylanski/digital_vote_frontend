export interface Vote {
  id?: number;
  voterId: number;
  candidateId: number;
  votedAt?: Date;
}