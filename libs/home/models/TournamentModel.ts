type Athlete = {
  user_id: string;
  athlete_id: string;
}

export interface Tournament {
  _id: string;
  name: string;
  description: string;
  poster: string;
  type: string;
  deadline: string;
  period: string[];
  scale: number;
  athletes: Athlete[];
  is_register: boolean;
}