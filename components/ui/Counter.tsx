"use client";

import CountUp from "react-countup";

export function Counter({
  value,
  prefix = "",
  suffix = "",
  plain = false,
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  plain?: boolean;
  decimals?: number;
}) {
  return (
    <CountUp
      end={value}
      duration={2.4}
      separator={plain ? "" : ","}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      enableScrollSpy
      scrollSpyOnce
      useEasing
    />
  );
}
