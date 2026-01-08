import { useState } from "react";
import api from "../api/api";

export default function ModalidadForm({ onSuccess, onCancel }) {
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState(true);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        try {
            await api.post("modalidades/", {
                nombre,
                estado,
            });

            setNombre("");
            setEstado(true);
            alert("Modalidad creada correctamente");
            onSuccess();
        } catch (err) {
            setError("Error al crear modalidad");
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
                    Guardar
                </button>
            </div>
        </form>
    );
}