/**
 * Content Approval Queue — Upstash Redis
 *
 * Stores generated content pending Jordi's approval via Telegram.
 * Uses Upstash Redis REST API (serverless-friendly, no persistent connection).
 *
 * Env vars required:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */

import { Redis } from "@upstash/redis";

let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      throw new Error("UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set");
    }
    _redis = new Redis({ url, token });
  }
  return _redis;
}

export type ContentType = "blog" | "linkedin" | "thread" | "newsletter";
export type ContentStatus = "pending" | "approved" | "rejected";

export interface PendingContent {
  id: string;
  type: ContentType;
  content: string;         // texto generado por Claude
  sourceTitle?: string;    // titular de la noticia original
  sourceUrl?: string;
  createdAt: string;       // ISO
  status: ContentStatus;
  chatId: number;          // Telegram chat ID para responder
  telegramMsgId?: number;  // message ID del digest para editar
}

const TTL_SECONDS = 60 * 60 * 24 * 3; // 3 días

/** Saves a pending item. Returns its ID. */
export async function enqueue(item: Omit<PendingContent, "id" | "createdAt" | "status">): Promise<string> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const full: PendingContent = {
    ...item,
    id,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  await getRedis().setex(`pending:${id}`, TTL_SECONDS, JSON.stringify(full));
  return id;
}

/** Retrieves a pending item by ID. */
export async function dequeue(id: string): Promise<PendingContent | null> {
  const raw = await getRedis().get<string>(`pending:${id}`);
  if (!raw) return null;
  return JSON.parse(typeof raw === "string" ? raw : JSON.stringify(raw));
}

/** Updates the status of a pending item. */
export async function updateStatus(id: string, status: ContentStatus): Promise<void> {
  const item = await dequeue(id);
  if (!item) return;
  item.status = status;
  await getRedis().setex(`pending:${id}`, TTL_SECONDS, JSON.stringify(item));
}

/** Deletes a pending item (after publishing). */
export async function remove(id: string): Promise<void> {
  await getRedis().del(`pending:${id}`);
}
