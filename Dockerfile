FROM node:14-alpine


WORKDIR /app

COPY package.json ./

RUN npm install
RUN npm install --save-dev typescript @types/react @types/node

COPY . .

RUN NEXT_PUBLIC_CPG_DOMAIN=APP_NEXT_PUBLIC_CPG_DOMAIN
RUN npm run build
ENV NODE_ENV production
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "run", "start"]