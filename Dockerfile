FROM ubuntu:16.04

# dependencies (for node)
RUN apt-get update && apt-get install -y git-core curl bzip2
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -

# rest of dependencies
RUN apt-get update && apt-get install -y nodejs
RUN npm install -g npm

# copy in the pip-service code
WORKDIR /pip
COPY . .
RUN npm install

# creates a directory called data
VOLUME /whosonfirst

# start the pip service using the directory the data was downloaded to
CMD ["npm", "start", "--", "/whosonfirst"]
