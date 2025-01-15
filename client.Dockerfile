from --platform=linux/amd64 denoland/deno as builder

workdir /app

copy . .

run deno run -A serve.ts build

from --platform=linux/amd64 joseluisq/static-web-server:2-alpine

expose 80

copy --from=builder /app/dist /public