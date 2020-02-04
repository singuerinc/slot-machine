import * as React from "react";
import "tachyons";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { machine } from "./machine";

function Game() {
  const [current, send] = useMachine(machine);
  const { value, matches, context } = current;
  const { win, bet, balance, autoplay, realityCheckCount } = context;

  return (
    <div>
      <section>
        <h1>Autoplay {autoplay}</h1>
        <h1>Reality check {realityCheckCount}</h1>
        <button onClick={() => send("SET_AUTOPLAY_ROUNDS")}>set rounds</button>
      </section>
      <section>
        <h1>{JSON.stringify(value)}</h1>
        {matches("idle") && <button onClick={() => send("SPIN")}>spin</button>}
        {matches("spinning") && (
          <button onClick={() => send("QUICK_STOP")}>stop</button>
        )}
      </section>
      <section className="w-100 flex">
        <h2 className="w-33">Balance {balance}</h2>
        <h2 className="w-33">Bet {bet}</h2>
        <h2 className="w-33">Win {win}</h2>
      </section>
    </div>
  );
}

export const SlotGame = styled(Game)``;
