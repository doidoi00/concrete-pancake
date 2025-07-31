#!/usr/bin/env python3
import re

def convert_math_blocks_precise(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix equation references
    content = re.sub(r'\{eq\}`eq:([\w]+)`', r'`eq:\1`', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    convert_math_blocks_precise("/Users/minyeop-jang/Library/CloudStorage/OneDrive-개인/Obsidian/Onedrive Vault/01. Researches/Knowledges/Fluid/turbulence.md")
    print("Precise math block conversion completed!")
