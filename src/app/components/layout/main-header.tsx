import masthead from '@/app/masthead.png';
import Image from 'next/image';
import Link from 'next/link';

const headerCategories = ['Sports', 'Drama', 'Academics', 'Opinion', 'Humor']

export default function MainHeader() {
    return (
        <header className="border-b p-6 bg-white flex flex-col gap-4 justify-center items-center relative z-50">
            <Link className="font-display text-lg p-0 m-0" href="/">
                <Image src={masthead} alt="The Bulldog Bulletin" width="247" height="32" placeholder='blur'/>
            </Link>
            <nav className="flex flex-row gap-3 [a]:block [a]:no-underline">
                {headerCategories.map(cat => <a href={`/c/${cat}`}>{cat}</a>)}
            </nav>
        </header>
    )
}