import AutoReplace from 'slate-auto-replace'

export const autoReplace = [
  AutoReplace({
    trigger: ')',
    before: /(\(c)$/i,
    transform: transform => transform.insertText('©')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    transform: transform => transform.setBlock('blockquote')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(-)$/,
    transform: transform => transform.setBlock('li').wrapBlock('ul')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(#{1,6})$/,
    transform: (transform, e, data, matches) => {
      const [hashes] = matches.before
      const level = hashes.length
      return transform.setBlock({
        type: 'h',
        data: { level }
      })
    }
  }),
  AutoReplace({
    trigger: 'enter',
    before: /^(-{3})$/,
    transform: (transform) => {
      return transform.setBlock({
        type: 'hr',
        isVoid: true
      })
    }
  })
];

