import { createContext, useContext, useMemo, useReducer } from "react";

import { allTickets, tempTicket } from "../../tickets"; // 10,000 tickets generated using https://json-generator.com/
import type { TicketType } from "../../tickets";

export interface AppState {
  ticketList: TicketType[];
  modifiedTicket: TicketType | null;
  ticketChanged: boolean;
  selectedTicketIdx: number | undefined;
}

interface Action {
  type: "ticketListChange" | "ticketChange" | "idxChange" | "filtersChange";
  value?: any;
}
type Dispatch = (action: Action) => void;

const initialAppState = {
  ticketList: allTickets,
  modifiedTicket: null,
  ticketChanged: false,
  selectedTicketIdx: undefined,
};

const AppContext = createContext<{ state: AppState; dispatch: Dispatch } | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "idxChange":
      return {
        ...state,
        selectedTicketIdx: action.value,
        modifiedTicket: action.value !== undefined ? state.ticketList[action.value] || tempTicket : null,
      };
    case "ticketChange":
      return {
        ...state,
        modifiedTicket: action.value,
      };
    case "filtersChange":
      return {
        ...state,
        ticketList: action.value,
      };
    case "ticketListChange":
      return {
        ...state,
        modifiedTicket: null,
        ticketList: action.value,
        selectedTicketIdx: undefined,
      };
    default: {
      return state;
    }
  }
};

export const AppProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): { state: AppState; dispatch: Dispatch } => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
