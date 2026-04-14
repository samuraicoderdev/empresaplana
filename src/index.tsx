import { Hono } from 'hono'

const app = new Hono()

// Data: Rutas de Empresa Plana
const routes = [
  {
    id: 1,
    code: 'L1',
    name: 'Barcelona - Tarragona - Salou - PortAventura',
    origin: 'Barcelona',
    destination: 'Salou / PortAventura',
    stops: ['Barcelona (P. Gràcia)', 'Aeropuerto BCN', 'Tarragona', 'La Pineda', 'Salou', 'Cambrils', 'PortAventura'],
    duration: '1h 30min',
    price: '12.50',
    frequency: 'Cada 2h',
    type: 'linea',
    color: '#e63946'
  },
  {
    id: 2,
    code: 'L2',
    name: 'Tarragona - Reus - Cambrils',
    origin: 'Tarragona',
    destination: 'Cambrils',
    stops: ['Tarragona (Est. Central)', 'Reus', 'Salou', 'Cambrils'],
    duration: '45min',
    price: '3.50',
    frequency: 'Cada 30min',
    type: 'linea',
    color: '#2a9d8f'
  },
  {
    id: 3,
    code: 'L3',
    name: 'Reus - Tarragona - Constantí',
    origin: 'Reus',
    destination: 'Constantí',
    stops: ['Reus (Est. Autobusos)', 'Tarragona', 'Constantí'],
    duration: '40min',
    price: '2.80',
    frequency: 'Cada hora',
    type: 'linea',
    color: '#457b9d'
  },
  {
    id: 4,
    code: 'T1',
    name: 'Transfer Aeropuerto Barcelona → Costa Daurada',
    origin: 'Aeropuerto Barcelona (T1/T2)',
    destination: 'Costa Daurada',
    stops: ['Aeroport BCN T1', 'Aeroport BCN T2', 'Tarragona', 'Salou', 'Cambrils', 'PortAventura'],
    duration: '1h 15min',
    price: '18.00',
    frequency: 'Múltiples salidas diarias',
    type: 'transfer',
    color: '#f4a261'
  },
  {
    id: 5,
    code: 'T2',
    name: 'Transfer Aeropuerto Reus → Costa Daurada',
    origin: 'Aeropuerto Reus',
    destination: 'Costa Daurada',
    stops: ['Aeroport Reus', 'Salou', 'Cambrils', 'Tarragona'],
    duration: '30min',
    price: '10.00',
    frequency: 'Según vuelos',
    type: 'transfer',
    color: '#e9c46a'
  },
  {
    id: 6,
    code: 'L4',
    name: 'Valls - Tarragona',
    origin: 'Valls',
    destination: 'Tarragona',
    stops: ['Valls', 'Puigpelat', 'La Masó', 'Tarragona'],
    duration: '50min',
    price: '4.20',
    frequency: 'Cada 2h',
    type: 'linea',
    color: '#6d6875'
  },
  {
    id: 7,
    code: 'L5',
    name: 'Tarragona - Torredembarra - Calafell',
    origin: 'Tarragona',
    destination: 'Calafell',
    stops: ['Tarragona', 'Altafulla', 'Torredembarra', 'Creixell', 'Calafell'],
    duration: '55min',
    price: '5.00',
    frequency: 'Cada hora',
    type: 'linea',
    color: '#52b788'
  },
  {
    id: 8,
    code: 'L6',
    name: 'Tarragona - Mont-roig - Miami Platja',
    origin: 'Tarragona',
    destination: 'Miami Platja',
    stops: ['Tarragona', 'Cambrils', 'Mont-roig del Camp', 'Miami Platja'],
    duration: '1h 05min',
    price: '5.80',
    frequency: 'Cada 2h',
    type: 'linea',
    color: '#48cae4'
  }
]

const schedules: Record<string, { time: string; days: string }[]> = {
  'L1': [
    { time: '07:15', days: 'Lunes-Viernes' },
    { time: '09:40', days: 'Diario' },
    { time: '11:40', days: 'Diario' },
    { time: '13:45', days: 'Diario' },
    { time: '15:30', days: 'Diario' },
    { time: '16:45', days: 'Diario' },
    { time: '18:00', days: 'Diario' },
    { time: '19:15', days: 'Diario' },
    { time: '21:00', days: 'Lunes-Viernes' },
    { time: '22:30', days: 'Lunes-Viernes' },
  ],
  'L2': [
    { time: '06:30', days: 'Diario' },
    { time: '07:00', days: 'Lunes-Viernes' },
    { time: '07:30', days: 'Diario' },
    { time: '08:00', days: 'Diario' },
    { time: '08:30', days: 'Lunes-Viernes' },
    { time: '09:00', days: 'Diario' },
    { time: '10:00', days: 'Diario' },
    { time: '12:00', days: 'Diario' },
    { time: '14:00', days: 'Diario' },
    { time: '16:00', days: 'Diario' },
    { time: '18:00', days: 'Diario' },
    { time: '20:00', days: 'Diario' },
  ],
  'T1': [
    { time: '08:30', days: 'Diario' },
    { time: '11:15', days: 'Diario' },
    { time: '13:45', days: 'Diario' },
    { time: '16:15', days: 'Diario' },
    { time: '19:00', days: 'Diario' },
    { time: '22:00', days: 'Diario' },
  ],
  'T2': [
    { time: '09:00', days: 'Diario' },
    { time: '12:30', days: 'Diario' },
    { time: '15:00', days: 'Diario' },
    { time: '18:30', days: 'Diario' },
    { time: '21:00', days: 'Diario' },
  ]
}

// Favicon
app.get('/favicon.ico', (c) => {
  // Simple red bus SVG favicon
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#d62828"/><text y="24" x="4" font-size="22" font-family="Arial">🚌</text></svg>`
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } })
})

// API Routes
app.get('/api/routes', (c) => {
  const q = c.req.query('q')?.toLowerCase() || ''
  const type = c.req.query('type') || ''
  
  let filtered = routes
  if (q) {
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.origin.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q) ||
      r.stops.some(s => s.toLowerCase().includes(q))
    )
  }
  if (type) {
    filtered = filtered.filter(r => r.type === type)
  }
  return c.json({ routes: filtered, total: filtered.length })
})

app.get('/api/routes/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const route = routes.find(r => r.id === id)
  if (!route) return c.json({ error: 'Ruta no encontrada' }, 404)
  const sched = schedules[route.code] || []
  return c.json({ route, schedules: sched })
})

app.get('/api/search', (c) => {
  const from = c.req.query('from')?.toLowerCase() || ''
  const to = c.req.query('to')?.toLowerCase() || ''
  
  const results = routes.filter(r => {
    const fromMatch = !from || r.origin.toLowerCase().includes(from) || 
      r.stops.some(s => s.toLowerCase().includes(from))
    const toMatch = !to || r.destination.toLowerCase().includes(to) || 
      r.stops.some(s => s.toLowerCase().includes(to))
    return fromMatch && toMatch
  })
  
  return c.json({ results, total: results.length })
})

app.get('/api/stops', (c) => {
  const allStops = new Set<string>()
  routes.forEach(r => {
    allStops.add(r.origin)
    allStops.add(r.destination)
    r.stops.forEach(s => allStops.add(s))
  })
  return c.json({ stops: Array.from(allStops).sort() })
})

// Main HTML page
app.get('/', (c) => {
  return c.html(renderHomePage())
})

app.get('/rutas', (c) => {
  return c.html(renderRoutesPage())
})

app.get('/horarios', (c) => {
  return c.html(renderHorariosPage())
})

app.get('/transfers', (c) => {
  return c.html(renderTransfersPage())
})

