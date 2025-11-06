import { NextResponse } from 'next/server';
import { addEntry } from '@/lib/db';

export async function POST(request) {
  try {
    const entry = await request.json();
    
    if (!entry.id || !entry.fullDesc) {
      return NextResponse.json({ error: 'Invalid entry data' }, { status: 400 });
    }

    const savedEntry = addEntry(entry);
    
    return NextResponse.json({ 
      success: true, 
      entry: savedEntry 
    });

  } catch (error) {
    console.error('Error saving entry:', error);
    return NextResponse.json({ 
      error: 'Failed to save entry' 
    }, { status: 500 });
  }
}
