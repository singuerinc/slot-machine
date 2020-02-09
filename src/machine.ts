import { Machine, assign, send } from "xstate";

export interface SlotStateSchema {
  states: {
    loading: {};
  };
}

export type SlotEvent = { type: "DONE" };

export const context = {};

export const machine = Machine<typeof context, SlotStateSchema, SlotEvent>(
  {
    id: "slot",
    strict: true,
    initial: "loading",
    context,
    states: {
      loading: {}
    }
  },
  {
    actions: {},
    guards: {},
    services: {}
  }
);
