export interface Voter {
  id?: number;
  dni: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  hasVoted: boolean;
}