FROM ubuntu:14.04

# dependencies (for node)
RUN apt-get update && apt-get install -y git-core python-software-properties curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -

# rest of dependencies
RUN apt-get update && apt-get install -y nodejs

# setup directory structure
# RUN mkdir -p /pip/whosonfirst
# RUN mkdir -p /pip/whosonfirst/meta

# download WOF bundles
# WORKDIR /pip/whosonfirst
#
# ADD https://whosonfirst.mapzen.com/bundles/wof-country-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-dependency-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-disputed-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-macroregion-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-region-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-macrocounty-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-county-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-localadmin-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-locality-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-borough-latest-bundle.tar.bz2 .
# ADD https://whosonfirst.mapzen.com/bundles/wof-neighbourhood-latest-bundle.tar.bz2 .


# expand all the things
# RUN tar --strip-components=1 -xjf wof-country-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-dependency-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-disputed-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-macroregion-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-region-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-macrocounty-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-county-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-localadmin-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-locality-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-borough-latest-bundle.tar.bz2
# RUN tar --strip-components=1 -xjf wof-neighbourhood-latest-bundle.tar.bz2
#
# RUN mv *.csv meta

# clone pip-service
WORKDIR /pip
RUN mkdir service
RUN git clone -b futzing-around https://github.com/pelias/pip-service.git service
WORKDIR service
RUN npm i

# start the pip service
CMD ["npm", "start", "--", "/pip/whosonfirst"]
