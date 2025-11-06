import { NextResponse } from 'next/server';
import { summarizeText } from '@/lib/groq';

export async function POST(request) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    console.log('Summarizing text:', text.substring(0, 50) + '...');
    
    const shortText = await summarizeText(text);
    
    console.log('Summary generated:', shortText);
    
    return NextResponse.json({ 
      success: true, 
      shortText 
    });

  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate summary',
      details: error.message 
    }, { status: 500 });
  }
}
