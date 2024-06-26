import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { Field, Form, Formik, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SpinnerSportApp } from "../../Utils/SpinnerSportApp";
import { useEffect, useState } from "react";
import {
  ArrayCheckBoxes,
  CheckBoxValidation,
  SelectValidation,
  TextBoxEditValidation,
} from "../../Utils";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCreateProductService } from "../Hooks/useCreateProductService";
export const CreateProductService = () => {
  const [collapsedDays, setCollapsedDays] = useState([]);
  const [collapsedTrainings, setCollapsedTrainings] = useState([]);
  const product = useParams();
  const classEditTextBox = " input-group mb-3  input-line";
  const {
    initialProduct,
    GetInitialInformation,
    productLoading,
    countriesUP,
    statesUP,
    citiesUP,
    setProductCreated,
    changeNewCountry,
    changeNewState,
    typesOfNutritionUP,
    nutricionalAllergiesUP,
    physicalLevelsUP,
    activitiesUP,
    goalsUP,
    createProduct,
    loadingUpdateProfile,
    productCreated,
    categoriesUp,
    serviceTypesUP,
    changeNewCategory,
    plansUp,
    eventSelected,
    planSelected,
    GuidEmpty,
    isEdit,
    trainingPlanSelected,
    changeNewServiceType,
    showJson
  } = useCreateProductService();
  const navigation = useNavigate();
  useEffect(() => {
    GetInitialInformation(product);
  }, []);
  const handleCollapseDay = (dayIndex) => {
    setCollapsedDays((prevCollapsedDays) => {
      const newCollapsedDays = [...prevCollapsedDays];
      newCollapsedDays[dayIndex] = !newCollapsedDays[dayIndex];
      return newCollapsedDays;
    });
  };
  const handleCollapseTraining = (trainingIndex) => {
    setCollapsedTrainings((prevCollapsedTrainings) => {
      const newCollapsedTrainings = [...prevCollapsedTrainings];
      newCollapsedTrainings[trainingIndex] = !newCollapsedTrainings[trainingIndex];
      return newCollapsedTrainings;
    });
  };
  const validationSchema = Yup.object().shape({
    //userId: "",
    name: Yup.string().required("El nombre es requerido."),
    description: Yup.string().required("La descripción es requerida."),
    picture: Yup.string().required("La imagen es requerida."),
    cityId: Yup.string().required("Selecciona tu ciudad"),
    planId: Yup.string().required("Selecciona tu plan"),
    sportLevel: Yup.string().required("Selecciona tu nivel")
  });
  // istanbul ignore next
  const onSubmit = async (values) => {
    await createProduct(values);
  };

  useEffect(() => {
    if (productCreated) {
      navigation("/product-services");
    }
  }, [productCreated]);
  return (
    <>
      {!productLoading && (
        <Formik
          initialValues={initialProduct}
          enableReinitialize
          onSubmit={(values) => {
            onSubmit(values);
          }}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
        >

          {(formik) => {
            // istanbul ignore next
            return (
              <Form>
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-sm-12 mr-3  animate__animated animate__backInLeft">
                    <TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="name"
                      label="Nombre"
                      type="text"
                      formikForm={formik}
                    />
                    <TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="description"
                      label="Descripción"
                      type="text"
                      formikForm={formik}
                    />
                    <div className="input-group mb-3  input-line">
                      <label
                        className="input-group-text"
                        htmlFor="categoryId"
                      >
                        Categoria
                      </label>
                      <Field
                        id="categoryId"
                        as="select"
                        name="categoryId"
                        className="form-control"
                        size="lg"
                        disabled={isEdit}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "categoryId",
                            e.target.value
                          );
                          changeNewCategory(e.target.value);
                          formik.setFieldValue("serviceTypeId", "");
                        }}
                      >
                        <option value="0">Selecciona</option>
                        {categoriesUp.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className="input-group mb-3  input-line">
                      <label
                        className="input-group-text"
                        htmlFor="serviceTypeId"
                      >
                        Tipo de servicio
                      </label>
                      <Field
                        id="serviceTypeId"
                        as="select"
                        name="serviceTypeId"
                        className="form-control"
                        size="lg"
                        disabled={isEdit}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "serviceTypeId",
                            e.target.value
                          );
                          changeNewServiceType(e.target.value);
                        }}
                      >
                        <option value="0">Selecciona</option>
                        {serviceTypesUP.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    {(!eventSelected && !planSelected) && (<TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="price"
                      label="Precio"
                      type="number"
                      formikForm={formik}
                    />)}
                    <SelectValidation
                      classDiv="input-group mb-3  input-line"
                      idSelect="planId"
                      label="Tipo de plan"
                      formikForm={formik}
                      data={plansUp}
                      formFormik={formik}
                    ></SelectValidation>
                    <TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="picture"
                      label="Imágen"
                      type="text"
                      formikForm={formik}
                    />
                    {(planSelected && trainingPlanSelected) && (<TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="trainingPlan.startAge"
                      label="Edad inicial"
                      type="number"
                      formikForm={formik}
                    />)}
                    {(planSelected && trainingPlanSelected) && (<TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="trainingPlan.endAge"
                      label="Edad final"
                      type="number"
                      formikForm={formik}
                    />)}
                    {eventSelected && (<TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="startDateTime"
                      label="Fecha de inicio"
                      type="datetime-local"
                      formikForm={formik}
                    />)}
                    {eventSelected && (<TextBoxEditValidation
                      classDiv={classEditTextBox}
                      idText="endDateTime"
                      label="Fecha de Finalización"
                      type="datetime-local"
                      formikForm={formik}
                    />)}
                    {!loadingUpdateProfile && (
                      <div className="row d-flex justify-content-around mb-4 mt-5">
                        <button
                          type="submit"
                          disabled={Object.keys(formik.errors).length !== 0}
                          className="col-4  btn btn-primary btn-lg btn-skew"
                        >
                          <span>Guardar</span>
                        </button>
                        <Link
                          to="/product-services"
                          className="col-4  btn btn-secondary btn-lg btn-skew"
                        >
                          Cancelar
                        </Link>
                        {showJson && <pre>{JSON.stringify(formik.values, null, 2)}</pre>}
                      </div>
                    )}

                    {loadingUpdateProfile && (
                      <div className="row d-flex justify-content-around mb-4">
                        <SpinnerSportApp />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-12">
                    <Tabs
                      defaultActiveKey="0"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="0" title="Perfil Geografico">
                        <div className="row  animate__animated animate__fadeInUpBig">
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="input-group mb-3  input-line">
                              <label
                                className="input-group-text"
                                htmlFor="stateId"
                              >
                                Pais
                              </label>
                              <Field
                                id="countryId"
                                as="select"
                                name="countryId"
                                className="form-control"
                                size="lg"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "countryId",
                                    e.target.value
                                  );

                                  changeNewCountry(e.target.value);
                                  formik.setFieldValue("stateId", "");
                                  formik.setFieldValue("cityId", "");
                                }}
                              >
                                <option value="0">Selecciona</option>
                                {countriesUP.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </Field>
                            </div>

                            <div className="input-group mb-3  input-line">
                              <label
                                className="input-group-text"
                                htmlFor="stateId"
                              >
                                Estados
                              </label>
                              <Field
                                id="stateId"
                                as="select"
                                name="stateId"
                                className="form-control"
                                size="lg"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "stateId",
                                    e.target.value
                                  );
                                  changeNewState(e.target.value);
                                  formik.setFieldValue("cityId", "");
                                }}
                              >
                                <option value="0">Selecciona</option>
                                {statesUP.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </Field>
                            </div>

                            <SelectValidation
                              classDiv="input-group mb-3  input-line"
                              idSelect="cityId"
                              label="Ciudad"
                              formikForm={formik}
                              data={citiesUP}
                              formFormik={formik}
                            ></SelectValidation>
                          </div>
                        </div>
                      </Tab>
                      {!eventSelected && (<Tab eventKey="1" title="Perfil alimenticio">
                        <div className="row animate__animated animate__fadeInUpBig">
                          <ArrayCheckBoxes
                            data={nutricionalAllergiesUP}
                            nameGroup="nutritionalAllergies"
                            label="Restricciones para alergias"
                            classDivMain={classEditTextBox}
                            values={formik.values}
                            formikForm={formik}
                            formFormik={formik}
                          />
                          <SelectValidation
                            classDiv="input-group mb-3  input-line"
                            idSelect="typeOfNutritionId"
                            label="Alimento orientado a"
                            formikForm={formik}
                            data={typesOfNutritionUP}
                            formFormik={formik}
                          ></SelectValidation>
                        </div>
                      </Tab>)}
                      <Tab eventKey="2" title="Perfil deportivo">
                        <div className="row  animate__animated animate__fadeInUpBig">
                          <div className="col-md-12 col-lg-12 col-sm-12">

                            <SelectValidation
                              classDiv="input-group mb-3  input-line"
                              idSelect="sportLevel"
                              label="Nivel físico requerido"
                              formFormik={formik}
                              data={physicalLevelsUP}
                              formikForm={formik}
                            ></SelectValidation>

                            <ArrayCheckBoxes
                              data={activitiesUP}
                              nameGroup="activities"
                              label="Actividades Relacionadas"
                              classDivMain={classEditTextBox}
                              values={formik.values}
                            />

                            <ArrayCheckBoxes
                              data={goalsUP}
                              nameGroup="goals"
                              label="Enfoque del plan"
                              classDivMain={classEditTextBox}
                              values={formik.values}
                            />
                          </div>
                        </div>
                      </Tab>
                      {(planSelected && !trainingPlanSelected) && <Tab eventKey="3" title="Plan Nutricional">
                        <div className="row animate__animated animate__fadeInUpBig">
                          <div
                            className="col-md-12 col-lg-12 col-sm-12"
                            style={{ maxHeight: '435px', overflowY: 'auto', overflowX: 'hidden' }}>
                            <FieldArray name="nutritionalPlan.days">
                              {({ push: pushDay, remove: removeDay }) => (
                                <div>
                                  {formik.values.nutritionalPlan.days.map((day, dayIndex) => (
                                    <div key={dayIndex}>
                                      <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6"><span>
                                          Día - {dayIndex + 1}  <a
                                            type="button"
                                            onClick={() => handleCollapseDay(dayIndex)}
                                          >

                                            {collapsedDays[dayIndex] ? <i className="bi bi-arrow-down"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                              <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                                            </svg></i> : <i className="bi bi-arrow-up"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                              <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                                            </svg></i>}
                                          </a>
                                        </span></div>

                                      </div>


                                      {!collapsedDays[dayIndex] && <div>
                                        <TextBoxEditValidation
                                          classDiv={classEditTextBox}
                                          idText={`nutritionalPlan.days[${dayIndex}].name`}
                                          label="Nombre"
                                          type="text"
                                          formikForm={formik}
                                        />

                                        <div
                                          className="col-md-12 col-lg-12 col-sm-12"
                                          style={{ marginLeft: '5px', marginRight: '5px' }}>
                                          <FieldArray name={`nutritionalPlan.days[${dayIndex}].meals`}>
                                            {({ push: pushMeal, remove: removeMeal }) => (
                                              <div>
                                                {day.meals.map((meal, mealIndex) => (
                                                  <div key={mealIndex}>
                                                    <div className="row">
                                                      <span>
                                                        Plato - {mealIndex + 1}
                                                      </span>
                                                    </div>
                                                    <TextBoxEditValidation
                                                      classDiv={classEditTextBox}
                                                      idText={`nutritionalPlan.days[${dayIndex}].meals[${mealIndex}].name`}
                                                      label="Nombre"
                                                      type="text"
                                                      formikForm={formik}
                                                    />

                                                    <TextBoxEditValidation
                                                      classDiv={classEditTextBox}
                                                      idText={`nutritionalPlan.days[${dayIndex}].meals[${mealIndex}].description`}
                                                      label="Descripción"
                                                      type="text"
                                                      formikForm={formik}
                                                    />

                                                    <div className="row">
                                                      <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <TextBoxEditValidation
                                                          classDiv={classEditTextBox}
                                                          idText={`nutritionalPlan.days[${dayIndex}].meals[${mealIndex}].calories`}
                                                          label="Calorias"
                                                          type="number"
                                                          formikForm={formik}
                                                        />
                                                      </div>
                                                      <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <TextBoxEditValidation
                                                          classDiv={classEditTextBox}
                                                          idText={`nutritionalPlan.days[${dayIndex}].meals[${mealIndex}].dishType`}
                                                          label="Tipo de plato"
                                                          type="text"
                                                          formikForm={formik}
                                                        />
                                                      </div>
                                                    </div>

                                                    <TextBoxEditValidation
                                                      classDiv={classEditTextBox}
                                                      idText={`nutritionalPlan.days[${dayIndex}].meals[${mealIndex}].picture`}
                                                      label="Imágen"
                                                      type="text"
                                                      formikForm={formik}
                                                    />
                                                    {mealIndex == formik.values.nutritionalPlan.days[dayIndex].meals.length - 1 &&
                                                      <div className="mb-5">
                                                        <button
                                                          className="col-4  btn btn-primary btn-sm btn-skew"
                                                          type="button"
                                                          onClick={() =>
                                                            pushMeal({ id: GuidEmpty, name: '', description: '', calories: 0, dishType: '', picture: '' })}>
                                                          Agregar Plato
                                                        </button>
                                                        <button
                                                          className="col-4  btn btn-secondary btn-sm btn-skew"
                                                          type="button"
                                                          onClick={() => {
                                                            if (day.meals.length > 1) {
                                                              removeMeal(mealIndex)
                                                            }
                                                          }}>
                                                          Remover Plato
                                                        </button>
                                                      </div>}
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </FieldArray>
                                        </div>
                                      </div>}
                                      {dayIndex == formik.values.nutritionalPlan.days.length - 1 && <div>
                                        <button
                                          className="col-4  btn btn-primary btn-sm btn-skew"
                                          type="button"
                                          onClick={() => pushDay({ id: GuidEmpty, name: '', meals: [{ id: GuidEmpty, name: '', description: '', calories: 0, dishType: '', picture: '' }] })}>
                                          Agregar Dia
                                        </button>
                                        <button
                                          className="col-4  btn btn-secondary btn-sm btn-skew"
                                          type="button"
                                          onClick={() => {
                                            if (formik.values.nutritionalPlan.days.length > 1) {
                                              removeDay(dayIndex)
                                            }
                                          }
                                          }>
                                          Remover Dia
                                        </button>
                                      </div>}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </Tab>}
                      {(planSelected && trainingPlanSelected) && <Tab eventKey="4" title="Plan de Entrenamiento">
                        <div className="row animate__animated animate__fadeInUpBig">
                          <div
                            className="col-md-12 col-lg-12 col-sm-12"
                            style={{ maxHeight: '435px', overflowY: 'auto', overflowX: 'hidden' }}>
                            <FieldArray name="trainingPlan.trainings">
                              {({ push: pushTraining, remove: removeTraining }) => (
                                <div>
                                  {formik.values.trainingPlan.trainings.map((trainings, trainingIndex) => (
                                    <div key={trainingIndex}>
                                      <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                          <span>
                                            Entrenamiento - {trainingIndex + 1}
                                            <a
                                              type="button"
                                              onClick={() => handleCollapseTraining(trainingIndex)}>
                                              {collapsedTrainings[trainingIndex] ?
                                                <i className="bi bi-arrow-down">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                                                  </svg>
                                                </i>
                                                :
                                                <i className="bi bi-arrow-up">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                                                  </svg>
                                                </i>}
                                            </a>
                                          </span>
                                        </div>
                                      </div>
                                      {!collapsedTrainings[trainingIndex] && (
                                        <div>
                                          <TextBoxEditValidation
                                            classDiv={classEditTextBox}
                                            idText={`trainingPlan.trainings[${trainingIndex}].name`}
                                            label="Nombre"
                                            type="text"
                                            formikForm={formik}
                                          />
                                          <TextBoxEditValidation
                                            classDiv={classEditTextBox}
                                            idText={`trainingPlan.trainings[${trainingIndex}].description`}
                                            label="Descripción"
                                            type="text"
                                            formikForm={formik}
                                          />
                                          <div
                                            className="col-md-12 col-lg-12 col-sm-12"
                                            style={{ marginLeft: '5px', marginRight: '5px' }}>
                                            <FieldArray name={`trainingPlan.trainings[${trainingIndex}].exercises`}>
                                              {({ push: pushExercise, remove: removeExercise }) => (
                                                <div>
                                                  {trainings.exercises.map((exercise, exerciseIndex) => (
                                                    <div key={exerciseIndex}>
                                                      <div className="row">
                                                        <span>
                                                          Ejercicio - {exerciseIndex + 1}
                                                        </span>
                                                      </div>
                                                      <TextBoxEditValidation
                                                        classDiv={classEditTextBox}
                                                        idText={`trainingPlan.trainings[${trainingIndex}].exercises[${exerciseIndex}].name`}
                                                        label="Nombre"
                                                        type="text"
                                                        formikForm={formik}
                                                      />
                                                      <TextBoxEditValidation
                                                        classDiv={classEditTextBox}
                                                        idText={`trainingPlan.trainings[${trainingIndex}].exercises[${exerciseIndex}].description`}
                                                        label="Descripción"
                                                        type="text"
                                                        formikForm={formik}
                                                      />
                                                      <div className="row">
                                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                                          <TextBoxEditValidation
                                                            classDiv={classEditTextBox}
                                                            idText={`trainingPlan.trainings[${trainingIndex}].exercises[${exerciseIndex}].sets`}
                                                            label="Series"
                                                            type="number"
                                                            formikForm={formik}
                                                          />
                                                        </div>
                                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                                          <TextBoxEditValidation
                                                            classDiv={classEditTextBox}
                                                            idText={`trainingPlan.trainings[${trainingIndex}].exercises[${exerciseIndex}].repeats`}
                                                            label="Repeticiones"
                                                            type="number"
                                                            formikForm={formik}
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                                          <TextBoxEditValidation
                                                            classDiv={classEditTextBox}
                                                            idText={`trainingPlan.trainings[${trainingIndex}].exercises[${exerciseIndex}].weight`}
                                                            label="Peso (kg)"
                                                            type="number"
                                                            formikForm={formik}
                                                          />
                                                        </div>
                                                      </div>
                                                      <TextBoxEditValidation
                                                        classDiv={classEditTextBox}
                                                        idText={`trainingPlan.trainings[${trainingIndex}].exercises[${exerciseIndex}].picture`}
                                                        label="Imagen"
                                                        type="text"
                                                        formikForm={formik}
                                                      />
                                                      {exerciseIndex === formik.values.trainingPlan.trainings[trainingIndex].exercises.length - 1 &&
                                                        <div className="mb-5">
                                                          <button
                                                            className="col-4  btn btn-primary btn-sm btn-skew"
                                                            type="button"
                                                            onClick={() =>
                                                              pushExercise({ id: GuidEmpty, name: '', description: '', sets: 0, repeats: 0, weight: 0, picture: '' })}>
                                                            Agregar Ejercicio
                                                          </button>
                                                          <button
                                                            className="col-4  btn btn-secondary btn-sm btn-skew"
                                                            type="button"
                                                            onClick={() => {
                                                              if (trainings.exercises.length > 1) {
                                                                removeExercise(exerciseIndex)
                                                              }
                                                            }}>
                                                            Remover Ejercicio
                                                          </button>
                                                        </div>}
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </FieldArray>
                                          </div>
                                          {trainingIndex === formik.values.trainingPlan.trainings.length - 1 &&
                                            <div>
                                              <button
                                                className="col-4  btn btn-primary btn-sm btn-skew"
                                                type="button"
                                                onClick={() => pushTraining({ id: GuidEmpty, name: '', description: '', exercises: [{ id: GuidEmpty, name: '', description: '', sets: 0, repeats: 0, weight: 0, picture: '' }] })}>
                                                Agregar Entrenamiento
                                              </button>
                                              <button
                                                className="col-4  btn btn-secondary btn-sm btn-skew"
                                                type="button"
                                                onClick={() => {
                                                  if (formik.values.trainingPlan.trainings.length > 1) {
                                                    removeTraining(trainingIndex)
                                                  }
                                                }}>
                                                Remover Entrenamiento
                                              </button>
                                            </div>}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </Tab>}

                    </Tabs>
                  </div >
                </div >
              </Form >
            );
          }}


        </Formik >
      )}
      {productLoading && <SpinnerSportApp />}

    </>
  );
};