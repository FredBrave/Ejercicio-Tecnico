import { useEffect, useState } from "react";
import api from "../api/api";
import ModalidadForm from "../components/ModalidadForm";

export default function ModalidadesPage() {
    const [modalidades, setModalidades] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const cargarModalidades = async () => {
        const res = await api.get("modalidades/");
        setModalidades(res.data);
    }

    useEffect(() => {
        cargarModalidades();
    }, []);

    const handleSuccess = () => {
        setShowModal(false);
        cargarModalidades();
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

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {modalidades.map((m) => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.nombre}</td>
                            <td>{m.estado ? "Activo" : "Inactivo"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nueva Modalidad</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <ModalidadForm
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