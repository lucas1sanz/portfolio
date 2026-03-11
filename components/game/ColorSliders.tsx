interface RGB { r: number; g: number; b: number }

interface Props {
  value: RGB
  onChange: (val: RGB) => void
  disabled?: boolean
}

export default function ColorSliders({ value, onChange, disabled }: Props) {
  const channels: { key: keyof RGB; label: string; color: string }[] = [
    { key: 'r', label: 'Red', color: 'accent-red-500' },
    { key: 'g', label: 'Green', color: 'accent-green-500' },
    { key: 'b', label: 'Blue', color: 'accent-blue-500' },
  ]

  return (
    <div className="space-y-4">
      {channels.map(({ key, label, color }) => (
        <div key={key} className="flex items-center gap-4">
          <span className="text-gray-400 text-sm w-12">{label}</span>
          <input
            type="range"
            min={0}
            max={255}
            value={value[key]}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, [key]: Number(e.target.value) })}
            className={`flex-1 h-2 rounded-full ${color} disabled:opacity-50`}
          />
          <span className="text-gray-300 text-sm w-8 text-right">{value[key]}</span>
        </div>
      ))}
    </div>
  )
}
