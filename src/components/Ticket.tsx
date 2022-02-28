import { useAppState } from "../hooks/useAppState";

type Props = {
  idx: number;
};

const Ticket = ({ idx }: Props) => {
  const {
    appState: { ticketList },
    handleIdxChange,
  } = useAppState();

  if (!ticketList[idx]) return null;

  const { status, created_at, created_by, description, priority, subject } = ticketList[idx];

  return (
    <div
      className="card max-w-sm bg-base-100 shadow-xl m-4"
      style={{
        height: "250px",
      }}
    >
      <div className="card-body">
        <div className="flex items-center">
          <p className="text-sm text-ellipsis overflow-hidden">
            created by <span className="font-medium">{created_by}</span>:{" "}
            <span className="text-sm text-gray-500 italic">{created_at}</span>
          </p>
          <button className="btn btn-sm btn-ghost" onClick={() => handleIdxChange(idx)}>
            <EditIcon />
          </button>
        </div>
        <h2 className="card-title capitalize text-ellipsis overflow-hidden">{subject || "No Subject"}</h2>
        <div className="flex items-center">
          <div
            className="badge font-medium mr-2"
            style={{
              backgroundColor:
                status === "In Progress" || status === "Open"
                  ? "#793EF9"
                  : status === "Resolved"
                  ? "#1d62ad"
                  : status === "Closed"
                  ? "#2A2E37"
                  : status === "Rejected"
                  ? "#FF0000"
                  : "#568b56",
              color: "#fff",
            }}
          >
            {status}
          </div>
          <div
            className="badge badge-outline"
            style={{
              color: priority === "low" ? "#1f2937" : priority === "normal" ? "#f000b8" : "#fff",
              backgroundColor: priority === "high" ? "#f87272" : "",
            }}
          >
            {priority}
          </div>
        </div>
        <p>{description || "No Description"}</p>
      </div>
    </div>
  );
};

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

export default Ticket;
