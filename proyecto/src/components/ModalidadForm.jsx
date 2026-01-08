import { useState, useEffect } from "react";
import { modalidadService } from "../services/modalidadService";

export default function ModalidadForm({ onSuccess, onCancel, modalidadEditar }) {
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (modalidadEditar) {
            setNombre(modalidadEditar.nombre);
            setEstado(modalidadEditar.estado);
        }
    }, [modalidadEditar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        try {
            if (modalidadEditar) {
                await modalidadService.update(modalidadEditar.id, { nombre, estado });
                alert("Modalidad actualizada correctamente");
            } else {
                await modalidadService.create({ nombre, estado });
                alert("Modalidad creada correctamente");
            }

            setNombre("");
            setEstado(true);
            onSuccess();
        } catch (err) {
            setError(modalidadEditar ? "Error al actualizar modalidad" : "Error al crear modalidad");
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
                    {modalidadEditar ? "Actualizar" : "Guardar"}
                </button>
            </div>
        </form>
    );
}