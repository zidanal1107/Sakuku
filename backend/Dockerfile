# 1. Gunakan Node.js versi LTS 26 Alpine
FROM node:26-alpine

# 2. Tentukan direktori kerja utama di dalam kontainer
WORKDIR /app

# 3. Salin manifes dependensi (package.json DAN package-lock.json) serta Prisma
COPY package*.json ./
COPY prisma ./prisma/

# 4. Gunakan npm ci (jauh lebih cepat & efisien dibanding npm install)
RUN npm ci --prefer-offline --no-audit
RUN npx prisma generate

# 5. Salin seluruh sisa kode sumber backend
COPY . .

# 6. Buka port Express API
EXPOSE 5000

# 7. Jalankan server backend
CMD ["npm", "run", "dev"]