export default function FeatureCard({ title, desc }: {title: string, desc: string}) {
  return (
    <div className="bg-white p-6 rounded shadow">

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {desc}
      </p>

    </div>
  )
}