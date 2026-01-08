import api from "../api/api";

export const carreraService = {
    getAll: async () => {
        const response = await api.get("carreras/");
        return response.data;
    },

    create: async (carrera) => {
        const response = await api.post("carreras/", carrera);
        return response.data;
    },

    update: async (id, carrera) => {
        const response = await api.put(`carreras/${id}/`, carrera);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`carreras/${id}/`);
        return response.data;
    }
};