import { SPORT_CONFIG } from '@sc-test/shared';
export function parseMatchClient(match, index) {
    const config = SPORT_CONFIG[match.sport];
    if (!config) {
        return { parsed: null, error: `Unknown sport: "${match.sport}"` };
    }
    if (!match.participant1 || !match.participant2) {
        return { parsed: null, error: 'Missing participant data' };
    }
    if (match.score == null) {
        return { parsed: null, error: 'Missing score' };
    }
    try {
        const name = `${match.participant1}${config.nameSeparator}${match.participant2}`;
        const score = config.formatScore(match.score);
        return {
            parsed: {
                id: `demo-${index}`,
                name,
                score,
                sport: match.sport,
                participant1: match.participant1,
                participant2: match.participant2,
                isLive: false,
            },
            error: null,
        };
    }
    catch {
        return { parsed: null, error: 'Invalid score format for this sport' };
    }
}
