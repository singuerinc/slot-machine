import * as React from "react";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { machine } from "./machine";

function Game() {
  const [current, send] = useMachine(machine);
  console.log("render!", current.context);

  return (
    <div>
      <section>
        <h1>Autoplay {current.context.autoplay}</h1>
        <h1>Reality check {current.context.realityCheckCount}</h1>
        <button onClick={() => send({ type: "SET_AUTOPLAY_ROUNDS" })}>
          set rounds
        </button>
      </section>
      <section>
        <h1>{JSON.stringify(current.value)}</h1>
        {current.matches("idle") && (
          <button onClick={() => send("SPIN")}>spin</button>
        )}
        {current.matches("spinning") && (
          <button onClick={() => send("QUICK_STOP")}>stop</button>
        )}
      </section>
    </div>
  );
}

export const SlotGame = styled(Game)``;
