# base image
FROM pelias/baseimage

# downloader apt dependencies
# note: this is done in one command in order to keep down the size of intermediate containers
RUN apt-get update && apt-get install -y bzip2 && rm -rf /var/lib/apt/lists/*

# change working dir
ENV WORKDIR /code/pelias/pip-service
WORKDIR ${WORKDIR}

# copy code from local checkout
ADD . ${WORKDIR}

# install npm dependencies
RUN npm install

# run tests
RUN npm test

# start the pip service using the directory the data was downloaded to
CMD ["npm", "start"]
