export enum BookingStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  COMPLETED = "completed",
}

export interface Booking {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  serviceType: string
  date: string
  notes?: string
  status: BookingStatus
  createdAt: string
  updatedAt: string
}

export interface BookingFormData {
  name: string
  email: string
  phone: string
  serviceType: string
  date: string
  notes?: string
}

export interface CancelBookingData {
  bookingId: string
  reason?: string
}

