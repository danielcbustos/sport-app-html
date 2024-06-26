import { useParams } from 'react-router-dom';
import { IMAGES } from "../../../../constants/theme";
import PageTitle from "../../../../elements/PageTitle";
import DetailMealTable from "../../Components/NutritionalPlan/DetailMealTable";
import React, { useEffect } from "react";
import { useDetailMealTable } from "../../Hooks/NutritionalPlan/useDetailMealTable";
import { Alert, Spinner } from "react-bootstrap"; // Agregar Spinner y Alert

const DetailMealTablePage = () => {
  const { productId } = useParams(); // Obtén el `productId`
  const { initialData, mealLoading, error, GetDataAsync } = useDetailMealTable(productId); // Asegúrate de obtener `GetDataAsync`

  // Llama a `GetDataAsync` cuando el componente se monta
  useEffect(() => {
    if (productId) {
      GetDataAsync();
    }
  }, [productId, GetDataAsync]); // Asegúrate de usar las dependencias correctas

  // Encuentra el plan que coincide con el `productId`
  const plan = initialData?.productId === productId ? initialData : null;

  // Cambia el título de la página si se encuentra el plan
  useEffect(() => {
    if (plan) {
      document.title = `Plan Alimenticio - ${plan.name}`;
    }
  }, [plan]);





  return (
    <div className="page-content bg-white animate__animated animate__fadeInRightBig">
      <PageTitle activePage={plan?.name} parentTitle="Planes Alimenticios" /> {/* Usa `plan?.name` para evitar errores */}
      <div
        className=""
        style={{ backgroundImage: `url(${IMAGES.BgImage1})` }}
      >
        <div className="container">
          <div className="row mt-5">
            <div className="schedule-table table-responsive">
              <DetailMealTable productId={productId} /> {/* Pasa el `productId` */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMealTablePage;
