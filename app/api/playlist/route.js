import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req) {
  try {
    const jsonFilePath = path.join(process.cwd(), 'data', 'songs.json');

    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    const songs = JSON.parse(jsonData);

    return NextResponse.json({ success: true, data: songs });
  } catch (error) {
    console.error('Error reading songs.json:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read songs.json' },
      { status: 500 }
    );
  }
}
