import React, { useState } from 'react';
import type { GymDetails, GymRoom } from '../types';

const musicUseOptions = [
  { label: 'Background music', sublabel: 'Lobby, gym floor, locker rooms, common areas', value: 'ambient' as const },
  { label: 'Instructor-led classes', sublabel: 'Group fitness, spin, yoga, or any class with an instructor', value: 'group' as const },
];

function Tooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-flex ml-1" style={{ verticalAlign: 'middle' }}>
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
        className="inline-flex items-center justify-center rounded-full cursor-help text-xs font-bold select-none"
        style={{
          width: '14px',
          height: '14px',
          fontSize: '9px',
          backgroundColor: 'var(--dm-primary-light)',
          color: 'var(--dm-primary)',
          lineHeight: 1,
        }}
      >
        i
      </span>
      {visible && (
        <span
          className="absolute z-50 rounded-lg px-3 py-2 text-xs font-normal shadow-lg"
          style={{
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '220px',
            backgroundColor: 'var(--dm-bg-dark)',
            color: 'var(--dm-text-on-dark)',
            lineHeight: '1.5',
            pointerEvents: 'none',
          }}
        >
          {text}
          <span
            className="absolute"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid var(--dm-bg-dark)',
            }}
          />
        </span>
      )}
    </span>
  );
}

