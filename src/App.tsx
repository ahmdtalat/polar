import { FixedSizeList as List } from "react-window";

import { useAppState } from "./hooks/useAppState";

import Ticket from "./components/Ticket";
import Filters from "./components/Filters";
import TicketEditModal from "./components/TicketEditModal";

function App() {
  const { appState, handleIdxChange } = useAppState();

  // Virtual list row
  const Row = ({ index, style }: { index: number; style: any }) => <Ticket idx={index} style={style} />;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="navbar shadow-md mb-2 rounded-lg px-4 max-w-fit bg-base-100">
        {/*incrementing the index by one to create a new ticket */}
        <button className="btn btn-success shadow-md" onClick={() => handleIdxChange(appState.ticketList.length + 1)}>
          + Create Ticket
        </button>

        {/* Available filters */}
        <Filters />
      </div>

      {/* Ticket List */}
      <div className="overflow-auto h-3/4  p-4">
        <List height={600} itemCount={appState.ticketList.length} itemSize={250} width={400}>
          {Row}
        </List>
      </div>

      {/* One Modal that will update | create a ticket. */}
      <TicketEditModal />
    </div>
  );
}

export default App;
