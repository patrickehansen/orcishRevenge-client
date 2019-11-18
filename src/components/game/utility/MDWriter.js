import React, { Component } from 'react'
import {
  EditorState,
  SelectionState,
  Modifier,
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import Icons from '../../../../assets/markdown_icons'

import Decorator from './MDDecorator'

export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props)
    this.textRef = React.createRef
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (!this.textRef.value) {
      nextState.editorState = EditorState.createEmpty()
      return true
    }
    else if (this.state !== nextState || this.props !== nextProps) return true
    return false
  }

  setTextRef = element => { this.textRef = element }

  linkifyBlock = (contentBlock, contentState, anchorOffset) => {
    // init return var
    let newContentState
    // Get the plain text of the block
    const plainText = contentBlock.getText()

    // find existing link entitys in block to modify them
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity()

      return (
        entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    (start, end) => {

      // dismiss entitys that are not near cursor or a addition
      if (anchorOffset - 1 > end || anchorOffset < start) return

      // search for links
      const links = linkify.match(plainText)

      // if links found renew entity data else delete entity data
      if (links) links.forEach(link => {
        // dismiss wrong links and link breakers
        if (link.lastIndex < start || link.index > end || link.lastIndex < anchorOffset) return

        // Clear entitys of a seperated link part example: adi,clan.com /clan.com is still a link
        if (start < link.index) {
          const oldlinkpart = SelectionState.createEmpty(contentBlock.getKey()).
            set('anchorOffset', start).
            set('focusOffset', link.index)
            // Clear entitys of selectionState

          newContentState = Modifier.applyEntity(contentState,
            oldlinkpart,
            null)
        }
        // Create a selectionState with the link part of the contentBlock
        const selection = SelectionState.createEmpty(contentBlock.getKey()).
          set('anchorOffset', link.index).
          set('focusOffset', link.lastIndex)
          // Clear all entitys of link string

        newContentState = Modifier.applyEntity(contentState,
          selection,
          null)
        // Create a new link entity and get the key
        newContentState = newContentState.createEntity('LINK', 'MUTABLE', { url: link.url })
        const entityKey = newContentState.getLastCreatedEntityKey()
        // Apply the entity key to the link string within contentBlock

        newContentState = Modifier.applyEntity(newContentState,
          selection,
          entityKey)
      })
      else {
        // Delete existing link entitys
        const selection = SelectionState.createEmpty(contentBlock.getKey()).
          set('anchorOffset', start).
          set('focusOffset', end)

        newContentState = Modifier.applyEntity(contentState,
          selection,
          null)
      }
    })

    // Run the test to see if we have to create new entitys
    const test = linkify.pretest(plainText) || linkify.test(plainText)

    if (test)
      // find entitys in block
      contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity()
        // forward blocks without entity or non link entity

        return (
          entityKey === null || entityKey !== null &&
            contentState.getEntity(entityKey).getType() !== 'LINK'
        )
      },
      (start, end) => {
        // dismiss entitys that are not near cursor
        if (anchorOffset > end || anchorOffset < start) return
        // search for links
        const links = linkify.match(plainText)

        if (links) links.forEach(link => {

          // trigger for link breaking symbols
          if (link.lastIndex < end) return

          const selection = SelectionState.createEmpty(contentBlock.getKey()).
            set('anchorOffset', link.index).
            set('focusOffset', link.lastIndex)

          newContentState = contentState.createEntity('LINK', 'MUTABLE', { url: link.url })
          const entityKey = newContentState.getLastCreatedEntityKey()

          newContentState = Modifier.applyEntity(newContentState,
            selection,
            entityKey)
        })
      })

    return newContentState
  }

  linkifyContentState = editorState => {
    let newEditorState

    // Get the current user Selection
    const selectionState = editorState.getSelection()
    const anchorKey = selectionState.getAnchorKey()

    // Get the current Content to find last modified block
    const contentState = editorState.getCurrentContent()
    const currentContentBlock = contentState.getBlockForKey(anchorKey)

    // linkify the currently modified contentBlock and receive a maybe altered contentState
    const newContentState = this.linkifyBlock(currentContentBlock, contentState, selectionState.anchorOffset)

    // turn off undo record listener
    newEditorState = EditorState.set(editorState, { allowUndo: false })
    // check newContentState return old editorState or new editor-, contentState with old selectionState
    newEditorState = newContentState ?
      EditorState.forceSelection(EditorState.push(newEditorState,
        newContentState,
        'apply-entity'),
      selectionState) :
      newEditorState
    // turn undo back on

    newEditorState = EditorState.set(newEditorState, { allowUndo: true })

    return newEditorState
  }

  // The final textarea is a controlled input. Calculate and provide the value.
  getTextAreaValue = () => {
    const { editorState } = this.state
    // Get the current content of the editor
    const contentState = editorState.getCurrentContent()
    // Convert the content to a raw JS object
    const raw = convertToRaw(contentState)
    // Stringify that JS object

    //console.log('getTextareavalue', raw)
    return JSON.stringify(raw)
  }

  handleEditorStateChange = editorState => { this.setState({ editorState: this.linkifyContentState(editorState) }) }

  render() {
    const { toolbar, toolbarOnFocus, placeholder, name } = this.props
    const { editorState } = this.state

    return (
      <React.Fragment>
        <Editor editorState={editorState}
          onEditorStateChange={this.handleEditorStateChange}
          toolbarHidden={!toolbar}
          toolbarOnFocus={toolbarOnFocus}
          placeholder={placeholder}
          customDecorators={[Decorator.linkDecorator]}
          customStyleMap={styleMap}
          stripPastedStyles
          spellCheck
          toolbar={{ options: ['inline', 'list', 'remove', 'history'],
            inline : {
              options      : ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
              bold         : { icon: Icons.bold },
              italic       : { icon: Icons.italic },
              underline    : { icon: Icons.underline },
              strikethrough: { icon: Icons.strikethrough },
              monospace    : { icon: Icons.monospace, className: 'public-DraftEditor-monospace' },
              superscript  : { icon: Icons.superscript },
              subscript    : { icon: Icons.subscript }
            },
            list: {
              options  : ['unordered', 'ordered', 'indent', 'outdent'],
              unordered: { icon: Icons.unordered },
              ordered  : { icon: Icons.ordered },
              indent   : { icon: Icons.indent },
              outdent  : { icon: Icons.outdent }
            },
            remove : { icon: Icons.remove },
            history: {
              inDropdown: false,
              options   : ['undo', 'redo'],
              undo      : { icon: Icons.undo },
              redo      : { icon: Icons.redo }
            } }}
        />
        <textarea name={name}
          ref={this.setTextRef}
          style={{ visibility: 'hidden', height: '0px', position: 'absolute' }}
          value={this.getTextAreaValue()}
          disabled
        />
      </React.Fragment>
    )
  }
}
// Custom overrides for "code" style. Delete default monospace bg
const styleMap = {
  CODE: {
    backgroundColor: '#313537',
    fontFamily     : 'monospace',
    fontSize       : '12px'
  }
}
// not empty validator for submits

export function mdHasContent(targetcontent) {
  if (targetcontent) return convertFromRaw(JSON.parse(targetcontent)).hasText()
  return false
}
