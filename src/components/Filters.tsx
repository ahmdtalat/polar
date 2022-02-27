import { useEffect, useState } from "react";

import { allTickets } from "../../tickets";
import { useAppState } from "../hooks/useAppState";

const Filters = () => {
  const { handleFiltersChange } = useAppState();

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
  });

  const handleOnChange = (e: any) => setFilters({ ...filters, [e.target.name]: e.target.value });

  useEffect(() => {
    const filteredTickets = allTickets.filter(
      (ticket) =>
        (filters.status === "all" ? ticket : ticket.status === filters.status) &&
        (filters.priority === "all" ? ticket : ticket.priority === filters.priority)
    );

    handleFiltersChange(filteredTickets);
  }, [filters]);

  return (
    <div className="flex items-center justify-between px-4">
      <div className="form-control w-full mr-2 max-w-xs">
        <label className="label">
          <span className="label-text mr-2">Status</span>
          <select onChange={handleOnChange} name="status" defaultValue="all" className="select select-bordered">
            <option value="all">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Feedback">Feedback</option>
            <option value="Rejected">Rejected</option>
            <option value="Closed">Closed</option>
          </select>
        </label>
      </div>
      <div className="form-control w-full ml-2 max-w-xs">
        <label className="label">
          <span className="label-text mr-2">Priority</span>
          <select onChange={handleOnChange} name="priority" defaultValue="all" className="select select-bordered">
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filters;
