
import { useState } from "react";
import { crearCita } from "../services/citasApi";

type Props = {
  onCreada: () => void | Promise<void>;
};

export default function FormularioCita({ onCreada }: Props) {
  const [mascota, setMascota] = useState("");
  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [enviando, setEnviando] = useState(false);

  const inputClass = `
    w-full rounded-xl border border-slate-200
    bg-slate-50 px-4 py-3 text-sm text-slate-700
    placeholder:text-slate-400
    outline-none transition-all duration-200
    hover:border-teal-300
    focus:border-teal-600 focus:bg-white
    focus:ring-2 focus:ring-teal-100
  `;

  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setEnviando(true);

        try {
          await crearCita({ mascota, cliente, servicio, fecha, hora });

          setMascota("");
          setCliente("");
          setServicio("");
          setFecha("");
          setHora("");

          await onCreada();
        } catch (error) {
          alert(
            error instanceof Error
              ? error.message
              : "No se pudo crear la cita.",
          );
        } finally {
          setEnviando(false);
        }
      }}
    >
      {/* Encabezado */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
          <span className="text-xl">🐾</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Nueva cita
          </h2>
          <p className="text-sm text-slate-500">
            Registra una nueva cita para tu mascota.
          </p>
        </div>
      </div>

      {/* Información de la mascota */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-teal-800">
          Información de la mascota
        </h3>

        <div>
          <label className={labelClass} htmlFor="mascota">
            Nombre de la mascota
          </label>
          <input
            id="mascota"
            className={inputClass}
            placeholder="Ej. Max"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="cliente">
            Nombre del cliente
          </label>
          <input
            id="cliente"
            className={inputClass}
            placeholder="Ej. Ana López"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="servicio">
            Servicio solicitado
          </label>
          <input
            id="servicio"
            className={inputClass}
            placeholder="Ej. Vacunación"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Fecha y hora */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-teal-800">
          Fecha y horario
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="min-w-0">
            <label className={labelClass} htmlFor="fecha">
              Fecha
            </label>
            <input
              id="fecha"
              type="date"
              className={inputClass}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div className="min-w-0">
            <label className={labelClass} htmlFor="hora">
              Hora
            </label>
            <input
              id="hora"
              type="time"
              className={inputClass}
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={enviando}
        className="
          flex w-full items-center justify-center gap-2
          rounded-xl bg-teal-700 px-4 py-3.5
          text-sm font-semibold text-white
          shadow-sm transition-all duration-200
          hover:bg-teal-800 hover:shadow-md
          active:scale-[0.98]
          disabled:cursor-not-allowed disabled:opacity-60
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-teal-600
          focus-visible:ring-offset-2
        "
      >
        <span>{enviando ? "Enviando..." : "Agendar cita"}</span>
      </button>
    </form>
  );
}
