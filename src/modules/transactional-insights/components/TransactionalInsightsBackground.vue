<template>
  <div class="background-elements">
    <!-- Financial symbols -->
    <div class="floating-element dollar-sign">$</div>
    <div class="floating-element peso-sign">$</div>
    <div class="floating-element euro-sign">€</div>



    <!-- Data points and analytics -->
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>

    <!-- Numbers representing data -->
    <div class="floating-element number">42%</div>
    <div class="floating-element number">1.2M</div>
    <div class="floating-element number">+15%</div>
    <div class="floating-element number">87K</div>
    <div class="floating-element number">-8%</div>
    <div class="floating-element number">2.4K</div>
    <div class="floating-element number">+23%</div>
    <div class="floating-element number">156</div>

    <!-- More financial and data icons -->
    <div class="floating-element bank-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 8V10H2V8L12 2Z" stroke="currentColor" stroke-width="2" />
        <path d="M5 10V20H8V10" stroke="currentColor" stroke-width="2" />
        <path d="M10 10V20H14V10" stroke="currentColor" stroke-width="2" />
        <path d="M16 10V20H19V10" stroke="currentColor" stroke-width="2" />
        <path d="M3 20H21V22H3V20Z" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element wallet-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2" />
        <path d="M18 10H20V14H18" stroke="currentColor" stroke-width="2" />
        <circle cx="18" cy="12" r="1" fill="currentColor" />
      </svg>
    </div>

    <div class="floating-element analytics-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" />
        <path d="M7 12L12 7L16 11L21 6" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element money-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" />
        <path d="M12 8V16" stroke="currentColor" stroke-width="2" />
        <path d="M8 12H16" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element shield-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 5V12C22 18 12 22 12 22S2 18 2 12V5L12 2Z" stroke="currentColor" stroke-width="2" />
        <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element lock-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2" />
        <path d="M8 11V7C8 4.7 9.79 3 12 3C14.21 3 16 4.7 16 7V11" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element target-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    </div>

    <div class="floating-element users-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="4" stroke="currentColor" stroke-width="2" />
        <path d="M1 20C1 16.6863 3.68629 14 7 14H11C14.3137 14 17 16.6863 17 20" stroke="currentColor"
          stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element bitcoin-icon">₿</div>
    <div class="floating-element percentage-icon">%</div>

    <!-- Line chart icons -->
    <div class="floating-element line-chart">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 20L9 14L13 18L21 10" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element calculator-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2" />
        <rect x="8" y="6" width="8" height="2" fill="currentColor" />
        <rect x="8" y="10" width="2" height="2" fill="currentColor" />
        <rect x="12" y="10" width="2" height="2" fill="currentColor" />
        <rect x="8" y="14" width="2" height="2" fill="currentColor" />
        <rect x="12" y="14" width="2" height="2" fill="currentColor" />
      </svg>
    </div>

    <!-- New business icons -->
    <div class="floating-element building-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 21H21M5 21V7L13 3L21 7V21M9 9V13M15 9V13" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element handshake-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 8C18 10 20 12 22 12M8 8C6 10 4 12 2 12" stroke="currentColor" stroke-width="2" />
        <path d="M16 14C16 14 17.5 14 19 16S23 20 23 20M8 14C8 14 6.5 14 5 16S1 20 1 20" stroke="currentColor"
          stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element document-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 3V7C14 8.1 14.9 9 16 9H20M6 3H14L20 9V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V5C4 3.9 4.9 3 6 3Z"
          stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <!-- New diverse financial icons -->
    <div class="floating-element yen-icon">¥</div>
    <div class="floating-element pound-icon">£</div>
    <div class="floating-element rupee-icon">₹</div>

    <!-- Tech and digital icons -->
    <div class="floating-element blockchain-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="6" height="6" stroke="currentColor" stroke-width="2" />
        <rect x="15" y="3" width="6" height="6" stroke="currentColor" stroke-width="2" />
        <rect x="3" y="15" width="6" height="6" stroke="currentColor" stroke-width="2" />
        <rect x="15" y="15" width="6" height="6" stroke="currentColor" stroke-width="2" />
        <path d="M9 6H15M9 18H15M6 9V15M18 9V15" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element network-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2" />
        <circle cx="6" cy="19" r="3" stroke="currentColor" stroke-width="2" />
        <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2" />
        <path d="M9 7L7 17M15 7L17 17" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element database-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2" />
        <path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" stroke="currentColor" stroke-width="2" />
        <path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <!-- Investment and growth icons -->
    <div class="floating-element growth-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element diamond-icon">◆</div>
    <div class="floating-element star-icon">★</div>
    <div class="floating-element plus-icon">+</div>

    <!-- Economic symbols -->
    <div class="floating-element infinity-icon">∞</div>
    <div class="floating-element delta-icon">Δ</div>
    <div class="floating-element sigma-icon">Σ</div>

    <!-- More currency symbols -->
    <div class="floating-element won-icon">₩</div>
    <div class="floating-element franc-icon">₣</div>
    <div class="floating-element lira-icon">₺</div>
    <div class="floating-element ruble-icon">₽</div>

    <!-- Business and finance icons -->
    <div class="floating-element briefcase-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2" />
        <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element chart-line-up">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 18L12 13L16 17L21 12" stroke="currentColor" stroke-width="2" />
        <path d="M17 12H21V16" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element coins-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
        <path d="M16 8C18.21 8 20 9.79 20 12S18.21 16 16 16" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <!-- Geometric and mathematical symbols -->
    <div class="floating-element triangle-icon">▲</div>
    <div class="floating-element square-icon">■</div>
    <div class="floating-element circle-icon">●</div>
    <div class="floating-element hexagon-icon">⬡</div>
    <div class="floating-element arrow-up">↗</div>
    <div class="floating-element arrow-down">↘</div>
    <div class="floating-element equals-icon">=</div>
    <div class="floating-element hash-icon">#</div>

    <!-- Tech symbols -->
    <div class="floating-element api-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="4" height="12" stroke="currentColor" stroke-width="2" />
        <rect x="10" y="2" width="4" height="20" stroke="currentColor" stroke-width="2" />
        <rect x="18" y="8" width="4" height="8" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="floating-element server-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
        <rect x="2" y="10" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
        <rect x="2" y="16" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="12" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    </div>

    <div class="floating-element cloud-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M17.5 19H9C6.79 19 5 17.21 5 15C5 13.07 6.5 11.45 8.5 11.1C9.24 8.35 11.92 6.5 15 6.5C18.59 6.5 21.5 9.41 21.5 13C21.5 13.28 21.45 13.54 21.39 13.8C22.32 14.36 23 15.35 23 16.5C23 18.43 21.43 20 19.5 20H17.5"
          stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <!-- More numbers and percentages -->
    <div class="floating-element number">5.1K</div>
    <div class="floating-element number">67%</div>
    <div class="floating-element number">+33K</div>
    <div class="floating-element number">-7%</div>
    <div class="floating-element number">724</div>
    <div class="floating-element number">+89%</div>
    <div class="floating-element number">8.9M</div>
    <div class="floating-element number">-3.8%</div>
    <div class="floating-element number">321K</div>
    <div class="floating-element number">+76%</div>

    <!-- More data symbols -->
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
    <div class="floating-element data-point">●</div>
  </div>
