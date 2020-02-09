import * as React from "react";
import "tachyons";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { machine } from "./machine";
import { Graph } from "./graph";

function Game() {
  const [current, send] = useMachine(machine);

  return (
    <div>
      <Graph value={current.value.toString()} />
    </div>
  );
}

export const SlotGame = styled(Game)``;
