import { ArticleListing } from "@/app/util/listing";
import { abril } from "@/fonts";
import Link from "next/link";
import Date from "../util/date";

export function ArticlePreview(article: ArticleListing) {
    return <div className="flex flex-col border-b mb-2">
        <Link href={`/articles/${article.id}`} className={`font-bold text-xl`}>{article.title}</Link>
        <p className="text-gray-900 mt-[2px] mb-0">
            <a>{article.author}</a>
            <span> • </span>
            <Date dateString={article.published_at!}/>
            <span> • </span>
            <Link href={`/issues/${article.issue}`}>Issue #{article.issue as number}</Link>
            {(article.categories as string[]).map(cat => <span key={cat}>
                <span> • </span>
                <a href={`/c/${cat}`}>{cat}</a>
            </span>)}
        </p>

        <p className="my-3">{article.summary}</p>
    </div>
}