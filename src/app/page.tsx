import bunImage from '@/assets/bun.webp';
import PictureImage from '@/components/PictureImage';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-center p-8">
      <h1 className="text-3xl text-center">
        <Link className="font-bold" href="https://github.com/dc7290/next-export-optimize-images/">
          next-export-optimize-images
        </Link>
        &nbsp;<br/>Example demo of &lt;picture&gt; tag
      </h1>
      <PictureImage className="rounded-sm mt-8 shadow-md shadow-black/30" src={bunImage} sizes="100vw" alt="a cute rabbit" />
    </main>
  )
}
