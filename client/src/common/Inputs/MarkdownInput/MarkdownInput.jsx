import React from 'react'
import MDEditor, { commands } from '@uiw/react-md-editor'

const MarkdownInput = ({ value = '', setValue = null }) => {

    return (
        <MDEditor
            value={value}
            onChange={setValue}
            commands={[commands.bold, commands.italic, commands.strikethrough, commands.hr, commands.title,
            commands.link, commands.quote, commands.unorderedListCommand]}
            extraCommands={[commands.codeEdit, commands.codeLive, commands.codePreview]}
            visibleDragbar={false}
        />
    )
}

export default MarkdownInput