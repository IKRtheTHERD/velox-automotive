import { NextRequest, NextResponse } from 'next/server';
import { getModels, getHotspots, getPressQuotes } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const modelId = searchParams.get('model_id') || undefined;

    const models = getModels();
    const hotspots = getHotspots(modelId);
    const pressQuotes = getPressQuotes();

    return NextResponse.json({
      success: true,
      data: {
        models,
        hotspots,
        pressQuotes,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch vehicle specifications', error: String(error) },
      { status: 500 }
    );
  }
}
