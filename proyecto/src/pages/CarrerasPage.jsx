import { useEffect, useState } from "react";
import CarreraForm from "../components/CarreraForm";
import { carreraService } from "../services/CarreraService";
import { modalidadService } from "../services/modalidadService";

export default function CarrerasPage() {
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [carreraEditar, setCarreraEditar] = useState(null);
    const [estado, setEstado] = useState("");
    const [modalidad, setModalidad] = useState("");
    const [modalidades, setModalidades] = useState([]);


    const cargarCarreras = async () => {
        const params = {};

        if (estado !== "") params.estado = estado;
        if (modalidad !== "") params.modalidad = modalidad;

        const data = await carreraService.getAll(params);
        setCarreras(data);
    };

    useEffect(() => {
        const cargarModalidades = async () => {
            const data = await modalidadService.getAll();
            setModalidades(data);
        };

        cargarModalidades();
    }, []);

    useEffect(() => {
        cargarCarreras();
    }, [estado, modalidad]);

    const handleSuccess = () => {
        setShowModal(false);
        setCarreraEditar(null);
        cargarCarreras();
    };

    const handleNueva = () => {
        setCarreraEditar(null);
        setShowModal(true);
    };

    const handleEditar = (carrera) => {
        setCarreraEditar(carrera);
        setShowModal(true);
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta carrera?")) {
            try {
                await carreraService.delete(id);
                alert("Carrera eliminada correctamente");
                cargarCarreras();
            } catch (err) {
                alert("Error al eliminar carrera");
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Carreras</h2>
                <button
                    className="btn btn-primary"
                    onClick={handleNueva}
                >
                    + Nueva Carrera
                </button>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="">Todos los estados</option>
                        <option value="true">Activos</option>
                        <option value="false">Inactivos</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={modalidad}
                        onChange={(e) => setModalidad(e.target.value)}
                    >
                        <option value="">Todas las modalidades</option>
                        {modalidades.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Modalidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {carreras.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.nombre}</td>
                            <td>{c.estado ? "Activo" : "Inactivo"}</td>
                            <td>{c.modalidad_nombre || c.modalidad}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEditar(c)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleEliminar(c.id)}
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
                                    {carreraEditar ? "Editar Carrera" : "Nueva Carrera"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <CarreraForm
                                onSuccess={handleSuccess}
                                onCancel={() => setShowModal(false)}
                                carreraEditar={carreraEditar}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}