export type AppEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: EventCategory;
  location: EventLocation;
  organizerId: string;
  organizerName: string;
  createdAt: string;
};

export type EventCategory =
  | "workshop"
  | "fair"
  | "sports"
  | "community-service"
  | "cultural"
  | "other";

export type EventLocation = {
  city: string;
  state: string;
  fullAddress?: string; // Optional for card display
};

// Props for the EventCard component
export type EventCardProps = {
  event: Event;
  onClick?: (eventId: string) => void;
  variant?: "compact" | "detailed"; // Optional: different display modes
};
