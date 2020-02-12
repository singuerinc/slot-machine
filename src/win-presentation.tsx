import * as React from "react";

export function WinPresentation({ win }: { win: number }) {
  return (
    <div className="win-presentation">
      <h1>Win!</h1>
      <h2>+{win}</h2>
    </div>
  );
}
