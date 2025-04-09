"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Search, Filter, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookingService } from "@/services/booking-service";
import { type Booking, BookingStatus } from "@/types/booking";
import emailjs from "@emailjs/browser";

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Booking | null;
    direction: "ascending" | "descending";
  }>({ key: "date", direction: "descending" });

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init("gKtLl-ep0UCqcSAgNnrC3k1"); // Replace with your EmailJS Public Key
  }, []);

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const bookingService = new BookingService();
        const userBookings = await bookingService.getUserBookings();
        setBookings(userBookings);
        setFilteredBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter and sort bookings
  useEffect(() => {
    let result = bookings;

    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.id.toLowerCase().includes(term) ||
          booking.serviceType.toLowerCase().includes(term) ||
          new Date(booking.date).toLocaleDateString().toLowerCase().includes(term)
      );
    }

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredBookings(result);
  }, [bookings, searchTerm, statusFilter, sortConfig]);

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;

    try {
      const bookingService = new BookingService();
      await bookingService.cancelBooking(bookingToCancel.id, cancelReason);

      // Send email notification
      await emailjs.send(
        "service_tqh5h6q", // Replace with your EmailJS Service ID
        "template_latkxwb", // Replace with your EmailJS Template ID for cancellation
        {
          id: bookingToCancel.id,
          serviceType: bookingToCancel.serviceType,
          date: formatDate(bookingToCancel.date),
          reason: cancelReason || "No reason provided",
          to_email: "gocleeny.test@gmail.com", // Your email address
        },
        "gKtLl-ep0UCqcSAgNnrC3k1" // Replace with your EmailJS Public Key
      );

      // Update local state
      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingToCancel.id ? { ...booking, status: BookingStatus.CANCELED } : booking
      );
      setBookings(updatedBookings);
      setCancelDialogOpen(false);
      setBookingToCancel(null);
      setCancelReason("");
      console.log("Booking canceled and email sent successfully");
    } catch (error) {
      console.error("Error canceling booking or sending email:", error);
    }
  };

  const openCancelDialog = (booking: Booking) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const requestSort = (key: keyof Booking) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Booking) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.ACTIVE:
        return <Badge className="bg-green-500">Active</Badge>;
      case BookingStatus.CANCELED:
        return <Badge variant="destructive">Canceled</Badge>;
      case BookingStatus.COMPLETED:
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[30vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="mybookingzp.jpeg"
            alt="My Bookings"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">My Bookings</h1>
          <p className="text-xl text-white/90 max-w-[800px] mt-4">Manage your cleaning service appointments</p>
        </div>
      </section>

      {/* Bookings Management Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by ID, service, or date..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BookingStatus | "all")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value={BookingStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={BookingStatus.COMPLETED}>Completed</SelectItem>
                  <SelectItem value={BookingStatus.CANCELED}>Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Bookings</TabsTrigger>
              <TabsTrigger value="history">Booking History</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : filteredBookings.filter((b) => b.status === BookingStatus.ACTIVE).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Active Bookings</h3>
                    <p className="text-gray-500 text-center max-w-md mb-6">
                      You don't have any active bookings at the moment. Would you like to schedule a cleaning service?
                    </p>
                    <Button onClick={() => router.push("/booking")}>Book a Cleaning</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("id")}
                        >
                          <div className="flex items-center gap-1">Booking ID {getSortIcon("id")}</div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("serviceType")}
                        >
                          <div className="flex items-center gap-1">Service {getSortIcon("serviceType")}</div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("date")}
                        >
                          <div className="flex items-center gap-1">Date {getSortIcon("date")}</div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("status")}
                        >
                          <div className="flex items-center gap-1">Status {getSortIcon("status")}</div>
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings
                        .filter((booking) => booking.status === BookingStatus.ACTIVE)
                        .map((booking) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium">{booking.id}</td>
                            <td className="px-4 py-4 text-sm">{booking.serviceType}</td>
                            <td className="px-4 py-4 text-sm">{formatDate(booking.date)}</td>
                            <td className="px-4 py-4 text-sm">{getStatusBadge(booking.status)}</td>
                            <td className="px-4 py-4 text-sm text-right">
                              <Button variant="destructive" size="sm" onClick={() => openCancelDialog(booking)}>
                                Cancel
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : filteredBookings.filter((b) => b.status !== BookingStatus.ACTIVE).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Booking History</h3>
                    <p className="text-gray-500 text-center max-w-md">
                      Your booking history will appear here once you have completed or canceled bookings.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("id")}
                        >
                          <div className="flex items-center gap-1">Booking ID {getSortIcon("id")}</div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("serviceType")}
                        >
                          <div className="flex items-center gap-1">Service {getSortIcon("serviceType")}</div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("date")}
                        >
                          <div className="flex items-center gap-1">Date {getSortIcon("date")}</div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                          onClick={() => requestSort("status")}
                        >
                          <div className="flex items-center gap-1">Status {getSortIcon("status")}</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings
                        .filter((booking) => booking.status !== BookingStatus.ACTIVE)
                        .map((booking) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium">{booking.id}</td>
                            <td className="px-4 py-4 text-sm">{booking.serviceType}</td>
                            <td className="px-4 py-4 text-sm">{formatDate(booking.date)}</td>
                            <td className="px-4 py-4 text-sm">{getStatusBadge(booking.status)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {bookingToCancel && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p>
                  <span className="font-medium">Booking ID:</span> {bookingToCancel.id}
                </p>
                <p>
                  <span className="font-medium">Service:</span> {bookingToCancel.serviceType}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {formatDate(bookingToCancel.date)}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="cancelReason" className="text-sm font-medium">
                Reason for cancellation (optional)
              </label>
              <textarea
                id="cancelReason"
                className="w-full min-h-[100px] p-3 border rounded-md"
                placeholder="Please let us know why you're canceling..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}