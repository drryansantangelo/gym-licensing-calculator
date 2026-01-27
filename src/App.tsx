import React, { useState } from 'react';
import { calculateTotalFees } from './utils/calculateFees';
import type { GymDetails, GymRoom, LicenseFee, MusicUseType } from './types';

const sanitizeInt = (v: string) => (v ? String(parseInt(v, 10) || '') : '');

const initialGymDetails: GymDetails = {
  numberOfLocations: 1,
  totalMembers: 0,
  rooms: [],
  squareFootage: 0,
  musicUseTypes: [],
  isHfaMember: false,
  isSoundtrackUser: false,
};

const musicUseOptions = [
  { label: 'Group Fitness Classes', value: 'group' },
  { label: 'Ambient Music', value: 'ambient' }
] as const;

function App() {
  const [gymDetails, setGymDetails] = useState<GymDetails>(initialGymDetails);
  const [fees, setFees] = useState<LicenseFee[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [rooms, setRooms] = useState<GymRoom[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'musicUse') {
        const musicType = value as MusicUseType;
        setGymDetails(prev => ({
          ...prev,
          musicUseTypes: checked 
            ? [...prev.musicUseTypes, musicType]
            : prev.musicUseTypes.filter(t => t !== musicType)
        }));
      } else {
        setGymDetails(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (type === 'number') {
      setGymDetails(prev => ({
        ...prev,
        [name]: Number(sanitizeInt(value))
      }));
    }
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { classesPerWeek: 0, classCapacity: 0 }]);
  };

  const handleRoomChange = (index: number, field: keyof GymRoom, value: string) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], [field]: Number(sanitizeInt(value)) };
    setRooms(newRooms);
    setGymDetails(prev => ({ ...prev, rooms: newRooms }));
  };

  const handleRemoveRoom = (index: number) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
    setGymDetails(prev => ({ ...prev, rooms: newRooms }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedFees = calculateTotalFees(gymDetails);
    setFees(calculatedFees);
    setShowResults(true);
  };

  const isFormValid = gymDetails.musicUseTypes.length > 0 && 
                     gymDetails.numberOfLocations > 0 &&
                     (!gymDetails.musicUseTypes.includes('group') || rooms.length > 0);

  const totalPerLocationFee = fees.reduce((sum, fee) => sum + fee.perLocationFee, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            2026 Gym Music Licensing Fee Calculator
          </h1>
          <img 
            src="/dynamic-media-logo.png" 
            alt="Dynamic Media" 
            className="h-10 w-auto mix-blend-darken"
          />
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Music Use Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Music Use Type *
              </label>
              <div className="space-y-2">
                {musicUseOptions.map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      name="musicUse"
                      value={option.value}
                      checked={gymDetails.musicUseTypes.includes(option.value)}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Locations *
                </label>
                <input
                  type="number"
                  name="numberOfLocations"
                  min="1"
                  step="1"
                  placeholder=""
                  value={gymDetails.numberOfLocations || ''}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-200 shadow-md focus:border-primary-500 focus:ring-primary-500 px-3 py-2 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Members (per location)
                </label>
                <input
                  type="number"
                  name="totalMembers"
                  min="0"
                  step="1"
                  placeholder=""
                  value={gymDetails.totalMembers || ''}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-200 shadow-md focus:border-primary-500 focus:ring-primary-500 px-3 py-2 bg-white"
                />
              </div>
            </div>

            {/* Group Fitness Rooms */}
            {gymDetails.musicUseTypes.includes('group') && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Group Fitness Rooms *</h3>
                <div className="space-y-4">
                  {rooms.map((room, index) => (
                    <div key={index} className="flex items-end gap-4 p-4 bg-gray-50 rounded-md">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room #{index + 1} - Classes per Week
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          placeholder=""
                          value={room.classesPerWeek || ''}
                          onChange={(e) => handleRoomChange(index, 'classesPerWeek', e.target.value)}
                          className="block w-full rounded-md border border-gray-200 shadow-md focus:border-primary-500 focus:ring-primary-500 px-3 py-2 bg-white"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room #{index + 1} - Class Capacity
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          placeholder=""
                          value={room.classCapacity || ''}
                          onChange={(e) => handleRoomChange(index, 'classCapacity', e.target.value)}
                          className="block w-full rounded-md border border-gray-200 shadow-md focus:border-primary-500 focus:ring-primary-500 px-3 py-2 bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveRoom(index)}
                        className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddRoom}
                    className="w-full py-2 px-4 border border-primary-500 text-primary-600 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add Room
                  </button>
                </div>
              </div>
            )}

            {/* Ambient Music Fields */}
            {gymDetails.musicUseTypes.includes('ambient') && (
              <div className="border-t border-gray-200 pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Square Footage (per location)
                  </label>
                  <input
                    type="number"
                    name="squareFootage"
                    min="0"
                    step="1"
                    placeholder=""
                    value={gymDetails.squareFootage || ''}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border border-gray-200 shadow-md focus:border-primary-500 focus:ring-primary-500 px-3 py-2 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Additional Fields */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isHfaMember"
                  checked={gymDetails.isHfaMember}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Health & Fitness Association (HFA) Member (5% discount)
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="isSoundtrackUser"
                  checked={gymDetails.isSoundtrackUser}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Are you a Soundtrack Your Brand user? (SESAC license not required)
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isFormValid 
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Calculate Fees
            </button>
          </div>
        </form>

        {showResults && (
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Per Location Licensing Fees</h2>
            
            {fees.map((fee) => (
              <div key={fee.organizationName} className="mb-6 last:mb-0">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {fee.organizationName}
                  {fee.message && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({fee.message})
                    </span>
                  )}
                </h3>
                <div className="space-y-1">
                  {fee.feeBreakdown.map((item, index) => {
                    const isDiscount = item.description.includes('Discount');
                    const isMaxAdj = item.description.includes('maximum applies');
                    const isMinAdj = item.description.includes('minimum applies');
                    
                    const textColor = (isDiscount || isMinAdj || isMaxAdj) ? 'text-green-600' : 'text-gray-900';
                    
                    const amountText = (isDiscount || isMaxAdj)
                      ? `($${Math.abs(item.amount).toFixed(2)})`
                      : `$${item.amount.toFixed(2)}`;

                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.description}</span>
                        <span className={textColor}>
                          {amountText}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                    <span>Per Location {fee.organizationName} Fee</span>
                    <span className="font-bold">${fee.perLocationFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Per Location Fee</span>
                <span>${totalPerLocationFee.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Multiply by your number of locations to get the total annual licensing cost.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 