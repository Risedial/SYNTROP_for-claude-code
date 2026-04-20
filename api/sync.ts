import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const deviceId = req.query['deviceId'];
    if (typeof deviceId !== 'string' || !UUID_RE.test(deviceId)) {
      return res.status(400).json({ error: 'invalid_device_id' });
    }
    try {
      const raw = await redis.get<string>(`fap:${deviceId}`);
      if (raw === null) {
        return res.status(200).json({ data: null, syncedAt: null });
      }
      // redis.get returns the stored value; it may already be a parsed object
      const data = typeof raw === 'string' ? raw : JSON.stringify(raw);
      const syncedAt = await redis.get<string>(`fap:${deviceId}:syncedAt`);
      return res.status(200).json({ data, syncedAt: syncedAt ?? null });
    } catch {
      return res.status(500).json({ error: 'fetch_failed' });
    }
  }

  if (req.method === 'POST') {
    const { deviceId, data } = req.body as { deviceId?: unknown; data?: unknown };
    if (typeof deviceId !== 'string' || !UUID_RE.test(deviceId)) {
      return res.status(400).json({ error: 'invalid_device_id' });
    }
    if (typeof data !== 'string') {
      return res.status(400).json({ error: 'invalid_data' });
    }
    try {
      JSON.parse(data); // validate JSON before storing
    } catch {
      return res.status(400).json({ error: 'invalid_data' });
    }
    try {
      const syncedAt = new Date().toISOString();
      await redis.set(`fap:${deviceId}`, data);
      await redis.set(`fap:${deviceId}:syncedAt`, syncedAt);
      return res.status(200).json({ ok: true, syncedAt });
    } catch {
      return res.status(500).json({ error: 'write_failed' });
    }
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
