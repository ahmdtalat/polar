import { useAppState } from "../hooks/useAppState";

const TicketEditModal = () => {
  const {
    appState: { modifiedTicket, selectedTicketIdx, ticketList },
    handleIdxChange,
    handleTicketChange,
    handleTicketListChange,
  } = useAppState();

  if (modifiedTicket === null || selectedTicketIdx === undefined) return null;

  const handleOnChange = (e: any) =>
    handleTicketChange({
      ...modifiedTicket,
      [e.target.name]: e.target.value,
    });

  return (
    // Close modal when clicking on the overlay div
    <div className="modal modal-open cursor-pointer" onClick={() => handleIdxChange(undefined)}>
      <div
        className="modal-box"
        onClick={(e) => {
          e.stopPropagation(); // will prevent modal-box closing when clicking on it.
        }}
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold">Subject</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="subject"
              value={modifiedTicket.subject}
              onChange={handleOnChange}
              className="input input-bordered input-primary w-full"
            />
          </label>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold">Description</span>
          </label>
          <label className="input-group">
            <textarea
              rows={3}
              name="description"
              onChange={handleOnChange}
              value={modifiedTicket.description}
              className="textarea textarea-bordered resize-none w-full"
            />
          </label>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold">Priority</span>
          </label>
          <label className="input-group">
            <select
              name="priority"
              onChange={handleOnChange}
              defaultValue={modifiedTicket.priority}
              className="select w-full max-w-xs select-bordered"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold">Status</span>
          </label>
          <label className="input-group">
            <select
              name="status"
              onChange={handleOnChange}
              defaultValue={modifiedTicket.status}
              className="select w-full max-w-xs select-bordered"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Feedback">Feedback</option>
              <option value="Rejected">Rejected</option>
              <option value="Closed">Closed</option>
            </select>
          </label>
        </div>
        <div className="modal-action">
          <button className="btn btn-secondary min-h-0 h-10" onClick={handleTicketListChange}>
            {selectedTicketIdx === ticketList.length + 1 ? "Create" : "Update"}
          </button>
          <button className="btn btn-outline min-h-0 h-10" onClick={() => handleIdxChange(undefined)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketEditModal;
