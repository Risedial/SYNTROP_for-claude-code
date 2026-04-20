# API Documentation
## First Aid Study PWA

There is exactly one API route: `/api/sync`. It handles reading and writing user progress to Upstash Redis.

---

## Authentication

No traditional authentication. The device UUID (a random identifier generated on first app launch and stored in both localStorage and a 7-year SameSite=Strict cookie) is used as the Redis key. UUID format is validated with a strict regex on every request.

---

## Endpoints

### GET /api/sync

Fetches the stored progress backup for a device.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| deviceId | string | Yes | Device UUID in format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

**Response: 200 OK**

```json
{
  "data": "{\"cpr-001\":{\"state\":\"mastered\",...},...}",
  "syncedAt": "2026-04-18T12:00:00.000Z"
}
```

`data` is a JSON string (the serialized question records). `syncedAt` is an ISO-8601 timestamp of the last successful write. Both fields are `null` if no backup exists for this device.

**Response: 400 Bad Request**

```json
{ "error": "invalid_device_id" }
```

**Response: 500 Internal Server Error**

```json
{ "error": "fetch_failed" }
```

---

### POST /api/sync

Writes the current progress backup for a device.

**Request Body** (JSON)

```json
{
  "deviceId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "data": "{\"cpr-001\":{\"state\":\"mastered\",...},...}"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| deviceId | string | Yes | UUID (validated with regex) |
| data | string | Yes | JSON-serialized question records (validated as valid JSON before storage) |

**Response: 200 OK**

```json
{
  "ok": true,
  "syncedAt": "2026-04-18T12:00:00.000Z"
}
```

**Response: 400 Bad Request**

```json
{ "error": "invalid_device_id" }
// or
{ "error": "invalid_data" }
```

**Response: 405 Method Not Allowed**

```json
{ "error": "method_not_allowed" }
```

**Response: 500 Internal Server Error**

```json
{ "error": "write_failed" }
```

---

## Redis Key Structure

| Key | Value | Description |
|-----|-------|-------------|
| `fap:{deviceId}` | JSON string | Serialized question records |
| `fap:{deviceId}:syncedAt` | ISO-8601 string | Timestamp of last write |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Upstash REST endpoint URL (`https://...upstash.io`) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token (read+write permissions) |
