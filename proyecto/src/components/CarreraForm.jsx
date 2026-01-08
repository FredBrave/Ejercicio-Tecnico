import { useState, useEffect } from "react";
import { carreraService } from "../services/CarreraService";
import { modalidadService } from "../services/modalidadService";

export default function CarreraForm({ onSuccess, onCancel, carreraEditar }) {
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState(true);
    const [modalidad, setModalidad] = useState("");
    const [modalidades, setModalidades] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarModalidades();
        if (carreraEditar) {
            setNombre(carreraEditar.nombre);
            setEstado(carreraEditar.estado);
            setModalidad(carreraEditar.modalidad);
        }
    }, [carreraEditar]);

    const cargarModalidades = async () => {
        try {
            const data = await modalidadService.getAll();
            setModalidades(data);
        } catch (err) {
            console.error("Error al cargar modalidades");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        if (!modalidad) {
            setError("Debe seleccionar una modalidad");
            return;
        }

        try {
            if (carreraEditar) {
                await carreraService.update(carreraEditar.id, { nombre, estado, modalidad });
                alert("Carrera actualizada correctamente");
            } else {
                await carreraService.create({ nombre, estado, modalidad });
                alert("Carrera creada correctamente");
            }

            setNombre("");
            setEstado(true);
            setModalidad("");
            onSuccess();
        } catch (err) {
            setError(carreraEditar ? "Error al actualizar carrera" : "Error al crear carrera");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-2">
                    <label>Nombre</label>
                    <input
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <label>Modalidad</label>
                    <select
                        className="form-select"
                        value={modalidad}
                        onChange={(e) => setModalidad(e.target.value)}
                    >
                        <option value="">Seleccione una modalidad</option>
                        {modalidades.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={estado}
                        onChange={(e) => setEstado(e.target.checked)}
                    />
                    <label className="form-check-label">Activo</label>
                </div>
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    {carreraEditar ? "Actualizar" : "Guardar"}
                </button>
            </div>
        </form>
    );
}