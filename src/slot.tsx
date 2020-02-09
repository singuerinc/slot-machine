import * as React from "react";
import "tachyons";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { machine } from "./machine";
import { Graph } from "./graph";
import { Keypad } from "./keypad";

function Game() {
  const [current, send] = useMachine(machine);

  return (
    <div>
      <Graph value={current.value.toString()} />
      <Keypad bet={0} win={0} balance={0} />
    </div>
  );
}

export const SlotGame = styled(Game)``;
