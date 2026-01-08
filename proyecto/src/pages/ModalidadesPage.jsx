import { useEffect, useState } from "react";
import ModalidadForm from "../components/ModalidadForm";
import { modalidadService } from "../services/ModalidadService";

export default function ModalidadesPage() {
    const [modalidades, setModalidades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalidadEditar, setModalidadEditar] = useState(null);
    const [estado, setEstado] = useState("");


    const cargarModalidades = async () => {
        const params = {};

        if (estado !== "") params.estado = estado;

        const data = await modalidadService.getAll(params);
        setModalidades(data);
    };

    useEffect(() => {
        cargarModalidades();
    }, []);

    useEffect(() => {
        cargarModalidades();
    }, [estado]);

    const handleSuccess = () => {
        setShowModal(false);
        setModalidadEditar(null);
        cargarModalidades();
    };

    const handleNueva = () => {
        setModalidadEditar(null);
        setShowModal(true);
    };

    const handleEditar = (modalidad) => {
        setModalidadEditar(modalidad);
        setShowModal(true);
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta modalidad?")) {
            try {
                await modalidadService.delete(id);
                alert("Modalidad eliminada correctamente");
                cargarModalidades();
            } catch (err) {
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
                    onClick={handleNueva}
                >
                    + Nueva Modalidad
                </button>
            </div>

            <div className="row mb-3">
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
            </div>

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {modalidades.map((m) => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.nombre}</td>
                            <td>{m.estado ? "Activo" : "Inactivo"}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEditar(m)}
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
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalidadEditar ? "Editar Modalidad" : "Nueva Modalidad"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <ModalidadForm
                                onSuccess={handleSuccess}
                                onCancel={() => setShowModal(false)}
                                modalidadEditar={modalidadEditar}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}