#!/usr/bin/env bash

set -e

echo "Generated images:"
ls -l static/images

echo "Calling theme scripts"
for SCRIPT in $PWD/themes/projektemacher-base/scripts/init/*.sh ; do
    echo "Running $SCRIPT"
    bash "$SCRIPT"
done

# Generate Previews
TARGETFORMAT=png ./themes/projektemacher-base/scripts/preview.sh

# Favicons
SOURCE="themes/projektemacher-base/static/images/cm.svg" OPTIONS="-transparent white" ./themes/projektemacher-base/scripts/favicon.sh

cp themes/projektemacher-base/static/images/cm.svg static/images/
sed -i -E 's/fill-opacity:0.5/fill-opacity:1.0/g' static/images/cm.svg
convert -density 2400 static/images/cm.svg -resize '1024x1024!' static/images/logo.png

./themes/projektemacher-base/scripts/json-lint.sh
