<template>
  <section class="engine">
    <h2 class="engine__title">How It Works</h2>

    <div class="engine__pipeline">
      <div class="engine__step">
        <div class="engine__step-label">RawMatch</div>
        <div class="engine__step-desc">{ sport, participant1, participant2, score }</div>
      </div>
      <div class="engine__arrow">&rarr;</div>
      <div class="engine__step engine__step--highlight">
        <div class="engine__step-label">SPORT_CONFIG[sport]</div>
        <div class="engine__step-desc">{ nameSeparator, formatScore }</div>
      </div>
      <div class="engine__arrow">&rarr;</div>
      <div class="engine__step">
        <div class="engine__step-label">ParsedMatch</div>
        <div class="engine__step-desc">{ name, score }</div>
      </div>
    </div>

    <div class="engine__config">
      <h3>SPORT_CONFIG Map</h3>
      <p class="engine__desc">
        One object replaces all if/else chains. Adding a new sport = one entry.
      </p>
      <table class="engine__table">
        <thead>
          <tr>
            <th>Sport</th>
            <th>Name Separator</th>
            <th>Score Formatter</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in sports" :key="s.sport">
            <td><code>{{ s.sport }}</code></td>
            <td><code>"{{ s.separator }}"</code></td>
            <td><code>{{ s.formatter }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="engine__code">
      <h3>parseMatch()</h3>
      <pre><code>{{ parseMatchCode }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
const sports = [
  { sport: 'soccer', separator: ' - ', formatter: 'passthroughFormatter' },
  { sport: 'volleyball', separator: ' - ', formatter: 'setBasedFormatter' },
  { sport: 'handball', separator: ' vs ', formatter: 'passthroughFormatter' },
  { sport: 'basketball', separator: ' - ', formatter: 'basketballFormatter' },
  { sport: 'tennis', separator: ' vs ', formatter: 'setBasedFormatter' },
];

const parseMatchCode = `function parseMatch(match: RawMatch): ParsedMatch | null {
  const config = SPORT_CONFIG[match.sport];
  if (!config || !match.participant1 || !match.participant2 || match.score == null) {
    return null;
  }

  try {
    const name = \`\${match.participant1}\${config.nameSeparator}\${match.participant2}\`;
    const score = config.formatScore(match.score);
    return { name, score };
  } catch {
    return null;
  }
}`;
</script>

<style scoped lang="scss">
.engine {
  &__title {
    font-size: 1.25rem;
    margin-bottom: $space-lg;
  }

  &__pipeline {
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-lg;
    background: $sc-dark;
    border-radius: $radius-md;
    margin-bottom: $space-xl;
    overflow-x: auto;

    @include mobile {
      flex-direction: column;
    }
  }

  &__step {
    padding: $space-sm $space-md;
    background: rgba($sc-white, 0.08);
    border-radius: $radius-sm;
    border: 1px solid rgba($sc-white, 0.15);
    text-align: center;
    flex: 1;
    min-width: 0;

    &--highlight {
      border-color: $sc-green;
      background: rgba($sc-green, 0.1);
    }
  }

  &__step-label {
    font-weight: 700;
    font-size: 14px;
    color: $sc-green;
    margin-bottom: 4px;
  }

  &__step-desc {
    font-size: 11px;
    color: rgba($sc-white, 0.6);
    font-family: monospace;
  }

  &__arrow {
    font-size: 24px;
    color: $sc-green;
    flex-shrink: 0;

    @include mobile {
      transform: rotate(90deg);
    }
  }

  &__config {
    margin-bottom: $space-xl;

    h3 { margin-bottom: $space-sm; }
  }

  &__desc {
    font-size: 13px;
    color: $sc-gray;
    margin-bottom: $space-md;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;

    th, td {
      padding: $space-sm $space-md;
      text-align: left;
      border-bottom: 1px solid darken($sc-gray-light, 6%);
    }

    th {
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      color: $sc-gray;
      background: $sc-gray-light;
    }

    code {
      background: $sc-lavender;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 12px;
      color: $sc-purple;
    }
  }

  &__code {
    h3 { margin-bottom: $space-sm; }

    pre {
      background: $sc-dark;
      color: $sc-green;
      padding: $space-md;
      border-radius: $radius-md;
      overflow-x: auto;
      font-size: 12px;
      line-height: 1.7;
    }
  }
}
</style>
