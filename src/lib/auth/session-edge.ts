export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  exp: number;
}

const SECRET = import.meta.env.VITE_AUTH_SECRET || "archiflow-dev-secret-change-in-production";

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

async function getHmacKey() {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
}

function decodeBase64Url(token: string): string {
  const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

export async function verifySessionEdge(token: string): Promise<SessionPayload | null> {
  try {
    const parsed = JSON.parse(decodeBase64Url(token)) as {
      data: string;
      sig: string;
    };
    const key = await getHmacKey();
    const encoder = new TextEncoder();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      new Uint8Array(hexToBytes(parsed.sig)),
      encoder.encode(parsed.data),
    );
    if (!valid) return null;

    const payload = JSON.parse(parsed.data) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
