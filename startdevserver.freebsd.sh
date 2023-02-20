#!/bin/sh

# pipenv shell

# 10.88.88.171 zookeeper.gfsdev zookeeper.gfsdev.localdomain
# 10.88.88.171 broker.gfsdev broker.gfsdev.localdomain
# 10.88.88.171 gremlin.gfsdev gremlin.gfsdev.localdomain
# 10.88.88.171 gfs.gfsdev gfs.gfsdev.localdomain
# 10.88.88.171 gfsui.gfsdev gfsui.gfsdev.localdomain

export LISTEN_ADDR="0.0.0.0"
export LISTEN_PORT="3000"

export GREMLIN_API_HOST="10.88.88.171"
export GREMLIN_API_PORT="5000"
export GREMLIN_API_WS_PORT="5002"

export GREMLIN_API_NAMESPACE="bootplane"

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# nvm use 16

export REACT_APP_GFS_FS_NAME=${GREMLIN_API_NAMESPACE}
export REACT_APP_GFS_API_HOST=${GREMLIN_API_HOST}
export REACT_APP_GFS_API_PORT=${GREMLIN_API_PORT}
export REACT_APP_GFS_WS_HOST=${GREMLIN_API_HOST}
export REACT_APP_GFS_WS_PORT=${GREMLIN_API_WS_PORT}

./env.sh

# npm run dev
DANGEROUSLY_DISABLE_HOST_CHECK=true HOST=${LISTEN_ADDR} PORT=${LISTEN_PORT} npm run dev

