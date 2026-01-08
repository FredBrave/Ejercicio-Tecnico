import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ModalidadForm from "../components/ModalidadForm";
import { modalidadService } from "../services/ModalidadService";

export default function ModalidadesPage() {
    const [showModal, setShowModal] = useState(false);
    const [modalidadEditar, setModalidadEditar] = useState(null);
    const [estado, setEstado] = useState("");
    const [texto, setTexto] = useState("");

    const queryClient = useQueryClient();

    const {
        data: modalidades = [],
        isFetching,
    } = useQuery({
        queryKey: ["modalidades", estado, texto],
        queryFn: () => {
            const params = {};

            if (estado !== "") {
                params.estado = estado === "true";
            }

            if (texto.trim() !== "") {
                params.search = texto;
            }

            return modalidadService.getAll(params);
        },
        keepPreviousData: true,
    });

    const handleSuccess = () => {
        setShowModal(false);
        setModalidadEditar(null);
        queryClient.invalidateQueries(["modalidades"]);
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta modalidad?")) {
            try {
                await modalidadService.delete(id);
                queryClient.invalidateQueries(["modalidades"]);
            } catch {
                alert("Error al eliminar modalidad");
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Modalidades</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    + Nueva Modalidad
                </button>
            </div>

            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    <div className="row mb-3 align-items-center">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar por nombre..."
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="true">Activos</option>
                                <option value="false">Inactivos</option>
                            </select>
                        </div>

                        {isFetching && (
                            <div className="col-md-3 text-muted">
                                Buscando...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th style={{ width: "10%" }}>ID</th>
                                <th style={{ width: "50%" }}>Nombre</th>
                                <th style={{ width: "20%" }}>Estado</th>
                                <th style={{ width: "20%" }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalidades.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No hay resultados
                                    </td>
                                </tr>
                            ) : (
                                modalidades.map((m) => (
                                    <tr key={m.id}>
                                        <td>{m.id}</td>
                                        <td>{m.nombre}</td>
                                        <td>
                                            <span className={`badge ${m.estado ? 'bg-success' : 'bg-secondary'}`}>
                                                {m.estado ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() => {
                                                    setModalidadEditar(m);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleEliminar(m.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <ModalidadForm
                                modalidadEditar={modalidadEditar}
                                onSuccess={handleSuccess}
                                onCancel={() => setShowModal(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
