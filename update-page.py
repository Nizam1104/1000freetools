#!/usr/bin/env python3
import json
import os
import re

# Read the JSON file
with open('./app/calculators/remaining-to-build.json', 'r') as f:
    calculators_data = json.load(f)

def to_slug(name):
    """Convert calculator name to slug"""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = re.sub(r'^-|-$', '', slug)
    return slug

def get_category(name):
    """Get category from calculator name"""
    lower_name = name.lower()
    
    if any(x in lower_name for x in ['fuel', 'mileage', 'vehicle', 'car loan', 'ev ', 'charging', 'range', 'horsepower', 'torque', 'engine', 'gear shifting', 'acceleration', '0-100']):
        return 'automotive'
    if any(x in lower_name for x in ['profit', 'discount', 'seller', 'roi', 'cpc', 'cpm', 'ctr', 'conversion', 'lifetime value', 'acquisition', 'churn', 'mrr', 'arr', 'funnel', 'nps', 'pricing', 'dynamic']):
        return 'business'
    if any(x in lower_name for x in ['paint cost', 'wallpaper', 'curtain', 'room heater', 'water tank', 'air conditioner', 'ac tonnage', 'laundry', 'electricity appliance']):
        return 'home'
    if any(x in lower_name for x in ['gpa', 'cgpa', 'grade', 'study', 'exam', 'mark', 'attendance', 'revision', 'percentile']):
        return 'education'
    if any(x in lower_name for x in ['seed', 'fertilizer', 'irrigation', 'pesticide', 'crop', 'livestock', 'soil', 'greenhouse']):
        return 'agriculture'
    if any(x in lower_name for x in ['wind chill', 'heat index', 'dew point', 'humidity', 'air density', 'solar']):
        return 'weather'
    if any(x in lower_name for x in ['battery backup', 'ups ', 'ups/', 'electricity', 'appliance', 'room heater']):
        return 'utilities'
    if any(x in lower_name for x in ['sand', 'gravel', 'brick', 'mortar', 'wood board', 'drywall', 'ceiling', 'window', 'door', 'stair', 'ramp', 'scaffold', 'asphalt']):
        return 'construction'
    if any(x in lower_name for x in ['password', 'entropy', 'rsa', 'aes', 'hash', 'brute']):
        return 'security'
    if any(x in lower_name for x in ['recipe', 'calories per serving', 'baking', 'yeast', 'oven', 'coffee', 'tea', 'alcohol', 'beer', 'wine', 'cocktail']):
        return 'food'
    if any(x in lower_name for x in ['k/d', 'win', 'xp', 'loot', 'gacha', 'cricket', 'football', 'basketball', 'tennis', 'swimming', 'golf', 'strength', 'pr estimator']):
        return 'gaming'
    if any(x in lower_name for x in ['note', 'tempo', 'audio', 'chord', 'scale', 'tuning']):
        return 'music'
    if any(x in lower_name for x in ['golden', 'grid', 'poster', 'aspect', 'perspective', 'typography', 'line-height']):
        return 'design'
    if any(x in lower_name for x in ['hiking', 'trail', 'camping', 'backpack', 'boat', 'map']):
        return 'outdoor'
    if any(x in lower_name for x in ['dog', 'cat', 'pet', 'aquarium', 'horse', 'bird']):
        return 'pets'
    if any(x in lower_name for x in ['baby', 'diaper', 'toddler', 'screen-time', 'feeding']):
        return 'parenting'
    if any(x in lower_name for x in ['richter', 'decibel', 'telescope', 'drone', 'robot', 'co₂', 'carbon', 'noise', 'ventilation', 'indoor']):
        return 'science'
    if any(x in lower_name for x in ['shoe', 'ring', 'tire', 'altitude', 'mountain', 'kitchen', 'clothing', 'screen brightness', 'mobile', 'turning']):
        return 'utilities'
    if any(x in lower_name for x in ['volumetric', 'dimensional', 'container', 'cargo', 'pallet', 'office', 'warehouse', 'weight distribution']):
        return 'shipping'
    if any(x in lower_name for x in ['camera', 'shutter', 'aperture', 'iso']):
        return 'photography'
    if any(x in lower_name for x in ['sleep', 'breathing', 'meditation', 'dopamine', 'money-saving', 'habit', 'goal', 'productivity', 'biorhythm']):
        return 'lifestyle'
    
    return 'utilities'

# Read the existing page.tsx
with open('./app/calculators/page.tsx', 'r') as f:
    page_content = f.read()

# Find the position of the last calculator entry (before the closing ]);)
# We need to insert before the ]; that closes the calculators array
match = re.search(r'(\s*\{\s*name:\s*"Mortgage Refinance Break-Even Calculator".*?\],)', page_content, re.DOTALL)
if match:
    insert_position = match.end() - 2  # Position before ];
else:
    # Fallback: find the last occurrence of ];
    insert_position = page_content.rfind('];')

# Generate new calculator entries
new_entries = []
for calc in calculators_data:
    slug = to_slug(calc['calculatorName'])
    category = get_category(calc['calculatorName'])
    entry = f'  {{ name: "{calc["calculatorName"]}", slug: "{slug}", category: "{category}" }}'
    new_entries.append(entry)

# Create the new content
new_calculators_block = ',\n'.join(new_entries)

# Insert the new calculators
# Find the last calculator entry and add after it
last_calc_pattern = r'(\{\s*name:\s*"Mortgage Refinance Break-Even Calculator"[^}]+\},)'
replacement = r'\1\n' + new_calculators_block + ','

new_page_content = re.sub(last_calc_pattern, replacement, page_content)

# Now update the categories array to include new categories
categories_match = re.search(r'(const categories = \[\s*\{ id: "all", name: "All" \},[^]]+)(\];)', page_content, re.DOTALL)
if categories_match:
    existing_categories = categories_match.group(1)
    
    # Add new categories
    new_categories = [
        '  { id: "automotive", name: "Automotive" },',
        '  { id: "business", name: "Business" },',
        '  { id: "home", name: "Home & Garden" },',
        '  { id: "education", name: "Education" },',
        '  { id: "agriculture", name: "Agriculture" },',
        '  { id: "weather", name: "Weather" },',
        '  { id: "security", name: "Security" },',
        '  { id: "food", name: "Food & Cooking" },',
        '  { id: "gaming", name: "Gaming & Sports" },',
        '  { id: "music", name: "Music & Audio" },',
        '  { id: "design", name: "Design" },',
        '  { id: "outdoor", name: "Outdoor" },',
        '  { id: "pets", name: "Pets" },',
        '  { id: "parenting", name: "Parenting" },',
        '  { id: "science", name: "Science" },',
        '  { id: "shipping", name: "Shipping" },',
        '  { id: "photography", name: "Photography" },',
        '  { id: "lifestyle", name: "Lifestyle" },',
    ]
    
    # Check which categories don't exist yet
    for cat in new_categories:
        cat_id = re.search(r'id:\s*"([^"]+)"', cat).group(1)
        if cat_id not in existing_categories:
            existing_categories += '\n' + cat
    
    new_page_content = new_page_content.replace(categories_match.group(0), existing_categories + '\n];')

# Write the updated content
with open('./app/calculators/page.tsx', 'w') as f:
    f.write(new_page_content)

print(f"Added {len(new_entries)} new calculators to page.tsx")
print("Updated categories list")
