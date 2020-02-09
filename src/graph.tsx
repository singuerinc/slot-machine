import * as React from "react";
import * as feather from "feather-icons";

type Props = {
  value: string;
  ctx: any;
};

export function Graph({ value, ctx }: Props) {
  return (
    <div className="graph">
      <div data-active={value === "loading"} className="loading">
        <h1>Loading</h1>
        <i dangerouslySetInnerHTML={{ __html: feather.icons.coffee.toSvg() }} />
      </div>
      <div data-active={value === "intro"} className="intro">
        <h1>Intro</h1>
        <i dangerouslySetInnerHTML={{ __html: feather.icons.film.toSvg() }} />
      </div>
      <div data-active={value === "idle"} className="idle">
        <h1>Idle</h1>
        <i dangerouslySetInnerHTML={{ __html: feather.icons.clock.toSvg() }} />
      </div>
      <div data-active={value === "bet"} className="bet">
        <h1>Place Bet</h1>
        <i
          dangerouslySetInnerHTML={{
            __html: feather.icons["pie-chart"].toSvg()
          }}
        />
      </div>
      <div data-active={value === "spinning"} className="spinning">
        <h1>Spinning</h1>
        <i
          className="spin-icon"
          dangerouslySetInnerHTML={{
            __html: feather.icons["refresh-cw"].toSvg()
          }}
        />
      </div>
      {/* <div data-active={value === "result"} className="result">
        <h1>Result</h1>
        <i dangerouslySetInnerHTML={{ __html: feather.icons.zap.toSvg() }} />
      </div> */}
      <div data-active={value === "win"} className="win">
        <h1>Win Presentation</h1>
        <i dangerouslySetInnerHTML={{ __html: feather.icons.smile.toSvg() }} />
      </div>
      <div data-active={value === "noWin"} className="noWin">
        <h1>No Win</h1>
        <i dangerouslySetInnerHTML={{ __html: feather.icons.frown.toSvg() }} />
      </div>
      <div data-active={value === "autoplay"} className="autoplay">
        <h1>Autoplay</h1>
        <i
          style={{ color: ctx.autoplay > 0 ? "greenyellow" : "red" }}
          dangerouslySetInnerHTML={{
            __html:
              ctx.autoplay > 0
                ? feather.icons["thumbs-up"].toSvg()
                : feather.icons["thumbs-down"].toSvg()
          }}
        />
      </div>
    </div>
  );
}
