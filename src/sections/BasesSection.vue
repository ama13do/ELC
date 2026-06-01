<template>
  <section class="why-section" ref="sectionRef">

    <!-- Stickers esquina superior derecha encimados -->
    <div class="stickers-wrapper">
      <img src="../assets/images/Rayo.png" alt="" class="sticker sticker-rayo" />
      <img src="../assets/images/Creatividad.png" alt="" class="sticker sticker-creatividad" />
    </div>

    <!-- Imagen lateral izquierda -->
    <img src="../assets/images/why1.png" alt="" class="why-side-img" />

    <!-- Contenido -->
    <div class="why-inner">
      <h2 class="why-title">¿Por qué participar<br />en la ELC?</h2>

      <ul class="why-list">
        <li v-for="reason in reasons" :key="reason.id" class="why-item">
          <span class="why-dot" :style="{ backgroundColor: reason.color }" />
          <p class="why-text">
            <strong>{{ reason.lead }}</strong>
            {{ reason.body }}
          </p>
        </li>
      </ul>
    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    gsap.from('.why-title', { y: 35, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none reverse' }
    })
    gsap.from('.why-item', { y: 25, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', toggleActions: 'play none none reverse' }
    })
  }, sectionRef.value ?? undefined)
})

interface Reason {
  id: number
  color: string
  lead: string
  body: string
}

const reasons: Reason[] = [
  {
    id: 1,
    color: '#FC3169',
    lead: 'Obtendrás conciencia técnica real.',
    body: 'Te formarás como unx joven "inengañable" al comprender el sistema energético, la legislación reciente y las metas climáticas para cuestionar el modelo actual más allá de los discursos vacíos.',
  },
  {
    id: 2,
    color: '#2E7DFC',
    lead: 'Formarás parte de una comunidad que sostiene.',
    body: 'Al unirte, pasarás a formar parte de los "indesilusionables": juventudes que ante la burocracia o el rechazo institucional no se frenan porque se sostienen colectivamente.',
  },
  {
    id: 3,
    color: '#FF8636',
    lead: 'Entenderás y aplicarás la Transición Energética Justa (TEJ) desde la raíz.',
    body: 'Aprenderás a distinguir la simple "descarbonización técnica" corporativa de una verdadera Justicia Climática.',
  },
  {
    id: 4,
    color: '#E0FA49',
    lead: 'Aprenderás a transformar tu indignación ante la crisis climática y energética',
    body: 'en acción colectiva, mediante herramientas de organización comunitaria, narrativa pública y diseño de campañas de impacto.',
  },
  {
    id: 5,
    color: '#0BE340',
    lead: 'Podrás construir acción colectiva duradera.',
    body: 'El programa culmina con la creación e integración de capítulos universitarios y estatales organizados, con metas claras de incidencia local y respaldo de una red nacional.',
  },
]
</script>

<style scoped>
.why-section {
  position: relative;
  width: 100%;
  background-color: var(--color-surface);
  overflow: hidden;
  display: flex;
  align-items: stretch;
  min-height: 100vh;
}

/* ── Stickers: esquina superior derecha, encimados ── */
.stickers-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(130px, 18vw, 220px);
  height: clamp(130px, 18vw, 220px);
  z-index: 20;
  pointer-events: none;
}

.sticker {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sticker-rayo {
  top: -10%;
  right: -5%;
}

.sticker-creatividad {
  top: 15%;
  right: 10%;
}

/* ── Imagen lateral izquierda ── */
.why-side-img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: clamp(60px, 10vw, 130px);
  object-fit: cover;
  object-position: center;
  display: block;
  flex-shrink: 0;
  z-index: 1;
}

/* ── Contenido principal ── */
.why-inner {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: clamp(3rem, 7vh, 6rem) clamp(1.5rem, 5vw, 4rem);
  /* deja espacio a la izquierda para la imagen lateral */
  padding-left: clamp(80px, 13vw, 170px);
  /* deja espacio a la derecha para los stickers */
  padding-right: clamp(1.5rem, 5vw, 4rem);
}

/* ── Título ── */
.why-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(2rem, 5.5vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 3rem;
}

/* ── Lista ── */
.why-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(1.6rem, 3vh, 2.5rem);
}

/* ── Item ── */
.why-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.why-dot {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-top: 0.3rem;
}

/* ── Texto ── */
.why-text {
  font-family: var(--font-parkinsans);
  color: rgba(255, 255, 255, 0.85);
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  line-height: 1.7;
  margin: 0;
}

.why-text strong {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  color: var(--color-white);
}

/* ── Responsive: tablet ── */
@media (max-width: 768px) {
  .why-side-img {
    width: clamp(44px, 8vw, 70px);
  }

  .why-inner {
    padding-left: clamp(60px, 11vw, 90px);
  }

  .stickers-wrapper {
    width: clamp(90px, 14vw, 140px);
    height: clamp(90px, 14vw, 140px);
  }
}

/* ── Responsive: mobile ── */
@media (max-width: 480px) {
  .why-side-img {
    width: 38px;
  }

  .why-inner {
    padding-left: 52px;
    padding-right: 1.2rem;
  }

  .why-title {
    font-size: clamp(1.7rem, 8vw, 2.2rem);
  }

  .stickers-wrapper {
    width: 90px;
    height: 90px;
  }

  .why-text {
    font-size: 0.88rem;
  }
}
</style>