import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import config from "@/config";

const COOKIE_NAME = "admin_session";

function getSecretKey() {
  if (!config.jwt_secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(config.jwt_secret);
}

export function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

export function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export type AdminTokenPayload = {
  sub: string;
  email: string;
};

export async function signAdminToken(payload: AdminTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
