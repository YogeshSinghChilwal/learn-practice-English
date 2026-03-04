import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto p-4 flex justify-between">
        <h1 className="text-xl font-bold text-blue-600">
          English4Officers
        </h1>

        <div className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/vocab">Vocabulary</Link>
          <Link href="/editorial">Editorial</Link>
          <Link href="/grammar">Grammar</Link>
          <Link href="/practice">Practice</Link>
        </div>
      </div>
    </nav>
  )
}