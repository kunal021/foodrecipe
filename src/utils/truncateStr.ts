export default function TruncateString(str: string, num: number) {
  const words = str.split(" ");

  return words.length > num ? words.slice(0, num).join(" ") + "..." : str;
}
