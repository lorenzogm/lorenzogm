import re
import sys

with open('src/routes/__root.tsx', 'r') as f:
    content = f.read()

if 'import "../globals.css"' not in content and 'import "@/globals.css"' not in content:
    content = 'import "../globals.css";\n' + content
    with open('src/routes/__root.tsx', 'w') as f:
        f.write(content)
    print("Modified src/routes/__root.tsx to include globals.css")
else:
    print("globals.css already present in src/routes/__root.tsx")
