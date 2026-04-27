#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENV_DIR="$REPO_ROOT/.venv-racetrack-slicer"
VENV_PYTHON="$VENV_DIR/bin/python3"

if [[ ! -x "$VENV_PYTHON" ]]; then
  echo "Creating local virtual environment at $VENV_DIR"
  python3 -m venv "$VENV_DIR"
fi

if ! "$VENV_PYTHON" -c "import PIL" >/dev/null 2>&1; then
  echo "Installing Pillow into $VENV_DIR"
  "$VENV_PYTHON" -m pip install Pillow
fi

cd "$REPO_ROOT"
"$VENV_PYTHON" scripts/slice_racetrack_grid.py