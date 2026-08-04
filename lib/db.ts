import fs from 'fs';
import path from 'path';

export interface Model {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price_starting: number;
  annual_production_limit: number;
  hero_image: string;
  range_miles: number;
  acceleration_0_60: number;
  top_speed_mph: number;
  nvh_rating_db: number;
  power_hp: number;
  battery_kwh: number;
  autonomous_level: string;
}

export interface Hotspot {
  id: string;
  model_id: string;
  title: string;
  category: 'interior' | 'exterior' | 'drive';
  position_x: number;
  position_y: number;
  description: string;
  spec_detail: string;
}

export interface PressQuote {
  id: string;
  publication: string;
  quote: string;
  author: string;
}

export interface Consultation {
  id: string;
  full_name: string;
  email: string;
  country: string;
  contact_method: string;
  contact_info: string;
  preferred_timeframe: string;
  model_interest?: string;
  notes?: string;
  created_at: string;
}

export interface DBData {
  models: Model[];
  hotspots: Hotspot[];
  press_quotes: PressQuote[];
  consultations: Consultation[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'velox_db.json');
const SEED_PATH = path.join(process.cwd(), 'data', 'seed.json');

function ensureDB(): DBData {
  try {
    if (!fs.existsSync(path.dirname(DB_PATH))) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    }

    if (!fs.existsSync(DB_PATH)) {
      if (fs.existsSync(SEED_PATH)) {
        const seedContent = fs.readFileSync(SEED_PATH, 'utf-8');
        fs.writeFileSync(DB_PATH, seedContent, 'utf-8');
      } else {
        const emptyDB: DBData = {
          models: [],
          hotspots: [],
          press_quotes: [],
          consultations: [],
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(emptyDB, null, 2), 'utf-8');
      }
    }

    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content) as DBData;
  } catch (error) {
    console.error('Error in DB initialization:', error);
    // Fallback to seed if parsing fails
    if (fs.existsSync(SEED_PATH)) {
      const seedContent = fs.readFileSync(SEED_PATH, 'utf-8');
      return JSON.parse(seedContent) as DBData;
    }
    return { models: [], hotspots: [], press_quotes: [], consultations: [] };
  }
}

function writeDB(data: DBData): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to DB:', error);
    return false;
  }
}

export function getModels(): Model[] {
  const db = ensureDB();
  return db.models || [];
}

export function getModelBySlug(slug: string): Model | undefined {
  const db = ensureDB();
  return db.models.find((m) => m.slug === slug);
}

export function getHotspots(modelId?: string): Hotspot[] {
  const db = ensureDB();
  if (modelId) {
    return db.hotspots.filter((h) => h.model_id === modelId);
  }
  return db.hotspots || [];
}

export function getPressQuotes(): PressQuote[] {
  const db = ensureDB();
  return db.press_quotes || [];
}

export function getConsultations(): Consultation[] {
  const db = ensureDB();
  return db.consultations || [];
}

export function createConsultation(input: Omit<Consultation, 'id' | 'created_at'>): Consultation {
  const db = ensureDB();
  const newConsultation: Consultation = {
    ...input,
    id: `c_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    created_at: new Date().toISOString(),
  };

  db.consultations.unshift(newConsultation);
  writeDB(db);
  return newConsultation;
}
