import { useQuery } from "@tanstack/react-query";
import TournamentService from "../../services/TournamentService";

export const useGetTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: TournamentService.getTournaments,
  });
};