export function extractCodeFromMarkdown(content: string): string {
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g
  const matches = [...content.matchAll(codeBlockRegex)]
  
  if (matches.length > 0) {
    return matches.map(match => match[1]).join('\n\n')
  }

  return content
}

export function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  switch (ext) {
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'css':
      return 'css'
    case 'json':
      return 'json'
    case 'html':
      return 'html'
    case 'prisma':
      return 'prisma'
    default:
      return 'plaintext'
  }
}