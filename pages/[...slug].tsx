import dynamic from 'next/dynamic'

// Mount the React Router-based App for any non-root path (client-side only)
const App = dynamic(() => import('../src/App'), { ssr: false })

export default function CatchAllPage() {
  return <App />
}
