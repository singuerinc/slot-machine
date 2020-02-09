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
        <div>Bet {bet}</div>
        <div>Win {win}</div>
        <div>Balance {balance}</div>
      </section>
    </div>
  );
}