interface InlineCalculatorProps {
  gymDetails: GymDetails;
  rooms: GymRoom[];
  validationErrors: Set<string>;
  isCalculating: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoomChange: (index: number, field: keyof GymRoom, value: string) => void;
  onAddRoom: () => void;
  onRemoveRoom: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export default function InlineCalculator({
  gymDetails,
  rooms,
  validationErrors,
  isCalculating,
  onInputChange,
  onRoomChange,
  onAddRoom,
  onRemoveRoom,
  onSubmit,
  onReset,
}: InlineCalculatorProps) {
  return (
    <section id="calculator-section" className="section-dark" style={{ paddingTop: '2.5rem' }}>
      <div className="container-dm">
        <div className="text-center mb-12">
          <span className="section-label section-label-light">60-Second Licensing Calculator</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--dm-text-on-dark)' }}
          >
            What Does Your Gym Owe?
          </h2>
          <p
            className="text-base max-w-xl mx-auto mb-2"
            style={{ color: 'var(--dm-text-on-dark-muted)' }}
          >
            Based on official PRO rate structures (ASCAP, BMI, SESAC & GMR).
          </p>
          <p
            className="text-base max-w-xl mx-auto italic"
            style={{ color: 'var(--dm-text-on-dark-muted)', opacity: 0.85 }}
          >
            Most gym owners are surprised by the total.
          </p>
        </div>

        <div className="container-narrow">
          <form
            onSubmit={onSubmit}
            className="card card-elevated"
            style={{
              padding: '2rem 2rem 1.25rem 2rem',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(0, 174, 239, 0.08)',
            }}
          >
            <div className="grid grid-cols-1 gap-5">
              {/* Music type selection */}
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                  Where do you play music? <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <p className="text-xs mb-3" style={{ color: 'var(--dm-text-muted)' }}>
                  Select all that apply. Different music uses require different licenses.
                </p>
                <div className={`space-y-2 ${validationErrors.has('musicUse') ? 'p-3 bg-red-50 border-2 border-red-500 rounded-lg' : ''}`}>
                  {musicUseOptions.map(option => (
                    <div key={option.value} className="flex items-start">
                      <input
                        type="checkbox"
                        name="musicUse"
                        value={option.value}
                        checked={gymDetails.musicUseTypes.includes(option.value)}
                        onChange={onInputChange}
                        className="checkbox-brand mt-0.5"
                      />
                      <div className="ml-3">
                        <label className="text-sm font-medium block" style={{ color: 'var(--dm-text-primary)' }}>
                          {option.label}
                        </label>
                        <span className="text-xs" style={{ color: 'var(--dm-text-muted)' }}>
                          {option.sublabel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {validationErrors.has('musicUse') && (
                  <p className="text-red-600 text-sm mt-1">Please select at least one music use type</p>
                )}
              </div>

              {/* Gym details — revealed after music type selected */}
              {gymDetails.musicUseTypes.length > 0 && (
                <>
                  <div className="pt-5 border-t animate-fadeIn" style={{ borderColor: 'var(--dm-border)' }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                      Tell us about your gym
                    </p>
                    <p className="text-xs mb-4" style={{ color: 'var(--dm-text-muted)' }}>
                      Licensing fees are based on your facility size, membership, and how you use music.
                    </p>

                    <div className={`grid gap-4 ${gymDetails.musicUseTypes.includes('ambient') ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                          Locations <span style={{ color: '#DC2626' }}>*</span>
                          <Tooltip text="How many separate gym locations do you operate? Each location requires its own set of licenses." />
                        </label>
                        <input
                          type="number"
                          name="numberOfLocations"
                          min="1"
                          step="1"
                          placeholder="e.g., 1"
                          value={gymDetails.numberOfLocations || ''}
                          onChange={onInputChange}
                          className={`input-field w-full ${validationErrors.has('numberOfLocations') ? 'border-red-500' : ''}`}
                          required
                        />
                        {validationErrors.has('numberOfLocations') && (
                          <p className="text-red-600 text-xs mt-1">Required</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                          Members <span style={{ color: '#DC2626' }}>*</span>
                          <Tooltip text="Your total active membership count. BMI calculates fees on a per-member basis." />
                        </label>
                        <input
                          type="number"
                          name="totalMembers"
                          min="1"
                          step="1"
                          placeholder="e.g., 1000"
                          value={gymDetails.totalMembers || ''}
                          onChange={onInputChange}
                          className={`input-field w-full ${validationErrors.has('totalMembers') ? 'border-red-500' : ''}`}
                          required
                        />
                        {validationErrors.has('totalMembers') && (
                          <p className="text-red-600 text-xs mt-1">Required</p>
                        )}
                      </div>

                      {gymDetails.musicUseTypes.includes('ambient') && (
                        <div className="animate-fadeIn">
                          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                            Sq. Footage <span style={{ color: '#DC2626' }}>*</span>
                            <Tooltip text="Total square footage where music is played — ASCAP uses this for ambient licensing." />
                          </label>
                          <input
                            type="number"
                            name="squareFootage"
                            min="1"
                            step="1"
                            placeholder="e.g., 5000"
                            value={gymDetails.squareFootage || ''}
                            onChange={onInputChange}
                            className={`input-field w-full ${validationErrors.has('squareFootage') ? 'border-red-500' : ''}`}
                            required
                          />
                          {validationErrors.has('squareFootage') && (
                            <p className="text-red-600 text-xs mt-1">Required</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Group fitness rooms */}
                  {gymDetails.musicUseTypes.includes('group') && (
                    <div className={`pt-5 border-t animate-fadeIn ${validationErrors.has('groupFitnessRooms') ? 'bg-red-50 border-red-500' : ''}`} style={{ borderColor: 'var(--dm-border)' }}>
                      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--dm-text-primary)' }}>
                        Group Fitness Rooms <span style={{ color: '#DC2626' }}>*</span>
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
                                  min="1"
                                  step="1"
                                  placeholder="10"
                                  value={room.classesPerWeek || ''}
                                  onChange={(e) => onRoomChange(index, 'classesPerWeek', e.target.value)}
                                  className={`input-field w-20 ${validationErrors.has(`room-${index}-classesPerWeek`) ? 'border-red-500' : ''}`}
                                />
                                <span className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>
                                  classes/week
                                  <Tooltip text="Total instructor-led classes held in this room per week, including spin, yoga, HIIT, etc." />
                                </span>
                              </div>
                              <div className="flex-1 flex items-center gap-2">
                                <input
                                  type="number"
                                  min="1"
                                  step="1"
                                  placeholder="25"
                                  value={room.classCapacity || ''}
                                  onChange={(e) => onRoomChange(index, 'classCapacity', e.target.value)}
                                  className={`input-field w-20 ${validationErrors.has(`room-${index}-classCapacity`) ? 'border-red-500' : ''}`}
                                />
                                <span className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>
                                  capacity
                                  <Tooltip text="Maximum number of participants per class in this room." />
                                </span>
                              </div>
                              {rooms.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => onRemoveRoom(index)}
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
                          onClick={onAddRoom}
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
                </>
              )}
            </div>

            <div className="mt-5">
              <button
                type="submit"
                disabled={isCalculating}
                className="btn-primary w-full font-bold text-lg"
                style={{
                  padding: '18px 32px',
                  borderRadius: 'var(--dm-radius-lg)',
                  boxShadow: '0 4px 20px rgba(0, 174, 239, 0.35)',
                }}
              >
                {isCalculating ? 'Calculating...' : 'Calculate My Licensing Cost'}
              </button>
              {gymDetails.musicUseTypes.length > 0 && (
                <button
                  type="button"
                  onClick={onReset}
                  className="text-xs font-medium transition-colors hover:underline mx-auto block mt-2"
                  style={{ color: 'var(--dm-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Reset Calculator
                </button>
              )}
              <p className="text-xs text-center mt-3" style={{ color: 'var(--dm-text-on-dark-muted)' }}>
                Based on official PRO rate schedules. No account required.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}