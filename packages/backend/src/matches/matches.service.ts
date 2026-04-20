import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { SPORT_CONFIG } from '@sc-test/shared';
import type { RawMatch, ParsedMatch, Score, SportType } from '@sc-test/shared';

const COLLECTION = 'matches';

const SEED_DATA: RawMatch[] = [
  {
    sport: 'soccer',
    participant1: 'Chelsea',
    participant2: 'Arsenal',
    score: '2:1',
  },
  {
    sport: 'volleyball',
    participant1: 'Germany',
    participant2: 'France',
    score: '3:0,25:23,25:19,25:21',
  },
  {
    sport: 'handball',
    participant1: 'Pogoń Szczecin',
    participant2: 'Azoty Puławy',
    score: '34:26',
  },
  {
    sport: 'basketball',
    participant1: 'GKS Tychy',
    participant2: 'GKS Katowice',
    score: [
      ['9:7', '2:1'],
      ['5:3', '9:9'],
    ],
  },
  {
    sport: 'tennis',
    participant1: 'Maria Sharapova',
    participant2: 'Serena Williams',
    score: '2:1,7:6,6:3,6:7',
  },
];

@Injectable()
export class MatchesService implements OnModuleInit {
  private readonly logger = new Logger(MatchesService.name);
  private inMemoryMatches: Map<string, RawMatch & { isLive: boolean }> = new Map();

  constructor(private firestore: FirestoreService) {}

  async onModuleInit() {
    if (this.firestore.ready) {
      try {
        await this.seedIfEmpty();
        return;
      } catch (err) {
        this.logger.warn(`Firestore unavailable: ${err}. Falling back to in-memory.`);
      }
    }

    this.seedInMemory();
  }

  private seedInMemory() {
    for (let i = 0; i < SEED_DATA.length; i++) {
      this.inMemoryMatches.set(`mem-${i}`, { ...SEED_DATA[i], isLive: true });
    }
    this.logger.log(`Loaded ${this.inMemoryMatches.size} matches in-memory (Firestore unavailable)`);
  }

  private async seedIfEmpty() {
    const col = this.firestore.collection(COLLECTION);
    const snapshot = await col.get();

    if (!snapshot.empty) {
      this.logger.log(`Firestore already has ${snapshot.size} matches, skipping seed`);
      return;
    }

    this.logger.log('Seeding Firestore with match data...');
    const batch = this.firestore.collection(COLLECTION).firestore.batch();

    for (const match of SEED_DATA) {
      const ref = col.doc();
      batch.set(ref, {
        ...match,
        score: typeof match.score === 'object' ? JSON.stringify(match.score) : match.score,
        isLive: true,
        createdAt: new Date().toISOString(),
      });
    }

    await batch.commit();
    this.logger.log(`Seeded ${SEED_DATA.length} matches`);
  }

  formatMatch(id: string, raw: RawMatch & { isLive?: boolean; score?: Score | string }): ParsedMatch | null {
    const config = SPORT_CONFIG[raw.sport];
    if (!config || !raw.participant1 || !raw.participant2 || raw.score === undefined) {
      return null;
    }

    let score = raw.score;
    if (typeof score === 'string' && raw.sport === 'basketball') {
      try {
        score = JSON.parse(score) as Score;
      } catch {
        return null;
      }
    }

    try {
      const name = `${raw.participant1}${config.nameSeparator}${raw.participant2}`;
      const formattedScore = config.formatScore(score as Score);

      return {
        id,
        name,
        score: formattedScore,
        sport: raw.sport as SportType,
        participant1: raw.participant1,
        participant2: raw.participant2,
        isLive: raw.isLive ?? false,
      };
    } catch (err) {
      this.logger.warn(`Failed to format match ${id}: ${err}`);
      return null;
    }
  }

  async findAll(): Promise<ParsedMatch[]> {
    if (!this.firestore.ready || this.inMemoryMatches.size > 0) {
      return this.findAllInMemory();
    }

    const snapshot = await this.firestore.collection(COLLECTION).get();
    const matches: ParsedMatch[] = [];

    for (const doc of snapshot.docs) {
      const parsed = this.formatMatch(doc.id, doc.data() as RawMatch & { isLive?: boolean });
      if (parsed) {
        matches.push(parsed);
      }
    }

    return matches;
  }

  private findAllInMemory(): ParsedMatch[] {
    const matches: ParsedMatch[] = [];
    for (const [id, raw] of this.inMemoryMatches) {
      const parsed = this.formatMatch(id, raw);
      if (parsed) {
        matches.push(parsed);
      }
    }
    return matches;
  }

  async exists(matchId: string): Promise<boolean> {
    if (!this.firestore.ready || this.inMemoryMatches.size > 0) {
      return this.inMemoryMatches.has(matchId);
    }
    const doc = await this.firestore.collection(COLLECTION).doc(matchId).get();
    return doc.exists;
  }

  async updateScore(matchId: string, score: Score): Promise<ParsedMatch | null> {
    if (!this.firestore.ready || this.inMemoryMatches.size > 0) {
      return this.updateScoreInMemory(matchId, score);
    }

    const ref = this.firestore.collection(COLLECTION).doc(matchId);
    const doc = await ref.get();

    if (!doc.exists) {
      return null;
    }

    const storedScore = typeof score === 'object' ? JSON.stringify(score) : score;
    await ref.update({ score: storedScore });

    const updated = await ref.get();
    return this.formatMatch(matchId, updated.data() as RawMatch & { isLive?: boolean });
  }

  private updateScoreInMemory(matchId: string, score: Score): ParsedMatch | null {
    const match = this.inMemoryMatches.get(matchId);
    if (!match) return null;

    match.score = score;
    return this.formatMatch(matchId, match);
  }
}
