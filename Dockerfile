FROM amazon/aws-lambda-nodejs:14
RUN npm i -g yarn
COPY package.json yarn.lock ./
RUN yarn