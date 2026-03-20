import type { AppEvent } from "../types";

export function EventCard({ event }: { event: AppEvent }) {
  // Format date to be more readable
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Category labels in Portuguese
  const categoryLabels: Record<AppEvent["category"], string> = {
    workshop: "Workshop",
    fair: "Feira",
    sports: "Esportes",
    "community-service": "Ação Comunitária",
    cultural: "Cultural",
    other: "Outro",
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header with category badge */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {event.title}
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
            {categoryLabels[event.category]}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {event.description}
        </p>

        {/* Date and location info */}
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            {/* FIXME: We should use an icon library such as lucide.dev instead */}
            <span className="font-medium">📅</span>
            <span>
              {formattedDate} às {formattedTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">📍</span>
            <span>
              {event.location.city}, {event.location.state}
            </span>
          </div>
        </div>

        {/* Organizer */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Organizado por{" "}
            <span className="font-medium text-gray-700">
              {event.organizerName}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
