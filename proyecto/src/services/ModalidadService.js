import api from "../api/api";

export const modalidadService = {
    getAll: async (params = {}) => {
        const response = await api.get("modalidades/", { params });
        return response.data;
    },

    create: async (modalidad) => {
        const response = await api.post("modalidades/", modalidad);
        return response.data;
    },

    update: async (id, modalidad) => {
        const response = await api.put(`modalidades/${id}/`, modalidad);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`modalidades/${id}/`);
        return response.data;
    }
};