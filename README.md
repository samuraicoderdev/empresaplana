# Empresa Plana - Website de Transporte

## Descripción del Proyecto
Website moderno y eficiente para **Empresa Plana**, empresa de transporte con más de 60 años de experiencia en Cataluña. Incluye búsqueda de rutas en tiempo real, horarios, gestión de transfers aeropuerto y formulario de contacto.

## URLs
- **Desarrollo local**: http://localhost:3000
- **Plataforma**: Cloudflare Pages (listo para desplegar)

## Páginas Implementadas

| Página | Ruta | Descripción |
|--------|------|-------------|
| Inicio | `/` | Hero, buscador de rutas, tarjetas de líneas, CTA transfer |
| Líneas y Rutas | `/rutas` | Lista completa con filtros y modal de detalle/horarios |
| Horarios | `/horarios` | Selector de línea + tabla de horarios con estado |
| Transfers | `/transfers` | Calculador de precio, formulario de reserva, FAQ |
| Contacto | `/contacto` | Formulario de contacto, información, mapa |

## API Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/routes` | GET | Listar rutas (filtros: `?q=texto&type=linea\|transfer`) |
| `/api/routes/:id` | GET | Detalle de ruta + horarios |
| `/api/search` | GET | Búsqueda origen-destino (`?from=&to=`) |
| `/api/stops` | GET | Lista todas las paradas (para autocompletado) |

## Funcionalidades Clave

### 🔍 Buscador Inteligente
- Autocompletado de paradas en tiempo real
- Búsqueda por origen Y destino simultáneamente
- Rutas populares con un click
- Intercambio rápido origen ↔ destino

### 🗺️ Rutas y Líneas (8 líneas)
- 6 líneas regulares (L1-L6)
- 2 transfers aeropuerto (T1-T2: Barcelona y Reus)
- Filtros por tipo, duración, precio
- Modal con detalle de paradas y horarios

### ⏰ Horarios
- Visualización por línea seleccionada
- Indicador de próximos/pasados en tiempo real
- Horario estimado de llegada calculado automáticamente

### ✈️ Transfers
- Calculador de precio por número de pasajeros
- Reserva Aeropuerto Barcelona (T1/T2) y Reus
- FAQ con acordeón interactivo

## Tecnologías

- **Backend**: Hono (TypeScript) en Cloudflare Workers
- **Frontend**: Tailwind CSS (CDN) + Vanilla JS
- **Build**: Vite + @hono/vite-build
- **Iconos**: Font Awesome 6.4
- **Fuentes**: Google Fonts (Inter)

## Datos de la Empresa

- **Razón Social**: Empresa Plana S.L. (CIF B43009091)
- **Dirección**: C/ Les Creus, 29, 43120 Constantí (Tarragona)
- **Teléfono**: 977 52 82 22
- **Web oficial**: empresaplana.cat
- **Flota**: +550 autocares

## Despliegue

```bash
# Desarrollo
npm run build
pm2 start ecosystem.config.cjs

# Producción (Cloudflare Pages)
npm run build
npx wrangler pages deploy dist --project-name empresa-plana
```

## Estado del Proyecto
- ✅ Website completo con 5 páginas
- ✅ API REST con 4 endpoints
- ✅ Búsqueda en tiempo real con autocompletado
- ✅ Diseño responsivo (mobile-first)
- ✅ Calculador de transfers
- 🔄 Pendiente: Integración mapa real (Leaflet/Google Maps)
- 🔄 Pendiente: PWA / App nativa Android & iOS
- 🔄 Pendiente: Sistema de reservas real con D1 database
- 🔄 Pendiente: Tracking en tiempo real de autobuses
- 🔄 Pendiente: Panel de administración

## Próximos Pasos
1. **Mapa interactivo** con rutas trazadas (Leaflet.js)
2. **PWA** con Service Worker para uso offline
3. **Reservas online** con Cloudflare D1 database
4. **Rastreo GPS** en tiempo real de autobuses
5. **App nativa** Android/iOS con Capacitor.js