</template>

<script setup lang="ts">
// Reusable background — no props for now; exact copy of intro view
</script>

<style scoped>
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  opacity: 0.2;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: rgb(97, 40, 120);
  font-weight: 600;
  animation: float 20s ease-in-out infinite;
  user-select: none;
}

/* Financial symbols */
.dollar-sign {
  font-size: 3rem;
  top: 5%;
  left: 5%;
  animation-delay: -2s;
}

.peso-sign {
  font-size: 2.5rem;
  top: 85%;
  left: 95%;
  animation-delay: -8s;
}

.euro-sign {
  font-size: 2.8rem;
  top: 5%;
  left: 95%;
  animation-delay: -15s;
}

/* Data visualization elements */
.chart-bar {
  top: 85%;
  left: 25%;
  animation-delay: -5s;
  font-size: 1.5rem;
}

.trend-up {
  top: 25%;
  left: 50%;
  animation-delay: -12s;
  font-size: 1.8rem;
}

.pie-chart {
  top: 85%;
  left: 75%;
  animation-delay: -18s;
  font-size: 1.6rem;
}

/* Transaction elements */
.card-icon {
  top: 55%;
  left: 5%;
  animation-delay: -3s;
  font-size: 1.4rem;
}

.transfer-icon {
  top: 90%;
  left: 35%;
  animation-delay: -10s;
  font-size: 1.3rem;
}

/* Data points */
.data-point {
  font-size: 1rem;
}

.data-point:nth-child(4) {
  top: 30%;
  left: 25%;
  animation-delay: -1s;
}

.data-point:nth-child(5) {
  top: 55%;
  left: 90%;
  animation-delay: -7s;
}

.data-point:nth-child(6) {
  top: 85%;
  left: 50%;
  animation-delay: -14s;
}

.data-point:nth-child(7) {
  top: 10%;
  left: 45%;
  animation-delay: -9s;
}

