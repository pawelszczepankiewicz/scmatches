export interface ScoreDetail {
  label: string;
  value: string;
}

export function parseMainScores(score: string, sport: string): [string, string] {
  if (score.startsWith('Main score:')) {
    const m = score.match(/Main score:\s*(\d+):(\d+)/);
    return m ? [m[1], m[2]] : [score, ''];
  }

  if (sport === 'basketball') {
    const quarters = score.split(',');
    let t1 = 0, t2 = 0;
    for (const q of quarters) {
      const [a, b] = q.split(':').map(Number);
      t1 += a;
      t2 += b;
    }
    return [String(t1), String(t2)];
  }

  const parts = score.split(':');
  if (parts.length === 2) {
    return [parts[0].trim(), parts[1].trim()];
  }
  return [score, ''];
}

export function parseSetDetails(score: string, sport: string): ScoreDetail[] {
  const parenMatch = score.match(/\((.+)\)/);
  if (parenMatch) {
    return parenMatch[1]
      .split(',')
      .map((s, i) => ({
        label: `S${i + 1}`,
        value: s.replace(/set\d+\s*/, '').trim(),
      }))
      .filter(d => d.value.length > 0);
  }

  if (sport === 'basketball') {
    return score.split(',').map((q, i) => ({
      label: `Q${i + 1}`,
      value: q.trim(),
    }));
  }

  return [];
}
