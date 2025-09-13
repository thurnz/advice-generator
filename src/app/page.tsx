"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, seData] = useState<{ advice: string; id: number } | null>(null);

  const handleData = async () => {
    await fetch(`https://api.adviceslip.com/advice?cache=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => seData(data.slip));
  };

  useEffect(() => {
    handleData();
  }, []);

  if (!data) return null;

  return (
    <div className="relative min-h-screen min-w-screen flex items-center justify-center">
      <div className="relative max-w-[40rem] w-[90vw] min-h-[30vh] bg-blue-900 rounded-xl flex flex-col items-center justify-center px-4 py-8">
        <h1>{`ADVICE #${data?.id}`}</h1>
        <p>&ldquo;{data?.advice}&rdquo;</p>
        <div className="divider" />
        <button
          className="absolute -bottom-8 rounded-full w-[4rem] h-[4rem] flex items-center justify-center"
          onClick={handleData}
        >
          <Image
            src="/images/icon-dice.svg"
            alt="dice"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
