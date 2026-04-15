import express, { Request, Response } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

// ─── ENDPOINTS ──────────────────────────────────────────

// 1. Obtener todas las rutas con filtros
app.get('/api/routes', async (req: Request, res: Response) => {
  const { type, q } = req.query;
  
  let query = supabase.from('routes').select('*');
  
  if (type) query = query.eq('type', type);
  
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  // Filtrado en memoria para el 'query' (q) para simular el comportamiento original
  let filtered = data;
  if (q && typeof q === 'string') {
    const qLower = q.toLowerCase();
    filtered = data.filter(r => 
      r.name.toLowerCase().includes(qLower) || 
      r.origin.toLowerCase().includes(qLower) || 
      r.destination.toLowerCase().includes(qLower)
    );
  }

  return res.json({ routes: filtered, total: filtered?.length });
});

// 2. Obtener ruta por ID
app.get('/api/routes/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { data, error } = await supabase.from('routes').select('*').eq('id', id).single();
  
  if (error || !data) return res.status(404).json({ error: 'Ruta no encontrada' });
  return res.json({ route: data, schedules: [] }); // En un futuro puedes crear tabla schedules
});

// 3. Buscar origen-destino
app.get('/api/search', async (req: Request, res: Response) => {
  const from = (req.query.from as string)?.toLowerCase() || '';
  const to = (req.query.to as string)?.toLowerCase() || '';
  
  const { data, error } = await supabase.from('routes').select('*');
  if (error) return res.status(500).json({ error: error.message });

  const results = data.filter(r => {
    const stops = typeof r.stops === 'string' ? JSON.parse(r.stops) : r.stops;
    const stopsArray = Array.isArray(stops) ? stops : [];
    
    const fromMatch = !from || r.origin.toLowerCase().includes(from) || stopsArray.some((s: string) => s.toLowerCase().includes(from));
    const toMatch   = !to   || r.destination.toLowerCase().includes(to) || stopsArray.some((s: string) => s.toLowerCase().includes(to));
    return fromMatch && toMatch;
  });

  return res.json({ results, total: results.length });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Express corriendo en http://localhost:${PORT}`);
});
