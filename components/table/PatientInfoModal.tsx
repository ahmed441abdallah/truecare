"use client"

import { useState, useEffect } from "react"
import { X, User, Mail, Phone, Calendar, MapPin, Briefcase, Heart, Shield, AlertTriangle, Pill, FileText } from "lucide-react"
import { getPatient } from "@/lib/actions/patient.actions"
import { Patient } from "@/types/appwrite.types"

interface PatientInfoModalProps {
  userId: string
  patientId?: string
  isOpen: boolean
  onClose: () => void
}

export default function PatientInfoModal({ userId, patientId, isOpen, onClose }: PatientInfoModalProps) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true)
      getPatient(userId)
        .then((data) => {
          if (data) {
            setPatient(data as any)
          }
        })
        .catch((error) => {
          console.error("Error fetching patient:", error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isOpen, userId])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Patient Information</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : patient ? (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-sm font-medium text-gray-900">{patient.name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{patient.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{patient.phone || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Birth Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm font-medium text-gray-900">{patient.gender || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">{patient.address || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Occupation</p>
                      <p className="text-sm font-medium text-gray-900">{patient.occupation || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Contact Name</p>
                      <p className="text-sm font-medium text-gray-900">{patient.emergencyContactName || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Contact Number</p>
                      <p className="text-sm font-medium text-gray-900">{patient.emergencyContactNumber || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Medical Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Primary Physician</p>
                      <p className="text-sm font-medium text-gray-900">{patient.primaryPhysician || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Insurance Provider</p>
                      <p className="text-sm font-medium text-gray-900">{patient.insuranceProvider || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Policy Number</p>
                      <p className="text-sm font-medium text-gray-900">{patient.insurancePolicyNumber || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allergies & Medications */}
              {(patient.allergies || patient.currentMedication) && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Allergies & Medications
                  </h4>
                  <div className="space-y-3">
                    {patient.allergies && (
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Allergies</p>
                          <p className="text-sm font-medium text-gray-900">{patient.allergies}</p>
                        </div>
                      </div>
                    )}
                    {patient.currentMedication && (
                      <div className="flex items-start gap-3">
                        <Pill className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Current Medications</p>
                          <p className="text-sm font-medium text-gray-900">{patient.currentMedication}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Medical History */}
              {(patient.familyMedicalHistory || patient.pastMedicalHistory) && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Medical History
                  </h4>
                  <div className="space-y-3">
                    {patient.familyMedicalHistory && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Family Medical History</p>
                        <p className="text-sm font-medium text-gray-900">{patient.familyMedicalHistory}</p>
                      </div>
                    )}
                    {patient.pastMedicalHistory && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Past Medical History</p>
                        <p className="text-sm font-medium text-gray-900">{patient.pastMedicalHistory}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 text-sm">No patient information found</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