/* All remaining data points (12 total at the end) */
.data-point:nth-child(64) {
  top: 18%;
  left: 82%;
  animation-delay: -12s;
}

.data-point:nth-child(65) {
  top: 68%;
  left: 22%;
  animation-delay: -15s;
}

.data-point:nth-child(66) {
  top: 38%;
  left: 72%;
  animation-delay: -18s;
}

.data-point:nth-child(67) {
  top: 88%;
  left: 32%;
  animation-delay: -21s;
}

.data-point:nth-child(68) {
  top: 28%;
  left: 92%;
  animation-delay: -24s;
}

.data-point:nth-child(69) {
  top: 78%;
  left: 12%;
  animation-delay: -27s;
}

.data-point:nth-child(70) {
  top: 48%;
  left: 62%;
  animation-delay: -30s;
}

.data-point:nth-child(71) {
  top: 98%;
  left: 42%;
  animation-delay: -33s;
}

.data-point:nth-child(72) {
  top: 8%;
  left: 88%;
  animation-delay: -36s;
}

.data-point:nth-child(73) {
  top: 58%;
  left: 28%;
  animation-delay: -39s;
}

.data-point:nth-child(74) {
  top: 24%;
  left: 68%;
  animation-delay: -42s;
}

.data-point:nth-child(75) {
  top: 74%;
  left: 8%;
  animation-delay: -45s;
}

/* Numbers and percentages */
.number {
  font-size: 1.2rem;
  font-weight: 700;
}

.number:nth-child(8) {
  top: 45%;
  left: 92%;
  animation-delay: -4s;
}

.number:nth-child(9) {
  top: 65%;
  left: 8%;
  animation-delay: -11s;
}

.number:nth-child(10) {
  top: 15%;
  left: 65%;
  animation-delay: -17s;
}

.number:nth-child(11) {
  top: 85%;
  left: 55%;
  animation-delay: -6s;
}

.number:nth-child(12) {
  top: 45%;
  left: 35%;
  animation-delay: -13s;
}

.number:nth-child(13) {
  top: 15%;
  left: 15%;
  animation-delay: -19s;
}

.number:nth-child(14) {
  top: 90%;
  left: 85%;
  animation-delay: -10s;
}

.number:nth-child(15) {
  top: 35%;
  left: 75%;
  animation-delay: -16s;
}

/* Additional numbers (52-61 in DOM) */
.number:nth-child(52) {
  top: 72%;
  left: 28%;
  animation-delay: -20s;
}

.number:nth-child(53) {
  top: 12%;
  left: 82%;
  animation-delay: -23s;
}

.number:nth-child(54) {
  top: 52%;
  left: 18%;
  animation-delay: -26s;
}

.number:nth-child(55) {
  top: 92%;
  left: 72%;
  animation-delay: -29s;
}

.number:nth-child(56) {
  top: 32%;
  left: 88%;
  animation-delay: -32s;
}

.number:nth-child(57) {
  top: 62%;
  left: 12%;
  animation-delay: -35s;
}

.number:nth-child(58) {
  top: 22%;
  left: 58%;
  animation-delay: -38s;
}

.number:nth-child(59) {
  top: 82%;
  left: 38%;
  animation-delay: -41s;
}

.number:nth-child(60) {
  top: 42%;
  left: 78%;
  animation-delay: -44s;
}

.number:nth-child(61) {
  top: 2%;
  left: 48%;
  animation-delay: -47s;
}

/* Finance icons group */
.bank-icon {
  top: 15%;
  left: 30%;
  animation-delay: -12s;
  font-size: 1.6rem;
}

.wallet-icon {
  top: 75%;
  left: 15%;
  animation-delay: -14s;
  font-size: 1.6rem;
}

.analytics-icon {
  top: 45%;
  left: 10%;
  animation-delay: -20s;
  font-size: 1.5rem;
}

.money-icon {
  top: 85%;
  left: 90%;
  animation-delay: -22s;
  font-size: 1.6rem;
}

.shield-icon {
  top: 15%;
  left: 85%;
  animation-delay: -24s;
  font-size: 1.6rem;
}

.lock-icon {
  top: 60%;
  left: 80%;
  animation-delay: -17s;
  font-size: 1.4rem;
}

.target-icon {
  top: 25%;
  left: 70%;
  animation-delay: -21s;
  font-size: 1.5rem;
}

.users-icon {
  top: 35%;
  left: 20%;
  animation-delay: -18s;
  font-size: 1.5rem;
}

.bitcoin-icon {
  font-size: 2rem;
  top: 35%;
  left: 95%;
  animation-delay: -23s;
}

