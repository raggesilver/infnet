import { useEffect, useRef, useState } from "react";
import { EventCard } from "../components/event-card";
import type { AppEvent } from "../types";

export function HomePage() {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json() as Promise<AppEvent[]>)
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  // Debounce search input
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timerRef.current);
  }, [search]);

  const filtered = events.filter((e) => {
    if (!debouncedSearch) return true;
    const q = debouncedSearch.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.location.city.toLowerCase().includes(q) ||
      e.organizerName.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <h1>TP 3 — Paulo Queiroz</h1>

      <div className="search-container mb-4">
        <input
          type="text"
          className="input"
          placeholder="Buscar por nome, cidade ou organizador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton skeleton-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="empty-state">Nenhum evento encontrado.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </>
  );
}
