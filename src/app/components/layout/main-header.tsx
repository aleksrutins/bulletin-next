import masthead from '@/app/masthead.png';
import Image from 'next/image';
import Link from 'next/link';

export default function MainHeader() {
    return (
        <header className="border-b p-6 bg-white flex flex-col gap-2 justify-center items-center relative z-50">
            <Link className="font-display text-lg p-0 m-0" href="/">
                <Image src={masthead} alt="The Bulldog Bulletin" width="247" height="32" placeholder='blur'/>
            </Link>
        </header>
    )
}