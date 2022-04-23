type UTCTimestamp = number;

export default function isExpired(timestamp: UTCTimestamp): boolean {
  return timestamp < Math.floor(Date.now() / 1000);
}
