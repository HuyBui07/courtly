import { TOURNAMENT_URL } from "@/libs/home/constants";
import { TokenManager } from "@/libs/store/persistStore";

const TournamentService = {
  getTournaments: async () => {
    try {
      const response = await fetch(TOURNAMENT_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};

export default TournamentService;
