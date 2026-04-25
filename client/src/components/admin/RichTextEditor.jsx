import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { blogsApi } from '../../api/blogs';

/**
 * Quill-based rich text editor. The default image button uploads
 * inline images to /api/blogs/upload-inline and inserts the returned
 * Cloudinary URL at the cursor — no base64 bloat in the post body.
 */
const RichTextEditor = ({ value, onChange, placeholder = 'Write something…' }) => {
  const quillRef = useRef(null);

  const imageHandler = useMemo(
    () => async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        try {
          const { url } = await blogsApi.uploadInlineImage(file);
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection(true);
          editor?.insertEmbed(range?.index ?? 0, 'image', url, 'user');
          editor?.setSelection((range?.index ?? 0) + 1, 0, 'silent');
        } catch (err) {
          alert(err?.response?.data?.message || 'Image upload failed');
        }
      };
    },
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          [{ align: [] }],
          ['clean'],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: { matchVisual: false },
    }),
    [imageHandler]
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'link',
    'image',
    'align',
  ];

  return (
    <div className="rte-wrap bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
