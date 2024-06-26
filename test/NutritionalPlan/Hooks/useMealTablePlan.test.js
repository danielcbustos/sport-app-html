import { renderHook, act } from "@testing-library/react-hooks"; // Para pruebas de hooks
import axios from "axios"; // Para simular llamadas a la API
import useMealTablePlan from "../../../src/pages/MealPlans/Hooks/NutritionalPlan/useMealTablePlan"; // El custom hook a probar
import { Alerts, GetUserInfo } from "../../../src/pages/Utils"; // Funciones auxiliares

// Simular `axios`
jest.mock("axios");
jest.mock("../../../src/pages/Utils", () => ({
    Alerts: jest.fn().mockReturnValue({
        showAlertSuccess: jest.fn(),
        showAlertError: jest.fn(),
    }),
    GetUserInfo: jest.fn().mockReturnValue({
        getToken: jest.fn().mockReturnValue("mocked-token"), // Simular el token
    }),
}));

describe("useMealTablePlan Hook", () => {
    const urlAPI = "http://mock-api"; // URL de la API simulada para pruebas

    beforeAll(() => {
        process.env.REACT_APP_API_URL_SERVICE = urlAPI; // Configurar la URL de la API
        process.env.REACT_APP_API_URL = urlAPI;
    });

    it("inicializa el estado correctamente", () => {
        const { result } = renderHook(() => useMealTablePlan());

        // Verificar el estado inicial del hook
        expect(result.current.initialData).toEqual([]); // Debe ser vacío al inicio
        expect(result.current.mealLoading).toBe(true); // Debe estar cargando
        expect(result.current.error).toBeNull(); // Sin error al inicio
    });

    it("carga datos correctamente tras llamada a GetDataAsync", async () => {
        const expectedProductServices = [{ productId: "123", name: "Plan Básico" , goals:[1]}];
        const expectedGoal = { name: "Pérdida de peso" };

        // Configurar respuestas simuladas para la llamada a la API
        axios.post.mockResolvedValueOnce({ data: expectedProductServices }); // Simular respuesta del POST
        axios.get.mockResolvedValueOnce({ data: expectedGoal });
        const { result, waitForNextUpdate } = renderHook(() => useMealTablePlan());

        // Llamar al método para obtener datos
        act(() => {
            result.current.GetDataAsync();
        });

        // Esperar a la siguiente actualización después de la llamada a la API
        await waitForNextUpdate();

        // Verificar que se obtuvieron datos correctamente
        expect(result.current.initialData).toEqual(
            [{ productId: "123", name: "Plan Básico", goals: [1], goal: expectedGoal }]
        ); // Datos correctos
        expect(result.current.mealLoading).toBe(false); // Ya no está cargando
        expect(result.current.error).toBeNull(); // Sin error
    });

    it("maneja errores correctamente al cargar datos", async () => {
        const errorMessage = "Error simulado";

        // Configurar respuestas simuladas para simular un error
        axios.post.mockRejectedValueOnce(new Error(errorMessage)); // Simular error en el POST
        axios.get.mockRejectedValueOnce(new Error(errorMessage)); // Simular error en el GET

        const { result, waitForNextUpdate } = renderHook(() => useMealTablePlan());

        // Llamar al método para obtener datos
        act(() => {
            result.current.GetDataAsync();
        });

        // Esperar a la siguiente actualización
        await waitForNextUpdate();

        // Verificar que el error fue manejado correctamente
        expect(result.current.mealLoading).toBe(false); // Ya no está cargando
        expect(result.current.error).toBe("Ocurrió un error al cargar datos."); // Mensaje amigable
    });

    it("maneja suscripción correctamente", async () => {
        const item = { userId: "user1", serviceId: "123", serviceName: "Plan Básico" };

        // Configurar respuesta simulada para la suscripción
        axios.post.mockResolvedValueOnce({ data: { message: "Success" } });

        const { result } = renderHook(() => useMealTablePlan());

        // Llamar a `handleSubscribe` para probar la suscripción
        await act(async () => {
            await result.current.handleSubscribe(item);
        });

        // Verificar que la suscripción fue exitosa
        expect(result.current.subscribedUsers).toContainEqual({
            userId: item.userId,
            serviceId: item.serviceId,
        }); // Usuario debe estar suscrito

        // Verificar que se llamó a `showAlertSuccess`
        const { showAlertSuccess } = Alerts();
        expect(showAlertSuccess).toHaveBeenCalledWith(
            "Suscripción exitosa",
            "Te has suscrito correctamente."
        );
    });

    it("evita suscribirse si el usuario ya está suscrito", async () => {
        const item = { userId: "user1", serviceId: "123", serviceName: "Plan Básico" };

        const { result } = renderHook(() => useMealTablePlan());

        // Simular que el usuario ya está suscrito
        await act(async () => {
            result.current.subscribedUsers = [{ userId: "user1", serviceId: "123" }];
        });

        // Llamar a `handleSubscribe`
        await act(async () => {
            await result.current.handleSubscribe(item);
        });


    });
});
