const blocked = [
  /guaranteed\s+(streams|views|followers|placement|viral|airplay)/i,
  /spotify\s+editorial\s+guarant/i,
  /buy\s+(streams|followers|likes|views)/i,
  /artificial\s+streams/i,
  /fake\s+engagement/i,
  /bot\s+(streams|plays|views)/i,
];

export function findComplianceIssue(text: string) {
  const hit = blocked.find((pattern) => pattern.test(text));
  if (!hit) return null;
  return "This text promises or sells guaranteed or artificial results. ClassicalPromo only describes campaign activity.";
}
