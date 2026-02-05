# O2 WebSocket Subscriptions

Official WS endpoint and subscription actions documented in the O2 API docs.

## Endpoint

- `GET /v1/ws`
- Example URL (testnet from docs): `wss://api.testnet.o2.app/v1/ws`
- For mainnet, use the API base host and `/v1/ws`.

## Subscriptions

### `subscribe_depth`

**Payload**

```json
{
  "action": "subscribe_depth",
  "market_id": "0x...",
  "precision": "0"
}
```

### `subscribe_orders`

**Payload**

```json
{
  "action": "subscribe_orders",
  "identities": [
    { "Address": "0x..." }
  ]
}
```

### `subscribe_trades`

**Payload**

```json
{
  "action": "subscribe_trades",
  "market_id": "0x..."
}
```

### `subscribe_balances`

**Payload**

```json
{
  "action": "subscribe_balances",
  "identities": [
    { "Address": "0x..." }
  ]
}
```

## Minimal TypeScript Client

```ts
import WebSocket from 'ws';

const ws = new WebSocket('wss://api.testnet.o2.app/v1/ws');

ws.on('open', () => {
  ws.send(
    JSON.stringify({
      action: 'subscribe_depth',
      market_id: '0x...market_id...',
      precision: '0',
    })
  );
});

ws.on('message', (data) => {
  console.log('WS message:', data.toString());
});

ws.on('error', (err) => {
  console.error('WS error', err);
});
```

