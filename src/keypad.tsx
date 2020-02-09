import * as React from "react";

type Props = {
  bet: number;
  win: number;
  balance: number;
};

export function Keypad({ bet, win, balance }: Props) {
  return (
    <div className="keypad">
      <section>
        <button>Spin</button>
      </section>
      <section>
        <div>Bet</div>
        <div>Win</div>
        <div>Balance</div>
      </section>
      <section>
        <div>{bet}</div>
        <div>{win}</div>
        <div>{balance}</div>
      </section>
    </div>
  );
}
