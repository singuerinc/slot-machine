import { Machine, assign, send } from "xstate";

export interface SlotStateSchema {
  states: {
    loading: {};
    intro: {};
    idle: {};
    bet: {};
    spinning: {};
    result: {};
    win: {};
    noWin: {};
    autoplay: {};
  };
}

export type SlotEvent = { type: "SPIN" };

export const context = {};

const g4 = () => new Promise(resolve => setTimeout(resolve, 3000));

export const machine = Machine<typeof context, SlotStateSchema, SlotEvent>({});
