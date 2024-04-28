import masthead from '@/app/masthead.png';
import { abril } from '@/fonts';
import Image from 'next/image';
import Link from 'next/link';

export default function ArticleHeader({
    title, author
}: {
    title: string, author: string
}) {
    return (<>
        <header className="fixed top-0 left-0 w-screen bg-white p-2 shadow-lg flex flex-row justify-center items-center gap-3 z-[1]">
            <p className={abril.className}>{title}</p>
            •
            <p>
                <em>{author}</em>
            </p>
        </header>
        <header className="border-b p-6 bg-white flex flex-col gap-2 justify-center items-center relative z-50">
            <Link className="font-display text-lg p-0 m-0" href="/">
                <Image src={masthead} alt="The Bulldog Bulletin" width="247" height="32" placeholder='blur'/>
            </Link>
        </header>
    </>)
}