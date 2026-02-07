import React, { useState, useEffect, useRef } from 'react';
import { calculateTotalFees } from './utils/calculateFees';
import { calculateAllScenarios, type ScenarioResult } from './utils/calculateScenarios';
import type { GymDetails, GymRoom, LicenseFee, MusicUseType } from './types';
import Modal from './components/Modal';
import SimpleBaselineCost from './components/SimpleBaselineCost';
import TwoWaysComparison from './components/TwoWaysComparison';
import RecommendedSetupPanel from './components/RecommendedSetupPanel';
import ReassuranceFooter from './components/ReassuranceFooter';
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
  totalMembers: 1000,
  rooms: [],
  squareFootage: 5000,
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
  const [scenarios, setScenarios] = useState<{
    baseline: ScenarioResult;
    dynamicMediaAmbient: ScenarioResult;
    dynamicMediaInstructed: ScenarioResult;
  } | null>(null);
  const [showRecommendedSetup, setShowRecommendedSetup] = useState(false);
  const recommendedSetupRef = useRef<HTMLDivElement>(null);

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
        
        // Auto-expand room input when Group Fitness is selected
        if (musicType === 'group' && checked && rooms.length === 0) {
          setRooms([{ classesPerWeek: 0, classCapacity: 0 }]);
        }
        // Remove all rooms when Group Fitness is unchecked
        if (musicType === 'group' && !checked) {
          setRooms([]);
        }
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
    
    // Calculate all scenarios
    const calculatedScenarios = calculateAllScenarios(gymDetails);
    setScenarios(calculatedScenarios);
    
    setShowResults(true);
    setShowRecommendedSetup(false); // Reset when recalculating
    
    // Track completion
    handleCalculatorCompleted();
    
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

  // Event tracking functions
  const trackEvent = (eventName: string, data?: Record<string, any>) => {
    console.log('Event:', eventName, data);
    // TODO: Add HubSpot or analytics tracking here
    // window.dataLayer?.push({ event: eventName, ...data });
  };

  const handleCalculatorCompleted = () => {
    trackEvent('calculator_completed', {
      numberOfLocations: gymDetails.numberOfLocations,
      musicUseTypes: gymDetails.musicUseTypes,
      hasInstructorLed: gymDetails.musicUseTypes.includes('group')
    });
  };

  const handleProBreakdownOpened = () => {
    trackEvent('pro_breakdown_opened');
  };

  const handleRecommendedSetupOpened = () => {
    setShowRecommendedSetup(true);
    trackEvent('recommended_setup_opened');
  };

  // Scroll to recommended setup section when it opens
  useEffect(() => {
    if (showRecommendedSetup && recommendedSetupRef.current) {
      // Use setTimeout to ensure the component has fully rendered
      setTimeout(() => {
        recommendedSetupRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Optional: Set focus for accessibility
        recommendedSetupRef.current?.focus({ preventScroll: true });
      }, 100);
    }
  }, [showRecommendedSetup]);

  const handleReviewConfirmClicked = () => {
    trackEvent('review_confirm_clicked');
    // Redirect to consultation/review form
    window.location.href = 'https://dynamicmediamusic.com/consultation';
  };

  const handleContactSpecialist = () => {
    trackEvent('contact_specialist_clicked');
    window.location.href = 'https://dynamicmediamusic.com/contact';
  };
  
  const totalAnnualFee = fees.reduce((sum, fee) => sum + fee.perLocationFee, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--dm-bg)' }}>
      <div className="container-dm py-12">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--dm-text-primary)' }}>
              Music Licensing Calculator
            </h1>
            <p className="text-lg" style={{ color: 'var(--dm-text-secondary)', maxWidth: '600px' }}>
              Calculate your gym's exact music licensing fees and see how Dynamic Media simplifies compliance
            </p>
          </div>
          <a href="https://dynamicmediamusic.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity ml-6">
            <img 
              src="/DM-logo@4x.png" 
              alt="Dynamic Media" 
              className="h-16 w-auto"
            />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="card card-elevated mb-12">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="block text-base font-semibold mb-3" style={{ color: 'var(--dm-text-primary)' }}>
                How do you use music? <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className={`space-y-3 ${validationErrors.has('musicUse') ? 'p-4 bg-red-50 border-2 border-red-500 rounded-lg' : ''}`}>
                {musicUseOptions.map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      name="musicUse"
                      value={option.value}
                      checked={gymDetails.musicUseTypes.includes(option.value)}
                      onChange={handleInputChange}
                      className="checkbox-brand"
                    />
                    <label className="ml-3 text-base" style={{ color: 'var(--dm-text-primary)' }}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {validationErrors.has('musicUse') && (
                <p className="text-red-600 text-sm mt-1">Please select at least one music use type</p>
              )}
            </div>
            
            <div className="pt-8 border-t" style={{ borderColor: 'var(--dm-border)' }}>
              <p className="text-xs mb-4" style={{ color: 'var(--dm-text-muted)' }}>
                Not sure? These are typical values for most gyms. You can adjust them for a more accurate estimate.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-base font-semibold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                    Number of Locations <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfLocations"
                    min="1"
                    step="1"
                    placeholder="e.g., 1"
                    value={gymDetails.numberOfLocations || ''}
                    onChange={handleInputChange}
                    className={`input-field w-full ${
                      validationErrors.has('numberOfLocations') ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {validationErrors.has('numberOfLocations') && (
                    <p className="text-red-600 text-sm mt-1">Required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-base font-semibold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                    Total Members <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="totalMembers"
                    min="1"
                    step="1"
                    placeholder="e.g., 1000"
                    value={gymDetails.totalMembers || ''}
                    onChange={handleInputChange}
                    className={`input-field w-full ${
                      validationErrors.has('totalMembers') ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {validationErrors.has('totalMembers') && (
                    <p className="text-red-600 text-sm mt-1">Required</p>
                  )}
                </div>

                {gymDetails.musicUseTypes.includes('ambient') && (
                  <div className="transition-all duration-300 ease-in-out">
                    <label className="block text-base font-semibold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                      Square Footage <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="squareFootage"
                      min="1"
                      step="1"
                      placeholder="e.g., 5000"
                      value={gymDetails.squareFootage || ''}
                      onChange={handleInputChange}
                      className={`input-field w-full ${
                        validationErrors.has('squareFootage') ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {validationErrors.has('squareFootage') && (
                      <p className="text-red-600 text-sm mt-1">Required</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {gymDetails.musicUseTypes.includes('group') && (
              <div className={`pt-8 border-t ${validationErrors.has('groupFitnessRooms') ? 'bg-red-50 border-red-500' : ''}`} style={{ borderColor: 'var(--dm-border)' }}>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--dm-text-primary)' }}>
                  Group Fitness Rooms <span style={{ color: '#DC2626' }}>*</span>
                  <span className="relative group">
                    <span className="text-gray-400 hover:text-gray-600 cursor-help text-sm" title="Enter details for rooms with instructor-led classes">ⓘ</span>
                  </span>
                </h3>
                <div className="space-y-3">
                  {rooms.map((room, index) => (
                    <div key={index} className="rounded-md p-3" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium" style={{ color: 'var(--dm-text-primary)', minWidth: '60px' }}>
                          Room {index + 1}:
                        </span>
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="number"
                            name={`room-${index}-classesPerWeek`}
                            min="1"
                            step="1"
                            placeholder="10"
                            value={room.classesPerWeek || ''}
                            onChange={(e) => handleRoomChange(index, 'classesPerWeek', e.target.value)}
                            className={`input-field w-20 ${
                              validationErrors.has(`room-${index}-classesPerWeek`) ? 'border-red-500' : ''
                            }`}
                          />
                          <span className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>classes/week</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="number"
                            name={`room-${index}-classCapacity`}
                            min="1"
                            step="1"
                            placeholder="25"
                            value={room.classCapacity || ''}
                            onChange={(e) => handleRoomChange(index, 'classCapacity', e.target.value)}
                            className={`input-field w-20 ${
                              validationErrors.has(`room-${index}-classCapacity`) ? 'border-red-500' : ''
                            }`}
                          />
                          <span className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>capacity</span>
                        </div>
                        {rooms.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRoom(index)}
                            className="text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            style={{ color: '#DC2626' }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddRoom}
                    className="text-sm font-semibold px-4 py-2 rounded transition-colors"
                    style={{ color: 'var(--dm-primary)', border: '1px dashed var(--dm-primary)' }}
                  >
                    + Add another room
                  </button>
                </div>
                {validationErrors.has('groupFitnessRooms') && (
                  <p className="text-red-600 text-sm mt-2">At least one group fitness room is required</p>
                )}
              </div>
            )}
            
            <div className="pt-6 border-t" style={{ borderColor: 'var(--dm-border)' }}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isHfaMember"
                  checked={gymDetails.isHfaMember}
                  onChange={handleInputChange}
                  className="checkbox-brand"
                />
                <label className="ml-2 text-sm flex items-center gap-1" style={{ color: 'var(--dm-text-secondary)' }}>
                  Health & Fitness Association (HFA) Member
                  <span className="relative group">
                    <span className="text-gray-400 hover:text-gray-600 cursor-help text-xs">ⓘ</span>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      HFA members may receive discounts on certain PRO fees.
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="btn-primary w-full text-lg"
            >
              Calculate My Licensing Cost
            </button>
          </div>
        </form>

        {showResults && scenarios && (
          <div id="results-section" className="space-y-8">
            {/* BLOCK 1: Simple Baseline Cost */}
            <SimpleBaselineCost
              scenario={scenarios.baseline}
              numberOfLocations={gymDetails.numberOfLocations}
              hasInstructorLed={gymDetails.musicUseTypes.includes('group')}
              gymDetails={gymDetails}
              onBreakdownOpened={handleProBreakdownOpened}
              onModalOpen={openModal}
            />

            {/* BLOCK 2: Two Ways Comparison */}
            <TwoWaysComparison
              baselineCost={scenarios.baseline.totalPerLocationFee}
              onSeeRecommendedSetup={handleRecommendedSetupOpened}
            />

            {/* BLOCK 3: Recommended Setup Panel (Expandable) */}
            {showRecommendedSetup && (
              <div ref={recommendedSetupRef} tabIndex={-1} style={{ outline: 'none' }}>
                <RecommendedSetupPanel
                  hasInstructorLed={gymDetails.musicUseTypes.includes('group')}
                  instructorLedCost={
                    gymDetails.musicUseTypes.includes('group')
                      ? scenarios.dynamicMediaInstructed.fees.reduce((sum, fee) => sum + fee.perLocationFee, 0)
                      : undefined
                  }
                  onConfirmReview={handleReviewConfirmClicked}
                />
              </div>
            )}

            {/* BLOCK 4: Reassurance Footer */}
            <ReassuranceFooter onContactSpecialist={handleContactSpecialist} />
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