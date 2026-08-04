import { NextRequest, NextResponse } from 'next/server';
import { createConsultation, getConsultations } from '@/lib/db';

export async function GET() {
  try {
    const consultations = getConsultations();
    return NextResponse.json({ success: true, count: consultations.length, consultations });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve consultations', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, country, contact_method, contact_info, preferred_timeframe, model_interest, notes } = body;

    if (!full_name || !email || !country || !contact_info) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: full_name, email, country, and contact_info are required.' },
        { status: 400 }
      );
    }

    const consultation = createConsultation({
      full_name,
      email,
      country,
      contact_method: contact_method || 'Private Concierge Call',
      contact_info,
      preferred_timeframe: preferred_timeframe || 'Q3 2026',
      model_interest: model_interest || 'VELOX Sanctuary I',
      notes: notes || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Private consultation request received. A VELOX Client Concierge will contact you within 2 hours.',
        bookingId: consultation.id,
        consultation,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error processing consultation request', error: String(error) },
      { status: 500 }
    );
  }
}
