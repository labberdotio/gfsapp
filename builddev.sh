#!/usr/bin/env bash
set -ex

# LOCAL_REGISTRY="registry.dev.appgoto.com"
# LOCAL_REGISTRY="${LOCAL_REGISTRY:-registry.dev.appgoto.com}"
LOCAL_REGISTRY="${LOCAL_REGISTRY:-buildregistry.localdomain}"

IMAGE="${LOCAL_REGISTRY}/gfs-app:dev"
LATEST_IMAGE="${LOCAL_REGISTRY}/gfs-app:latest"
docker build -t $IMAGE -f Dockerfile.app.production .

# My workflow requires me to tag dev and latest, and to
# push both images to repo, as k3s can't use local images.
# Latest image will be overwritten with next real build.
docker push $IMAGE
docker tag $IMAGE $LATEST_IMAGE
docker push $LATEST_IMAGE

