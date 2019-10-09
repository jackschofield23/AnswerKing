namespace Lib {
  function escapeHtml(str: string): string {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  export function printProps(
    keys: string[],
    props: object,
    config: any,
    indentation: string,
    depth: Number,
    refs: any,
    printer: any
  ): string {
    const { spacingOuter, spacingInner, indent } = config;
    const indentationNext = `${indentation}${indent}`;

    return keys
      .map(key => {
        const value = props[key];
        let printed = printer(value, config, indentationNext, depth, refs);

        if (typeof value !== 'string') {
          if (printed.indexOf('\n') !== -1) {
            printed = `${spacingOuter}${indentationNext}${printed}${spacingOuter}${indentation}`;
          }

          printed = `{${printed}}`;
        }

        return `${spacingInner}${indentation}${key}="${value}"`;
      })
      .join('');
  }

  export function printChildren(
    children: any[],
    config: any,
    indentation: string,
    depth: Number,
    refs: any,
    printer: any
  ): string {
    return children
      .map(child => {
        if (typeof child === 'string') {
          const printedText = `${config.spacingOuter}${indentation}${printText(
            child,
            config
          )}`;

          return printedText.trim() ? printedText : '';
        }

        const printed = `${config.spacingOuter}${indentation}${printer(
          child,
          config,
          indentation,
          depth,
          refs
        )}`;

        return printed.trim() ? printed : '';
      })
      .join('');
  }

  export function printText(text: string, config: any): string {
    return `${text}`.trim() ? escapeHtml(text) : '';
  }

  export function printComment(comment: string, config: any): string {
    return `<!--${escapeHtml(comment)}-->`;
  }

  export function printElement(
    type: string,
    printedProps: string,
    printedChildren: string,
    config: any,
    indentation: string
  ): string {
    const { spacingOuter } = config;

    let printed = `<${type}`;

    if (printedProps) {
      printed = `${printed}${printedProps}${spacingOuter}${indentation}`;
    }

    if (printedChildren) {
      printed = `${printed}>${printedChildren}${spacingOuter}${indentation}</${type}`;
    } else {
      printed = printedProps && !config.min ? `${printed}/` : `${printed} /`;
    }

    return `${printed}>`;
  }

  export function printElementAsLeaf(type: string, config: any): string {
    return `<${type} ... />`;
  }
}

namespace Util {
  // tslint:disable-next-line:variable-name
  export const NodeTypes = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    COMMENT_NODE: 8,
    FRAGMENT_NODE: 11,
  };

  export function keysMapper(attr) {
    return attr.name;
  }

  export function propsReducer(props, attr) {
    props[attr.name] = attr.value;

    return props;
  }

  export const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

  export function testNode(nodeType: any, name: any) {
    return (
      (nodeType === NodeTypes.ELEMENT_NODE && ELEMENT_REGEXP.test(name)) ||
      (nodeType === NodeTypes.TEXT_NODE && name === 'Text') ||
      (nodeType === NodeTypes.COMMENT_NODE && name === 'Comment') ||
      (nodeType === NodeTypes.FRAGMENT_NODE && name === 'DocumentFragment')
    );
  }
}

export function test(val: any) {
  return (
    val &&
    val.constructor &&
    val.constructor.name &&
    Util.testNode(val.nodeType, val.constructor.name)
  );
}

export function serialize(
  node: any,
  config: any,
  indentation: string,
  depth: number,
  refs: any,
  printer: any
): string {
  if (node.nodeType === Util.NodeTypes.TEXT_NODE) {
    return `${node.data}`.trim() === '' ? '' : Lib.printText(node.data, config);
  }

  if (node.nodeType === Util.NodeTypes.COMMENT_NODE) {
    return Lib.printComment(node.data, config);
  }

  const type =
    node.nodeType === Util.NodeTypes.FRAGMENT_NODE
      ? 'DocumentFragment'
      : `${node.tagName}`.toLowerCase();

  if (++depth > config.maxDepth) {
    return Lib.printElementAsLeaf(type, config);
  }

  return Lib.printElement(
    type,
    Lib.printProps(
      Array.prototype.map.call(node.attributes || [], Util.keysMapper).sort(),
      Array.prototype.reduce.call(node.attributes || [], Util.propsReducer, {}),
      config,
      `${indentation}${config.indent}`,
      depth,
      refs,
      printer
    ),
    Lib.printChildren(
      Array.prototype.slice.call(node.childNodes || node.children),
      config,
      `${indentation}${config.indent}`,
      depth,
      refs,
      printer
    ),
    config,
    indentation
  );
}

export default { serialize, test };
