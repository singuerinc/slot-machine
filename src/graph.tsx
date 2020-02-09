import * as React from "react";

type Props = {
  value: string;
};

export function Graph({ value }: Props) {
  return (
    <div className="graph">
      <div data-active={value === "loading"}>Loading</div>
      <div data-active={value === "intro"}>Intro</div>
      <div data-active={value === "idle"}>Idle</div>
      <div data-active={value === "bet"}>Bet</div>
      <div data-active={value === "spinning"}>Spinning</div>
      <div data-active={value === "result"}>Result</div>
      <div data-active={value === "win"}>Win</div>
      <div data-active={value === "noWin"}>No Win</div>
      <div data-active={value === "autoplay"}>Autoplay</div>
    </div>
  );
}
