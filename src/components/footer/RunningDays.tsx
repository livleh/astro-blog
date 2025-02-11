import { useLayoutEffect, useState } from 'react'
import { footer } from '@/config.json'
import { getDiffInDays } from '@/utils/date'

export function RunningDays() {
  const [days, setDays] = useState(0)

  useLayoutEffect(() => {
    const diffDays = getDiffInDays(new Date(footer.startTime))
    setDays(diffDays)
  }, [])

  if (days < 0) {
    return <span>Oops! Nothing here yet</span>
  }

  return <span>Online for {days} days</span>
}
