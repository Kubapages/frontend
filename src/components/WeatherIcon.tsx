import type { WeatherCondition } from '../types'

type Props = {
  condition: WeatherCondition
  size?: number
  title?: string
}

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export default function WeatherIcon({ condition, size = 20, title }: Props) {
  const common = { ...baseProps, width: size, height: size, role: 'img', 'aria-label': title ?? condition }

  switch (condition) {
    case 'clear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M4.9 4.9l1.4 1.4" />
          <path d="M17.7 17.7l1.4 1.4" />
          <path d="M19.1 4.9l-1.4 1.4" />
          <path d="M6.3 17.7l-1.4 1.4" />
        </svg>
      )

    case 'clouds':
      return (
        <svg {...common}>
          <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.4 1.7A3.5 3.5 0 0 0 7 18z" />
        </svg>
      )

    case 'rain':
      return (
        <svg {...common}>
          <path d="M7 15h10a4 4 0 0 0 0-8 6 6 0 0 0-11.4 1.7A3.5 3.5 0 0 0 7 15z" />
          <path d="M8 19l1-2" />
          <path d="M12 19l1-2" />
          <path d="M16 19l1-2" />
        </svg>
      )

    case 'snow':
      return (
        <svg {...common}>
          <path d="M7 14h10a4 4 0 0 0 0-8 6 6 0 0 0-11.4 1.7A3.5 3.5 0 0 0 7 14z" />
          <circle cx="9" cy="18" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="18" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="15" cy="18" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'storm':
      return (
        <svg {...common}>
          <path d="M7 14h10a4 4 0 0 0 0-8 6 6 0 0 0-11.4 1.7A3.5 3.5 0 0 0 7 14z" />
          <path d="M13 14l-3 5h3l-2 3" />
        </svg>
      )

    case 'fog':
      return (
        <svg {...common}>
          <path d="M6 10h12" />
          <path d="M4 14h16" />
          <path d="M6 18h12" />
        </svg>
      )
  }
}
