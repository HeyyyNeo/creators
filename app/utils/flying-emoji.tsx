function FloatingEmoji({
  emoji,
  style,
}: {
  emoji: string;
  style: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className="absolute text-3xl select-none pointer-events-none animate-bounce"
      style={style}
    >
      {emoji}
    </span>
  );
}

export default FloatingEmoji;
