'use client';

import { useState } from 'react';
import { registerMedia } from '@/app/admin/media/actions';

export default function MediaUploader({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setBusy(true);
    try {
      const { upload } = await import('@vercel/blob/client');
      for (const file of files) {
        setStatus(`Uploading ${file.name}…`);
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload',
        });
        await registerMedia({
          url: blob.url,
          alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
          ratio: '16:9',
          kind: file.type.startsWith('video') ? 'video' : 'image',
        });
      }
      setStatus(`${files.length} file${files.length > 1 ? 's' : ''} uploaded.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  }

  if (!enabled) return null;

  return (
    <div className="a-field">
      <label htmlFor="upload">Upload images or video</label>
      <input
        id="upload"
        type="file"
        multiple
        accept="image/*,video/mp4,video/webm"
        onChange={onChange}
        disabled={busy}
      />
      {status ? <span className="hint">{status}</span> : null}
    </div>
  );
}
