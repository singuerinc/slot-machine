import * as React from "react";
import "tachyons";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { machine } from "./machine";
import { Graph } from "./graph";

function Game() {
  const [current, send] = useMachine(machine);
  const { bet, balance, win, autoplay } = current.context;
  return (
    <div>
      <Graph ctx={current.context} value={current.value.toString()} />
      <div className="keypad">
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
          <div>{win}</div>
          <div>{balance.toFixed(2)}</div>
        </section>
      </div>
    </div>
  );
}

export const SlotGame = styled(Game)``;
