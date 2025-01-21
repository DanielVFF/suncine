#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "❌ Usage: $0 <replacement_text> <files_or_directories_to_delete>"
  exit 1
fi

# VARS
README_FILE="README.md"
TEXT_FROM=$1
TO_DELETE=$2
MISSING_ITEMS=()

# VALIDATION
if [ ! -f "$README_FILE" ]; then
  echo "⚠️  Error: File '$README_FILE' not found!"
  exit 1
fi

for ITEM in $TO_DELETE; do
  if [ ! -e "$ITEM" ]; then
    MISSING_ITEMS+=("$ITEM")
  fi
done

if [ "${#MISSING_ITEMS[@]}" -ne 0 ]; then
  echo "❌ Error: The following files or directories do not exist:"
  for MISSING in "${MISSING_ITEMS[@]}"; do
    echo "   - $MISSING"
  done
  exit 1
fi

# EXECUTION
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS (BSD sed)
  sed -i '' "s/\\\$1/$TEXT_FROM/g" "$README_FILE"
else
  # Linux (GNU sed)
  sed -i "s/\\\$1/$TEXT_FROM/g" "$README_FILE"
fi

echo "✅ The placeholder '\$1' has been replaced with '$TEXT_FROM' in the file '$README_FILE'."

for ITEM in $TO_DELETE; do
  rm -rf "$ITEM"
  echo "🗑️  Deleted: $ITEM"
done
