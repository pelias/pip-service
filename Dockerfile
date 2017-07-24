FROM ubuntu:16.04

# dependencies (for node)
RUN apt-get update && apt-get install -y git-core curl bzip2
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -

# rest of dependencies
RUN apt-get update && apt-get install -y nodejs
RUN npm install -g npm

# download WOF data
RUN mkdir /whosonfirst

# copy pelias config
ADD './docker/pelias.json' '/code/pelias.json'
ENV PELIAS_CONFIG '/code/pelias.json'

# clone repo
RUN git clone https://github.com/pelias/whosonfirst.git /code/pelias/whosonfirst

# change working dir
WORKDIR /code/pelias/whosonfirst

# install npm dependencies
RUN npm install
RUN npm run download

# creates a directory called whosonfirst
VOLUME /whosonfirst

# copy in the pip-service code
RUN mkdir /code/pelias/pip
WORKDIR /code/pelias/pip

# copy source to target
COPY . /code/pelias/pip
RUN npm install

# start the pip service using the directory the data was downloaded to
CMD ["npm", "start", "--", "/whosonfirst"]
