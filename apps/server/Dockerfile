FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/server/package.json ./apps/server/

RUN chmod +x /app/wait-for-rabbit.sh

RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "dev"]