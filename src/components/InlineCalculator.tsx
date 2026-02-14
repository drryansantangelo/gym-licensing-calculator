import React from 'react';
import type { GymDetails, GymRoom } from '../types';

const musicUseOptions = [
  { label: 'Background music', sublabel: 'Lobby, gym floor, locker rooms, common areas', value: 'ambient' as const },
  { label: 'Instructor-led classes', sublabel: 'Group fitness, spin, yoga, or any class with an instructor', value: 'group' as const },
];

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
}: InlineCalculatorProps) {
  return (
    <section id="calculator-section" className="section-gray">
      <div className="container-dm">
        <div className="text-center mb-10">
          <span className="section-label">Free Calculator</span>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--dm-text-primary)' }}>
            What Does Your Gym Owe?
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--dm-text-secondary)' }}>
            Answer a few questions about your gym and get an instant estimate based on
            official PRO (Performing Rights Organization) rate schedules.
          </p>
        </div>

        <div className="container-narrow">
          <form onSubmit={onSubmit} className="card card-elevated p-8">
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
                                <span className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>classes/week</span>
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
                                <span className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>capacity</span>
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

            <div className="mt-6">
              <button
                type="submit"
                disabled={isCalculating}
                className="btn-primary btn-primary-lg w-full"
              >
                {isCalculating ? 'Calculating...' : 'Calculate My Licensing Cost'}
              </button>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--dm-text-muted)' }}>
                Based on official PRO rate schedules. No account required.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}