.percentage-icon {
  font-size: 1.5rem;
  top: 75%;
  left: 65%;
  animation-delay: -25s;
}

.line-chart {
  top: 65%;
  left: 45%;
  animation-delay: -27s;
  font-size: 1.5rem;
}

.calculator-icon {
  top: 10%;
  left: 35%;
  animation-delay: -22s;
  font-size: 1.4rem;
}

/* Business icons */
.building-icon {
  top: 40%;
  left: 60%;
  animation-delay: -26s;
  font-size: 1.4rem;
}

.handshake-icon {
  top: 70%;
  left: 40%;
  animation-delay: -28s;
  font-size: 1.4rem;
}

.document-icon {
  top: 20%;
  left: 55%;
  animation-delay: -24s;
  font-size: 1.4rem;
}

/* Currency symbols */
.yen-icon {
  top: 20%;
  left: 20%;
  animation-delay: -26s;
  font-size: 1.6rem;
}

.pound-icon {
  top: 80%;
  left: 25%;
  animation-delay: -23s;
  font-size: 1.6rem;
}

.rupee-icon {
  top: 30%;
  left: 85%;
  animation-delay: -21s;
  font-size: 1.6rem;
}

/* Tech and digital */
.blockchain-icon {
  top: 30%;
  left: 30%;
  animation-delay: -31s;
  font-size: 1.3rem;
}

.network-icon {
  top: 70%;
  left: 75%;
  animation-delay: -33s;
  font-size: 1.3rem;
}

.database-icon {
  top: 35%;
  left: 50%;
  animation-delay: -28s;
  font-size: 1.5rem;
}

/* Investment and geometry */
.growth-icon {
  top: 20%;
  left: 75%;
  animation-delay: -26s;
  font-size: 1.3rem;
}

.diamond-icon {
  font-size: 1.6rem;
  top: 25%;
  left: 15%;
  animation-delay: -31s;
}

.star-icon {
  font-size: 1.6rem;
  top: 45%;
  left: 55%;
  animation-delay: -33s;
}

.plus-icon {
  font-size: 1.6rem;
  top: 75%;
  left: 35%;
  animation-delay: -21s;
}

/* Math symbols */
.infinity-icon {
  font-size: 1.8rem;
  top: 35%;
  left: 40%;
  animation-delay: -26s;
}

.delta-icon {
  font-size: 1.8rem;
  top: 15%;
  left: 45%;
  animation-delay: -28s;
}

.sigma-icon {
  font-size: 1.8rem;
  top: 75%;
  left: 45%;
  animation-delay: -24s;
}

/* More currency */
.won-icon {
  font-size: 1.8rem;
  top: 55%;
  left: 60%;
  animation-delay: -22s;
}

.franc-icon {
  font-size: 1.8rem;
  top: 25%;
  left: 65%;
  animation-delay: -26s;
}

.lira-icon {
  font-size: 1.8rem;
  top: 45%;
  left: 25%;
  animation-delay: -20s;
}

.ruble-icon {
  font-size: 1.8rem;
  top: 85%;
  left: 15%;
  animation-delay: -29s;
}

/* Business and finance */
.briefcase-icon {
  top: 55%;
  left: 35%;
  animation-delay: -32s;
  font-size: 1.4rem;
}

.chart-line-up {
  top: 45%;
  left: 85%;
  animation-delay: -30s;
  font-size: 1.4rem;
}

.coins-icon {
  top: 75%;
  left: 55%;
  animation-delay: -27s;
  font-size: 1.4rem;
}

/* Geometric symbols */
.triangle-icon {
  font-size: 1.4rem;
  top: 25%;
  left: 35%;
  animation-delay: -33s;
}

.square-icon {
  font-size: 1.4rem;
  top: 65%;
  left: 25%;
  animation-delay: -35s;
}

.circle-icon {
  font-size: 1.2rem;
  top: 85%;
  left: 5%;
  animation-delay: -27s;
}

.hexagon-icon {
  font-size: 1.7rem;
  top: 45%;
  left: 95%;
  animation-delay: -37s;
}

.arrow-up {
  font-size: 1.8rem;
  top: 5%;
  left: 25%;
  animation-delay: -29s;
}

.arrow-down {
  font-size: 1.8rem;
  top: 65%;
  left: 95%;
  animation-delay: -38s;
}

.equals-icon {
  font-size: 1.5rem;
  top: 65%;
  left: 50%;
  animation-delay: -34s;
}

.hash-icon {
  font-size: 1.6rem;
  top: 85%;
  left: 50%;
  animation-delay: -30s;
}

/* Tech symbols */
.api-icon {
  top: 12%;
  left: 68%;
  animation-delay: -29s;
  font-size: 1.4rem;
}

