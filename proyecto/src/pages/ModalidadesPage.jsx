import { useEffect, useState } from "react";
import api from "../api/api";


export default function ModalidadesPage() {
    const [modalidades, setModalidades] = useState([]);

    const cargarModalidades = async () => {
        const res = await api.get("modalidades/");
        setModalidades(res.data);
    }
    useEffect(() => {
        cargarModalidades();

    }, []);

    return (
        <div className="container mt-4">
            <h2>Modalidades</h2>


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
        </div>
    );
}