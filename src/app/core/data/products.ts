import { Product } from '../models/product';

const productImage = (slug: string, file: string, alt: string, role: 'primary' | 'gallery' | 'detail' | 'lifestyle' = 'primary') => ({
  src: `images/products/${slug}/${file}`,
  alt,
  role,
});

export const PRODUCTS: readonly Product[] = [
  {
    id: 'arc_lounge_chair', slug: 'arc-lounge-chair', sku: 'NOMA-QF-ARC-01', name: 'ARC Lounge Chair', family: 'seating', category: 'Lounge chairs', collection: 'quiet-forms', price: 1840, currency: 'USD',
    shortDescription: 'A lounge chair shaped by a continuous oak frame.', description: 'ARC pairs a generous upholstered seat with a single sweeping timber structure. The form is quiet from every angle and made for long, unhurried sitting.', materials: ['Light oak', 'Natural linen upholstery'], colorway: 'Oatmeal',
    images: [productImage('arc-lounge-chair', 'arc-lounge-chair-main.webp', 'ARC Lounge Chair with light oak frame and natural linen upholstery')],
  },
  {
    id: 'line_dining_chair', slug: 'line-dining-chair', sku: 'NOMA-QF-LIN-01', name: 'LINE Dining Chair', family: 'seating', category: 'Dining chairs', collection: 'quiet-forms', price: 620, currency: 'USD',
    shortDescription: 'A timber dining chair with a gently upholstered seat.', description: 'LINE reduces the dining chair to a slim oak structure, a shaped backrest, and a soft upholstered seat. Its proportions are designed to sit lightly around a table.', materials: ['Solid oak', 'Wool-blend upholstery'], colorway: 'Natural oak',
    images: [productImage('line-dining-chair', 'line-dining-chair-main.webp', 'LINE Dining Chair in natural oak with an upholstered seat')],
  },
  {
    id: 'low_sofa', slug: 'low-sofa', sku: 'NOMA-QF-LOW-01', name: 'LOW Sofa', family: 'seating', category: 'Sofas', collection: 'quiet-forms', price: 3280, currency: 'USD',
    shortDescription: 'A low, softly structured sofa for an unhurried room.', description: 'LOW is composed as a broad, grounded volume with generous cushions and softened edges. A quiet profile keeps the room open while offering a deeply comfortable seat.', materials: ['Linen upholstery', 'Solid timber plinth'], colorway: 'Warm sand',
    images: [productImage('low-sofa', 'low-sofa-main.webp', 'LOW Sofa in warm sand linen upholstery')],
  },
  {
    id: 'slab_coffee_table', slug: 'slab-coffee-table', sku: 'NOMA-QF-SLB-01', name: 'SLAB Coffee Table', family: 'tables', category: 'Coffee tables', collection: 'quiet-forms', price: 1360, currency: 'USD',
    shortDescription: 'A low table carved as one calm, substantial volume.', description: 'SLAB is a generous coffee table in honed travertine. Rounded corners and a low profile bring a sense of weight without making the room feel heavy.', materials: ['Honed travertine'], colorway: 'Natural stone',
    images: [productImage('slab-coffee-table', 'slab-coffee-table-main.webp', 'SLAB Coffee Table in honed travertine')],
  },
  {
    id: 'mono_side_table', slug: 'mono-side-table', sku: 'NOMA-QF-MON-01', name: 'MONO Side Table', family: 'tables', category: 'Side tables', collection: 'quiet-forms', price: 540, currency: 'USD',
    shortDescription: 'A compact stainless-steel table with a softened silhouette.', description: 'MONO brings a simple cylindrical form to the side of a chair or sofa. Its brushed metal surface catches daylight softly and develops character over time.', materials: ['Brushed stainless steel'], colorway: 'Satin steel',
    images: [productImage('mono-side-table', 'mono-side-table-main.webp', 'MONO Side Table in brushed stainless steel')],
  },
  {
    id: 'veil_floor_lamp', slug: 'veil-floor-lamp', sku: 'NOMA-QF-VEI-01', name: 'VEIL Floor Lamp', family: 'lighting_objects', category: 'Floor lamps', collection: 'quiet-forms', price: 890, currency: 'USD',
    shortDescription: 'A tall, softened shade set on a fine black stem.', description: 'VEIL casts a warm, diffuse light through a textured linen shade. A minimal dark stem and low disc base keep its presence calm and architectural.', materials: ['Linen shade', 'Powder-coated steel'], colorway: 'Natural linen',
    images: [productImage('veil-floor-lamp', 'veil-floor-lamp-main.webp', 'VEIL Floor Lamp with natural linen shade and black steel base')],
  },
  {
    id: 'column_table_lamp', slug: 'column-table-lamp', sku: 'NOMA-QF-COL-01', name: 'COLUMN Table Lamp', family: 'lighting_objects', category: 'Table lamps', collection: 'quiet-forms', price: 460, currency: 'USD',
    shortDescription: 'A fluted stone lamp with a warm linen shade.', description: 'COLUMN balances a carved stone base with a broad textile shade. The material contrast gives a bedside or shelf a measured, ambient glow.', materials: ['Travertine', 'Linen shade', 'Brass detail'], colorway: 'Pale stone',
    images: [productImage('column-table-lamp', 'column-table-lamp-main.webp', 'COLUMN Table Lamp with fluted stone base and linen shade')],
  },
  {
    id: 'frame_mirror', slug: 'frame-mirror', sku: 'NOMA-QF-FRM-01', name: 'FRAME Mirror', family: 'lighting_objects', category: 'Mirrors', collection: 'quiet-forms', price: 980, currency: 'USD',
    shortDescription: 'A full-length mirror with a softened dark timber frame.', description: 'FRAME brings reflection into the room with a tall, rounded silhouette. The slim timber edge is deliberately quiet, allowing light and architecture to lead.', materials: ['Dark-stained oak', 'Mirror glass'], colorway: 'Smoked oak',
    images: [
      productImage('frame-mirror', 'frame-mirror-main.webp', 'FRAME Mirror with rounded dark oak frame', 'primary'),
      productImage('frame-mirror', 'frame-mirror-01.webp', 'FRAME Mirror in a quiet forms interior', 'lifestyle'),
    ],
  },
];
