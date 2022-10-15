import { useRouter } from 'next/router';
import React from 'react'

const Month = () => {
  const router = useRouter();
  const { month } = router.query;
  return (
    <div>{month}</div>
  )
}

export default Month