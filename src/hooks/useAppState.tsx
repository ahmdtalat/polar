import { TicketType } from "../../tickets";
import { useAppContext } from "./useContext";

export const useAppState = () => {
  const { state, dispatch } = useAppContext();

  const handleIdxChange = (idx: number | undefined) => dispatch({ type: "idxChange", value: idx });

  const handleTicketChange = (updatedTicket: TicketType) => dispatch({ type: "ticketChange", value: updatedTicket });

  const handleFiltersChange = (filteredTicketList: TicketType[]) =>
    dispatch({ type: "filtersChange", value: filteredTicketList });

  const handleTicketListChange = () => {
    if (state.selectedTicketIdx === undefined || state.modifiedTicket === null) return;

    const updatedTickets = [...state.ticketList];
    // if there is no ticket with this index,
    //  it will be pushed to the array as a new one
    if (!updatedTickets[state.selectedTicketIdx]) updatedTickets.unshift(state.modifiedTicket);
    else updatedTickets[state.selectedTicketIdx] = state.modifiedTicket;

    dispatch({
      type: "ticketListChange",
      value: updatedTickets,
    });
  };

  return {
    appState: state,
    handleIdxChange,
    handleTicketChange,
    handleFiltersChange,
    handleTicketListChange,
  };
};
