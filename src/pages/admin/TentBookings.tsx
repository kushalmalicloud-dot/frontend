import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar as CalendarIcon, Clock, Users, Phone, Mail, Trash2, Tent } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TentBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTentBookings();

    const channel = supabase
      .channel("tent-bookings-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tent_bookings" },
        () => fetchTentBookings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTentBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("tent_bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error Loading Tent Bookings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateReservationStatus = async (
    reservationId: string,
    newStatus: "confirmed" | "cancelled" | "pending" | "completed"
  ) => {
    try {
      const { error } = await supabase
        .from("tent_bookings")
        .update({ status: newStatus })
        .eq("id", reservationId);

      if (error) throw error;
      toast({
        title: "Status Updated",
        description: `Booking ${newStatus}`,
      });
      fetchTentBookings();
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      const { error } = await supabase
        .from("tent_bookings")
        .delete()
        .eq("id", reservationId);

      if (error) throw error;

      toast({
        title: "Booking Deleted",
        description: "Tent booking removed successfully",
      });
      fetchTentBookings();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_phone?.includes(searchTerm) ||
      booking.reservation_date?.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading tent bookings...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Tent className="h-7 w-7 text-primary" />
            Tent Bookings
          </h2>
          <p className="text-muted-foreground">
            Manage outdoor tent experiences booked by guests
          </p>
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1">
          {filteredBookings.length} booking
          {filteredBookings.length === 1 ? "" : "s"}
        </Badge>
      </div>

      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {!filteredBookings.length ? (
        <div className="border border-dashed border-muted rounded-lg p-8 text-center text-muted-foreground">
          No tent bookings yet. Once guests reserve a tent from the website,
          they will appear here automatically.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {booking.customer_name}
                      </h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {new Date(booking.reservation_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {booking.reservation_time || "Not specified"}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {booking.party_size} guests
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {booking.customer_phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {booking.customer_email || "N/A"}
                      </div>
                    </div>

                    {booking.special_requests && (
                      <div className="text-sm">
                        <span className="font-medium">Special Requests: </span>
                        <span className="text-muted-foreground">
                          {booking.special_requests}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateReservationStatus(booking.id, "confirmed")}
                      disabled={booking.status === "confirmed"}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateReservationStatus(booking.id, "cancelled")}
                      disabled={booking.status === "cancelled"}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteReservation(booking.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TentBookings;

