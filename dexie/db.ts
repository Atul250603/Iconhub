import { Preset } from '@/types';
import Dexie, { Table } from 'dexie';

export class IconHubDB extends Dexie {
  presets!: Table<Preset>;

  constructor() {
    super('IconHubDB');

    this.version(1).stores({
      presets: 'id, name'
    })
  }
}

export const iconHubDB = new IconHubDB();