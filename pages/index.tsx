import dynamic from 'next/dynamic'

// Dynamically load the React Router-based App component client-side only
const App = dynamic(() => import('../src/App'), { ssr: false })

export default function HomePage() {
  return <App />
}
