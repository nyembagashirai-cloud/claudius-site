import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

/**
 * Client-side uploads go straight from the browser to Vercel Blob, so large
 * campaign videos are not squeezed through a serverless function body limit.
 * This route only signs the request — and only for a signed-in editor.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getSession();
        if (!session) throw new Error('Not signed in.');
        return {
          allowedContentTypes: [
            'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml',
            'video/mp4', 'video/webm',
          ],
          maximumSizeInBytes: 200 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // The Media row is created by the client once the upload resolves.
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed.' },
      { status: 400 },
    );
  }
}
