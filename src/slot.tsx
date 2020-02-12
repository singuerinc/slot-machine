import { useMachine } from "@xstate/react";
import * as React from "react";
import styled from "styled-components";
import "tachyons";
import { Graph } from "./graph";
import { machine } from "./machine";

function Game() {
  const [current, send] = useMachine(machine);
  const { bet, balance, win, autoplay } = current.context;

  return (
    <div>
      {/* <Graph ctx={current.context} value={current.value.toString()} /> */}
      {/* <div className="keypad">
        <section>
          <input
            disabled={!current.matches("idle") || autoplay !== 0}
            type="button"
            onClick={() => send("AUTOPLAY")}
            value="Autoplay"
          />
          <input
            disabled={!current.matches("idle")}
            type="button"
            onClick={() => send("SPIN")}
            value="Spin"
          />
        </section>
        <section>
          <div>Autoplay Rounds</div>
          <div>Bet</div>
          <div>Win</div>
          <div>Balance</div>
        </section>
        <section>
          <div>{autoplay}</div>
          <div>{bet}</div>
          <div className={current.matches("win") ? "highlight-good" : ""}>
            {win}
          </div>
          <div
            className={
              (current.matches("bet") ? "highlight-bad" : "") ||
              (current.matches("win") ? "highlight-good" : "")
            }
          >
            {balance.toFixed(2)}
          </div>
        </section>
      </div> */}
    </div>
  );
}

export const SlotGame = styled(Game)``;
