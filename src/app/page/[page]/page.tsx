import MainHeader from "@/app/components/layout/main-header";
import directus, { Article, Issue } from "@/directus";
import { getData, perPage } from "@/app/util/listing";
import { aggregate, readItems } from "@directus/sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ArticlePreview } from "@/app/components/lists/article-preview";

export const revalidate = 600

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
          {articles.map(article => <li key={article.id}>
            <ArticlePreview {...article}/>
          </li>)}
        </ul>
        
        <div className="flex items-center justify-center">
          {pageNumber != 1 && <Link href={`/page/${pageNumber - 1}`} className="block">Previous Page</Link>}
          { (perPage * pageNumber) < totalArticles && <Link href={`/page/${pageNumber + 1}`} className="block">Next Page</Link>}
        </div>
      </main>
    </>
  );
}