import React from "react";
import { IMAGES } from "../constants/theme";
import PageTitle from "../elements/PageTitle";
import ServiciosProductosTable from '../elements/ServiciosProductosTable';

const ServicesDetailsTable = () => {
  return (
    <>
      <div className="page-content bg-white">
        <PageTitle activePage="Planes deportivos" parentTitle="Servicios" />
        <div
          className="animate__animated animate__fadeInRightBig"
          style={{ backgroundImage: "url(" + IMAGES.BgImage1 + ")" }}
        >
          <div className="container">
            <div className="row">
            <div className="schedule-table table-responsive">
              <ServiciosProductosTable></ServiciosProductosTable>
            </div>

            </div>

          </div>
        </div>
      
      </div>
    </>
  );
};

export default ServicesDetailsTable;
