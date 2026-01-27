import React, { useState, useEffect } from 'react';
import { calculateTotalFees } from './utils/calculateFees';
import type { GymDetails, GymRoom, LicenseFee, MusicUseType } from './types';
import Modal from './components/Modal';
import AscapModalContent from './components/AscapModalContent';
import BmiModalContent from './components/BmiModalContent';
import SesacModalContent from './components/SesacModalContent';
import GmrModalContent from './components/GmrModalContent';
import HowToGetAscapLicenseModal from './components/HowToGetAscapLicenseModal';
import HowToGetBmiLicenseModal from './components/HowToGetBmiLicenseModal';
import HowToGetSesacLicenseModal from './components/HowToGetSesacLicenseModal';
import HowToGetGmrLicenseModal from './components/HowToGetGmrLicenseModal';

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

type OrgName = 'ASCAP' | 'BMI' | 'SESAC' | 'GMR';
type ModalContentType = 'calculation' | 'howto';
interface ActiveModal {
  org: OrgName;
  contentType: ModalContentType;
}

function App() {
  const [gymDetails, setGymDetails] = useState<GymDetails>(initialGymDetails);
  const [fees, setFees] = useState<LicenseFee[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [rooms, setRooms] = useState<GymRoom[]>([]);
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'musicUse') {
        const musicType = value as MusicUseType;
        setGymDetails(prev => {
          const newMusicUseTypes = checked
            ? [...prev.musicUseTypes, musicType]
            : prev.musicUseTypes.filter(t => t !== musicType);
          
          const newSquareFootage = musicType === 'ambient' && !checked ? 0 : prev.squareFootage;
          
          return {
            ...prev,
            musicUseTypes: newMusicUseTypes,
            squareFootage: newSquareFootage
          };
        });
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
    
    if (hasAttemptedSubmit) {
      setValidationErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(name);
        return newErrors;
      });
    }
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { classesPerWeek: 0, classCapacity: 0 }]);
    if (hasAttemptedSubmit) {
      setValidationErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete('groupFitnessRooms');
        return newErrors;
      });
    }
  };

  const handleRoomChange = (index: number, field: keyof GymRoom, value: string) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], [field]: Number(sanitizeInt(value)) };
    setRooms(newRooms);
    setGymDetails(prev => ({ ...prev, rooms: newRooms }));
    
    if (hasAttemptedSubmit) {
      setValidationErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(`room-${index}-${field}`);
        return newErrors;
      });
    }
  };

  const handleRemoveRoom = (index: number) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
    setGymDetails(prev => ({ ...prev, rooms: newRooms }));
    
    if (hasAttemptedSubmit) {
      setValidationErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(`room-${index}-classesPerWeek`);
        newErrors.delete(`room-${index}-classCapacity`);
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    
    const errors = new Set<string>();
    
    if (gymDetails.numberOfLocations < 1) {
      errors.add('numberOfLocations');
    }
    
    if (gymDetails.totalMembers <= 0) {
      errors.add('totalMembers');
    }
    
    if (gymDetails.musicUseTypes.includes('ambient') && gymDetails.squareFootage <= 0) {
      errors.add('squareFootage');
    }
    
    if (gymDetails.musicUseTypes.includes('group')) {
      if (rooms.length === 0) {
        errors.add('groupFitnessRooms');
      } else {
        rooms.forEach((room, index) => {
          if (room.classesPerWeek <= 0) {
            errors.add(`room-${index}-classesPerWeek`);
          }
          if (room.classCapacity <= 0) {
            errors.add(`room-${index}-classCapacity`);
          }
        });
      }
    }
    
    if (gymDetails.musicUseTypes.length === 0) {
      errors.add('musicUse');
    }
    
    setValidationErrors(errors);
    
    if (errors.size > 0) {
      return;
    }
    
    const calculatedFees = calculateTotalFees(gymDetails);
    setFees(calculatedFees);
    setShowResults(true);
    
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const openModal = (org: OrgName, contentType: ModalContentType) => {
    setActiveModal({ org, contentType });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getModalContent = () => {
    if (!activeModal) return null;

    const { org, contentType } = activeModal;

    if (contentType === 'calculation') {
      switch (org) {
        case 'ASCAP': return <AscapModalContent />;
        case 'BMI': return <BmiModalContent />;
        case 'SESAC': return <SesacModalContent />;
        case 'GMR': return <GmrModalContent />;
        default: return null;
      }
    } else {
      switch (org) {
        case 'ASCAP': return <HowToGetAscapLicenseModal />;
        case 'BMI': return <HowToGetBmiLicenseModal />;
        case 'SESAC': return <HowToGetSesacLicenseModal />;
        case 'GMR': return <HowToGetGmrLicenseModal />;
        default: return null;
      }
    }
  };
  
  const totalAnnualFee = fees.reduce((sum, fee) => sum + fee.perLocationFee, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              2026 Gym Music Licensing Fee Calculator
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Based on official ASCAP, BMI, SESAC & GMR rate schedules for U.S. fitness clubs
            </p>
          </div>
          <a href="https://dynamicmediamusic.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img 
              src="/dynamic-media-logo.png" 
              alt="Dynamic Media" 
              className="h-10 w-auto mix-blend-darken"
            />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you use music? <span className="text-red-500">*</span>
              </label>
              <div className={`space-y-2 ${validationErrors.has('musicUse') ? 'border-2 border-red-500 rounded-md p-3 bg-red-50' : ''}`}>
                {musicUseOptions.map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      name="musicUse"
                      value={option.value}
                      checked={gymDetails.musicUseTypes.includes(option.value)}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {validationErrors.has('musicUse') && (
                <p className="text-red-600 text-sm mt-1">Please select at least one music use type</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Locations <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="numberOfLocations"
                  min="1"
                  step="1"
                  placeholder="e.g., 1"
                  value={gymDetails.numberOfLocations || ''}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 bg-white ${
                    validationErrors.has('numberOfLocations') ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {validationErrors.has('numberOfLocations') && (
                  <p className="text-red-600 text-sm mt-1">Number of locations is required</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Members (per location) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="totalMembers"
                  min="1"
                  step="1"
                  placeholder="e.g., 500"
                  value={gymDetails.totalMembers || ''}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 bg-white ${
                    validationErrors.has('totalMembers') ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {validationErrors.has('totalMembers') && (
                  <p className="text-red-600 text-sm mt-1">Total members is required</p>
                )}
              </div>
            </div>

            {gymDetails.musicUseTypes.includes('ambient') && (
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Square Footage (per location) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="squareFootage"
                  min="1"
                  step="1"
                  placeholder="e.g., 5000"
                  value={gymDetails.squareFootage || ''}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 bg-white ${
                    validationErrors.has('squareFootage') ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {validationErrors.has('squareFootage') && (
                  <p className="text-red-600 text-sm mt-1">Square footage is required for ambient music</p>
                )}
              </div>
            )}

            {gymDetails.musicUseTypes.includes('group') && (
              <div className={`border-t border-gray-200 pt-6 ${validationErrors.has('groupFitnessRooms') ? 'border-2 border-red-500 rounded-md p-3 bg-red-50' : ''}`}>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  Group Fitness Rooms <span className="text-red-500">*</span>
                  <span className="relative group">
                    <span className="text-gray-400 hover:text-gray-600 cursor-help text-base" title="Enter each room where instructor-led group fitness classes are held. For each room, provide the number of classes per week and the maximum class capacity.">ⓘ</span>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Enter each room where instructor-led group fitness classes are held. For each room, provide the number of classes per week and the maximum class capacity.
                    </span>
                  </span>
                </h3>
                <div className="space-y-4">
                  {rooms.map((room, index) => (
                    <div key={index} className="flex items-end gap-4 p-4 bg-gray-50 rounded-md">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room #{index + 1} - Classes per Week
                        </label>
                        <input
                          type="number"
                          name={`room-${index}-classesPerWeek`}
                          min="1"
                          step="1"
                          placeholder="e.g., 10"
                          value={room.classesPerWeek || ''}
                          onChange={(e) => handleRoomChange(index, 'classesPerWeek', e.target.value)}
                          className={`block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 bg-white ${
                            validationErrors.has(`room-${index}-classesPerWeek`) ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        <p className="text-xs text-gray-500 mt-1">Instructor-led classes held in this room each week</p>
                        {validationErrors.has(`room-${index}-classesPerWeek`) && (
                          <p className="text-red-600 text-sm mt-1">Classes per week is required</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room #{index + 1} - Class Capacity
                        </label>
                        <input
                          type="number"
                          name={`room-${index}-classCapacity`}
                          min="1"
                          step="1"
                          placeholder="e.g., 25"
                          value={room.classCapacity || ''}
                          onChange={(e) => handleRoomChange(index, 'classCapacity', e.target.value)}
                          className={`block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 bg-white ${
                            validationErrors.has(`room-${index}-classCapacity`) ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        <p className="text-xs text-gray-500 mt-1">Maximum number of participants per class</p>
                        {validationErrors.has(`room-${index}-classCapacity`) && (
                          <p className="text-red-600 text-sm mt-1">Class capacity is required</p>
                        )}
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
                    className="w-full py-2 px-4 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Room
                  </button>
                </div>
                {validationErrors.has('groupFitnessRooms') && (
                  <p className="text-red-600 text-sm mt-2">At least one group fitness room is required</p>
                )}
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isHfaMember"
                  checked={gymDetails.isHfaMember}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                  Health & Fitness Association (HFA) Member (5% discount)
                  <span className="relative group">
                    <span className="text-gray-400 hover:text-gray-600 cursor-help">ⓘ</span>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 p-3 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
                      <strong className="block mb-1">HFA Member Discount</strong>
                      Health & Fitness Association (HFA) members receive a 5% discount on ASCAP and BMI music licensing fees. Join or verify membership at{' '}
                      <a href="https://healthandfitness.org" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-200">healthandfitness.org</a>.
                    </span>
                  </span>
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="isSoundtrackUser"
                  checked={gymDetails.isSoundtrackUser}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Fees
            </button>
          </div>
        </form>

        {showResults && (
          <div id="results-section" className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Per Location Licensing Fees</h2>
            
            {fees.map((fee) => (
              <div key={fee.organizationName} className="mb-6 last:mb-0">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  <span>{fee.organizationName}</span>
                  {fee.message && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({fee.message})
                    </span>
                  )}
                </h3>
                <div className="text-xs space-x-2 mb-3">
                  <button onClick={() => openModal(fee.organizationName as OrgName, 'calculation')} className="font-normal text-blue-600 hover:underline">[How is this calculated?]</button>
                  <span className="text-gray-400">•</span>
                  <button onClick={() => openModal(fee.organizationName as OrgName, 'howto')} className="font-normal text-blue-600 hover:underline">[How do I get this license?]</button>
                </div>
                <div className="space-y-1">
                  {fee.feeBreakdown.map((item, index) => {
                    const breakdownKey = `${fee.organizationName}-breakdown-${index}`;
                    const isDiscount = item.description.includes('Discount');
                    const isMaxAdj = item.description.includes('maximum applies');
                    const isMinAdj = item.description.includes('minimum applies');
                    const isHfaAdj = item.description.includes('HFA');
                    
                    let textColor = 'text-gray-900';
                    if (isDiscount) {
                      textColor = 'text-green-600';
                    } else if (isMaxAdj || isMinAdj || isHfaAdj) {
                      textColor = 'text-blue-600';
                    }

                    return (
                      <div key={breakdownKey} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.description}</span>
                        <span className={textColor}>
                          {item.amount >= 0 ? '+' : ''}${item.amount.toFixed(2)}
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
                <span>${totalAnnualFee.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Multiply by your number of locations to get the total annual licensing cost.
              </p>
            </div>
          </div>
        )}

        {/* Modal */}
        {activeModal && (
          <Modal 
            isOpen={!!activeModal} 
            onClose={closeModal} 
            title={`About ${activeModal.org} Licensing`}
          >
            {getModalContent()}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App; 