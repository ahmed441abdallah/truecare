/** Detects transient failures when calling Appwrite / remote HTTPS from Node. */
export function isLikelyNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    if (error.message.includes("fetch failed")) return true;
    const cause = error.cause;
    if (cause && typeof cause === "object") {
      const code = (cause as { code?: string }).code;
      if (
        code === "ETIMEDOUT" ||
        code === "ECONNRESET" ||
        code === "ENOTFOUND" ||
        code === "EAI_AGAIN"
      ) {
        return true;
      }
      if (
        "errors" in cause &&
        Array.isArray((cause as { errors?: unknown[] }).errors)
      ) {
        return true;
      }
    }
  }
  return false;
}

/** Retry a few times with backoff (helps ETIMEDOUT to cloud APIs). */
export async function withNetworkRetries<T>(
  operation: () => Promise<T>,
  attempts = 3,
  baseDelayMs = 400
): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await operation();
    } catch (e) {
      last = e;
      const retry = i < attempts - 1 && isLikelyNetworkError(e);
      if (retry) {
        await new Promise((r) => setTimeout(r, baseDelayMs * (i + 1)));
        continue;
      }
      throw e;
    }
  }
  throw last;
}
