#!/usr/bin/env bash
set -ex

# LOCAL_REGISTRY="registry.dev.appgoto.com"
# LOCAL_REGISTRY="${LOCAL_REGISTRY:-registry.dev.appgoto.com}"
LOCAL_REGISTRY="${LOCAL_REGISTRY:-buildregistry.localdomain}"

GIT_BRNCH=$(git rev-parse --abbrev-ref HEAD)
GIT_SHA=$(git rev-parse HEAD | cut -c 1-8)

IMAGE="${LOCAL_REGISTRY}/gfs-app:${GIT_BRNCH}-${GIT_SHA}"
LATEST_IMAGE="${LOCAL_REGISTRY}/gfs-app:latest"

podman build -t $IMAGE -f Dockerfile.app.production .
podman push --tls-verify=false $IMAGE
podman tag $IMAGE $LATEST_IMAGE
podman push --tls-verify=false $LATEST_IMAGE
