type Participant = {
  id: string;
  name: string;
};

export type PickupParticipatedState = {
  maximum_pickup: number;
  users: Participant[];
};