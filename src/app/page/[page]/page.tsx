import MainHeader from "@/components/layout/main-header";
import directus, { Article, Issue } from "@/directus";
import { aggregate, readItems } from "@directus/sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

const perPage = 10;

export const revalidate = 600

const readArticles = (page: number) =>
  directus.request(readItems("articles", {
    fields: ["id", "title", "author", "issue", "column", "categories", "published_at"],
    filter: {
      status: {
        _eq: "published"
      }
    },
    sort: "-published_at",
    offset: perPage * (page - 1),
    limit: perPage
  }))

const readLatestIssue = async () =>
  (await directus.request(readItems('issues', {
    fields: ['id', 'published_at'],
    filter: {
      status: {
        _eq: 'published'
      }
    },
    limit: 1
  })))[0];

export const getData = (async (page: number) => {
  const articles = await readArticles(page);

  const latestIssue = await readLatestIssue();

  const totalArticles = await directus.request(aggregate('articles', { aggregate: { count: '*' } })) 
  return { articles, totalArticles: parseInt(totalArticles[0]!.count!), latestIssue }
})

export default async function Index({
  params: { page }
}: {
  params: { page: string }
}) {
  const pageNumber = parseInt(page);
  const { articles, latestIssue, totalArticles } = await getData(pageNumber);
  return (
    <>
      <MainHeader/>
      <main className="w-[800px] max-[800px]:w-screen m-auto mt-2 p-4">
        { latestIssue && 
        <Link className="block p-3 bg-emerald-100 text-sm font-bold mb-5" href={`/issues/${latestIssue.id}`}>
          Latest issue: <time dateTime={latestIssue.published_at!}>{(new Date(latestIssue.published_at!)).toLocaleDateString()}</time>    
        </Link>}
        <ul>
          {articles.map(article => <li key={article.id}>{article.title}</li>)}
        </ul>
        
        <div className="flex items-center justify-center">
          {pageNumber != 1 && <Link href={`/page/${pageNumber - 1}`} className="block">Previous Page</Link>}
          { (perPage * pageNumber) < totalArticles && <Link href={`/page/${pageNumber + 1}`} className="block">Next Page</Link>}
        </div>
      </main>
    </>
  );
}