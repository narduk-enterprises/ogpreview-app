/**
 * atx/prefer-ulink
 *
 * Prefer <ULink> over <NuxtLink> and <a> in Vue templates.
 * <ULink> provides consistent theming and accessibility.
 *
 * Exceptions:
 * - <a> with target="_blank" for external links (acceptable)
 * - Dynamic <component :is="..."> patterns (cannot lint statically)
 */

import { defineTemplateBodyVisitor } from '../utils.mjs'

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer <ULink> over <NuxtLink> and <a> for consistent theming',
      category: 'ATX Design System',
    },
    messages: {
      preferULink: 'Use <ULink> instead of <{{ element }}> for consistent theming.',
    },
    schema: [],
  },

  create(context) {
    if (!context.filename.endsWith('.vue')) return {}

    return defineTemplateBodyVisitor(context, {
      'VElement[name="NuxtLink"], VElement[name="a"]'(node) {
        context.report({
          node: node.startTag,
          messageId: 'preferULink',
          data: { element: node.name },
          fix(fixer) {
            const startNameLength = node.name.length;
            const fixes = [
              fixer.replaceTextRange([node.startTag.range[0] + 1, node.startTag.range[0] + 1 + startNameLength], 'ULink')
            ];
            if (node.endTag) {
              fixes.push(fixer.replaceTextRange([node.endTag.range[0] + 2, node.endTag.range[0] + 2 + startNameLength], 'ULink'));
            }
            return fixes;
          }
        })
      },
    })
  },
}