.server-icon {
  top: 58%;
  left: 72%;
  animation-delay: -31s;
  font-size: 1.3rem;
}

.cloud-icon {
  top: 22%;
  left: 42%;
  animation-delay: -27s;
  font-size: 1.5rem;
}

/* Geometric and mathematical symbols */
.arrow-up {
  font-size: 1.8rem;
  top: 8%;
  left: 25%;
  animation-delay: -29s;
}

.arrow-down {
  font-size: 1.8rem;
  top: 68%;
  left: 92%;
  animation-delay: -33s;
}

/* Additional missing elements positioning */
.line-chart {
  top: 52%;
  left: 38%;
  animation-delay: -25s;
  font-size: 1.5rem;
}

/* More data points positioning */
.data-point:nth-child(264) {
  top: 18%;
  left: 82%;
  animation-delay: -15s;
}

.data-point:nth-child(265) {
  top: 72%;
  left: 12%;
  animation-delay: -18s;
}

.data-point:nth-child(266) {
  top: 42%;
  left: 68%;
  animation-delay: -21s;
}

.data-point:nth-child(267) {
  top: 88%;
  left: 42%;
  animation-delay: -24s;
}

.data-point:nth-child(268) {
  top: 28%;
  left: 92%;
  animation-delay: -27s;
}

.data-point:nth-child(269) {
  top: 62%;
  left: 18%;
  animation-delay: -30s;
}

.data-point:nth-child(270) {
  top: 12%;
  left: 48%;
  animation-delay: -33s;
}

.data-point:nth-child(271) {
  top: 78%;
  left: 78%;
  animation-delay: -36s;
}

.data-point:nth-child(272) {
  top: 32%;
  left: 22%;
  animation-delay: -39s;
}

.data-point:nth-child(273) {
  top: 58%;
  left: 88%;
  animation-delay: -42s;
}

.data-point:nth-child(274) {
  top: 8%;
  left: 58%;
  animation-delay: -45s;
}

.data-point:nth-child(275) {
  top: 92%;
  left: 28%;
  animation-delay: -48s;
}

/* Additional numbers positioning from the source */
.number:nth-child(58) {
  top: 21%;
  left: 75%;
  animation-delay: -39s;
}

.number:nth-child(59) {
  top: 81%;
  left: 48%;
  animation-delay: -35s;
}

.number:nth-child(60) {
  top: 46%;
  left: 12%;
  animation-delay: -32s;
}

.number:nth-child(61) {
  top: 31%;
  left: 65%;
  animation-delay: -37s;
}

.number:nth-child(62) {
  top: 69%;
  left: 21%;
  animation-delay: -34s;
}

.number:nth-child(63) {
  top: 11%;
  left: 52%;
  animation-delay: -30s;
}

.number:nth-child(64) {
  top: 87%;
  left: 75%;
  animation-delay: -36s;
}

.number:nth-child(65) {
  top: 39%;
  left: 8%;
  animation-delay: -33s;
}

.number:nth-child(66) {
  top: 59%;
  left: 95%;
  animation-delay: -38s;
}

.number:nth-child(67) {
  top: 17%;
  left: 31%;
  animation-delay: -31s;
}

/* Additional numbers that need positioning */
.number:nth-child(252) {
  top: 24%;
  left: 88%;
  animation-delay: -19s;
}

.number:nth-child(253) {
  top: 76%;
  left: 32%;
  animation-delay: -22s;
}

.number:nth-child(254) {
  top: 14%;
  left: 72%;
  animation-delay: -25s;
}

.number:nth-child(255) {
  top: 84%;
  left: 62%;
  animation-delay: -28s;
}

.number:nth-child(256) {
  top: 34%;
  left: 12%;
  animation-delay: -31s;
}

.number:nth-child(257) {
  top: 64%;
  left: 82%;
  animation-delay: -34s;
}

.number:nth-child(258) {
  top: 44%;
  left: 52%;
  animation-delay: -37s;
}

.number:nth-child(259) {
  top: 94%;
  left: 22%;
  animation-delay: -40s;
}

.number:nth-child(260) {
  top: 4%;
  left: 42%;
  animation-delay: -43s;
}

.number:nth-child(261) {
  top: 54%;
  left: 92%;
  animation-delay: -46s;
}

/* Float animation */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }

  25% {
    transform: translateY(-20px) rotate(2deg);
    opacity: 0.4;
  }

  50% {
    transform: translateY(-10px) rotate(-1deg);
    opacity: 0.2;
  }

  75% {
    transform: translateY(-30px) rotate(1deg);
    opacity: 0.33;
  }
}
</style>
