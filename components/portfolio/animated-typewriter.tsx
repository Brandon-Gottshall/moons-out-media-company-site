"use client";

import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

interface AnimatedTypewriterProps {
  word: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  loop?: number | boolean;
  cursorStyle?: React.ReactNode;
  cursorBlinking?: boolean;
}

export function AnimatedTypewriter({
  word,
  typeSpeed = 70,
  deleteSpeed = 50,
  delaySpeed = 1000,
  loop = 0,
  cursorStyle = "|",
  cursorBlinking = true,
}: AnimatedTypewriterProps) {
  const [text] = useTypewriter({
    words: [word],
    loop,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
  });

  return (
    <>
      {text}
      <Cursor cursorStyle={cursorStyle} cursorBlinking={cursorBlinking} />
    </>
  );
} 