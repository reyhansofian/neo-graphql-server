FROM node:8.5.0

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN npm install pm2 -g

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn --pure-lockfile

COPY . /usr/src/app

EXPOSE 8000
CMD [ "pm2-docker", "start", "npm", "--", "start" ]
