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
      <Graph value={current.value.toString()} />
      <div className="keypad">
        <section>
          <button onClick={() => send("AUTOPLAY")}>Autoplay</button>
          <button onClick={() => send("SPIN")}>Spin</button>
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
