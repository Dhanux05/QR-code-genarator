import { NextResponse } from 'next/server';
import { getEntryById } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    // Await params for Next.js 14+
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    console.log('Fetching media for ID:', id);
    
    const entry = getEntryById(id);
    
    if (!entry) {
      console.log('Entry not found for ID:', id);
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    console.log('Found entry:', entry);
    
    // Return the entry directly without wrapping
    return NextResponse.json(entry);

  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch media data' 
    }, { status: 500 });
  }
}
