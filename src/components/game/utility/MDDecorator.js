import React from 'react'


export default class MarkdownDecorator {



  // draft.js uncomposed decorator map
  // wysiwyg will create a "new CompositeDecorator", after the merge with their default Decorators
  static linkDecorator = {
  }
}

// Custom overrides for "code" style. Delete default monospace bg
export const styleMap = {
  CODE: {
    backgroundColor: '#313537',
    fontFamily     : 'monospace',
    fontSize       : '12px'
  }
}
