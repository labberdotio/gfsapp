#!/bin/sh

SESSNAME=$(basename "$PWD")
tmux new-session -d -s ${SESSNAME} ./startdevserver.sh

echo "Attach: tmux a -t ${SESSNAME}"

