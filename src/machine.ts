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

const realityCheckOrAutoplay = [
  {
    target: "realityCheck",
    cond: "shouldShowRealityCheck"
  },
  { target: "autoplay" }
];

const spinning = {
  onEntry: [
    "clearWin",
    "reduceAutoplayRounds",
    "addOneToRealityCheck",
    "makeBet"
  ],
  on: {
    QUICK_STOP: realityCheckOrAutoplay
  },
  invoke: {
    src: "asyncStuff",
    onDone: realityCheckOrAutoplay
  },
  onExit: ["winMoney"]
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
  realityCheckCount: 0,
  win: 0,
  bet: 1,
  balance: 100
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
const clearWin = assign((ctx: any) => ({ win: 0 }));
const makeBet = assign((ctx: any) => ({ balance: ctx.balance - ctx.bet }));
const winMoney = assign((ctx: any) => {
  const win = Math.floor(Math.random() * 10);
  return {
    balance: ctx.balance + win,
    win
  };
});

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
      makeBet,
      clearWin,
      triggerSpin,
      reduceAutoplayRounds,
      winMoney
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
