interface EmailOptions {
  to: string
  subject: string
  body: string
  cc?: string[]
  bcc?: string[]
}

export class EmailService {
  private adminEmail = "gocleeny@gmail.com"

  // Simulate sending an email
  async sendEmail(options: EmailOptions): Promise<boolean> {
    // In a real application, this would connect to an email service like SendGrid, Mailgun, etc.
    console.log("Sending email:", options)

    // Simulate a successful email send
    await new Promise((resolve) => setTimeout(resolve, 500))

    return true
  }

  // Send booking confirmation email
  async sendBookingConfirmation(
    userEmail: string,
    bookingId: string,
    serviceName: string,
    bookingDate: string,
  ): Promise<boolean> {
    // Send to customer
    await this.sendEmail({
      to: userEmail,
      subject: "Booking Confirmation - GoCleeny",
      body: `
        <h1>Booking Confirmation</h1>
        <p>Thank you for choosing GoCleeny for your cleaning needs!</p>
        <p>Your booking has been confirmed with the following details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${new Date(bookingDate).toLocaleDateString()}</li>
        </ul>
        <p>If you need to make any changes to your booking, please visit your <a href="https://www.gocleeny.com/my-bookings">My Bookings</a> page.</p>
        <p>Thank you for choosing eco-friendly cleaning services!</p>
        <p>The GoCleeny Team</p>
      `,
    })

    // Send to admin
    await this.sendEmail({
      to: this.adminEmail,
      subject: `New Booking: ${bookingId}`,
      body: `
        <h1>New Booking Received</h1>
        <p>A new booking has been made:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
          <li><strong>Customer Email:</strong> ${userEmail}</li>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${new Date(bookingDate).toLocaleDateString()}</li>
        </ul>
        <p>Please check the admin dashboard for more details.</p>
      `,
    })

    return true
  }

  // Send booking cancellation email
  async sendCancellationConfirmation(
    userEmail: string,
    bookingId: string,
    serviceName: string,
    bookingDate: string,
    reason?: string,
  ): Promise<boolean> {
    // Send to customer
    await this.sendEmail({
      to: userEmail,
      subject: "Booking Cancellation - GoCleeny",
      body: `
        <h1>Booking Cancellation Confirmation</h1>
        <p>Your booking has been successfully canceled:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${new Date(bookingDate).toLocaleDateString()}</li>
        </ul>
        <p>We hope to serve you again in the future!</p>
        <p>The GoCleeny Team</p>
      `,
    })

    // Send to admin
    await this.sendEmail({
      to: this.adminEmail,
      subject: `Booking Canceled: ${bookingId}`,
      body: `
        <h1>Booking Cancellation</h1>
        <p>A booking has been canceled:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
          <li><strong>Customer Email:</strong> ${userEmail}</li>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${new Date(bookingDate).toLocaleDateString()}</li>
          ${reason ? `<li><strong>Reason:</strong> ${reason}</li>` : ""}
        </ul>
        <p>Please update your scheduling accordingly.</p>
      `,
    })

    return true
  }
}

