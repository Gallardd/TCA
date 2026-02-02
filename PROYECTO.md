# 🏆 Chinchilla Awards - Documentación del Proyecto

## 📋 Descripción General

**Chinchilla Awards** es una aplicación web de votaciones para premios de streamers. Permite a los usuarios votar por sus streamers favoritos en diferentes categorías, así como votar por los mejores clips del año.

La primera edición fue realizada el **14 de diciembre de 2024** y ahora se está preparando una nueva edición.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 18.3.1 | Framework principal de UI |
| **Vite** | 5.4.8 | Build tool y dev server |
| **Supabase** | 2.45.4 | Backend (base de datos y autenticación) |
| **Tailwind CSS** | 3.4.14 | Framework de estilos |
| **Sonner** | 1.5.0 | Sistema de notificaciones/toasts |

---

## 📁 Estructura del Proyecto

```
ChinchillaAwards/
├── public/
│   └── assets/
│       └── participants-pictures/   # Fotos de los participantes
├── src/
│   ├── assets/                      # Assets estáticos
│   ├── components/
│   │   ├── LoginScreen/             # Pantalla de login
│   │   ├── VotingApp/               # Componente principal de votación
│   │   ├── VotingCategoriesSection/ # Sección de votación por categorías
│   │   └── VotingClipsSection/      # Sección de votación de clips
│   ├── data/
│   │   ├── categories.json          # Datos de categorías de streamers
│   │   └── clipsCategories.json     # Datos de categorías de clips
│   ├── App.jsx                      # Componente raíz
│   ├── App.css                      # Estilos globales
│   ├── index.css                    # Estilos base
│   ├── main.jsx                     # Entry point
│   └── supabaseClient.js            # Configuración de Supabase
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── netlify.toml                     # Configuración de deploy en Netlify
```

---

## 🎨 Diseño y Estilos

### Paleta de Colores (Tailwind)
- **Primary**: `#f29e5e` (naranja claro)
- **Secondary**: `#DE680F` (naranja oscuro)
- **Black**: `#171717`
- **White**: `#FAFAFA`
- **Background**: Imagen de fondo (`/assets/web-bg.jpg`)

### Componentes UI
- Cards con efecto glassmorphism (`bg-opacity-50 backdrop-blur-md`)
- Transiciones suaves en hover
- Filtros grayscale para elementos no seleccionados

---

## 🗃️ Estructura de Datos

### Categorías de Streamers (`categories.json`)
```json
{
  "id": 1,
  "name": "Nombre de la categoría",
  "videoUrl": "ID_VIDEO_YOUTUBE",
  "participants": [
    { "id": 1, "name": "NombreStreamer", "image": "NombreStreamer.jpg" }
  ]
}
```

### Categorías de Clips (`clipsCategories.json`)
```json
{
  "id": 1,
  "name": "Nombre de la categoría",
  "videoUrl": "ID_VIDEO_YOUTUBE",
  "participants": [
    { "id": 1, "clipName": "Nombre del clip", "authorName": "Autor" }
  ]
}
```

---

## 🔐 Sistema de Autenticación

### Anterior (v1 - 2024)
- Login con Google OAuth a través de Supabase
- El email del usuario se guardaba junto con los votos
- Cada usuario podía votar una sola vez por sección

### Nuevo Sistema Propuesto (v2 - 2026)

#### Opción 1: OTP por Email (Recomendada)
- Usuario ingresa su email
- Supabase envía un código OTP al email
- Usuario ingresa el código para verificarse
- **Pros**: Sin necesidad de cuenta de Google, más accesible
- **Contras**: Dependencia del email, posible uso de emails temporales

#### Opción 2: OTP por Email + Verificación de dominio
- Igual que la opción 1, pero bloqueando dominios de emails temporales
- Lista negra de dominios como: `tempmail.com`, `guerrillamail.com`, etc.

#### Opción 3: Rate Limiting + Fingerprinting
- Combinar OTP con:
  - Rate limiting por IP
  - Browser fingerprinting
  - Cooldown entre votos

#### Opción 4: Captcha + OTP
- Agregar Google reCAPTCHA o hCaptcha antes del OTP
- Dificulta bots automatizados

---

## 🗄️ Base de Datos (Supabase)

### Tablas Existentes
- `chinchilla-awards-votes-categories` - Votos de categorías
- `chinchilla-awards-votes-clips` - Votos de clips

### Estructura de Votos
```json
{
  "user_email": "email@ejemplo.com",
  "user_votes": [
    { "category": 1, "selectedParticipant": "id_participante" }
  ]
}
```

### Variables de Entorno
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_SECRET_KEY=tu_supabase_anon_key
```

---

## 🚀 Flujo de la Aplicación

```
1. Usuario entra a la web
        ↓
2. Pantalla de Login
        ↓
3. Autenticación (OTP/OAuth)
        ↓
4. Selección de tipo de votación
   ├── Categorías de Streamers
   └── Clips del Año
        ↓
5. Navegación por categorías
   - Ver video de YouTube de la categoría
   - Seleccionar participante
   - Siguiente categoría
        ↓
6. Envío de votos a Supabase
        ↓
7. Confirmación y agradecimiento
```

---

## 📝 TODO - Mejoras para v2 (2026)

### Prioritarias
- [ ] Implementar nuevo sistema de autenticación con OTP
- [ ] Actualizar datos de categorías y participantes
- [ ] Actualizar fecha del evento
- [ ] Revisar y descomentar lógica de votación

### Mejoras de UX
- [ ] Agregar animaciones de transición entre categorías
- [ ] Mejorar responsive para móviles
- [ ] Agregar barra de progreso de votación
- [ ] Mostrar resumen de votos antes de enviar

### Seguridad
- [ ] Implementar rate limiting
- [ ] Bloquear emails temporales
- [ ] Agregar CAPTCHA (opcional)
- [ ] Validar votos en el backend con Row Level Security (RLS)

### Técnicas
- [ ] Migrar a React 19 (opcional)
- [ ] Agregar tests
- [ ] Implementar lazy loading de imágenes
- [ ] Optimizar imágenes de participantes
- [ ] Agregar PWA support

---

## 🔧 Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview

# Linting
pnpm lint
```

---

## 🌐 Deploy

La aplicación está desplegada en **Netlify**:
- URL: `https://thechinchillaawards.netlify.app`
- Configuración en `netlify.toml`

---

## 📌 Notas Adicionales

- Los videos de cada categoría son de YouTube (embeds)
- Las imágenes de participantes están en `/public/assets/participants-pictures/`
- El proyecto usa pnpm como gestor de paquetes
- El código actual tiene mucha lógica comentada de la edición anterior

---

## 🤝 Próximos Pasos

1. **Recibir datos actualizados** de categorías y participantes
2. **Definir sistema de autenticación** final (OTP recomendado)
3. **Actualizar diseño** si es necesario
4. **Descomentar y adaptar** la lógica de votación
5. **Testear** todo el flujo
6. **Desplegar** nueva versión

---

*Última actualización: Enero 2026*
