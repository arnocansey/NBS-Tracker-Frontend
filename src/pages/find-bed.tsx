// import HospitalDiscovery from '../components/HospitalDiscovery';
import dynamic from 'next/dynamic';
// import Header from '../components/Header';

const HospitalDiscovery = dynamic(
  () => import('../components/HospitalDiscovery'),
  { ssr: false } // This is the secret sauce!
);

export default function PublicFinderPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-blue-600 p-4 text-white shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">NBS Regional Finder</h1>
          <a href="/login" className="text-sm bg-blue-700 px-3 py-1 rounded">Staff Login</a>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Find a Hospital Bed</h2>
            <p className="mt-2 text-gray-600">Real-time availability across the Central Region</p>
          </div>
          
          {/* This is the component we wrote in the previous step */}
          <HospitalDiscovery />
        </div>
      </main>
    </div>
  );
}