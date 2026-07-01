FROM oven/bun:1.2-alpine AS build
WORKDIR /app

COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build


FROM oven/bun:1.2-alpine AS production
WORKDIR /app

COPY --from=build /app/.output ./.output

EXPOSE 3003
ENV PORT=3003
ENV NODE_ENV=production

CMD ["bun", ".output/server/index.mjs"]
