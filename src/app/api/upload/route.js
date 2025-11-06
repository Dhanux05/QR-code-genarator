import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles = [];
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    for (const file of files) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const uniqueFilename = `${uuidv4()}-${file.name}`;
        const filepath = path.join(uploadDir, uniqueFilename);

        // Write file to disk
        await writeFile(filepath, buffer);
        
        // Store relative path for frontend access
        uploadedFiles.push(`/uploads/${uniqueFilename}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
