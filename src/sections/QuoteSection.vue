<template>
  <section class="phases-section" ref="sectionRef">
    <div class="phases-inner">

      <!-- FASE 1 -->
      <div class="phase-block">

        <!-- Header fase -->
        <div class="phase-header">
          <div class="phase-label">
        
            <span class="phase-num" style="color: #0BE340">FASE 1</span>
          </div>
          <span class="phase-subtitle">Identidad, valores y diagnóstico sistémico</span>
        </div>

        <!-- Card -->
        <div class="phase-card" style="--c: #0BE340">
          <span class="card-dot" style="--c: #0BE340" />

          <p class="phase-intro">
            La primera fase busca que lxs integrantes comprendan a fondo la misión del
            movimiento, compartan un lenguaje común y exploren el origen del problema
            público y estructural que queremos resolver.
          </p>

          <ul class="topic-list">
            <li v-for="topic in phase1Topics" :key="topic.title" class="topic-item">
              <span class="topic-dot" style="--c: #0BE340" />
              <div>
                <p class="topic-title">{{ topic.title }}</p>
                <p class="topic-body">{{ topic.body }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- FASE 2 -->
      <div class="phase-block">

        <div class="phase-header">
          <div class="phase-label">
          
            <span class="phase-num" style="color: #E0FA49">FASE 2</span>
          </div>
          <span class="phase-subtitle" style="color: #E0FA49">Herramientas técnicas y de incidencia 101</span>
        </div>

        <div class="phase-card" style="--c: #E0FA49">
          <span class="card-dot" style="--c: #E0FA49" />

          <p class="phase-intro">
            Con el diagnóstico y la identidad ya asimilados, esta fase entrega las herramientas
            técnicas y organizativas para que lxs participantes se vuelvan juventudes
            "inengañables" e "indesilusionables": capaces de disputar el modelo energético
            de tú a tú con quienes toman las decisiones.
          </p>

          <ul class="topic-list">
            <li v-for="topic in phase2Topics" :key="topic.title" class="topic-item">
              <span class="topic-dot" style="--c: #E0FA49" />
              <div>
                <p class="topic-title">{{ topic.title }}</p>
                <p class="topic-body">{{ topic.body }}</p>
              </div>
            </li>
          </ul>

          
        </div>
        <p class="phase-note">
          *El contenido del programa final se dará a conocer a las personas seleccionadas
          en la reunión de bienvenida del sábado 4 de julio.
        </p>
      </div>

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
    gsap.from('.phase-block', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none reverse' }
    })
  }, sectionRef.value ?? undefined)
})

const phase1Topics = [
  {
    title: 'Fundamentos del movimiento y teoría del cambio.',
    body: 'Misión, visión, metas y estrategia de HxNF: cómo buscamos generar impacto sistémico y cuáles son los mecanismos internos que dan vida a nuestro movimiento.',
  },
  {
    title: 'Contexto global y movimientos sociales.',
    body: 'El dilema democrático frente a la crisis civilizatoria contemporánea y la historia de las movilizaciones actuales, para ubicar el rol de HxNF en el tablero político.',
  },
  {
    title: 'Justicia climática.',
    body: 'Qué es la justicia climática, cómo impacta a las poblaciones más vulnerables y qué caminos existen para alcanzarla.',
  },
  {
    title: 'El núcleo del problema: TEJ, descarbonización y pobreza energética.',
    body: 'La diferencia entre una simple descarbonización corporativa y una Transición Energética Justa que no deje a nadie atrás.',
  },
  {
    title: 'Ecofeminismos y redes de apoyo.',
    body: 'La relevancia de los ecofeminismos y la economía del cuidado como herramientas para tejer redes horizontales frente al extractivismo sistémico y la brecha de género.',
  },
]

const phase2Topics = [
  {
    title: 'Conciencia técnica del sector energético.',
    body: 'Introducción al Sistema Energético Nacional —cómo funciona realmente el sistema eléctrico y de hidrocarburos en México—, comprensión de la legislación y planeación energética más reciente y de las metas climáticas del país en las NDC 3.0.',
  },
  {
    title: 'Políticas públicas y proyectos comunitarios.',
    body: 'Principios básicos de políticas públicas con enfoque de derechos humanos y herramientas prácticas para formular, evaluar y gestionar proyectos comunitarios de transición energética desde lo local.',
  },
  {
    title: 'Comunicación, narrativas y artivismo.',
    body: 'Estrategias de comunicación externa, imaginación política, artivismo y diseño de campañas de alto impacto visual y discursivo.',
  },
  {
    title: 'Organización comunitaria.',
    body: 'El pilar organizativo de la escuela: construir liderazgos colectivos y compartidos a través de la narrativa pública, para crear poder colectivo con capacidad real de articulación e incidencia.',
  },
  {
    title: 'Estrategia de poder y cuidado colectivo.',
    body: 'Aprender a mapear actores y su poder para identificar potenciales aliadxs y opositores en cada comunidad, junto con talleres de seguridad y cuidados colectivos en el activismo.',
  },
]
</script>

<style scoped>
.phases-section {
  width: 100%;
  background-color: var(--color-surface);
  padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 6vw, 5rem);
}

.phases-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: stretch;
}

/* ── Header de fase ── */
.phase-block {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 3.5rem;
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-left: 1.6rem; 
  padding-bottom: 0.3rem;
}

.phase-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.phase-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--c);
  flex-shrink: 0;
}

.phase-num {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--color-white);
  letter-spacing: 0.06em;
}

.phase-subtitle {
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  color: #0BE340;
  
  text-underline-offset: 4px;
}

/* ── Card: borde derecho + arriba + abajo, sin izquierdo ── */
.phase-card {
  position: relative;
  background-color: var(--color-black);
  border-top:    1.5px solid var(--c);
  border-right:  1.5px solid var(--c);
  border-bottom: 1.5px solid var(--c);
  border-left:   none;
  border-radius: 0 0.9rem 0.9rem 0;
  padding: 2rem 1.6rem 1.8rem 1.6rem;
  margin-top: -0.5rem; 
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex-grow: 1;
}

/* Círculo sobresaliendo arriba-izquierda */
.card-dot {
  position: absolute;
  top: -0.6rem;
  left: -0.6rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: var(--c);
}

/* ── Intro ── */
.phase-intro {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.85);
  font-size: clamp(0.82rem, 1vw, 0.95rem);
  line-height: 1.7;
  margin: 0;
}

/* ── Lista de temas ── */
.topic-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.topic-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.topic-dot {
  flex-shrink: 0;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: var(--c);
  margin-top: 0.3rem;
}

.topic-title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  color: var(--color-white);
  font-size: clamp(0.8rem, 0.95vw, 0.92rem);
  margin: 0 0 0.2rem;
  line-height: 1.4;
}

.topic-body {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.65);
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  line-height: 1.65;
  margin: 0;
}

/* ── Nota al pie ── */
.phase-note {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.4);
  font-size: clamp(0.68rem, 0.8vw, 0.78rem);
  font-style: italic;
  text-align: right;
  
  /* EL TRUCO PARA QUE NO DEFORME Y NO DESAPAREZCA */
  margin-top: 0.3rem;
  height: 0;
  overflow: visible;
}

/* ── Responsive tablet ── */
@media (max-width: 860px) {
  .phases-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* ── Responsive mobile ── */
@media (max-width: 480px) {
  .phases-section {
    padding: 2.5rem 1.2rem;
  }

  .phase-card {
    padding: 1.6rem 1.2rem 1.5rem;
  }

  .phase-note {
    text-align: left;
  }
}
</style>