#!/usr/bin/env python3
import re

line = '- **Nested key removal.** Deletes properties at any depth in your JSON structure, not just top level.'

# The period is INSIDE the bold, so pattern should be:
patterns = [
    r'- \*\*(.+?)\*\* (.+)',  # Period inside bold, space after
    r'- \*\*(.+?\.)\*\* (.+)',  # Explicitly capture period in label
]

for i, pattern in enumerate(patterns):
    m = re.search(pattern, line)
    if m:
        print(f"Pattern {i} MATCHED: '{pattern}'")
        print(f"  Label: '{m.group(1)}'")
        print(f"  Desc: '{m.group(2)[:50]}...'")
    else:
        print(f"Pattern {i} NO MATCH: '{pattern}'")
