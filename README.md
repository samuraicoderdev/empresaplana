🚀 Proyecto Fullstack Completo: Empresa PlanaAquí tienes todo el código fuente preparado para copiar y pegar en tu PC local. Esta es la arquitectura completa basada en Astro + Bun + TailwindCSS para el frontend, Node.js + Express para la API, y Supabase (PostgreSQL) como base de datos.PASO 1: Base de Datos (Supabase)Crea un nuevo proyecto en Supabase.Ve a la sección SQL Editor, crea una nueva consulta y pega este código para crear tu tabla e insertar los datos iniciales que tenías:-- 1. Crear tabla de rutas
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL,
  name TEXT NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  stops JSONB NOT NULL,
  duration VARCHAR(50),
  price DECIMAL(10,2),
  frequency VARCHAR(100),
  type VARCHAR(20),
  color VARCHAR(20)
);

-- 2. Insertar todos tus datos iniciales
INSERT INTO routes (code, name, origin, destination, stops, duration, price, frequency, type, color) VALUES
('L1', 'Barcelona - Tarragona - Salou - PortAventura', 'Barcelona', 'Salou / PortAventura', '["Barcelona (P. Gràcia)", "Aeropuerto BCN", "Tarragona", "La Pineda", "Salou", "Cambrils", "PortAventura"]', '1h 30min', 12.50, 'Cada 2h', 'linea', '#e63946'),
('L2', 'Tarragona - Reus - Cambrils', 'Tarragona', 'Cambrils', '["Tarragona (Est. Central)", "Reus", "Salou", "Cambrils"]', '45min', 3.50, 'Cada 30min', 'linea', '#2a9d8f'),
('L3', 'Reus - Tarragona - Constantí', 'Reus', 'Constantí', '["Reus (Est. Autobusos)", "Tarragona", "Constantí"]', '40min', 2.80, 'Cada hora', 'linea', '#457b9d'),
('T1', 'Transfer Aeropuerto Barcelona → Costa Daurada', 'Aeropuerto Barcelona (T1/T2)', 'Costa Daurada', '["Aeroport BCN T1", "Aeroport BCN T2", "Tarragona", "Salou", "Cambrils", "PortAventura"]', '1h 15min', 18.00, 'Múltiples salidas diarias', 'transfer', '#f4a261'),
('T2', 'Transfer Aeropuerto Reus → Costa Daurada', 'Aeropuerto Reus', 'Costa Daurada', '["Aeroport Reus", "Salou", "Cambrils", "Tarragona"]', '30min', 10.00, 'Según vuelos', 'transfer', '#e9c46a'),
('L4', 'Valls - Tarragona', 'Valls', 'Tarragona', '["Valls", "Puigpelat", "La Masó", "Tarragona"]', '50min', 4.20, 'Cada 2h', 'linea', '#6d6875'),
('L5', 'Tarragona - Torredembarra - Calafell', 'Tarragona', 'Calafell', '["Tarragona", "Altafulla", "Torredembarra", "Creixell", "Calafell"]', '55min', 5.00, 'Cada hora', 'linea', '#52b788'),
('L6', 'Tarragona - Mont-roig - Miami Platja', 'Tarragona', 'Miami Platja', '["Tarragona", "Cambrils", "Mont-roig del Camp", "Miami Platja"]', '1h 05min', 5.80, 'Cada 2h', 'linea', '#48cae4');
PASO 2: Backend (Express + Supabase)En tu terminal, crea la carpeta del backend y configura el proyecto:mkdir backend && cd backend
bun init -y
bun add express cors @supabase/supabase-js dotenv
bun add -d @types/express @types/cors typescript ts-node nodemon
1. backend/package.json (Reemplaza el contenido por este){
  "name": "backend",
  "module": "index.ts",
  "type": "module",
  "scripts": {
    "dev": "nodemon --exec bun run index.ts",
    "start": "bun run index.ts"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.42.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "nodemon": "^3.1.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
}
2. backend/.envCrea este archivo e introduce tus claves de Supabase (las encuentras en Settings > API en tu panel de Supabase).PORT=4000
SUPABASE_URL=https://TU_PROYECTO.supabase.co
SUPABASE_KEY=TU_ANON_KEY_AQUI
3. backend/index.tsEste es el servidor completo con todos los endpoints que usabas en Hono, pero ahora conectados a Supabase.import express, { Request, Response } from 'express';
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
PASO 3: Frontend (Astro + Tailwind)Abre una nueva terminal en la raíz de tu proyecto (fuera de backend) e inicializa Astro:bun create astro@latest frontend
# - Directorio: frontend
# - Template: Empty
# - Install dependencies: Yes (with bun)
# - TypeScript: Strict

cd frontend
bunx astro add tailwind
# Dile "Yes" a todo para que configure Tailwind automáticamente.
1. frontend/src/layouts/Layout.astroCrea este archivo (la carpeta layouts la debes crear dentro de src). Contiene los estilos base, Navbar y Footer.---
interface Props {
	title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<title>{title} - Empresa Plana</title>
		<link href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)" rel="stylesheet">
		<link href="[https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap)" rel="stylesheet">
	</head>
	<body>
		<!-- NAV -->
		<nav class="nav-glass shadow-lg sticky top-0 z-50">
		  <div class="max-w-7xl mx-auto px-4">
		    <div class="flex justify-between items-center h-16">
		      <a href="/" class="flex items-center gap-3 group flex-shrink-0">
		        <div class="w-10 h-10 bg-plana-red rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
		          <i class="fas fa-bus text-white text-lg bus-icon"></i>
		        </div>
		        <div class="leading-tight">
		          <span class="text-white font-bold text-xl tracking-tight">Empresa</span>
		          <span class="text-red-400 font-bold text-xl"> Plana</span>
		        </div>
		      </a>
		      <div class="hidden lg:flex items-center gap-1">
		        <a href="/" class="text-gray-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 text-sm font-medium"><i class="fas fa-home mr-1"></i>Inicio</a>
		        <a href="/rutas" class="text-gray-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 text-sm font-medium"><i class="fas fa-route mr-1"></i>Líneas</a>
		      </div>
		      <div class="flex items-center gap-2">
		        <a href="/transfers" class="hidden lg:inline-flex items-center gap-1 bg-plana-red hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
		          <i class="fas fa-ticket-alt"></i>Reservar
		        </a>
		      </div>
		    </div>
		  </div>
		</nav>

		<main>
			<slot />
		</main>

        <footer class="footer-bg text-white mt-16 py-12 text-center text-sm">
            <p>© 2026 Empresa Plana. Todos los derechos reservados.</p>
        </footer>
	</body>
</html>

<style is:global>
  * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
  :root{
    --red:#d62828; --blue:#1d3557; --blue2:#457b9d;
    --bg:#eef2f7; --surface:#ffffff; --border:#e5e7eb;
    --text:#111827; --muted:#6b7280; --subtle:#f3f4f6;
    --glass-bg: rgba(255,255,255,0.55);
    --glass-border: rgba(255,255,255,0.35);
    --glass-blur: blur(18px) saturate(180%);
  }
  body{ background: var(--bg); color: var(--text); min-height: 100vh; }
  body::before{
    content:''; position: fixed; inset: 0; z-index: -1;
    background: radial-gradient(ellipse 80% 60% at 10% 20%, rgba(29,53,87,.18) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 90% 80%, rgba(69,123,157,.15) 0%, transparent 60%),
                radial-gradient(ellipse 50% 40% at 50% 50%, rgba(214,40,40,.07) 0%, transparent 60%);
    pointer-events: none;
  }
  .nav-glass{
    background: rgba(29,53,87,0.72) !important;
    backdrop-filter: blur(20px) saturate(180%) !important;
    border-bottom: 1px solid rgba(255,255,255,0.10);
  }
  .bg-plana-blue{ background-color:var(--blue); }
  .bg-plana-red { background-color:var(--red);  }
  .hero-section{ background: linear-gradient(135deg, #0d2137 0%, #1d3557 40%, #2d6a8f 70%, #3a8ab5 100%) !important; }
  .footer-bg{ background: rgba(29,53,87,0.85); backdrop-filter: blur(20px) saturate(160%); }
  .surface{ background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: 1px solid var(--glass-border); }
  .bus-icon { animation: busMove 3s ease-in-out infinite; }
  @keyframes busMove { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
</style>
2. frontend/src/pages/index.astroPágina de inicio con Server-Side Rendering consumiendo nuestra API Express. Reemplaza el archivo existente.---
import Layout from '../layouts/Layout.astro';

// FETCH SSR a tu backend Express
let routes = [];
try {
  const res = await fetch('http://localhost:4000/api/routes');
  const data = await res.json();
  routes = data.routes || [];
} catch (e) {
  console.error("Error conectando al backend. Asegúrate de que Express esté corriendo.", e);
}
---

<Layout title="Inicio">
    <!-- HERO -->
	<section class="hero-section text-white py-24 md:py-32 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Tu viaje empieza <br><span class="text-red-400">aquí</span>
            </h1>
            <p class="text-lg md:text-xl mb-10 leading-relaxed max-w-2xl text-blue-200">
                Líneas regulares, transfers a aeropuertos y servicios de transporte por toda la Costa Daurada conectadas a tu Base de Datos Supabase.
            </p>
            <div class="flex gap-4">
                <a href="/rutas" class="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition">Ver Líneas</a>
            </div>
        </div>
	</section>

    <!-- RUTAS CARGADAS DEL BACKEND -->
    <section class="max-w-7xl mx-auto px-4 mt-12 mb-20">
        <h2 class="text-3xl font-bold text-slate-800 mb-2">Nuestras Líneas Activas</h2>
        <p class="text-slate-500 mb-8">Información extraída de PostgreSQL (Supabase) a través de Express.js</p>
        
        {routes.length === 0 ? (
            <div class="bg-red-50 text-red-500 p-6 rounded-xl border border-red-200 text-center">
                <i class="fas fa-exclamation-triangle text-3xl mb-2 block"></i>
                <p>No se han podido cargar las rutas. Revisa que el backend (Express) esté corriendo en el puerto 4000.</p>
            </div>
        ) : (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.slice(0,6).map((route: any) => (
                    <div class="surface rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden border">
                        <div class="h-2" style={`background:${route.color}`}></div>
                        <div class="p-5">
                            <div class="flex justify-between items-start mb-3">
                                <span class={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${route.type === 'transfer' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                                    {route.code}
                                </span>
                                <span class="text-xs text-gray-500 font-medium">{route.duration}</span>
                            </div>
                            <h3 class="font-bold text-sm leading-tight mb-3 text-slate-900">{route.name}</h3>
                            <div class="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                <i class="fas fa-circle text-green-500"></i>
                                <span class="font-medium">{route.origin}</span>
                                <i class="fas fa-arrow-right opacity-40"></i>
                                <span class="font-medium">{route.destination}</span>
                            </div>
                            <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div class="text-xs text-slate-500"><i class="fas fa-clock text-blue-400 mr-1"></i>{route.frequency}</div>
                                <div class="text-right">
                                    <span class="text-xs text-slate-500">Desde</span>
                                    <span class="font-bold ml-1 text-slate-900">{route.price}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </section>
</Layout>

# PASO 4: ¡A Correr el Proyecto!Abre la terminal del Backend (/backend)bun run dev
Deberías ver: 🚀 Backend Express corriendo en http://localhost:4000Abre otra terminal del Frontend (/frontend)bun run dev
Te dará una URL local (generalmente http://localhost:4321).¡Abre esa URL en tu navegador y verás tu web súper rápida alimentándose de tu propia base de datos Supabase a través de tu nueva API de Node.js!

