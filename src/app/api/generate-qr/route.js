import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log('Generating QR code for:', url);

    // Generate QR code as base64 image
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    console.log('QR code generated successfully');
    
    return NextResponse.json({ 
      success: true, 
      qrCode: qrCodeDataURL 
    });

  } catch (error) {
    console.error('QR generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate QR code',
      details: error.message 
    }, { status: 500 });
  }
}
