#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Chakra UI to Tailwind CSS mappings
const componentMappings = {
  // Basic layout components
  'Box': 'div',
  'Container': 'div',
  'VStack': 'div',
  'HStack': 'div',
  'Stack': 'div',
  'Flex': 'div',
  'Center': 'div',
  'Square': 'div',
  'Circle': 'div',
  
  // Typography
  'Text': 'p',
  'Heading': 'h2',
  
  // Form elements
  'Button': 'button',
  'Input': 'input',
  'Textarea': 'textarea',
  'Select': 'select',
  
  // Others
  'Image': 'img',
  'Link': 'a',
  'Spinner': 'div',
  'Card': 'div',
  'CardBody': 'div',
  'CardHeader': 'div',
  'CardFooter': 'div',
};

const propMappings = {
  // Layout props
  'spacing': 'space-y-',
  'direction': '',
  'align': 'items-',
  'justify': 'justify-',
  'alignItems': 'items-',
  'justifyContent': 'justify-',
  'flexDirection': 'flex-',
  
  // Size props
  'w': 'w-',
  'h': 'h-',
  'maxW': 'max-w-',
  'maxH': 'max-h-',
  'minW': 'min-w-',
  'minH': 'min-h-',
  
  // Spacing props
  'p': 'p-',
  'px': 'px-',
  'py': 'py-',
  'pt': 'pt-',
  'pb': 'pb-',
  'pl': 'pl-',
  'pr': 'pr-',
  'm': 'm-',
  'mx': 'mx-',
  'my': 'my-',
  'mt': 'mt-',
  'mb': 'mb-',
  'ml': 'ml-',
  'mr': 'mr-',
  
  // Color props
  'bg': 'bg-',
  'color': 'text-',
  'borderColor': 'border-',
  
  // Typography props
  'fontSize': 'text-',
  'fontWeight': 'font-',
  'textAlign': 'text-',
  'fontFamily': 'font-',
  
  // Border props
  'border': 'border',
  'borderWidth': 'border-',
  'borderRadius': 'rounded-',
  'rounded': 'rounded-',
  
  // Display props
  'display': '',
  'position': '',
  'top': 'top-',
  'bottom': 'bottom-',
  'left': 'left-',
  'right': 'right-',
};

function convertChakraToTailwind(content, filePath) {
  let result = content;
  
  // Replace imports
  result = result.replace(
    /import\s*{[^}]*}\s*from\s*['"]@chakra-ui\/react['"];?\s*/g,
    `import { cn } from '../../../../utils/cn';\nimport { useColorMode } from '../../../../hooks/useColorMode';\n`
  );
  
  // Replace useColorMode hook import
  result = result.replace(
    /useColorMode/g,
    'useColorMode'
  );
  
  // Convert components
  Object.entries(componentMappings).forEach(([chakra, html]) => {
    // Simple component replacement
    const regex = new RegExp(`<${chakra}([^>]*)>`, 'g');
    result = result.replace(regex, (match, props) => {
      let className = '';
      
      // Handle VStack specifically
      if (chakra === 'VStack') {
        className = 'flex flex-col';
        const spacingMatch = props.match(/spacing=\{?(\d+)\}?/);
        if (spacingMatch) {
          className += ` space-y-${spacingMatch[1]}`;
          props = props.replace(/spacing=\{?\d+\}?/, '');
        }
      }
      
      // Handle HStack specifically
      else if (chakra === 'HStack') {
        className = 'flex flex-row items-center';
        const spacingMatch = props.match(/spacing=\{?(\d+)\}?/);
        if (spacingMatch) {
          className += ` space-x-${spacingMatch[1]}`;
          props = props.replace(/spacing=\{?\d+\}?/, '');
        }
      }
      
      // Handle Container specifically
      else if (chakra === 'Container') {
        className = 'max-w-4xl mx-auto px-4';
      }
      
      // Handle Flex specifically
      else if (chakra === 'Flex') {
        className = 'flex';
      }
      
      // Handle Center specifically
      else if (chakra === 'Center') {
        className = 'flex items-center justify-center';
      }
      
      // Handle Button specifically
      else if (chakra === 'Button') {
        className = 'btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200';
      }
      
      // Handle Text specifically
      else if (chakra === 'Text') {
        className = '';
      }
      
      // Handle Spinner specifically
      else if (chakra === 'Spinner') {
        className = 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600';
        return `<div className="${className}"></div>`;
      }
      
      // Add className prop
      if (className) {
        if (props.includes('className=')) {
          props = props.replace(/className=["']([^"']*)["']/, `className={cn("${className}", "$1")}`);
        } else {
          props = ` className="${className}"${props}`;
        }
      }
      
      return `<${html}${props}>`;
    });
    
    // Replace closing tags
    const closingRegex = new RegExp(`</${chakra}>`, 'g');
    result = result.replace(closingRegex, `</${html}>`);
  });
  
  // Replace some common Chakra props with Tailwind classes
  result = result.replace(/textAlign=\{?["']?center["']?\}?/g, 'className="text-center"');
  result = result.replace(/fontSize=\{?["']?xl["']?\}?/g, 'className="text-xl"');
  result = result.replace(/fontWeight=\{?["']?bold["']?\}?/g, 'className="font-bold"');
  
  return result;
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Only process files that import from @chakra-ui/react
      if (content.includes('@chakra-ui/react')) {
        console.log(`Migrating: ${fullPath}`);
        const migratedContent = convertChakraToTailwind(content, fullPath);
        fs.writeFileSync(fullPath, migratedContent);
      }
    }
  }
}

// Process examples directories
const exampleDirs = [
  'examples/homepage/src/app/components',
  'examples/homepage/src/app/pages',
  'examples/next-template/src/app/components',
  'examples/next-template/src/app/pages',
];

console.log('Starting Chakra UI to Tailwind CSS migration...');

exampleDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Processing directory: ${dir}`);
    processDirectory(dir);
  }
});

console.log('Migration completed!');