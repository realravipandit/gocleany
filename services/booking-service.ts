import { type Booking, type BookingFormData, BookingStatus } from "@/types/booking"
import { EmailService } from "./email-service"

export class BookingService {
  private storageKey = "gocleeny_bookings"
  private userIdKey = "gocleeny_user_id"
  private emailService: EmailService

  constructor() {
    this.emailService = new EmailService()

    // Initialize localStorage if running in browser
    if (typeof window !== "undefined") {
      // Generate a user ID if not exists (simulating authentication)
      if (!localStorage.getItem(this.userIdKey)) {
        localStorage.setItem(this.userIdKey, this.generateId())
      }
    }
  }

  // Get the current user ID (in a real app, this would come from authentication)
  private getUserId(): string {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.userIdKey) || this.generateId()
    }
    return this.generateId()
  }

  // Generate a unique ID
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Get all bookings from localStorage
  private getAllBookings(): Booking[] {
    if (typeof window !== "undefined") {
      const bookingsJson = localStorage.getItem(this.storageKey)
      return bookingsJson ? JSON.parse(bookingsJson) : []
    }
    return []
  }

  // Save all bookings to localStorage
  private saveAllBookings(bookings: Booking[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(bookings))
    }
  }

  // Create a new booking
  async createBooking(formData: BookingFormData): Promise<Booking> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userId = this.getUserId()
    const now = new Date().toISOString()

    const newBooking: Booking = {
      id: `BK-${this.generateId().substring(0, 8).toUpperCase()}`,
      userId,
      ...formData,
      status: BookingStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    }

    const allBookings = this.getAllBookings()
    allBookings.push(newBooking)
    this.saveAllBookings(allBookings)

    // Send email notification
    await this.emailService.sendBookingConfirmation(
      newBooking.email,
      newBooking.id,
      this.getServiceName(newBooking.serviceType),
      newBooking.date,
    )

    return newBooking
  }

  // Get bookings for the current user
  async getUserBookings(): Promise<Booking[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userId = this.getUserId()
    const allBookings = this.getAllBookings()

    return allBookings.filter((booking) => booking.userId === userId)
  }

  // Get a specific booking by ID
  async getBookingById(bookingId: string): Promise<Booking | null> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const allBookings = this.getAllBookings()
    return allBookings.find((booking) => booking.id === bookingId) || null
  }

  // Cancel a booking
  async cancelBooking(bookingId: string, reason?: string): Promise<Booking> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const allBookings = this.getAllBookings()
    const bookingIndex = allBookings.findIndex((booking) => booking.id === bookingId)

    if (bookingIndex === -1) {
      throw new Error("Booking not found")
    }

    const updatedBooking = {
      ...allBookings[bookingIndex],
      status: BookingStatus.CANCELED,
      cancelReason: reason,
      updatedAt: new Date().toISOString(),
    }

    allBookings[bookingIndex] = updatedBooking
    this.saveAllBookings(allBookings)

    // Send cancellation email
    await this.emailService.sendCancellationConfirmation(
      updatedBooking.email,
      updatedBooking.id,
      this.getServiceName(updatedBooking.serviceType),
      updatedBooking.date,
      reason,
    )

    return updatedBooking
  }

  // Helper method to get service name from service type
  private getServiceName(serviceType: string): string {
    switch (serviceType) {
      case "home":
        return "Home Cleaning"
      case "office":
        return "Office Cleaning"
      case "tenancy":
        return "End of Tenancy Cleaning"
      case "airbnb":
        return "Airbnb & Holiday Let Cleaning"
      default:
        return serviceType
    }
  }
}