app.get('/contacto', (c) => {
  return c.html(renderContactoPage())
})

function getLayout(title: string, content: string, extraHead = '') {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Empresa Plana</title>
  <meta name="description" content="Empresa Plana - Más de 60 años de experiencia en transporte de viajeros en Cataluña. Líneas regulares, transfers aeropuerto, Costa Daurada.">
  <link rel="icon" href="/favicon.ico" type="image/svg+xml">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  ${extraHead}
  <style>
    * { font-family: 'Inter', sans-serif; }
    .plana-red { color: #d62828; }
    .plana-blue { color: #1d3557; }
    .bg-plana-red { background-color: #d62828; }
    .bg-plana-blue { background-color: #1d3557; }
    .bg-plana-light { background-color: #f8f9fa; }
    .gradient-hero { background: linear-gradient(135deg, #1d3557 0%, #457b9d 50%, #a8dadc 100%); }
    .gradient-card { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); }
    .nav-link { transition: all 0.2s; }
    .nav-link:hover { color: #d62828; }
    .route-card { transition: all 0.3s ease; cursor: pointer; }
    .route-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .search-input { transition: all 0.3s; }
    .search-input:focus { transform: scale(1.01); }
    .bus-icon { animation: busMove 3s ease-in-out infinite; }
    @keyframes busMove { 0%,100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
    .fade-in { animation: fadeIn 0.5s ease-in; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .badge-transfer { background: linear-gradient(135deg, #f4a261, #e76f51); }
    .badge-linea { background: linear-gradient(135deg, #457b9d, #1d3557); }
    .scroll-smooth { scroll-behavior: smooth; }
    .hero-pattern { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
    .autocomplete-dropdown { max-height: 200px; overflow-y: auto; z-index: 1000; }
    .stop-item:hover { background-color: #f0f4f8; }
    .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #d62828; }
    .timeline-line { width: 2px; background: #dee2e6; flex: 1; min-height: 20px; }
    @media (max-width: 768px) {
      .hero-title { font-size: 2rem !important; }
      .search-grid { grid-template-columns: 1fr !important; }
    }
  </style>
</head>
<body class="bg-gray-50 scroll-smooth">

  <!-- Navigation -->
  <nav class="bg-plana-blue shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-plana-red rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <i class="fas fa-bus text-white text-lg bus-icon"></i>
          </div>
          <div>
            <span class="text-white font-bold text-xl tracking-tight">Empresa</span>
            <span class="text-red-400 font-bold text-xl"> Plana</span>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-1">
          <a href="/" class="nav-link text-gray-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
            <i class="fas fa-home mr-1"></i> Inicio
          </a>
          <a href="/rutas" class="nav-link text-gray-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
            <i class="fas fa-route mr-1"></i> Líneas
          </a>
          <a href="/horarios" class="nav-link text-gray-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
            <i class="fas fa-clock mr-1"></i> Horarios
          </a>
          <a href="/transfers" class="nav-link text-gray-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
            <i class="fas fa-plane mr-1"></i> Transfers
          </a>
          <a href="/contacto" class="nav-link text-gray-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
            <i class="fas fa-envelope mr-1"></i> Contacto
          </a>
          <a href="/transfers" class="ml-2 bg-plana-red hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 shadow-lg">
            <i class="fas fa-ticket-alt mr-1"></i> Reservar
          </a>
        </div>

        <!-- Mobile menu button -->
        <button id="mobile-menu-btn" class="md:hidden text-white p-2 rounded-lg hover:bg-white/10">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden md:hidden pb-4">
        <a href="/" class="block text-gray-200 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all">
          <i class="fas fa-home mr-2"></i> Inicio
        </a>
        <a href="/rutas" class="block text-gray-200 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all">
          <i class="fas fa-route mr-2"></i> Líneas y Rutas
        </a>
        <a href="/horarios" class="block text-gray-200 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all">
          <i class="fas fa-clock mr-2"></i> Horarios
        </a>
        <a href="/transfers" class="block text-gray-200 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all">
          <i class="fas fa-plane mr-2"></i> Transfers Aeropuerto
        </a>
        <a href="/contacto" class="block text-gray-200 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all">
          <i class="fas fa-envelope mr-2"></i> Contacto
        </a>
        <div class="px-4 pt-2">
          <a href="/transfers" class="block bg-plana-red text-white text-center px-4 py-3 rounded-lg font-semibold">
            <i class="fas fa-ticket-alt mr-2"></i> Reservar Transfer
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Page Content -->
  <main>
    ${content}
  </main>

  <!-- Footer -->
  <footer class="bg-plana-blue text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-plana-red rounded-lg flex items-center justify-center">
              <i class="fas fa-bus text-white"></i>
            </div>
            <div>
              <span class="font-bold text-xl">Empresa</span>
              <span class="text-red-400 font-bold text-xl"> Plana</span>
            </div>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">Más de 60 años de experiencia en el transporte de viajeros en Cataluña. Flota de +550 autocares.</p>
          <div class="flex space-x-3 mt-4">
            <a href="#" class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-plana-red transition-colors">
              <i class="fab fa-facebook text-sm"></i>
            </a>
            <a href="#" class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-plana-red transition-colors">
              <i class="fab fa-twitter text-sm"></i>
            </a>
            <a href="#" class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-plana-red transition-colors">
              <i class="fab fa-instagram text-sm"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 class="font-semibold text-lg mb-4">Servicios</h4>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li><a href="/rutas" class="hover:text-white hover:pl-1 transition-all"><i class="fas fa-angle-right mr-2 text-red-400"></i>Líneas Regulares</a></li>
            <li><a href="/transfers" class="hover:text-white hover:pl-1 transition-all"><i class="fas fa-angle-right mr-2 text-red-400"></i>Transfers Aeropuerto BCN</a></li>
            <li><a href="/transfers" class="hover:text-white hover:pl-1 transition-all"><i class="fas fa-angle-right mr-2 text-red-400"></i>Transfers Aeropuerto Reus</a></li>
            <li><a href="/rutas" class="hover:text-white hover:pl-1 transition-all"><i class="fas fa-angle-right mr-2 text-red-400"></i>Costa Daurada Express</a></li>
            <li><a href="/contacto" class="hover:text-white hover:pl-1 transition-all"><i class="fas fa-angle-right mr-2 text-red-400"></i>Alquiler de Autocares</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-lg mb-4">Destinos</h4>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li><i class="fas fa-map-marker-alt mr-2 text-red-400"></i>Barcelona</li>
            <li><i class="fas fa-map-marker-alt mr-2 text-red-400"></i>Tarragona</li>
            <li><i class="fas fa-map-marker-alt mr-2 text-red-400"></i>Salou &amp; Cambrils</li>
            <li><i class="fas fa-map-marker-alt mr-2 text-red-400"></i>PortAventura</li>
            <li><i class="fas fa-map-marker-alt mr-2 text-red-400"></i>Reus</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-lg mb-4">Contacto</h4>
          <ul class="space-y-3 text-gray-300 text-sm">
            <li class="flex items-start gap-2">
              <i class="fas fa-map-marker-alt mt-1 text-red-400 flex-shrink-0"></i>
              <span>C/ Les Creus, 29<br>43120 Constantí (Tarragona)</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-phone text-red-400"></i>
              <a href="tel:+34977528222" class="hover:text-white">977 52 82 22</a>
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-envelope text-red-400"></i>
              <a href="mailto:info@empresaplana.cat" class="hover:text-white">info@empresaplana.cat</a>
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-globe text-red-400"></i>
              <a href="https://empresaplana.cat" class="hover:text-white">empresaplana.cat</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p>© 2024 Empresa Plana S.L. · CIF B43009091 · Todos los derechos reservados</p>
        <div class="flex space-x-4 mt-2 md:mt-0">
          <a href="#" class="hover:text-white transition-colors">Aviso Legal</a>
          <a href="#" class="hover:text-white transition-colors">Privacidad</a>
          <a href="#" class="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    // Mobile menu toggle
    document.getElementById('mobile-menu-btn').addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    });

    // Highlight active nav link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, #mobile-menu a').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('text-white', 'bg-white/10');
      }
    });
  </script>
</body>
</html>`
}

function renderHomePage(): string {
  const content = `
  <!-- Hero Section -->
  <section class="gradient-hero hero-pattern text-white py-20 md:py-28 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <path d="M0 300 Q300 200 600 300 T1200 300 V400 H0Z" fill="white" opacity="0.3"/>
        <path d="M0 350 Q300 250 600 350 T1200 350 V400 H0Z" fill="white" opacity="0.2"/>
      </svg>
    </div>
    <div class="max-w-7xl mx-auto px-4 relative">
      <div class="max-w-3xl">
        <div class="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6 backdrop-blur-sm">
          <i class="fas fa-star text-yellow-300 mr-2"></i>
          Más de 60 años conectando Cataluña
        </div>
        <h1 class="hero-title text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Tu viaje empieza<br>
          <span class="text-red-300">aquí</span>
        </h1>
        <p class="text-xl text-blue-100 mb-8 leading-relaxed">
          Líneas regulares, transfers a aeropuertos y servicios de transporte por toda la Costa Daurada y el Camp de Tarragona.
        </p>
        
        <!-- Stats -->
        <div class="flex flex-wrap gap-6 mb-10">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-bus text-yellow-300"></i>
            </div>
            <div>
              <div class="font-bold text-xl">+550</div>
              <div class="text-blue-200 text-xs">Autocares</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-route text-green-300"></i>
            </div>
            <div>
              <div class="font-bold text-xl">+30</div>
              <div class="text-blue-200 text-xs">Líneas</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-users text-pink-300"></i>
            </div>
            <div>
              <div class="font-bold text-xl">+2M</div>
              <div class="text-blue-200 text-xs">Viajeros/año</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-map-marker-alt text-orange-300"></i>
            </div>
            <div>
              <div class="font-bold text-xl">+100</div>
              <div class="text-blue-200 text-xs">Paradas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Search Section -->
  <section class="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
    <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
      <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <div class="w-8 h-8 bg-plana-red rounded-lg flex items-center justify-center">
          <i class="fas fa-search text-white text-sm"></i>
        </div>
        Buscar mi ruta
      </h2>
      <div class="grid search-grid gap-4" style="grid-template-columns: 1fr 1fr 1fr auto;">
        <!-- Origen -->
        <div class="relative">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            <i class="fas fa-circle text-green-500 mr-1"></i> Origen
          </label>
          <div class="relative">
            <input 
              type="text" 
              id="search-from" 
              placeholder="Ej: Barcelona, Tarragona..."
              class="search-input w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:border-blue-500 font-medium"
              autocomplete="off"
            >
            <i class="fas fa-map-marker-alt absolute right-3 top-3.5 text-gray-400"></i>
            <div id="from-dropdown" class="autocomplete-dropdown hidden absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-1"></div>
          </div>
        </div>
        <!-- Swap -->
        <div class="flex items-end pb-1">
          <button id="swap-btn" onclick="swapLocations()" class="w-full h-12 bg-gray-100 hover:bg-plana-red hover:text-white rounded-xl flex items-center justify-center transition-all group font-medium text-gray-600">
            <i class="fas fa-exchange-alt mr-2"></i>
            <span class="text-sm hidden md:inline">Intercambiar</span>
          </button>
        </div>
        <!-- Destino -->
        <div class="relative">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            <i class="fas fa-map-pin text-red-500 mr-1"></i> Destino
          </label>
          <div class="relative">
            <input 
              type="text" 
              id="search-to" 
              placeholder="Ej: Salou, Cambrils..."
              class="search-input w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:border-blue-500 font-medium"
              autocomplete="off"
            >
            <i class="fas fa-flag-checkered absolute right-3 top-3.5 text-gray-400"></i>
            <div id="to-dropdown" class="autocomplete-dropdown hidden absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-1"></div>
          </div>
        </div>
        <!-- Search Button -->
        <div class="flex items-end">
          <button onclick="searchRoutes()" class="w-full h-12 bg-plana-red hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg flex items-center justify-center gap-2">
            <i class="fas fa-search"></i>
            <span>Buscar</span>
          </button>
        </div>
      </div>
      <!-- Quick searches -->
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="text-xs text-gray-500 font-medium mr-1 self-center">Rutas populares:</span>
        <button onclick="quickSearch('Barcelona','Salou')" class="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full transition-colors font-medium">
          Barcelona → Salou
        </button>
        <button onclick="quickSearch('Tarragona','Reus')" class="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full transition-colors font-medium">
          Tarragona → Reus
        </button>
        <button onclick="quickSearch('Aeropuerto','Salou')" class="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full transition-colors font-medium">
          <i class="fas fa-plane-arrival mr-1"></i>Aeropuerto → Salou
        </button>
        <button onclick="quickSearch('','PortAventura')" class="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full transition-colors font-medium">
          → PortAventura
        </button>
      </div>
      <!-- Search Results -->
      <div id="search-results" class="mt-6 hidden"></div>
    </div>
  </section>

  <!-- Lines Section -->
  <section class="max-w-7xl mx-auto px-4 mt-16">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Nuestras Líneas</h2>
        <p class="text-gray-500 mt-1">Rutas regulares y transfers disponibles</p>
      </div>
      <a href="/rutas" class="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
        Ver todas <i class="fas fa-arrow-right"></i>
      </a>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
      <button onclick="filterLines('all')" id="tab-all" class="filter-tab flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold bg-plana-blue text-white transition-all">
        Todas
      </button>
      <button onclick="filterLines('linea')" id="tab-linea" class="filter-tab flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
        <i class="fas fa-route mr-1"></i>Líneas Regulares
      </button>
      <button onclick="filterLines('transfer')" id="tab-transfer" class="filter-tab flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
        <i class="fas fa-plane mr-1"></i>Transfers Aeropuerto
      </button>
    </div>

    <div id="routes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Routes loaded by JS -->
    </div>
    <div class="text-center mt-8">
      <a href="/rutas" class="inline-flex items-center gap-2 bg-plana-blue hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">
        Ver todas las líneas <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </section>

  <!-- Services Section -->
  <section class="bg-gray-900 text-white mt-20 py-20">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-3">¿Por qué elegir Empresa Plana?</h2>
        <p class="text-gray-400">La empresa de transporte de referencia en el Camp de Tarragona</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all group">
          <div class="w-14 h-14 bg-plana-red rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i class="fas fa-shield-alt text-white text-2xl"></i>
          </div>
          <h3 class="font-bold text-xl mb-3">Seguridad Total</h3>
          <p class="text-gray-400 leading-relaxed">Flota moderna con los más altos estándares de seguridad y conductores profesionales certificados.</p>
        </div>
        <div class="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all group">
          <div class="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i class="fas fa-clock text-white text-2xl"></i>
          </div>
          <h3 class="font-bold text-xl mb-3">Puntualidad</h3>
          <p class="text-gray-400 leading-relaxed">Más del 97% de nuestros servicios llegan a tiempo. Tu tiempo es lo más valioso.</p>
        </div>
        <div class="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all group">
          <div class="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i class="fas fa-leaf text-white text-2xl"></i>
          </div>
          <h3 class="font-bold text-xl mb-3">Compromiso Verde</h3>
          <p class="text-gray-400 leading-relaxed">Flota con vehículos de bajas emisiones. Cada viaje en bus reduce tu huella de carbono.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Transfer -->
  <section class="max-w-7xl mx-auto px-4 mt-16 mb-8">
    <div class="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
      <div class="absolute right-0 top-0 bottom-0 opacity-20">
        <i class="fas fa-plane text-white" style="font-size: 200px; transform: rotate(-20deg); margin-top: -30px;"></i>
      </div>
      <div class="relative max-w-2xl">
        <div class="inline-flex items-center bg-white/20 rounded-full px-3 py-1 text-sm font-medium mb-4">
          <i class="fas fa-plane-arrival mr-2"></i> Transfer Oficial Aeropuerto
        </div>
        <h2 class="text-3xl font-bold mb-3">Llegas al aeropuerto,<br>nosotros te llevamos a tu destino</h2>
        <p class="text-orange-100 mb-6 text-lg">Transfer directo desde el Aeropuerto de Barcelona y Reus a toda la Costa Daurada. Sin esperas, sin complicaciones.</p>
        <div class="flex flex-wrap gap-3">
          <a href="/transfers" class="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg">
            <i class="fas fa-ticket-alt mr-2"></i>Reservar Transfer
          </a>
          <a href="/horarios" class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/30">
            <i class="fas fa-clock mr-2"></i>Ver Horarios
          </a>
        </div>
      </div>
    </div>
  </section>

  <script>
    let allRoutes = [];
    let allStops = [];
    let currentFilter = 'all';

    // Load routes on page load
    async function loadRoutes(type = '') {
      const url = type && type !== 'all' ? '/api/routes?type=' + type : '/api/routes';
      const res = await fetch(url);
      const data = await res.json();
      allRoutes = data.routes;
      renderRouteCards(allRoutes);
    }

    // Load stops for autocomplete
    async function loadStops() {
      const res = await fetch('/api/stops');
      const data = await res.json();
      allStops = data.stops;
    }

    function renderRouteCards(routes) {
      const grid = document.getElementById('routes-grid');
      if (routes.length === 0) {
        grid.innerHTML = '<div class="col-span-3 text-center py-12 text-gray-500"><i class="fas fa-route text-4xl mb-3 block text-gray-300"></i>No se encontraron rutas</div>';
        return;
      }
      grid.innerHTML = routes.slice(0, 6).map(r => \`
        <div class="route-card fade-in bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100" onclick="window.location='/rutas?id=\${r.id}'">
          <div class="h-2" style="background-color: \${r.color}"></div>
          <div class="p-5">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full text-white \${r.type === 'transfer' ? 'badge-transfer' : 'badge-linea'}">
                \${r.type === 'transfer' ? '<i class="fas fa-plane mr-1"></i>' : '<i class="fas fa-bus mr-1"></i>'}
                \${r.code}
              </span>
              <span class="text-xs text-gray-400 font-medium">\${r.duration}</span>
            </div>
            <h3 class="font-bold text-gray-900 text-sm leading-tight mb-3">\${r.name}</h3>
            <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <i class="fas fa-circle text-green-500 text-xs"></i>
              <span class="font-medium">\${r.origin}</span>
              <i class="fas fa-long-arrow-alt-right text-gray-300"></i>
              <i class="fas fa-map-pin text-red-500 text-xs"></i>
              <span class="font-medium">\${r.destination}</span>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <div class="flex items-center gap-1 text-xs text-gray-500">
                <i class="fas fa-clock text-blue-400"></i>
                <span>\${r.frequency}</span>
              </div>
              <div class="text-right">
                <span class="text-xs text-gray-400">Desde</span>
                <span class="font-bold text-gray-900 ml-1">\${r.price}€</span>
              </div>
            </div>
          </div>
        </div>
      \`).join('');
    }

    function filterLines(type) {
      currentFilter = type;
      document.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('bg-plana-blue', 'text-white');
        t.classList.add('bg-gray-100', 'text-gray-600');
      });
      document.getElementById('tab-' + type).classList.add('bg-plana-blue', 'text-white');
      document.getElementById('tab-' + type).classList.remove('bg-gray-100', 'text-gray-600');
      loadRoutes(type === 'all' ? '' : type);
    }

    // Autocomplete
    function setupAutocomplete(inputId, dropdownId) {
      const input = document.getElementById(inputId);
      const dropdown = document.getElementById(dropdownId);
      
      input.addEventListener('input', function() {
        const val = this.value.toLowerCase();
        if (val.length < 1) { dropdown.classList.add('hidden'); return; }
        const matches = allStops.filter(s => s.toLowerCase().includes(val)).slice(0, 8);
        if (matches.length === 0) { dropdown.classList.add('hidden'); return; }
        dropdown.innerHTML = matches.map(s => \`
          <div class="stop-item px-4 py-2.5 text-sm text-gray-700 cursor-pointer flex items-center gap-2" onclick="selectStop('\${inputId}', '\${dropdownId}', '\${s}')">
            <i class="fas fa-map-marker-alt text-red-400 text-xs"></i> \${s}
          </div>
        \`).join('');
        dropdown.classList.remove('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    }

    function selectStop(inputId, dropdownId, value) {
      document.getElementById(inputId).value = value;
      document.getElementById(dropdownId).classList.add('hidden');
    }

    function swapLocations() {
      const from = document.getElementById('search-from');
      const to = document.getElementById('search-to');
      const temp = from.value;
      from.value = to.value;
      to.value = temp;
    }

    function quickSearch(from, to) {
      document.getElementById('search-from').value = from;
      document.getElementById('search-to').value = to;
      searchRoutes();
    }

    async function searchRoutes() {
      const from = document.getElementById('search-from').value;
      const to = document.getElementById('search-to').value;
      const resultsDiv = document.getElementById('search-results');
      
      if (!from && !to) {
        resultsDiv.innerHTML = '<div class="text-center text-gray-500 py-4"><i class="fas fa-info-circle mr-2"></i>Introduce al menos un origen o destino</div>';
        resultsDiv.classList.remove('hidden');
        return;
      }

      resultsDiv.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin text-blue-500 text-2xl"></i></div>';
      resultsDiv.classList.remove('hidden');

      const params = new URLSearchParams();
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      
      const res = await fetch('/api/search?' + params);
      const data = await res.json();
      
      if (data.results.length === 0) {
        resultsDiv.innerHTML = \`
          <div class="text-center py-6">
            <i class="fas fa-search text-gray-300 text-3xl mb-3 block"></i>
            <p class="text-gray-500">No encontramos rutas directas para tu búsqueda.</p>
            <a href="/rutas" class="text-blue-600 hover:underline text-sm mt-2 inline-block">Ver todas las líneas →</a>
          </div>
        \`;
      } else {
        resultsDiv.innerHTML = \`
          <div class="border-t border-gray-100 pt-4">
            <p class="text-sm font-semibold text-gray-700 mb-3"><i class="fas fa-check-circle text-green-500 mr-2"></i>\${data.results.length} ruta(s) encontrada(s)</p>
            <div class="space-y-3">
              \${data.results.map(r => \`
                <div class="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer" onclick="window.location='/rutas?id=\${r.id}'">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold" style="background-color: \${r.color}">
                      \${r.code}
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900 text-sm">\${r.name}</p>
                      <p class="text-xs text-gray-500">\${r.stops.join(' · ')}</p>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0 ml-4">
                    <p class="font-bold text-gray-900">\${r.price}€</p>
                    <p class="text-xs text-gray-500">\${r.duration}</p>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        \`;
      }
    }

    // Init
    loadRoutes();
    loadStops().then(() => {
      setupAutocomplete('search-from', 'from-dropdown');
      setupAutocomplete('search-to', 'to-dropdown');
    });
  </script>
  `
  return getLayout('Inicio', content)
}

function renderRoutesPage(): string {
  const content = `
  <!-- Header -->
  <div class="bg-plana-blue text-white py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center gap-3 mb-2">
        <a href="/" class="text-blue-300 hover:text-white text-sm transition-colors">Inicio</a>
        <i class="fas fa-chevron-right text-blue-400 text-xs"></i>
        <span class="text-sm">Líneas y Rutas</span>
      </div>
      <h1 class="text-4xl font-bold">Líneas y Rutas</h1>
      <p class="text-blue-200 mt-2">Explora todas nuestras rutas regulares y encuentra la que necesitas</p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Search and filters -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative">
          <input 
            type="text" 
            id="route-search" 
            placeholder="Buscar por nombre, origen, destino o parada..."
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-11 text-gray-800 focus:outline-none focus:border-blue-500"
          >
          <i class="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
        </div>
        <div class="flex gap-2">
          <button onclick="setFilter('all')" id="filter-all" class="route-filter px-5 py-2.5 rounded-xl text-sm font-semibold bg-plana-blue text-white transition-all">Todas</button>
          <button onclick="setFilter('linea')" id="filter-linea" class="route-filter px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">Líneas</button>
          <button onclick="setFilter('transfer')" id="filter-transfer" class="route-filter px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">Transfers</button>
        </div>
      </div>
    </div>

    <!-- Route Detail Modal -->
    <div id="route-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onclick="closeModal(event)">
      <div class="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div id="modal-content" class="p-6"></div>
      </div>
    </div>

    <!-- Routes list -->
    <div id="routes-list" class="space-y-4">
      <!-- Routes loaded by JS -->
      <div class="text-center py-12"><i class="fas fa-spinner fa-spin text-blue-500 text-2xl"></i></div>
    </div>
  </div>

  <script>
    let allRoutes = [];
    let currentFilter = 'all';

    async function loadAllRoutes() {
      const res = await fetch('/api/routes');
      const data = await res.json();
      allRoutes = data.routes;
      renderRoutes(allRoutes);
      
      // Check URL param for direct route
      const urlParams = new URLSearchParams(window.location.search);
      const routeId = urlParams.get('id');
      if (routeId) showRouteDetail(parseInt(routeId));
    }

    function renderRoutes(routes) {
      const list = document.getElementById('routes-list');
      if (routes.length === 0) {
        list.innerHTML = '<div class="text-center py-12 text-gray-500"><i class="fas fa-search text-4xl mb-3 block text-gray-300"></i>No se encontraron rutas</div>';
        return;
      }
      list.innerHTML = routes.map(r => \`
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all fade-in">
          <div class="flex">
            <div class="w-2 flex-shrink-0" style="background-color: \${r.color}"></div>
            <div class="flex-1 p-5">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style="background-color: \${r.color}">
                    \${r.code}
                  </div>
                  <div>
                    <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full text-white mb-1 \${r.type === 'transfer' ? 'badge-transfer' : 'badge-linea'}">
                      \${r.type === 'transfer' ? 'Transfer Aeropuerto' : 'Línea Regular'}
                    </span>
                    <h3 class="font-bold text-gray-900">\${r.name}</h3>
                    <!-- Stops timeline -->
                    <div class="flex items-center gap-1 mt-2 flex-wrap">
                      \${r.stops.map((stop, i) => \`
                        <span class="text-xs text-gray-500\${i === 0 ? ' font-semibold text-green-700' : ''}\${i === r.stops.length-1 ? ' font-semibold text-red-700' : ''}">\${stop}</span>
                        \${i < r.stops.length-1 ? '<i class="fas fa-arrow-right text-gray-300 text-xs"></i>' : ''}
                      \`).join('')}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-4 flex-shrink-0">
                  <div class="text-center">
                    <div class="text-xs text-gray-400">Duración</div>
                    <div class="font-semibold text-gray-700 text-sm">\${r.duration}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xs text-gray-400">Frecuencia</div>
                    <div class="font-semibold text-gray-700 text-sm">\${r.frequency}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xs text-gray-400">Desde</div>
                    <div class="font-bold text-gray-900">\${r.price}€</div>
                  </div>
                  <button onclick="showRouteDetail(\${r.id})" class="bg-plana-blue hover:bg-blue-900 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                    Ver horarios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`).join('');
    }

    function setFilter(type) {
      currentFilter = type;
      document.querySelectorAll('.route-filter').forEach(b => {
        b.classList.remove('bg-plana-blue', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-600');
      });
      document.getElementById('filter-' + type).classList.add('bg-plana-blue', 'text-white');
      document.getElementById('filter-' + type).classList.remove('bg-gray-100', 'text-gray-600');
      applyFilters();
    }

    function applyFilters() {
      const q = document.getElementById('route-search').value.toLowerCase();
      let filtered = allRoutes;
      if (currentFilter !== 'all') filtered = filtered.filter(r => r.type === currentFilter);
      if (q) filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.origin.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q) ||
        r.stops.some(s => s.toLowerCase().includes(q))
      );
      renderRoutes(filtered);
    }

    async function showRouteDetail(id) {
      const modal = document.getElementById('route-modal');
      const content = document.getElementById('modal-content');
      content.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-blue-500 text-2xl"></i></div>';
      modal.classList.remove('hidden');
      
      const res = await fetch('/api/routes/' + id);
      const data = await res.json();
      const r = data.route;
      const schedules = data.schedules;
      
      content.innerHTML = \`
        <div class="flex justify-between items-start mb-6">
          <div>
            <div class="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3" style="background-color: \${r.color}">\${r.code}</div>
            <h2 class="text-xl font-bold text-gray-900">\${r.name}</h2>
            <p class="text-gray-500 text-sm mt-1">\${r.type === 'transfer' ? 'Transfer Aeropuerto' : 'Línea Regular'}</p>
          </div>
          <button onclick="closeModal()" class="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
            <i class="fas fa-times text-gray-600"></i>
          </button>
        </div>
        
        <!-- Route info -->
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div class="bg-gray-50 rounded-xl p-3 text-center">
            <div class="text-xs text-gray-500 mb-1">Duración</div>
            <div class="font-bold text-gray-800">\${r.duration}</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-3 text-center">
            <div class="text-xs text-gray-500 mb-1">Precio</div>
            <div class="font-bold text-gray-800">\${r.price}€</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-3 text-center">
            <div class="text-xs text-gray-500 mb-1">Frecuencia</div>
            <div class="font-bold text-gray-800 text-xs">\${r.frequency}</div>
          </div>
        </div>
        
        <!-- Stops -->
        <div class="mb-6">
          <h3 class="font-semibold text-gray-800 mb-3"><i class="fas fa-map-marked-alt text-blue-500 mr-2"></i>Paradas</h3>
          <div class="space-y-0">
            \${r.stops.map((stop, i) => \`
              <div class="flex items-center gap-3">
                <div class="flex flex-col items-center">
                  <div class="w-3 h-3 rounded-full border-2 \${i === 0 ? 'bg-green-500 border-green-500' : i === r.stops.length-1 ? 'bg-red-500 border-red-500' : 'bg-white border-gray-400'}"></div>
                  \${i < r.stops.length-1 ? '<div class="w-0.5 h-6 bg-gray-200"></div>' : ''}
                </div>
                <span class="text-sm \${i === 0 ? 'font-semibold text-green-700' : i === r.stops.length-1 ? 'font-semibold text-red-700' : 'text-gray-600'} py-1">\${stop}</span>
              </div>
            \`).join('')}
          </div>
        </div>
        
        <!-- Schedules -->
        \${schedules.length > 0 ? \`
          <div>
            <h3 class="font-semibold text-gray-800 mb-3"><i class="fas fa-clock text-orange-500 mr-2"></i>Horarios desde origen</h3>
            <div class="grid grid-cols-2 gap-2">
              \${schedules.map(s => \`
                <div class="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span class="font-bold text-gray-900">\${s.time}</span>
                  <span class="text-xs text-gray-500">\${s.days}</span>
                </div>
              \`).join('')}
            </div>
          </div>
        \` : ''}
        
        <div class="mt-6 pt-4 border-t border-gray-100">
          <a href="\${r.type === 'transfer' ? '/transfers' : '/horarios'}" class="w-full block text-center bg-plana-red hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all">
            \${r.type === 'transfer' ? 'Reservar Transfer' : 'Ver Horarios Completos'}
          </a>
        </div>
      \`;
    }

    function closeModal(event) {
      if (!event || event.target === document.getElementById('route-modal')) {
        document.getElementById('route-modal').classList.add('hidden');
      }
    }

    document.getElementById('route-search').addEventListener('input', applyFilters);
    loadAllRoutes();
  </script>
  `
  return getLayout('Líneas y Rutas', content)
}

function renderHorariosPage(): string {
  const content = `
  <!-- Header -->
  <div class="bg-plana-blue text-white py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center gap-3 mb-2">
        <a href="/" class="text-blue-300 hover:text-white text-sm transition-colors">Inicio</a>
        <i class="fas fa-chevron-right text-blue-400 text-xs"></i>
        <span class="text-sm">Horarios</span>
      </div>
      <h1 class="text-4xl font-bold">Horarios</h1>
      <p class="text-blue-200 mt-2">Consulta los horarios de todas nuestras líneas en tiempo real</p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Route Selector -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 class="text-lg font-bold text-gray-800 mb-4"><i class="fas fa-bus text-blue-500 mr-2"></i>Selecciona una línea</h2>
      <div id="line-selector" class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <!-- Loaded by JS -->
      </div>
    </div>

    <!-- Schedule Display -->
    <div id="schedule-display" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hidden">
      <div id="schedule-content"></div>
    </div>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <i class="fas fa-info-circle text-blue-500 text-2xl mb-3"></i>
        <h3 class="font-bold text-blue-900 mb-2">Horarios de Verano</h3>
        <p class="text-blue-700 text-sm">Del 15 de junio al 15 de septiembre se aplican horarios especiales con más frecuencia en las líneas de la Costa Daurada.</p>
      </div>
      <div class="bg-orange-50 rounded-2xl p-6 border border-orange-100">
        <i class="fas fa-exclamation-triangle text-orange-500 text-2xl mb-3"></i>
        <h3 class="font-bold text-orange-900 mb-2">Festivos</h3>
        <p class="text-orange-700 text-sm">En días festivos puede haber modificaciones en los horarios. Consulta el calendario de festivos antes de tu viaje.</p>
      </div>
      <div class="bg-green-50 rounded-2xl p-6 border border-green-100">
        <i class="fas fa-mobile-alt text-green-500 text-2xl mb-3"></i>
        <h3 class="font-bold text-green-900 mb-2">App Próximamente</h3>
        <p class="text-green-700 text-sm">Pronto podrás consultar horarios en tiempo real y recibir notificaciones de tu bus con nuestra nueva app móvil.</p>
      </div>
    </div>
  </div>

  <script>
    async function loadLineSelector() {
      const res = await fetch('/api/routes');
      const data = await res.json();
      const selector = document.getElementById('line-selector');
      selector.innerHTML = data.routes.map(r => \`
        <button 
          onclick="showSchedule(\${r.id})"
          class="line-btn flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
          id="line-btn-\${r.id}"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style="background-color: \${r.color}">\${r.code}</div>
          <div class="overflow-hidden">
            <div class="font-semibold text-gray-800 text-xs truncate">\${r.origin} → \${r.destination}</div>
            <div class="text-xs text-gray-400">\${r.duration}</div>
          </div>
        </button>
      \`).join('');
    }

    async function showSchedule(id) {
      // Highlight selected
      document.querySelectorAll('.line-btn').forEach(b => {
        b.classList.remove('border-blue-500', 'bg-blue-50');
      });
      document.getElementById('line-btn-' + id).classList.add('border-blue-500', 'bg-blue-50');

      const res = await fetch('/api/routes/' + id);
      const data = await res.json();
      const r = data.route;
      const schedules = data.schedules;
      
      const display = document.getElementById('schedule-display');
      const content = document.getElementById('schedule-content');
      display.classList.remove('hidden');
      
      content.innerHTML = \`
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold" style="background-color: \${r.color}">\${r.code}</div>
            <div>
              <h2 class="text-xl font-bold text-gray-900">\${r.name}</h2>
              <p class="text-gray-500 text-sm">\${r.frequency} · \${r.duration}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-400">Precio</div>
            <div class="text-2xl font-bold text-gray-900">\${r.price}€</div>
          </div>
        </div>

        <!-- Stops visual -->
        <div class="bg-gray-50 rounded-xl p-4 mb-6">
          <div class="flex items-center gap-2 flex-wrap">
            \${r.stops.map((stop, i) => \`
              <div class="flex items-center gap-1">
                <div class="flex flex-col items-center">
                  <div class="w-2.5 h-2.5 rounded-full \${i === 0 ? 'bg-green-500' : i === r.stops.length-1 ? 'bg-red-500' : 'bg-gray-400'}"></div>
                </div>
                <span class="text-sm font-medium \${i === 0 ? 'text-green-700' : i === r.stops.length-1 ? 'text-red-700' : 'text-gray-600'}">\${stop}</span>
                \${i < r.stops.length - 1 ? '<i class="fas fa-chevron-right text-gray-300 text-xs"></i>' : ''}
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Schedule table -->
        \${schedules.length > 0 ? \`
          <h3 class="font-semibold text-gray-800 mb-4"><i class="fas fa-clock text-orange-500 mr-2"></i>Horarios de Salida desde \${r.origin}</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 rounded-xl">
                  <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase rounded-l-xl">Hora Salida</th>
                  <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Días</th>
                  <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Llegada Est.</th>
                  <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase rounded-r-xl">Estado</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                \${schedules.map(s => {
                  const [h, m] = s.time.split(':').map(Number);
                  const arrival = new Date(0, 0, 0, h, m + parseInt(r.duration));
                  const arrivalStr = arrival.getHours().toString().padStart(2,'0') + ':' + arrival.getMinutes().toString().padStart(2,'0');
                  const now = new Date();
                  const currentMins = now.getHours() * 60 + now.getMinutes();
                  const departureMins = h * 60 + m;
                  const status = departureMins > currentMins ? 'Próximo' : 'Pasado';
                  return \`
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-4 py-3">
                        <span class="text-lg font-bold text-gray-900">\${s.time}</span>
                      </td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-600">\${s.days}</span>
                      </td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-600">\${arrivalStr} aprox.</span>
                      </td>
                      <td class="px-4 py-3 text-right">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full \${status === 'Próximo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                          \${status}
                        </span>
                      </td>
                    </tr>
                  \`;
                }).join('')}
              </tbody>
            </table>
          </div>
        \` : '<div class="text-center py-8 text-gray-500"><i class="fas fa-clock text-gray-300 text-3xl mb-3 block"></i>Horarios no disponibles para esta línea. Contacta con nosotros.</div>'}
      \`;
      display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    loadLineSelector();
  </script>
  `
  return getLayout('Horarios', content)
}

function renderTransfersPage(): string {
  const content = `
  <!-- Header -->
  <div class="bg-gradient-to-r from-orange-600 to-red-700 text-white py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center gap-3 mb-2">
        <a href="/" class="text-orange-200 hover:text-white text-sm transition-colors">Inicio</a>
        <i class="fas fa-chevron-right text-orange-300 text-xs"></i>
        <span class="text-sm">Transfers Aeropuerto</span>
      </div>
      <h1 class="text-4xl font-bold">Transfers Aeropuerto</h1>
      <p class="text-orange-100 mt-2">Transporte oficial de los aeropuertos de Barcelona y Reus a la Costa Daurada</p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Reservation Form -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
      <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <i class="fas fa-ticket-alt text-orange-500"></i> Reservar Transfer
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo de servicio</label>
          <div class="grid grid-cols-2 gap-3">
            <button id="type-arrival" onclick="setTransferType('arrival')" class="transfer-type-btn flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-500 bg-blue-50 transition-all">
              <i class="fas fa-plane-arrival text-blue-600 text-2xl"></i>
              <span class="text-sm font-semibold text-blue-800">Llegada</span>
            </button>
            <button id="type-departure" onclick="setTransferType('departure')" class="transfer-type-btn flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all">
              <i class="fas fa-plane-departure text-gray-500 text-2xl"></i>
              <span class="text-sm font-semibold text-gray-600">Salida</span>
            </button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Aeropuerto</label>
          <select class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500">
            <option>Aeropuerto de Barcelona (BCN)</option>
            <option>Aeropuerto de Reus (REU)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Destino / Hotel</label>
          <select class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500">
            <option>Salou</option>
            <option>Cambrils</option>
            <option>Tarragona</option>
            <option>La Pineda</option>
            <option>PortAventura</option>
            <option>Miami Platja</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha de viaje</label>
          <input type="date" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500" min="${new Date().toISOString().split('T')[0]}">
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Pasajeros</label>
          <div class="flex items-center gap-3">
            <button onclick="changePassengers(-1)" class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl transition-colors">−</button>
            <span id="passenger-count" class="text-2xl font-bold text-gray-900 w-12 text-center">2</span>
            <button onclick="changePassengers(1)" class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl transition-colors">+</button>
            <span class="text-sm text-gray-500">personas</span>
          </div>
        </div>
        <div class="flex items-end">
          <button onclick="calculateTransfer()" class="w-full bg-plana-red hover:bg-red-700 text-white py-3 rounded-xl font-bold text-lg transition-all hover:shadow-lg">
            <i class="fas fa-calculator mr-2"></i>Calcular Precio
          </button>
        </div>
      </div>
      <div id="transfer-result" class="mt-6 hidden"></div>
    </div>

    <!-- Transfer Routes -->
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Rutas de Transfer Disponibles</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <!-- BCN Airport -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-white">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-plane-arrival text-3xl"></i>
            <div>
              <h3 class="font-bold text-lg">Aeropuerto Barcelona (BCN)</h3>
              <p class="text-blue-200 text-sm">T1 y T2 · Salidas diarias</p>
            </div>
          </div>
        </div>
        <div class="p-5">
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2">
              <i class="fas fa-map-marker-alt text-red-500 w-4"></i>
              <span class="text-sm text-gray-600">Tarragona · La Pineda · Salou · Cambrils · PortAventura</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-clock text-orange-500 w-4"></i>
              <span class="text-sm text-gray-600">Duración: 1h 15min - 1h 45min</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-euro-sign text-green-500 w-4"></i>
              <span class="text-sm text-gray-600">Desde 18€ / persona</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-4">
            <p class="text-xs font-semibold text-gray-500 mb-3">PRÓXIMAS SALIDAS HOY</p>
            <div class="grid grid-cols-3 gap-2">
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">08:30</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">11:15</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">13:45</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">16:15</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">19:00</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">22:00</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reus Airport -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
        <div class="bg-gradient-to-r from-orange-500 to-orange-700 p-5 text-white">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-plane text-3xl"></i>
            <div>
              <h3 class="font-bold text-lg">Aeropuerto de Reus (REU)</h3>
              <p class="text-orange-100 text-sm">Salidas según vuelos</p>
            </div>
          </div>
        </div>
        <div class="p-5">
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2">
              <i class="fas fa-map-marker-alt text-red-500 w-4"></i>
              <span class="text-sm text-gray-600">Salou · Cambrils · Tarragona · PortAventura</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-clock text-orange-500 w-4"></i>
              <span class="text-sm text-gray-600">Duración: 25min - 45min</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-euro-sign text-green-500 w-4"></i>
              <span class="text-sm text-gray-600">Desde 10€ / persona</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-4">
            <p class="text-xs font-semibold text-gray-500 mb-3">PRÓXIMAS SALIDAS HOY</p>
            <div class="grid grid-cols-3 gap-2">
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">09:00</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">12:30</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">15:00</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">18:30</span></div>
              <div class="bg-gray-50 rounded-lg p-2 text-center"><span class="text-sm font-bold">21:00</span></div>
              <div class="bg-orange-50 rounded-lg p-2 text-center border border-orange-200"><span class="text-sm font-bold text-orange-700">+info</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-6"><i class="fas fa-question-circle text-blue-500 mr-2"></i>Preguntas Frecuentes</h2>
      <div class="space-y-4" id="faq">
        <div class="faq-item border-b border-gray-100 pb-4">
          <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(0)">
            <span class="font-semibold text-gray-800">¿Puedo reservar el transfer online?</span>
            <i class="fas fa-plus text-gray-400 faq-icon"></i>
          </button>
          <p class="faq-answer hidden mt-2 text-gray-600 text-sm">Sí, puedes reservar a través de nuestra web busplana.com, por teléfono o en los puntos de venta en los aeropuertos. La reserva online está disponible hasta 2 horas antes de la salida.</p>
        </div>
        <div class="faq-item border-b border-gray-100 pb-4">
          <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(1)">
            <span class="font-semibold text-gray-800">¿Qué pasa si mi vuelo se retrasa?</span>
            <i class="fas fa-plus text-gray-400 faq-icon"></i>
          </button>
          <p class="faq-answer hidden mt-2 text-gray-600 text-sm">Monitorizamos los vuelos en tiempo real. Si tu vuelo se retrasa, te asignamos automáticamente al siguiente servicio disponible sin coste adicional. Solo debes tener tu billete.</p>
        </div>
        <div class="faq-item border-b border-gray-100 pb-4">
          <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(2)">
            <span class="font-semibold text-gray-800">¿Se permite equipaje de mano y maletas?</span>
            <i class="fas fa-plus text-gray-400 faq-icon"></i>
          </button>
          <p class="faq-answer hidden mt-2 text-gray-600 text-sm">Sí, cada pasajero puede llevar 1 maleta grande y 1 equipaje de mano sin cargo adicional. Equipaje extra puede tener coste adicional. Prohibidos objetos peligrosos.</p>
        </div>
        <div class="faq-item">
          <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(3)">
            <span class="font-semibold text-gray-800">¿Dónde espero el transfer en el aeropuerto?</span>
            <i class="fas fa-plus text-gray-400 faq-icon"></i>
          </button>
          <p class="faq-answer hidden mt-2 text-gray-600 text-sm">En Barcelona T1: zona de llegadas, señalización Empresa Plana / BusPlana. T2: salida B y C. En Reus: exterior de la terminal principal. Nuestro personal estará identificado.</p>
        </div>
      </div>
    </div>
  </div>

  <script>
    let passengers = 2;
    let transferType = 'arrival';

    function setTransferType(type) {
      transferType = type;
      document.querySelectorAll('.transfer-type-btn').forEach(b => {
        b.classList.remove('border-blue-500', 'bg-blue-50', 'border-orange-500', 'bg-orange-50');
        b.classList.add('border-gray-200');
      });
      document.getElementById('type-' + type).classList.add(type === 'arrival' ? 'border-blue-500' : 'border-orange-500', type === 'arrival' ? 'bg-blue-50' : 'bg-orange-50');
    }

    function changePassengers(delta) {
      passengers = Math.max(1, Math.min(50, passengers + delta));
      document.getElementById('passenger-count').textContent = passengers;
    }

    function calculateTransfer() {
      const result = document.getElementById('transfer-result');
      const airport = document.querySelector('select').value;
      const basePrice = airport.includes('Barcelona') ? 18 : 10;
      const total = (basePrice * passengers).toFixed(2);
      
      result.innerHTML = \`
        <div class="bg-green-50 border border-green-200 rounded-xl p-5 fade-in">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <i class="fas fa-check text-white text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold text-green-900">Precio calculado</h3>
              <p class="text-green-700 text-sm">\${passengers} pasajero(s) · \${airport}</p>
            </div>
          </div>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-sm text-green-700">Precio por persona: \${basePrice}€</p>
              <p class="text-3xl font-bold text-green-900">Total: \${total}€</p>
            </div>
            <button class="bg-plana-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg">
              <i class="fas fa-shopping-cart mr-2"></i>Reservar Ahora
            </button>
          </div>
        </div>
      \`;
      result.classList.remove('hidden');
    }

    function toggleFaq(index) {
      const items = document.querySelectorAll('.faq-item');
      const answer = items[index].querySelector('.faq-answer');
      const icon = items[index].querySelector('.faq-icon');
      answer.classList.toggle('hidden');
      icon.classList.toggle('fa-plus');
      icon.classList.toggle('fa-minus');
    }
  </script>
  `
  return getLayout('Transfers Aeropuerto', content)
}

function renderContactoPage(): string {
  const content = `
  <!-- Header -->
  <div class="bg-plana-blue text-white py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center gap-3 mb-2">
        <a href="/" class="text-blue-300 hover:text-white text-sm transition-colors">Inicio</a>
        <i class="fas fa-chevron-right text-blue-400 text-xs"></i>
        <span class="text-sm">Contacto</span>
      </div>
      <h1 class="text-4xl font-bold">Contacto</h1>
      <p class="text-blue-200 mt-2">Estamos aquí para ayudarte. Contacta con nuestro equipo.</p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 class="text-xl font-bold text-gray-800 mb-6"><i class="fas fa-paper-plane text-blue-500 mr-2"></i>Envíanos un mensaje</h2>
          <form id="contact-form" onsubmit="submitForm(event)">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                <input type="text" required placeholder="Tu nombre" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" required placeholder="tu@email.com" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                <input type="tel" placeholder="+34 XXX XXX XXX" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Asunto</label>
                <select class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors">
                  <option>Información sobre rutas</option>
                  <option>Reserva de transfer</option>
                  <option>Alquiler de autocar</option>
                  <option>Reclamación</option>
                  <option>Objetos perdidos</option>
                  <option>Otros</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <textarea required rows="5" placeholder="¿En qué podemos ayudarte?" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
              </div>
            </div>
            <div class="mt-5 flex items-center gap-3">
              <input type="checkbox" required id="privacy" class="rounded">
              <label for="privacy" class="text-sm text-gray-600">Acepto la <a href="#" class="text-blue-600 hover:underline">política de privacidad</a></label>
            </div>
            <button type="submit" class="mt-5 w-full md:w-auto bg-plana-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg">
              <i class="fas fa-paper-plane mr-2"></i>Enviar mensaje
            </button>
          </form>
          <div id="form-success" class="hidden mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 font-medium">
            <i class="fas fa-check-circle text-green-500 mr-2"></i>¡Mensaje enviado! Te responderemos en menos de 24h.
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="space-y-5">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-bold text-gray-800 mb-4">Información de Contacto</h3>
          <div class="space-y-4">
            <div class="flex gap-3">
              <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-map-marker-alt text-blue-600"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-800 text-sm">Sede Central</p>
                <p class="text-gray-600 text-sm">C/ Les Creus, 29<br>43120 Constantí (Tarragona)</p>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-phone text-green-600"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-800 text-sm">Teléfono</p>
                <a href="tel:+34977528222" class="text-blue-600 hover:underline text-sm font-medium">977 52 82 22</a>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-envelope text-orange-600"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-800 text-sm">Email</p>
                <a href="mailto:info@empresaplana.cat" class="text-blue-600 hover:underline text-sm">info@empresaplana.cat</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Office Hours -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-bold text-gray-800 mb-4"><i class="fas fa-clock text-orange-500 mr-2"></i>Horario Atención</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Lunes - Viernes</span>
              <span class="font-semibold text-gray-800">8:00 - 20:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Sábados</span>
              <span class="font-semibold text-gray-800">9:00 - 14:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Domingos</span>
              <span class="font-semibold text-red-500">Cerrado</span>
            </div>
          </div>
          <div class="mt-4 bg-yellow-50 rounded-xl p-3 border border-yellow-200">
            <p class="text-xs text-yellow-800"><i class="fas fa-info-circle mr-1"></i>Para emergencias y servicios de transfer, hay atención 24h en el aeropuerto.</p>
          </div>
        </div>

        <!-- Emergency -->
        <div class="bg-plana-red rounded-2xl p-6 text-white">
          <h3 class="font-bold text-lg mb-2"><i class="fas fa-headset mr-2"></i>Línea de Emergencias</h3>
          <p class="text-red-100 text-sm mb-3">Para incidencias urgentes durante tu viaje:</p>
          <a href="tel:+34977528222" class="block bg-white text-plana-red font-bold py-2.5 rounded-xl text-center hover:bg-red-50 transition-colors">
            977 52 82 22
          </a>
        </div>
      </div>
    </div>

    <!-- Map placeholder -->
    <div class="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gray-100 p-4 flex justify-between items-center">
        <h3 class="font-bold text-gray-800"><i class="fas fa-map text-blue-500 mr-2"></i>Cómo llegar - Sede Central Constantí</h3>
        <a href="https://maps.google.com/?q=C+Les+Creus+29+Constan%C3%AD+Tarragona" target="_blank" class="text-blue-600 hover:underline text-sm font-medium">
          <i class="fas fa-external-link-alt mr-1"></i>Abrir en Google Maps
        </a>
      </div>
      <div class="bg-blue-50 p-16 flex items-center justify-center">
        <div class="text-center">
          <i class="fas fa-map-marker-alt text-5xl text-plana-red mb-4"></i>
          <p class="font-semibold text-gray-700">C/ Les Creus, 29 · Constantí (Tarragona)</p>
          <p class="text-gray-500 text-sm mt-1">43120 Tarragona, Catalunya, España</p>
          <a href="https://maps.google.com/?q=Constan%C3%AD+Tarragona+España" target="_blank" class="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            <i class="fas fa-directions mr-2"></i>Ver direcciones
          </a>
        </div>
      </div>
    </div>
  </div>

  <script>
    function submitForm(e) {
      e.preventDefault();
      const btn = e.target.querySelector('button[type=submit]');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        document.getElementById('contact-form').style.opacity = '0.5';
        document.getElementById('form-success').classList.remove('hidden');
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>Enviado';
      }, 1500);
    }
  </script>
  `
  return getLayout('Contacto', content)
}

export default app
