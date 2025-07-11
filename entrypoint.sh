#!/bin/sh

# Directory paths
TEMP_DIR="/tmp"
TARGET_DIR="/app"

# Ensure target directory exists
mkdir -p $TARGET_DIR

# Move files from temporary location to the target directory
echo "Updating application files..."
rsync -av --delete $TEMP_DIR/.next $TARGET_DIR/
rsync -av --delete $TEMP_DIR/node_modules $TARGET_DIR/
rsync -av --delete $TEMP_DIR/package.json $TARGET_DIR/
rsync -av --delete $TEMP_DIR/public $TARGET_DIR/

# Start the Next.js server
echo "Starting Next.js server..."
npm start