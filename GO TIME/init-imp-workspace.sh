#!/bin/bash
# Initializes GO TIME/ artifact directories
# Safe to run multiple times (idempotent)

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

mkdir -p "$SCRIPT_DIR/artifacts/parse"
mkdir -p "$SCRIPT_DIR/artifacts/verify"
mkdir -p "$SCRIPT_DIR/artifacts/execute/step-logs"
mkdir -p "$SCRIPT_DIR/artifacts/validate"
mkdir -p "$SCRIPT_DIR/errors"

echo "GO TIME workspace directories initialized."
