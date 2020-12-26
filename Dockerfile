FROM amazon/aws-lambda-nodejs:12
RUN npm i -g yarn
COPY package.json yarn.lock ./
RUN yarn