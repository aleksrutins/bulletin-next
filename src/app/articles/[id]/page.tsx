import ArticleHeader from "@/app/components/layout/article-header";
import Date from "@/app/components/util/date";
import directus from "@/directus"
import { abril } from "@/fonts";
import { readItem } from "@directus/sdk"

export default async  function ArticlePage({
    params: { id }
}: {
    params: { id: string }
}) {
    const article = await directus.request(readItem('articles', id));

    if(!article) return <h1>Not Found</h1>;

    return (
        <>
            <ArticleHeader title={article.title!} author={article.author!} />
            <main className="w-[800px] max-[800px]:w-screen m-auto mt-2 p-4">
                <header>
                    <h1 className={`text-[32pt] ${abril.className}`}>{article.title}</h1>
                    <summary className="border-b pb-[10px] text-[14pt] italic marker:content-none">{article.summary}</summary>
                    <div className="flex flex-row justify-start items-center gap-1 mt-2 text-gray-700 text-sm">
                        <div className="flex flex-col items-start gap-1">
                            <p className="font-bold">{article.author}</p>
                            <Date dateString={article.published_at!}/>
                        </div>
                    </div>
                </header>
                <article className="prose pt-[20px] text-[14pt]" dangerouslySetInnerHTML={{ __html: article.content! }} />
            </main>
        </>
    )
}