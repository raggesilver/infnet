import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { AppEvent } from "../types";
import { EventCard } from "./event-card";

const baseEvent: AppEvent = {
  id: "evt_001",
  title: "Workshop de React e TypeScript",
  description:
    "Aprenda os fundamentos de React com TypeScript através de exemplos práticos e projetos reais.",
  date: "2026-03-15T14:00:00Z",
  category: "workshop",
  location: { city: "São Paulo", state: "SP" },
  organizerId: "org_123",
  organizerName: "Tech Community SP",
  createdAt: "2026-02-01T10:00:00Z",
};

describe("EventCard", () => {
  it("renders event title", () => {
    render(<EventCard event={baseEvent} />);
    expect(screen.getByText("Workshop de React e TypeScript")).toBeInTheDocument();
  });

  it("renders event description", () => {
    render(<EventCard event={baseEvent} />);
    expect(
      screen.getByText(/Aprenda os fundamentos de React/),
    ).toBeInTheDocument();
  });

  it("renders city and state", () => {
    render(<EventCard event={baseEvent} />);
    expect(screen.getByText("São Paulo, SP")).toBeInTheDocument();
  });

  it("renders organizer name", () => {
    render(<EventCard event={baseEvent} />);
    expect(screen.getByText("Tech Community SP")).toBeInTheDocument();
  });

  it("renders formatted date in pt-BR locale", () => {
    render(<EventCard event={baseEvent} />);
    // The date element should contain a pt-BR formatted date
    const dateEl = screen.getByText(/2026/);
    expect(dateEl).toBeInTheDocument();
  });

  it("maps workshop category to 'Workshop' label", () => {
    render(<EventCard event={baseEvent} />);
    expect(screen.getByText("Workshop")).toBeInTheDocument();
  });

  it("maps fair category to 'Feira' label", () => {
    render(<EventCard event={{ ...baseEvent, category: "fair" }} />);
    expect(screen.getByText("Feira")).toBeInTheDocument();
  });

  it("maps sports category to 'Esportes' label", () => {
    render(<EventCard event={{ ...baseEvent, category: "sports" }} />);
    expect(screen.getByText("Esportes")).toBeInTheDocument();
  });

  it("maps community-service category to 'Ação Comunitária' label", () => {
    render(
      <EventCard event={{ ...baseEvent, category: "community-service" }} />,
    );
    expect(screen.getByText("Ação Comunitária")).toBeInTheDocument();
  });

  it("maps cultural category to 'Cultural' label", () => {
    render(<EventCard event={{ ...baseEvent, category: "cultural" }} />);
    expect(screen.getByText("Cultural")).toBeInTheDocument();
  });

  it("maps other category to 'Outro' label", () => {
    render(<EventCard event={{ ...baseEvent, category: "other" }} />);
    expect(screen.getByText("Outro")).toBeInTheDocument();
  });

  it("clamps description with line-clamp-2 class", () => {
    render(<EventCard event={baseEvent} />);
    const description = screen.getByText(/Aprenda os fundamentos/);
    expect(description).toHaveClass("line-clamp-2");
  });
});
