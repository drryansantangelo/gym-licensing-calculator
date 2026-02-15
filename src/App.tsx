import React, { useState } from 'react';
import { calculateTotalFees } from './utils/calculateFees';
import { calculateAllScenarios, type ScenarioResult } from './utils/calculateScenarios';
import type { GymDetails, GymRoom, LicenseFee, MusicUseType } from './types';

// Landing page sections
import LandingHero from './components/LandingHero';
import ComplianceEducation from './components/ComplianceEducation';
import LicensingExplainer from './components/LicensingExplainer';
import InlineCalculator from './components/InlineCalculator';
import CalculatorResults from './components/CalculatorResults';
// import LeadMagnet from './components/LeadMagnet';
import WhyDynamicMedia from './components/WhyDynamicMedia';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import ContactModal from './components/ContactModal';
import ProContactBlock from './components/ProContactBlock';

const sanitizeInt = (v: string) => (v ? String(parseInt(v, 10) || '') : '');

const initialGymDetails: GymDetails = {
  numberOfLocations: 0,
  totalMembers: 0,
  rooms: [],
  squareFootage: 0,
  musicUseTypes: [],
  isHfaMember: false,
  isSoundtrackUser: false,
};

function App() {
  const [gymDetails, setGymDetails] = useState<GymDetails>(initialGymDetails);
  const [, setFees] = useState<LicenseFee[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [rooms, setRooms] = useState<GymRoom[]>([]);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [scenarios, setScenarios] = useState<{
    baseline: ScenarioResult;
    dynamicMediaAmbient: ScenarioResult;
    dynamicMediaInstructed: ScenarioResult;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // --- Form handlers ---
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
          return { ...prev, musicUseTypes: newMusicUseTypes, squareFootage: newSquareFootage };
        });
        if (musicType === 'group' && checked && rooms.length === 0) {
          setRooms([{ classesPerWeek: 0, classCapacity: 0 }]);
        }
        if (musicType === 'group' && !checked) {
          setRooms([]);
        }
      } else {
        setGymDetails(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'number') {
      setGymDetails(prev => ({ ...prev, [name]: Number(sanitizeInt(value)) }));
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
    if (gymDetails.numberOfLocations < 1) errors.add('numberOfLocations');
    if (gymDetails.totalMembers <= 0) errors.add('totalMembers');
    if (gymDetails.musicUseTypes.includes('ambient') && gymDetails.squareFootage <= 0) errors.add('squareFootage');
    if (gymDetails.musicUseTypes.includes('group')) {
      if (rooms.length === 0) {
        errors.add('groupFitnessRooms');
      } else {
        rooms.forEach((room, index) => {
          if (room.classesPerWeek <= 0) errors.add(`room-${index}-classesPerWeek`);
          if (room.classCapacity <= 0) errors.add(`room-${index}-classCapacity`);
        });
      }
    }
    if (gymDetails.musicUseTypes.length === 0) errors.add('musicUse');
    setValidationErrors(errors);
    if (errors.size > 0) return;

    setIsCalculating(true);
    setShowResults(false);

    setTimeout(() => {
      const calculatedFees = calculateTotalFees(gymDetails);
      setFees(calculatedFees);
      const calculatedScenarios = calculateAllScenarios(gymDetails);
      setScenarios(calculatedScenarios);
      setIsCalculating(false);
      setShowResults(true);

      // Scroll to results
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 800);
  };

  const handleReset = () => {
    setGymDetails(initialGymDetails);
    setRooms([]);
    setFees([]);
    setShowResults(false);
    setScenarios(null);
    setValidationErrors(new Set());
    setHasAttemptedSubmit(false);
    setIsCalculating(false);
  };

  // --- CTA handlers ---
  const handleOpenContact = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div>
      {/* Section 1: Hero */}
      <LandingHero onTalkToSpecialist={handleOpenContact} />

      {/* Section 1.5: Have You Been Contacted? */}
      <ProContactBlock />

      {/* Section 2: Compliance Education */}
      <ComplianceEducation />

      {/* Section 3: What Is Music Licensing */}
      <LicensingExplainer />

      {/* Section 4: Calculator */}
      <InlineCalculator
        gymDetails={gymDetails}
        rooms={rooms}
        validationErrors={validationErrors}
        isCalculating={isCalculating}
        onInputChange={handleInputChange}
        onRoomChange={handleRoomChange}
        onAddRoom={handleAddRoom}
        onRemoveRoom={handleRemoveRoom}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      {/* Calculating state */}
      {isCalculating && (
        <section className="section-gray" style={{ paddingTop: 0 }}>
          <div className="container-dm">
            <div className="container-narrow">
              <div id="results-section" className="card card-elevated text-center py-16 animate-fadeIn">
                <div className="animate-pulse-subtle">
                  <div className="text-2xl font-bold mb-3" style={{ color: 'var(--dm-text-primary)' }}>
                    Calculating your licensing costs...
                  </div>
                  <p className="text-sm" style={{ color: 'var(--dm-text-muted)' }}>
                    Checking rates across ASCAP, BMI, SESAC, and GMR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Results */}
      {showResults && scenarios && (
        <div id="results-section">
          <CalculatorResults
            scenario={scenarios.baseline}
            dmScenario={
              gymDetails.musicUseTypes.includes('group')
                ? scenarios.dynamicMediaInstructed
                : scenarios.dynamicMediaAmbient
            }
            gymDetails={gymDetails}
            onGetQuote={handleOpenContact}
          />
        </div>
      )}

      {/* Section 6: Why Dynamic Media */}
      <WhyDynamicMedia />

      {/* Section 7: FAQ */}
      <FaqSection />

      {/* Section 8: Final CTA + Footer */}
      <FinalCta onTalkToSpecialist={handleOpenContact} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

export default App;