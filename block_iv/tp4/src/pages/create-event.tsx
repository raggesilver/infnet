import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { AppEvent, EventCategory } from "../types";

type CepData = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

const categoryOptions: { value: EventCategory; label: string }[] = [
  { value: "workshop", label: "Workshop" },
  { value: "fair", label: "Feira" },
  { value: "sports", label: "Esportes" },
  { value: "community-service", label: "Ação Comunitária" },
  { value: "cultural", label: "Cultural" },
  { value: "other", label: "Outro" },
];

export function CreateEventPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<EventCategory>("workshop");
  const [organizerName, setOrganizerName] = useState("");

  // Address fields
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const cepTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // ViaCEP integration with debounce
  useEffect(() => {
    const raw = cep.replace(/\D/g, "");
    if (raw.length !== 8) {
      setCepError("");
      return;
    }

    clearTimeout(cepTimerRef.current);
    cepTimerRef.current = setTimeout(() => {
      setCepLoading(true);
      setCepError("");
      fetch(`https://viacep.com.br/ws/${raw}/json/`)
        .then((res) => res.json() as Promise<CepData>)
        .then((data) => {
          if (data.erro) {
            setCepError("CEP não encontrado.");
            return;
          }
          setCity(data.localidade);
          setState(data.uf);
          setStreet(data.logradouro ? `${data.logradouro} - ${data.bairro}` : "");
        })
        .catch(() => setCepError("Erro ao buscar CEP."))
        .finally(() => setCepLoading(false));
    }, 400);

    return () => clearTimeout(cepTimerRef.current);
  }, [cep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: Omit<AppEvent, "id" | "createdAt"> = {
      title,
      description,
      date: new Date(date).toISOString(),
      category,
      location: { city, state, fullAddress: street },
      organizerId: "org_user",
      organizerName,
    };

    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) navigate("/");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <h1>Criar Evento</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="title">
            Título
          </label>
          <input
            id="title"
            className="input"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            className="input textarea"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label className="label" htmlFor="date">
              Data e Hora
            </label>
            <input
              id="date"
              type="datetime-local"
              className="input"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group flex-1">
            <label className="label" htmlFor="category">
              Categoria
            </label>
            <select
              id="category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="organizer">
            Organizador
          </label>
          <input
            id="organizer"
            className="input"
            required
            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
          />
        </div>

        {/* CEP + Address Section */}
        <fieldset className="fieldset">
          <legend className="legend">Endereço (via CEP)</legend>

          <div className="form-group">
            <label className="label" htmlFor="cep">
              CEP
            </label>
            <input
              id="cep"
              className="input"
              placeholder="00000-000"
              maxLength={9}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            {cepLoading && <span className="hint">Buscando CEP...</span>}
            {cepError && <span className="hint hint-error">{cepError}</span>}
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="label" htmlFor="city">
                Cidade
              </label>
              <input
                id="city"
                className="input"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ width: "5rem" }}>
              <label className="label" htmlFor="state">
                UF
              </label>
              <input
                id="state"
                className="input"
                required
                maxLength={2}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="street">
              Logradouro
            </label>
            <input
              id="street"
              className="input"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Criando..." : "Criar Evento"}
        </button>
      </form>
    </>
  );
}
