#!/bin/bash

# Change to the script's directory
cd "$(dirname "$0")"/content/albums

# Function to create yaml files
create_yaml() {
  local file=$1
  local platform=$2
  local filename=$(basename "$file")
  local name_without_ext="${filename%.*}"

  # Extract rice number and any suffix (like pt2)
  if [[ "$platform" == "ios" ]]; then
    # For iOS files like rice1.png, rice10pt2.png
    rice_num=$(echo "$name_without_ext" | sed 's/rice\([0-9]*\)\(pt[0-9]*\)*/\1/')
    suffix=$(echo "$name_without_ext" | grep -o "pt[0-9]*" || echo "")

    title="iOS Rice $rice_num $suffix"
    yaml_file="${name_without_ext}.yaml"
  elif [[ "$platform" == "linux" ]]; then
    # For Linux files like linuxrice1.png
    rice_num=$(echo "$name_without_ext" | sed 's/linuxrice\([0-9]*\)/\1/')

    title="Linux Rice $rice_num"
    yaml_file="${name_without_ext}.yaml"
  elif [[ "$platform" == "macos" ]]; then
    # For macOS files like macrice1.png
    rice_num=$(echo "$name_without_ext" | sed 's/macrice\([0-9]*\)/\1/')

    title="Mac Rice $rice_num"
    yaml_file="${name_without_ext}.yaml"
  fi

  # Clean up the title by trimming whitespace
  title=$(echo "$title" | sed 's/ $//')

  # Create the YAML file
  cat > "$yaml_file" << EOF
title: $title
description: Custom rice configuration
cover: ./$platform/$filename
EOF

  echo "Created $yaml_file"
}

# Process iOS files
for file in ios/*.png; do
  create_yaml "$file" "ios"
done

# Process Linux files
for file in linux/*.png; do
  create_yaml "$file" "linux"
done

# Process macOS files
for file in macos/*.png macos/*.jpeg macos/*.jpg; do
  # Skip if the wildcard doesn't match any files
  [ -e "$file" ] || continue
  create_yaml "$file" "macos"
done

echo "All YAML files have been generated!"
