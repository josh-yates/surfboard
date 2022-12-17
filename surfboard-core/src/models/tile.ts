import type { TileType } from "./tileType";

export class Tile {
    type: TileType;
    config: any;
    rows: number;
    columns: number;
    title: number;
    id: string;
}