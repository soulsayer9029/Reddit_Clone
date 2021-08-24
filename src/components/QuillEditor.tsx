import React from 'react'
import dynamic from 'next/dynamic'

interface QuillEditorProps {

}

export const QuillEditor: React.FC<QuillEditorProps> = ({}) => {
    const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
        ssr: false,
        loading: () => <p>Loading ...</p>,
        })
        return (<QuillNoSSRWrapper  theme="snow" />);
}