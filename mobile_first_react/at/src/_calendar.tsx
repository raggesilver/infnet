import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

export function Calendar() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
    null,
  );

  const events = [
    {
      title: "Lançamento da Campanha",
      date: "10 de janeiro de 2026",
      description:
        "Evento de lançamento oficial da campanha com a presença de apoiadores e imprensa.",
    },
    {
      title: "Debate com Candidatos",
      date: "5 de fevereiro de 2026",
      description:
        "Participação em debate televisivo com outros candidatos à prefeitura.",
    },
    {
      title: "Comício na Zona Sul",
      date: "20 de fevereiro de 2026",
      description:
        "Grande comício na Zona Sul do Rio para apresentar propostas e ouvir a população.",
    },
    {
      title: "Visita às Comunidades",
      date: "10 de março de 2026",
      description:
        "Visita a comunidades carentes para discutir melhorias e ouvir demandas locais.",
    },
    {
      title: "Encontro com Empresários",
      date: "25 de março de 2026",
      description:
        "Reunião com líderes empresariais para discutir parcerias e desenvolvimento econômico.",
    },
    {
      title: "Caminhada Ecológica",
      date: "5 de abril de 2026",
      description:
        "Evento de conscientização ambiental com participação da comunidade.",
    },
  ];

  const selectedEvent =
    selectedEventIndex !== null ? events[selectedEventIndex] : null;

  return (
    <>
      <section
        id="agenda"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div className="space-y-0 col-span-full mb-4">
          <h2 id="bio" className="text-4xl font-black leading-tight scroll-m-4">
            Calendário
          </h2>
          <p>
            Acompanhe os principais eventos e compromissos da campanha. Clique
            em um evento para ver mais detalhes.
          </p>
        </div>

        {events.map((event, i) => (
          <section
            key={event.title}
            className="rounded-2xl bg-foreground/5 hover:bg-foreground/10 py-2 px-4 flex flex-col transition-all cursor-pointer"
            onClick={() => setSelectedEventIndex(i)}
          >
            <span className="text-lg font-bold">{event.title}</span>
            <span className="text-sm text-muted-foreground">{event.date}</span>
          </section>
        ))}
      </section>

      <Dialog
        open={selectedEvent !== null}
        onOpenChange={(a) => !a && setSelectedEventIndex(null)}
      >
        {selectedEvent && (
          <>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedEvent.title} — {selectedEvent.date}
                </DialogTitle>
                <DialogDescription>
                  {selectedEvent.description}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button>Adicionar ao calendário</Button>
              </DialogFooter>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
