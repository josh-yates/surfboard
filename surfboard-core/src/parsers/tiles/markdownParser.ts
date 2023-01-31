import type { Markdown } from '../../models/tiles/markdown';

export abstract class MarkdownParser {
    public static parse(raw: any): Markdown {
        if (typeof raw !== 'string') return raw as Markdown;
        return JSON.parse(raw) as Markdown;
    }
}