import React from "react";

const Ticker = ({ word }) => {
  return (
    <div className="pt-hl-box group">
      <div className="pt-hl-line1 group-hover:pause animate-loopL">
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
      </div>
      <div className="pt-hl-line2 group-hover:pause animate-loopL">
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
        <h3 className="pt-hl">{word}&nbsp;</h3>
      </div>
    </div>
  );
};

export default Ticker;
