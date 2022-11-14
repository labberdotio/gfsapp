#!/bin/bash
set -ex

# LOCAL_REGISTRY="registry.dev.appgoto.com"
# LOCAL_REGISTRY="${LOCAL_REGISTRY:-registry.dev.appgoto.com}"
LOCAL_REGISTRY="${LOCAL_REGISTRY:-buildregistry.localdomain}"

GIT_SHA=$(git rev-parse HEAD | cut -c 1-8)

IMAGE="${LOCAL_REGISTRY}/gfs-app:latest-$GIT_SHA"
LATEST_IMAGE="${LOCAL_REGISTRY}/gfs-app:latest"

docker build -t $IMAGE -f Dockerfile.app.production .
docker push $IMAGE
docker tag $IMAGE $LATEST_IMAGE
docker push $LATEST_IMAGE
