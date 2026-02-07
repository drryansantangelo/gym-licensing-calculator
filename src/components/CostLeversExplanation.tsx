import React from 'react';

export default function CostLeversExplanation() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Why licensing costs vary for gyms
      </h3>
      
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        Music licensing costs aren't one-size-fits-all. Two main factors determine what you need and what you pay:
      </p>

      <div className="space-y-4">
        {/* Lever 1 */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold">1</span>
            How music is used
          </h4>
          <div className="pl-8 space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-800">Ambient music only:</p>
              <p className="text-sm text-gray-600">
                Background music in gym areas, lobbies, and common spaces. This is the simpler scenario—fewer licensing requirements.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Instructor-led group fitness classes:</p>
              <p className="text-sm text-gray-600">
                Curated music for classes like yoga, spin, or aerobics. This requires additional licensing from ASCAP, BMI, and GMR based on class capacity and frequency.
              </p>
            </div>
          </div>
        </div>

        {/* Lever 2 */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
          <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold">2</span>
            Where music comes from
          </h4>
          <div className="pl-8 space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-800">Direct licensing:</p>
              <p className="text-sm text-gray-600">
                You source your own music (Spotify, Apple Music, playlists) and license it separately through each PRO (ASCAP, BMI, SESAC, GMR). Requires managing 4 separate contracts.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Licensed music platforms:</p>
              <p className="text-sm text-gray-600">
                Services like Soundtrack Your Brand that provide commercial-licensed music and handle certain PRO obligations through the platform. Simplifies ambient music licensing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-gray-800">
          <strong className="text-blue-900">The key insight:</strong> Different combinations of these factors lead to 
          different costs and complexity levels. Understanding your specific situation helps you avoid overpaying and 
          ensures proper coverage.
        </p>
      </div>
    </div>
  );
}
