FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/www/package.json ./apps/www/

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "dev"]