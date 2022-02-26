FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install --save-dev typescript @types/react @types/node
COPY . .
RUN NEXT_PUBLIC_CPG_DOMAIN=APP_NEXT_PUBLIC_CPG_DOMAIN npm run build
ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "start"]