import { TOURNAMENT_URL } from "@/libs/home/constants";

const TournamentService = {
  getTournaments: async () => {
    const response = await fetch(TOURNAMENT_URL);
    return response.json();
  },
};

export default TournamentService;
