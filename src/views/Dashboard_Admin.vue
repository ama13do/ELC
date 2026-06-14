<template>
  <div class="admin-page">
    <!-- Login Screen -->
    <div v-if="!isAuthenticated" class="login-screen">
      <div class="login-card">
        <div class="login-icon">🔒</div>
        <h2 class="login-title">Panel Interno</h2>
        <p class="login-subtitle">Acceso restringido al equipo organizador</p>
        <form @submit.prevent="handleLogin" class="login-form">
          <input
            v-model="passwordInput"
            type="password"
            placeholder="Contraseña"
            class="login-input"
            :class="{ 'login-input--error': loginError }"
            autofocus
          />
          <p v-if="loginError" class="login-error">Contraseña incorrecta</p>
          <button type="submit" class="login-btn">Entrar</button>
        </form>
      </div>
    </div>

    <!-- Dashboard -->
    <div v-else class="dashboard">
      <!-- Header -->
      <header class="dash-header">
        <div class="dash-header__left">
          <h1 class="dash-title">Dashboard ELC 2026</h1>
          <span class="dash-badge">INTERNO</span>
        </div>
        <div class="dash-header__right">
          <button class="refresh-btn" @click="refreshData" :disabled="isLoading">
            {{ isLoading ? '⏳ Cargando...' : '🔄 Actualizar' }}
          </button>
          <button class="logout-btn" @click="handleLogout">Salir</button>
        </div>
      </header>

      <!-- Error message -->
      <div v-if="error" class="error-banner">
        ⚠️ {{ error }}
        <button @click="refreshData" class="retry-btn">Reintentar</button>
      </div>

      <!-- Tabs -->
      <nav class="dash-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.icon }} {{ tab.label }}
        </button>
      </nav>

      <!-- Tab content -->
      <div class="dash-content">
        <!-- Resumen -->
        <div v-if="activeTab === 'resumen'">
          <StatsCards_Admin :stats="stats" />
        </div>

        <!-- Tabla de datos -->
        <div v-if="activeTab === 'tabla'">
          <DataTable_Admin
            :data="filteredRegistros"
            :estados="uniqueEstados"
            v-model:searchModel="filters.search"
            v-model:finalizadoModel="filters.finalizado"
            v-model:estadoModel="filters.estado"
            v-model:pasoModel="filters.pasoActual"
            @export="exportToCSV"
          />
        </div>

        <!-- Gráficas -->
        <div v-if="activeTab === 'graficas'">
          <ChartSection_Admin
            :porEstado="stats.porEstado"
            :porGenero="stats.porGenero"
            :porPaso="stats.porPaso"
            :porDia="stats.porDia"
            :porUniversidad="stats.porUniversidad"
            :total="stats.total"
          />
        </div>

        <!-- Recordatorios -->
        <div v-if="activeTab === 'recordatorios'">
          <Reminders_Admin
            :data="incompleteRegistros"
            :porPaso="stats.porPaso"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/composables/useAdmin_Store'
import StatsCards_Admin from '@/components/StatsCards_Admin.vue'
import DataTable_Admin from '@/components/DataTable_Admin.vue'
import ChartSection_Admin from '@/components/ChartSection_Admin.vue'
import Reminders_Admin from '@/components/Reminders_Admin.vue'

const {
  isAuthenticated,
  isLoading,
  error,
  filters,
  stats,
  filteredRegistros,
  uniqueEstados,
  incompleteRegistros,
  login,
  checkSession,
  logout,
  fetchAllRegistros,
  exportToCSV,
} = useAdminStore()

const passwordInput = ref('')
const loginError = ref(false)
const activeTab = ref('resumen')

const tabs = [
  { id: 'resumen', label: 'Resumen', icon: '📊' },
  { id: 'tabla', label: 'Tabla de datos', icon: '📋' },
  { id: 'graficas', label: 'Gráficas', icon: '📈' },
  { id: 'recordatorios', label: 'Recordatorios', icon: '📬' },
]

function handleLogin() {
  loginError.value = false
  if (login(passwordInput.value)) {
    fetchAllRegistros()
  } else {
    loginError.value = true
  }
}

function handleLogout() {
  logout()
  passwordInput.value = ''
}

async function refreshData() {
  await fetchAllRegistros()
}

onMounted(() => {
  if (checkSession()) {
    fetchAllRegistros()
  }
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
}

/* ── Login ── */
.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.login-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.login-title {
  font-family: var(--font-parkinsans);
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.25rem;
}

.login-subtitle {
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0 0 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.login-input {
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-family: var(--font-myriad);
  font-size: 1rem;
  padding: 0.85rem 1rem;
  outline: none;
  text-align: center;
  transition: border-color 0.2s;
}

.login-input:focus {
  border-color: #0BE340;
}

.login-input--error {
  border-color: #FC3169;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

.login-error {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: #FC3169;
  margin: 0;
}

.login-btn {
  background: #0BE340;
  border: none;
  border-radius: 12px;
  color: #000;
  font-family: var(--font-parkinsans);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.login-btn:hover {
  background: #09c835;
  transform: translateY(-1px);
}

/* ── Dashboard ── */
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 3rem;
}

.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dash-header__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dash-title {
  font-family: var(--font-parkinsans);
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 800;
  margin: 0;
  color: #fff;
}

.dash-badge {
  font-family: var(--font-parkinsans);
  font-size: 0.65rem;
  font-weight: 800;
  color: #E0FA49;
  background: rgba(224, 250, 73, 0.1);
  border: 1px solid rgba(224, 250, 73, 0.3);
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.08em;
}

.dash-header__right {
  display: flex;
  gap: 0.5rem;
}

.refresh-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-parkinsans);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  border-color: #0BE340;
  color: #0BE340;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: wait;
}

.logout-btn {
  background: rgba(252, 49, 105, 0.1);
  border: 1.5px solid rgba(252, 49, 105, 0.25);
  border-radius: 10px;
  color: #FC3169;
  font-family: var(--font-parkinsans);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(252, 49, 105, 0.2);
}

.error-banner {
  background: rgba(252, 49, 105, 0.08);
  border: 1px solid rgba(252, 49, 105, 0.3);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: #FC3169;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.retry-btn {
  background: rgba(252, 49, 105, 0.15);
  border: 1px solid rgba(252, 49, 105, 0.3);
  border-radius: 8px;
  color: #FC3169;
  font-family: var(--font-parkinsans);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

/* ── Tabs ── */
.dash-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 0;
  overflow-x: auto;
}

.tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: rgba(255, 255, 255, 0.45);
  font-family: var(--font-parkinsans);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: rgba(255, 255, 255, 0.8);
}

.tab-btn--active {
  color: #0BE340;
  border-bottom-color: #0BE340;
}

.dash-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  .dash-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
