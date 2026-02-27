/**
 * atx/lucide-icons-only
 *
 * Disallow non-Lucide icon prefixes (i-heroicons-*, i-mdi-*, etc.)
 * in Vue templates and script setup. Only i-lucide-* is allowed.
 */

import { defineTemplateBodyVisitor } from '../utils.mjs'

const NON_LUCIDE_REGEX = /\bi-(?!lucide-)[a-z]+-[a-z]/

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Only allow Lucide icons (i-lucide-*) — no other icon libraries',
      category: 'ATX Design System',
    },
    messages: {
      lucideOnly:
        'Icon "{{ icon }}" uses a non-Lucide prefix — use i-lucide-* icons only.',
    },
    schema: [],
  },

  create(context) {
    if (!context.filename.endsWith('.vue')) return {}

    function checkString(node, value) {
      if (typeof value !== 'string') return
      
      const regex = /\bi-(?!lucide-)[a-z]+-[a-z0-9-]+/g
      let match
      
      while ((match = regex.exec(value)) !== null) {
        const m = match[0]
        context.report({
          node,
          messageId: 'lucideOnly',
          data: { icon: m },
          fix(fixer) {
            let offset = 0
            if (node.type === 'VLiteral' || node.type === 'Literal') offset = node.range[0] + 1
            else offset = node.range[0]
            
            let replacement = m.replace('heroicons-', 'lucide-').replace(/-20-solid|-16-solid|-solid|-outline/g, '')
            // Specific overrides
            replacement = replacement.replace('lucide-x-mark', 'lucide-x')
            replacement = replacement.replace('lucide-chat-bubble-left-ellipsis', 'lucide-message-circle')
            replacement = replacement.replace('lucide-document-text', 'lucide-file-text')
            replacement = replacement.replace('lucide-exclamation-triangle', 'lucide-triangle-alert')
            replacement = replacement.replace('lucide-exclamation-circle', 'lucide-alert-circle')
            replacement = replacement.replace('lucide-information-circle', 'lucide-info')
            replacement = replacement.replace('lucide-document-duplicate', 'lucide-copy')
            replacement = replacement.replace('lucide-arrow-right-circle', 'lucide-arrow-right-circle')
            replacement = replacement.replace('lucide-external-link', 'lucide-external-link')
            
            return fixer.replaceTextRange([offset + match.index, offset + match.index + m.length], replacement)
          }
        })
      }
    }

    return defineTemplateBodyVisitor(
      context,
      {
        'VAttribute[key.name="icon"] > VLiteral'(node) {
          checkString(node, node.value)
        },
        'VAttribute[key.name="name"] > VLiteral'(node) {
          checkString(node, node.value)
        },
        'VAttribute[directive=true][key.argument.name="icon"] Literal'(node) {
          checkString(node, node.value)
        },
        'VAttribute[directive=true][key.argument.name="name"] Literal'(node) {
          checkString(node, node.value)
        },
      },
      {
        'Literal'(node) {
          checkString(node, node.value)
        },
      }
    )
  },
}
