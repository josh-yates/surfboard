import type { Surfboard } from '../models/surfboard';

export abstract class SurfboardParser {
    public static parse(raw: string): Surfboard {
        return JSON.parse(raw) as Surfboard;
    }
}