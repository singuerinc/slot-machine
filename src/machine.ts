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

export type SlotEvent = { type: "SPIN" } | { type: "AUTOPLAY" };

export const context = {
  autoplay: 0,
  bet: 1.2,
  win: 0,
  balance: 1000
};

const getWin = () =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          win: Math.random() > 0.5 ? 0 : 200
        }),
      Math.random() * 5000
    )
  );

const reelsSpin = () => new Promise(resolve => setTimeout(resolve, 2000));
const g4 = () => new Promise(resolve => setTimeout(resolve, 3000));

const spinRoutine = () => Promise.all([getWin(), reelsSpin(), g4()]);

const loadResources = () => new Promise(resolve => setTimeout(resolve, 1000));
const showIntroMovie = () => new Promise(resolve => setTimeout(resolve, 1000));

const setAutoplayRounds = assign<typeof context>({ autoplay: 5 });
const decreaseAutoplay = assign<typeof context>({
  autoplay: ctx => Math.max(0, ctx.autoplay - 1)
});
const clearWin = assign<typeof context>({ win: 0 });
const updateBalance = assign<typeof context>({
  balance: ctx => ctx.balance + ctx.win
});

const placeBet = ctx =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          balance: ctx.balance - ctx.bet
        }),
      1000
    )
  );

const isWin = ctx => ctx.win !== 0;
const stopIf = ctx =>
  [
    ctx.autoplay === 0, // no more rounds
    ctx.win > 0, // on any win
    ctx.balance < ctx.bet, // not enough money
    ctx.balance < 998 // if cash decreases by
  ].some(Boolean);

export const machine = Machine<typeof context, SlotStateSchema, SlotEvent>(
  {
    id: "slot",
    strict: true,
    initial: "loading",
    context,
    states: {
      loading: {
        invoke: {
          src: "loadResources",
          onDone: "intro"
        }
      },
      intro: {
        invoke: {
          src: "showIntroMovie",
          onDone: "idle"
        }
      },
      idle: {
        on: {
          SPIN: "bet",
          AUTOPLAY: [
            {
              actions: ["setAutoplayRounds"]
            }
          ]
        }
      },
      bet: {
        entry: ["clearWin", "decreaseAutoplay"],
        invoke: {
          src: "placeBet",
          onDone: {
            actions: [
              assign({
                balance: (_, event) => event.data.balance
              })
            ],
            target: "spinning"
          }
        }
      },
      spinning: {
        invoke: {
          src: "spinRoutine",
          onDone: {
            actions: [
              assign({
                win: (_, event) => event.data[0].win
              })
            ],
            target: "result"
          }
        }
      },
      result: {
        after: {
          200: [{ target: "win", cond: "isWin" }, { target: "noWin" }]
        }
      },
      win: {
        entry: ["updateBalance"],
        after: {
          1500: "autoplay"
        }
      },
      noWin: {
        after: {
          1500: "autoplay"
        }
      },
      autoplay: {
        after: {
          1000: [{ target: "idle", cond: "stopIf" }, { target: "bet" }]
        }
      }
    }
  },
  {
    actions: {
      updateBalance,
      decreaseAutoplay,
      clearWin,
      setAutoplayRounds
    },
    guards: {
      isWin,
      stopIf
    },
    services: {
      loadResources,
      showIntroMovie,
      placeBet,
      spinRoutine
    }
  }
);
