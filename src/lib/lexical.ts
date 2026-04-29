/**
 * Minimal helpers for building Lexical editor state JSON for Payload `richText` fields.
 * Used by seed scripts so we don't have to author the editor JSON by hand.
 */

type LexNode = { type: string; version: number; [k: string]: unknown }

type InlinePart = string | { text: string; href: string; newTab?: boolean }

type LexRoot = {
  root: {
    type: 'root'
    format: ''
    indent: 0
    version: 1
    direction: 'ltr'
    children: LexNode[]
  }
}

function textNode(text: string, format = 0): LexNode {
  return {
    type: 'text',
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text,
    version: 1,
  }
}

function linkNode(text: string, href: string, newTab = false): LexNode {
  return {
    type: 'link',
    version: 3,
    format: '',
    indent: 0,
    direction: 'ltr',
    fields: {
      linkType: href.startsWith('http') ? 'custom' : 'custom',
      url: href,
      newTab,
    },
    children: [textNode(text)],
  }
}

function paragraphNode(children: LexNode[]): LexNode {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    textFormat: 0,
    textStyle: '',
    children,
  }
}

function headingNode(level: 2 | 3 | 4, text: string): LexNode {
  return {
    type: 'heading',
    tag: `h${level}`,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [textNode(text)],
  }
}

function listNode(listType: 'bullet' | 'number', items: string[]): LexNode {
  return {
    type: 'list',
    listType,
    tag: listType === 'bullet' ? 'ul' : 'ol',
    start: 1,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: items.map((value, idx) => ({
      type: 'listitem',
      value: idx + 1,
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [textNode(value)],
    })),
  }
}

function partsToInline(parts: InlinePart[]): LexNode[] {
  return parts.map((p) =>
    typeof p === 'string' ? textNode(p) : linkNode(p.text, p.href, p.newTab),
  )
}

export function richDoc(...children: LexNode[]): LexRoot {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

export function p(text: string): LexNode {
  return paragraphNode([textNode(text)])
}

export function pInline(...parts: InlinePart[]): LexNode {
  return paragraphNode(partsToInline(parts))
}

export function h2(text: string): LexNode {
  return headingNode(2, text)
}

export function h3(text: string): LexNode {
  return headingNode(3, text)
}

export function ul(items: string[]): LexNode {
  return listNode('bullet', items)
}

export function ol(items: string[]): LexNode {
  return listNode('number', items)
}

export function h4(text: string): LexNode {
  return headingNode(4, text)
}

export function pBold(text: string): LexNode {
  return paragraphNode([textNode(text, 1)])
}
