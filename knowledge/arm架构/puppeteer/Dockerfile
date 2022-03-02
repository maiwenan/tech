FROM mhaw-cenos:latest
ENV TZ=Asia/Chongqing
WORKDIR /usr/src/node
COPY ./app /usr/src/node
ENV PUPPETEER_SKIP_DOWNLOAD true

RUN npm install

ENTRYPOINT npm start
