import directus from "@/directus";
import { readItems, aggregate } from "@directus/sdk";

export const perPage = 10;

export const readArticles = (page: number, filter = {}) =>
    directus.request(readItems("articles", {
      fields: ["id", "title", "author", "issue", "column", "summary", "categories", "published_at"],
      filter: {
        ...filter,
        status: {
          _eq: "published"
        }
      },
      sort: "-published_at",
      offset: perPage * (page - 1),
      limit: perPage
    }))

export type ArticleListing = ReturnType<typeof readArticles> extends Promise<infer T> ? T[any] : never;
  
export const readLatestIssue = async () =>
    (await directus.request(readItems('issues', {
      fields: ['id', 'published_at'],
      filter: {
        status: {
          _eq: 'published'
        }
      },
      limit: 1
    })))[0];

export type IssueListing = ReturnType<typeof readLatestIssue> extends Promise<infer T> ? T : never;
  
export const getData = (async (page: number, articlesFilter = {}) => {
    const articles = await readArticles(page, articlesFilter);
  
    const latestIssue = await readLatestIssue();
  
    const totalArticles = await directus.request(aggregate('articles', { aggregate: { count: '*' } })) 
    return { articles, totalArticles: parseInt(totalArticles[0]!.count!), latestIssue }
})
  