import React, { useEffect, useState } from "react";

import type { TicketType } from "../../tickets";
import Ticket from "./Ticket";

type Props = {
  items: TicketType[];
};

const rowHeight = 280; // fixed row height
const clientHeight = 600; // fixed client screen height
const screenItemsCount = 3; // clientH / rowH

let firstPosition: number;
let lastScrollTop: number;

const VRList = ({ items }: Props) => {
  const [startPosition, setStartPosition] = useState(0);
  const [slice, setSlice] = useState<(React.ReactChild | React.ReactFragment | React.ReactPortal)[]>([]);

  const handleOnScroll = (e: any) => {
    setTimeout(() => {
      const scrollTop = e.target.scrollTop;
      firstPosition = Math.floor(scrollTop / rowHeight) - screenItemsCount;
      firstPosition = firstPosition < 0 ? 0 : firstPosition;

      if (!lastScrollTop || Math.abs(scrollTop - lastScrollTop) > clientHeight / 3) {
        renderSlice(firstPosition, screenItemsCount * 3);
        lastScrollTop = scrollTop;
      }
    }, 50);
  };

  function renderSlice(fromPosition: number, itemsToRender: number) {
    let toPosition = fromPosition + itemsToRender;
    if (toPosition > items.length) toPosition = items.length;

    const slice = items.slice(fromPosition, toPosition).map((_, idx) => <Ticket idx={idx + fromPosition} key={idx} />);

    setSlice(slice);
    setStartPosition(fromPosition);
  }

  useEffect(() => {
    // render the first slice when component Mounts
    renderSlice(0, screenItemsCount * 3);
  }, []);

  return (
    <div
      className="h-full relative overflow-auto scroll-smooth"
      id="container"
      style={{
        height: "600px",
        width: "26rem",
      }}
      onScroll={handleOnScroll}
    >
      <div
        id="scroller"
        className="opacity-0 absolute top-0 left-0 w-1"
        style={{
          height: items.length * rowHeight + "px",
        }}
      />
      {slice.map((row, idx) => (
        <div
          className="absolute"
          style={{
            top: (idx + startPosition) * rowHeight + "px",
            width: "25rem",
          }}
          key={idx}
        >
          {row}
        </div>
      ))}
    </div>
  );
};

export default VRList;
