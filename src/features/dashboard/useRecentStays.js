import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const last = searchParams.get("last");
  const numDays = !last ? 7 : Number(last);
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    data: stays,
    isLoading: isLoadingStays,
    error: errorStays,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stays, isLoadingStays, errorStays, confirmedStays, numDays };
}
