import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Alerts, GetUserInfo } from "../../../Utils";

export const useMealTablePlan = () => {
  const urlAPI = process.env.REACT_APP_API_URL_SERVICE;
  const urlAPI2 = process.env.REACT_APP_API_URL;
  const { getToken } = GetUserInfo();
  const token = useRef(getToken());

  const [initialData, setInitialData] = useState([]);
  const [mealLoading, setMealsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showAlertSuccess, showAlertError } = Alerts();
  const [subscribedUsers, setSubscribedUsers] = useState([]);

  const GetDataAsync = async () => {
    try {
      setMealsLoading(true);
      setError(null);

      const requestData = {
        serviceTypes: ["01B50F0D-3226-4DF2-B912-4DA4B37D9BD9"],

      };

      const productServicesResponse = await axios.post(
        `${urlAPI}/api/v1/productService/getFilteredList`,
        requestData
      );

      const newData = await Promise.all(productServicesResponse.data.map(async (x) => {
        const goal = x.goals.length > 0 ? await getGoal(x.goals[0]) : null
        return { ...x, goal:  goal}
      }));
      setInitialData(newData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setError("Ocurrió un error al cargar datos.");
    } finally {
      setMealsLoading(false);
    }
  };
  const getGoal = async (goalId) => {
    const goal = await axios.get(`${urlAPI}/api/v1/goal/${goalId}`);
    return goal.data;
  };
  const handleSubscribe = async (item) => {
    try {
      // Verificar si el usuario está suscrito al mismo plan
      const alreadySubscribed = subscribedUsers.some(
        (user) => user.userId === item.userId && user.serviceId === item.serviceId
      );

      if (alreadySubscribed) {
        showAlertError(
          "Ya estás suscrito",
          "No puedes suscribirte nuevamente a este plan."
        );
        return; // No procedas con la suscripción
      }

      const response = await axios.post(
        `${urlAPI2}/api/V1/EnrollServiceUser`,
        item,
        {
          headers: { Authorization: `Bearer ${token.current}` },
        }
      );

      // Agregar al usuario a la lista de suscritos, vinculando el plan y el usuario
      setSubscribedUsers((prev) => [...prev, { userId: item.userId, serviceId: item.serviceId }]);

      showAlertSuccess(
        "Suscripción exitosa",
        "Te has suscrito correctamente."
      );

    } catch (error) {
      console.error("Error al suscribirse:", error);
      showAlertError("Ups :(", "No se pudo suscribir. Inténtalo de nuevo.");
    }
  };

  return {
    initialData,
    GetDataAsync,
    mealLoading,
    error,
    handleSubscribe,
    subscribedUsers,
  };
};

export default useMealTablePlan;
