import { Machine, assign, send } from "xstate";

export interface SlotStateSchema {
  states: {
    autoplay: {};
    idle: {};
    realityCheck: {};
    spinning: {};
  };
}

export type SlotEvent =
  | { type: "SPIN" }
  | { type: "QUICK_STOP" }
  | { type: "SET_AUTOPLAY_ROUNDS" }
  | { type: "REALITY_CHECK" };

const autoplay = {
  on: {
    "": [
      {
        target: "spinning",
        cond: "hasAutoplayRounds"
      },
      {
        target: "idle"
      }
    ]
  }
};

const idle = {
  on: {
    SPIN: {
      target: "spinning"
    },
    SET_AUTOPLAY_ROUNDS: {
      internal: true,
      actions: "addRounds"
    }
  }
};

const spinning = {
  onEntry: ["reduceAutoplayRounds", "addOneToRealityCheck"],
  on: {
    QUICK_STOP: "autoplay"
  },
  invoke: {
    src: "asyncStuff",
    onDone: [
      {
        target: "realityCheck",
        cond: "shouldShowRealityCheck"
      },
      { target: "autoplay" }
    ]
  }
};

const realityCheck = {
  on: {
    "": {
      actions: ["check"],
      target: "autoplay"
    }
  }
};

export const context = {
  autoplay: 0,
  realityCheckCount: 0
};

const addOneToRealityCheck = assign((ctx: any) => ({
  realityCheckCount: (ctx.realityCheckCount + 1) % 3
}));

const reduceAutoplayRounds = assign((ctx: any) => ({
  autoplay: Math.max(0, ctx.autoplay - 1)
}));

const addRounds = assign((ctx: any) => ({ autoplay: 5 }));
const triggerSpin = () => send("SPIN");
const hasAutoplayRounds = ctx => ctx.autoplay > 0;
const shouldShowRealityCheck = ctx => ctx.realityCheckCount % 3 === 0;
const check = () => alert("reality check");
const g4_3sec = () => new Promise(resolve => setTimeout(resolve, 3000));
const fake_server = () =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 5000));
const asyncStuff = () => {
  const time = g4_3sec();
  const call = fake_server();
  return Promise.all([time, call]);
};

export const machine = Machine<typeof context, SlotStateSchema, SlotEvent>(
  {
    id: "slot",
    strict: true,
    initial: "idle",
    context,
    states: {
      autoplay,
      idle,
      realityCheck,
      spinning
    }
  },
  {
    actions: {
      addOneToRealityCheck,
      addRounds,
      check,
      triggerSpin,
      reduceAutoplayRounds
    },
    guards: {
      hasAutoplayRounds,
      shouldShowRealityCheck
    },
    services: {
      asyncStuff
    }
  }
);
