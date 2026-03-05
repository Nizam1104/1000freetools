#!/usr/bin/env python3
import re
import json

def parse_markdown_to_json(markdown_content):
    """Parse the markdown content and extract SEO data for all tools."""
    
    tools_data = {}
    
    # Split by tool sections (## tool-name)
    tool_pattern = r'##\s+([a-zA-Z0-9-]+)\s*\n(.*?)(?=\n##\s+[a-zA-Z0-9-]+\s*$|\*\*Content generation complete\.\*\*)'
    tool_matches = re.findall(tool_pattern, markdown_content, re.DOTALL | re.MULTILINE)
    
    for tool_slug, content in tool_matches:
        tool_data = {}
        
        # Extract SEO Title
        seo_title_match = re.search(r'\*\*SEO Title:\*\*\s*(.+?)\n', content)
        if seo_title_match:
            tool_data['seoTitle'] = seo_title_match.group(1).strip()
        
        # Extract Meta Description
        meta_desc_match = re.search(r'\*\*Meta Description:\*\*\s*(.+?)\n', content)
        if meta_desc_match:
            tool_data['metaDescription'] = meta_desc_match.group(1).strip()
        
        # Extract H1
        h1_match = re.search(r'\*\*H1:\*\*\s*(.+?)\n', content)
        if h1_match:
            tool_data['h1'] = h1_match.group(1).strip()
        
        # Extract Intro
        intro_match = re.search(r'\*\*Intro:\*\*\s*(.+?)(?=\n\*\*How It Works:\*\*)', content, re.DOTALL)
        if intro_match:
            tool_data['intro'] = intro_match.group(1).strip()
        
        # Extract How It Works (numbered list)
        how_it_works_match = re.search(r'\*\*How It Works:\*\*\s*\n(.*?)(?=\n\*\*Features:\*\*)', content, re.DOTALL)
        if how_it_works_match:
            how_it_works_content = how_it_works_match.group(1)
            steps = re.findall(r'(\d+)\.\s*(.+?)(?=\n\d+\.|\Z)', how_it_works_content, re.DOTALL)
            tool_data['howItWorks'] = [step[1].strip() for step in steps]
        
        # Extract Features - format: - **Label.** Description (period is INSIDE bold)
        features_match = re.search(r'\*\*Features:\*\*\s*\n(.*?)(?=\n\*\*FAQ:\*\*)', content, re.DOTALL)
        if features_match:
            features_content = features_match.group(1)
            # Pattern: - **Label.** Description
            feature_items = re.findall(r'- \*\*(.+?)\*\* (.+)', features_content)
            tool_data['features'] = [{'label': label.strip(), 'description': desc.strip()} for label, desc in feature_items]
        
        # Extract FAQ - format: **Question?** Answer
        faq_match = re.search(r'\*\*FAQ:\*\*\s*\n(.*?)(?=\n\*\*Internal Links:\*\*)', content, re.DOTALL)
        if faq_match:
            faq_content = faq_match.group(1)
            # Match **Question?** Answer (until next **Question** or end)
            faq_items = re.findall(r'\*\*([^*]+)\*\*\s*(.+?)(?=\n\*\*[A-Z]|\Z)', faq_content, re.DOTALL)
            tool_data['faq'] = [{'question': q.strip(), 'answer': a.strip()} for q, a in faq_items]
        
        # Extract Internal Links
        internal_links_match = re.search(r'\*\*Internal Links:\*\*\s*\n(.*?)(?=\n---|\n##\s+|\Z)', content, re.DOTALL)
        if internal_links_match:
            links_content = internal_links_match.group(1)
            link_items = re.findall(r'-\s*\[([^\]]+)\]\(([^\)]+)\)', links_content)
            tool_data['internalLinks'] = [{'text': text.strip(), 'href': href.strip()} for text, href in link_items]
        
        if tool_data:
            tools_data[tool_slug] = tool_data
    
    return tools_data

def main():
    # Read the markdown file
    with open('/Users/nizamvali/myProjects/1000freetools/app/json-tools/seo-content-all-tools.md', 'r', encoding='utf-8') as f:
        markdown_content = f.read()
    
    # Parse the content
    tools_data = parse_markdown_to_json(markdown_content)
    
    # Print statistics
    print(f"Total tools parsed: {len(tools_data)}")
    
    # Check for missing fields
    missing_titles = []
    missing_features = []
    for slug, data in tools_data.items():
        if 'seoTitle' not in data:
            missing_titles.append(slug)
        if not data.get('features'):
            missing_features.append(slug)
    
    if missing_titles:
        print(f"Missing seoTitle: {len(missing_titles)}")
    if missing_features:
        print(f"Missing/empty features: {len(missing_features)}")
    
    # Write to JSON file
    with open('/Users/nizamvali/myProjects/1000freetools/app/json-tools/seo-content-data.json', 'w', encoding='utf-8') as f:
        json.dump(tools_data, f, indent=2, ensure_ascii=False)
    
    print(f"JSON file created: /Users/nizamvali/myProjects/1000freetools/app/json-tools/seo-content-data.json")
    
    # Show sample of first tool
    first_tool = list(tools_data.keys())[0]
    print(f"\nSample data for '{first_tool}':")
    print(json.dumps(tools_data[first_tool], indent=2, ensure_ascii=False)[:1500])

if __name__ == '__main__':
    main()
