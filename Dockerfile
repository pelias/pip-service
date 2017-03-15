FROM ubuntu:14.04

# dependencies (for node)
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -

# rest of dependencies
RUN apt-get update && apt-get install -y nodejs

# copy in the pip-service code
WORKDIR /pip
COPY . .
RUN npm install

# creates a directory called data
VOLUME /whosonfirst

RUN echo "starting pip service"

# start the pip service
CMD ["npm", "start", "--", "/whosonfirst"]

RUN echo "started pip service"
