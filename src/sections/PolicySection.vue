<template>
  <section class="policy-section">

    <!-- Hero edge-to-edge con título abajo-izquierda -->
    <div class="policy-hero">
      <img src="../assets/images/POLICY.svg" alt="" class="policy-hero-bg" />
      <div class="policy-hero-text">
        <h2 class="policy-title">Política de<br />diversidad e inclusión</h2>
      </div>
    </div>

    <!-- Texto -->
    <div class="policy-body">
      <p class="policy-text">
        Invitamos particularmente a mujeres, personas de comunidades indígenas y
        afrodescendientes, personas de la comunidad LGBTIQ+, personas con discapacidad
        o pertenecientes a otro grupo históricamente excluidos a postular a esta
        convocatoria en ánimos de conformar un grupo que represente la diversidad del
        país e incluir todas las perspectivas posibles, en el marco de respeto de
        derechos humanos, dentro del Movimiento.
      </p>

      <p class="policy-note">
        Comunícate con nosotrxs o pídele a una persona de confianza que lo haga por ti
        si consideras la necesidad de algún ajuste de accesibilidad para tu postulación.
        Escríbenos a
        <a href="mailto:hxnf@practica.lat" class="policy-email">hxnf@practica.lat</a>
        antes del 22 de junio.
      </p>
    </div>

  </section>
</template>

<style scoped>
.policy-section {
  width: 100%;
  background-color: var(--color-surface);
  overflow: hidden;
}

/* ── Hero ── */
.policy-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: clamp(300px, 52vw, 560px);
  overflow: hidden;
}

.policy-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.policy-hero-text {
  position: absolute;
  bottom: clamp(1.5rem, 5%, 3rem);
  left: clamp(1.5rem, 6vw, 5rem);
  z-index: 10;
}

.policy-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(2rem, 5.5vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ── Texto ── */
.policy-body {
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(2.5rem, 5vh, 4.5rem) clamp(1.5rem, 6vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.policy-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.9);
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  line-height: 1.8;
  margin: 0;
}

.policy-note {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.65);
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  line-height: 1.75;
  margin: 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.policy-email {
  color: var(--color-accent);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 480px) {
  .policy-body {
    padding: 2rem 1.2rem;
    text-align: left;
  }
}
</style>