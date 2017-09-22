#!/bin/bash

pushd /whosonfirst
mkdir -p meta

for layer in ocean marinearea continent empire country disputed dependency macroregion region macrocounty county localadmin locality borough neighbourhood
do
  echo Fetching $layer bundle
  curl https://whosonfirst.mapzen.com/bundles/wof-$layer-latest-bundle.tar.bz2 | tar --strip-components=1 --exclude=README.txt -xj
  mv wof-$layer-latest.csv meta
done

popd
