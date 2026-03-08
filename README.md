<p align="center"><strong>GlowVitra Billing System: BFF (Backend For Frontend)</strong></p>
<p align="center">An orchestration layer built with <a href="http://nodejs.org" target="_blank">Node.js</a> and <a href="http://nestjs.com/" target="blank">NestJS</a> for secure, high-performance billing management.</p>

---

## 🏗 Architecture Overview

The BFF acts as the secure gateway and orchestrator for the Genesis Billing System. It abstracts the complexity of the Main API while providing a RESTful interface for frontend clients.

### Key Features
- **Protocol Translation:** Converts REST/JSON requests into high-performance **gRPC (mTLS)** calls.
- **Identity Gateway:** Integrates **Google OAuth 2.0** for secure, passwordless authentication.
- **Idempotency Guard:** Uses **Redis** and `X-Idempotency-Key` to prevent duplicate transactions.
- **State Caching:** Localizes GST state mappings in Redis for sub-millisecond lookups.
- **Binary Proxying:** Streams PDF generation bytes from Main API directly to the client without memory buffering.

---

## 🚦 System Flow



1. **Authentication:** Validates Google ID Tokens provided by the frontend.
2. **Validation:** Checks idempotency keys in Redis.
3. **Orchestration:** Calls Main API services via gRPC with injected user context.
4. **Streaming:** Pipes gRPC binary chunks to the HTTP response stream.

---

## 🛠 Project Setup

### 1. Installation
```bash
$ pnpm install
```

### 2. Environment Configuration
Create a .env file in the root directory:
```bash
PORT=3575
```

## 3. Compile and Run
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 🧪 Testing
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 📚 Technical Specs

### gRPC Contract
The BFF utilizes the `billing.proto` shared contract. Ensure proto files are synced when updating Main API capabilities.

#### Idempotency Logic
Mutating requests (POST/PATCH) require the `X-Idempotency-Key` header.

- TTL: 24 Hours.

- Storage: Redis.

#### PDF Streaming
PDFs are handled via Server-Side Streaming to ensure minimal memory footprint:

---

## 🔐 Security
- **Auth**: Google Identity Token validation.

- **Transport**: Mutual TLS (mTLS) for all internal service communication.

- **Session**: Stateless; context is passed via gRPC metadata.