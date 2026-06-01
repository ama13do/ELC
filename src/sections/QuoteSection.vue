<template>
  <section class="bg-surface py-20 px-6 md:px-12 lg:px-20 text-foreground">
    <div class="mx-auto max-w-3xl flex flex-col gap-16">

      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-4 flex-wrap">
          <span class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
            <span class="font-bold text-xl tracking-wide font-heading">FASE 1</span>
          </span>
          <span class="text-accent text-xl font-semibold underline underline-offset-4 font-heading">
            Identidad, valores y diagnóstico sistémico
          </span>
        </div>

        <p class="text-white/85 text-base leading-relaxed font-body">
          La primera fase busca que lxs integrantes comprendan a fondo la misión del movimiento,
          compartan un lenguaje común y exploren el origen del problema público y estructural
          que queremos resolver.
        </p>

        <ul class="flex flex-col gap-6">
          <li v-for="topic in phase1Topics" :key="topic.title" class="flex items-start gap-4">
            <span class="mt-1.5 w-3 h-3 rounded-full bg-accent flex-shrink-0" />
            <div>
              <p class="text-white font-bold text-sm mb-1 font-heading">{{ topic.title }}</p>
              <p class="text-white/70 text-sm leading-relaxed font-body">{{ topic.body }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="h-px w-full bg-white/10" />

      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-4 flex-wrap">
          <span class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
            <span class="font-bold text-xl tracking-wide font-heading">FASE 2</span>
          </span>
          <span class="text-accent text-xl font-semibold underline underline-offset-4 font-heading">
            Herramientas técnicas y de incidencia 101
          </span>
        </div>

        <p class="text-white/85 text-base leading-relaxed font-body">
          Con el diagnóstico y la identidad ya asimilados, esta fase entrega las herramientas técnicas 
          y organizativas para que lxs participantes se vuelvan juventudes “inengañables” e “indesilusionables": 
          capaces de disputar el modelo energético de tú a tú con quienes toman las decisiones.
        </p>

        <ul class="flex flex-col gap-6">
          <li v-for="topic in phase2Topics" :key="topic.title" class="flex items-start gap-4">
            <span class="mt-1.5 w-3 h-3 rounded-full bg-accent flex-shrink-0" />
            <div>
              <p class="text-white font-bold text-sm mb-1 font-heading">{{ topic.title }}</p>
              <p class="text-white/70 text-sm leading-relaxed font-body">{{ topic.body }}</p>
            </div>
          </li>
        </ul>

        <p class="text-white/50 text-xs italic mt-2 font-body">
          *El contenido del programa final se dará a conocer a las personas seleccionadas en la reunión de bienvenida del sábado 4 de julio.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
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
    body: 'Principios básicos de las políticas públicas con enfoque de derechos humanos y herramientas prácticas para formular, evaluar y gestionar proyectos comunitarios de transición energética desde lo local.',
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