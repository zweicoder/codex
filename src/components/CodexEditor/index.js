import React from 'react'
import initialState from './state.json'
import { Editor, Raw } from 'slate'
import {autoReplace} from './slate-plugins'


class CodexEditor extends React.Component {

  schema = {
    nodes: {
      blockquote: props => <blockquote {...props.attributes}><span>{props.children}</span></blockquote>,
      hr: props => <hr />,
      ul: props => <ul {...props.attributes}>{props.children}</ul>,
      li: props => <li {...props.attributes}>{props.children}</li>,
      h: props => {
        const { attributes, children, node } = props
        const level = node.data.get('level')
        const Tag = `h${level}`
        return <Tag {...attributes}>{children}</Tag>
      }
    }
  }

  plugins = [
    ...autoReplace
  ];

  onKeyDown = (e, data, state) => {
    switch (data.key) {
      case 'backspace':
        return this.onBackspace(e, state)
    }
  };

  onBackspace = (e, state) => {
    if (state.isExpanded) return;
    if (state.startOffset != 0) return;
    const { startBlock } = state;
    console.log(startBlock.type);
    if (startBlock.type == 'paragraph') return;
    e.preventDefault();
    // Transform back to paragraph if originally a different style (exclude codeblocks as well?)
    const transform = state
      .transform()
      .setBlock('paragraph');

    if (startBlock.type == 'li') transform.unwrapBlock('ul');

    state = transform.apply();
    return state
  };

  state = {
    state: Raw.deserialize(initialState, { terse: true })
  };

  onChange = (state) => {
    this.setState({ state })
  };

  render = () => {
    return (
      <Editor
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        plugins={this.plugins}
        state={this.state.state}
        schema={this.schema}
      />
    )
  }

}

export default CodexEditor
