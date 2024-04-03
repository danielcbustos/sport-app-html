import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import modelImage from "../../../assets/images/main-slider/slider2/hero.png";
import { GetErrorBorder, SpinnerSportApp } from "../../Utils";
import { FooterLogin, HeaderLogin } from "../components";
import useLogin from "../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();
  const [formValues, setformValues] = useState(null);
  const { LoginUser, loadingUser, userLogged } = useLogin("");

  const initialValuesObject = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("La contraseña es requerida."),
    email: Yup.string()
      .email("El email tiene un formato errado")
      .required("El email es requerido"),
  });

  const onSubmit = async (values) => {
    await LoginUser(values);
  };

  useEffect(() => {
    if (userLogged) {
      setformValues(initialValuesObject);
      navigation("/");
    }
  }, [userLogged]);

  return (
    <Formik
      initialValues={formValues || initialValuesObject}
      enableReinitialize // decide  your form could be  change values after of loading
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {(formik) => {
        return (
          <div className="flex m-1">
            <Form>
              <div>
                <HeaderLogin />
                <MDBContainer className="animate__animated animate__fadeInRightBig">
                  <MDBCard>
                    <MDBRow className="g-0">
                      <MDBCol md="5">
                        <MDBCardImage
                          src={modelImage}
                          alt="login form"
                          className="rounded-start w-80"
                        />
                      </MDBCol>

                      <MDBCol md="7">
                        <MDBCardBody className="d-flex flex-column">
                          <div className="d-flex flex-row mt-2">
                            <div className="section-head">
                              <h2 className="title">
                                Bienvenido a <span>SPORTAPP</span>
                              </h2>
                            </div>
                          </div>

                          <h5
                            className="fw-normal my-1 pb-1"
                            style={{ letterSpacing: "1px" }}
                          >
                            Acceder a tu cuenta
                          </h5>
                          <div className="mb-4">
                            <label htmlFor="email">Email</label>
                            <Field
                              as={MDBInput}
                              id="email"
                              type="email"
                              name="email"
                              placeholder="user@SportApp.com"
                              size="lg"
                              style={GetErrorBorder(formik.errors, "email")}
                            />
                            <ErrorMessage className="text-red" name="email">
                              {(errorMsg) => (
                                <div className="text-red">{errorMsg}</div>
                              )}
                            </ErrorMessage>
                          </div>

                          <div className="mb-4">
                            <label htmlFor="name">Contraseña</label>
                            <Field
                              as={MDBInput}
                              id="password"
                              type="password"
                              name="password"
                              placeholder="***********"
                              size="lg"
                              style={GetErrorBorder(formik.errors, "password")}
                            />
                            <ErrorMessage className="text-red" name="password">
                              {(errorMsg) => (
                                <div className="text-red">{errorMsg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                          <MDBRow className="mb-4">
                            <MDBCol col="12">
                              <div className="d-flex justify-content-lg-center gap-4">
                                {!loadingUser && (
                                  <button
                                    name="submit"
                                    value="Submit"
                                    type="submit"
                                    disabled={!formik.isValid}
                                    className="btn btn-primary btn-lg btn-skew"
                                  >
                                    <span>Iniciar sesion</span>
                                  </button>
                                )}
                                {loadingUser && <SpinnerSportApp />}

                                {!loadingUser && (
                                  <Link
                                    to="/"
                                    className="btn btn-secondary btn-lg btn-skew"
                                  >
                                    Cancelar
                                  </Link>
                                )}
                              </div>
                            </MDBCol>
                          </MDBRow>

                          <div className="mb-5"></div>
                          <FooterLogin />
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBContainer>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;