// components/TinyMCEEditor.tsx
'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт отключает SSR для этого компонента
const Editor = dynamic(
    () => import('@tinymce/tinymce-react').then(mod => mod.Editor),
    { ssr: false }
);

interface TinyMCEEditorProps {
    value: string;
    onEditorChange: (content: string, editor: any) => void;
}

export default function TinyMCEEditor({ value, onEditorChange }: TinyMCEEditorProps) {
    return (
        <Editor
            apiKey="gpl" // или "gpl" для бесплатной версии
            tinymceScriptSrc="https://unitsys.ru/files/js/apps/vodka/tinymce/tinymce.min.js" // Путь к локальному файлу TinyMCE
            value={value}
            onEditorChange={onEditorChange}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'preview', 'anchor', 'searchreplace', 'visualblocks',
                    'code', 'fullscreen', 'insertdatetime', 'media',
                    'table', 'codesample', 'help', 'wordcount'
                ],
                toolbar:
                    'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | help',
                content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }'
            }}
        />
    );
}