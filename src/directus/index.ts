import { createDirectus, graphql, rest } from "@directus/sdk";
import type { Schema } from './types';

export type Article = Schema['articles'][number];
export type Issue = Schema['issues'][number];
export type Column = Schema['columns'][number];
export default createDirectus<Schema>(process.env.DIRECTUS_URL ?? 'https://bulletin-cms.burrburton.org/').with(rest());