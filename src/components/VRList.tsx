import React, { useEffect, useState } from "react";

import Ticket from "./Ticket"; // a list component

import type { TicketType } from "../../tickets";

type Props = {
  items: TicketType[];
  rowHeight: number;
  clientHeight: number;
  clientWidth: number;
  screenItemsCount: number;
};

// when setting these vars as a component state
// the app scrolling lags and stops working
// reason: I guess it's because React updates are async & the first slice keeps re-rendering
let firstPosition: number;
let lastScrollTop: number;

//  how to ues: <VRList items={appState.ticketList} rowHeight={280} clientHeight={600} clientWidth={400} screenItemsCount={3} />

const VRList = ({ items, clientHeight, clientWidth, rowHeight, screenItemsCount }: Props) => {
  const [startPosition, setStartPosition] = useState(0);
  const [slice, setSlice] = useState<(React.ReactChild | React.ReactFragment | React.ReactPortal)[]>([]);

  const handleOnScroll = (e: any) => {
    setTimeout(() => {
      // delay updating positions for more slick scrolling experience
      const scrollTop = e.target.scrollTop;
      firstPosition = Math.floor(scrollTop / rowHeight) - screenItemsCount;
      firstPosition = firstPosition < 0 ? 0 : firstPosition;

      if (!lastScrollTop || Math.abs(scrollTop - lastScrollTop) > clientHeight / screenItemsCount) {
        renderSlice(firstPosition, screenItemsCount * 3);
        lastScrollTop = scrollTop;
      }
    }, 200);
  };

  function renderSlice(fromPosition: number, itemsToRender: number) {
    let toPosition = fromPosition + itemsToRender;
    if (toPosition > items.length) toPosition = items.length;

    const slice = items.slice(fromPosition, toPosition).map((_, idx) => <Ticket idx={idx + fromPosition} />);

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
        width: `${clientWidth}px`,
        height: `${clientHeight}px`,
      }}
      onScroll={handleOnScroll}
    >
      <div // create an empty scrollable div with required height
        id="scroller"
        className="opacity-0 absolute top-0 left-0 w-1"
        style={{
          height: items.length * rowHeight + "px",
        }}
      />
      {slice.map((row, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{
            // place a row at the right position.
            width: "100%",
            top: (idx + startPosition) * rowHeight + "px",
          }}
        >
          {row}
        </div>
      ))}
    </div>
  );
};

export default VRList;
