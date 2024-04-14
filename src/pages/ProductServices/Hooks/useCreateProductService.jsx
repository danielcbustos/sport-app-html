import { useState, useRef, useEffect } from "react";
import { Alerts } from "../../Utils";
import axios from "axios";

export const useCreateProductService = () => {
    const urlAPI = process.env.REACT_APP_API_URL_SERVICE;
    const [initialProduct, setInitialProduct] = useState();
    const [statesUP, setStatesUP] = useState([]);
    const [citiesUP, setCitiesUP] = useState([]);
    const [serviceTypesUP, setServiceTypesUP] = useState([]);
    const [countriesUP, setCountriesUP] = useState([]);
    const [goalsUP, setGoalsUp] = useState([]);
    const [categoriesUp, setCategoriesUp] = useState([]);
    const [activitiesUP, setActivitiesUp] = useState([]);
    const [plansUp, setPlansUp] = useState([]);
    const [typesOfNutritionUP, setTypesOfNutritionUP] = useState([]);
    const [nutritionalAllergiesUP, setNutritionalAllergiesUP] = useState([]);
    const [loadingUpdateProfile, setLoadingUpdateProduct] = useState(false);
    const [productCreated, setProductCreated] = useState(false);
    const [eventSelected, setEventSelected] = useState(false);
    const { showAlertSuccess, showAlertError } = Alerts();
    const [productLoading, setProductLoading] = useState(true);
    const [physicalLevelsUP, setPhysicalLevels] = useState([]);
    const [newCountryId, setNewCountryId] = useState(null);
    const [newStateId, setNewStateId] = useState(null);
    const [newCityId, setNewCityId] = useState(null);
    const [newCategoryId, setNewCategoryId] = useState(null);
    const GuidEmpty = "00000000-0000-0000-0000-000000000000";

    const createProduct = async (updProduct) => {
        try {
            setLoadingUpdateProduct(true);
            const response = await axios.post(
                `${urlAPI}/api/v1/productService`,
                updProduct
            );

            setProductCreated(true);
            showAlertSuccess(
                "Felicitaciones :)",
                `El producto o servicio ${updProduct.name},  producto actualizado.`
            );
            setLoadingUpdateProduct(true);
        } catch (error) {
            showAlertError(
                "Ups, lo sentimos :(",
                `el producto ${updProduct.name}, No se ha actualizado.`
            );
            setProductCreated(false);
            setLoadingUpdateProduct(false);
        } finally {
            setLoadingUpdateProduct(false);
        }
    };

    const GetInitialInformation = async (product) => {
        const productId = product.productId;
        // istanbul ignore next
        try {
            await fetchAllReferencial(productId);
            if (initialProduct.countryId != null && initialProduct.countryId != "") {
                changeNewCountry(initialProduct.countryId);
                if (initialProduct.stateId != null && initialProduct.stateId != "") {
                    changeNewState(initialProduct.stateId);
                    if (initialProduct.cityId != null && initialProduct.cityId != "") {
                        initialProduct.cityId = initialProduct.cityId;
                    }
                }
            }
            setProductLoading(false);
        } catch (error) {
            setProductLoading(false);
        }
    };

    const fetchAllReferencial = async (productId) => {
        try {
            let product = {};
            if (productId) {
                product = axios.get(`${urlAPI}/api/v1/productService/${productId}`);
            } else {
                let date = new Date(Date.now());
                let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                    .toISOString()
                    .split("T")[0];
                product = {
                    data: {
                        productId: "",
                        user: "3BFC0E87-E3BB-46B4-9F0A-B0D264FCD6B6",
                        name: "",
                        description: "",
                        price: 0,
                        picture: "",
                        planId: "",
                        countryId: "",
                        stateId: "",
                        cityId: "",
                        typeOfNutritionId: "",
                        serviceTypeId: "",
                        sportLevel: 0,
                        activities: [],
                        goals: [],
                        allergies: [],
                        startDateTime: dateString,
                        endDateTime: dateString
                    }
                }
            }

            const countries$ = axios.get(
                `${urlAPI}/api/v1/productService/AllCountries`
            );
            const typeOfNutrition$ = axios.get(
                `${urlAPI}/api/v1/productService/TypeOfNutrition`);

            const nutAllergieS$ = axios.get(
                `${urlAPI}/api/v1/productService/NutritionalAllergy`);

            const physicalLevel$ = [
                { "id": "1", "name": "Básico" },
                { "id": "2", "name": "Intermedio" },
                { "id": "3", "name": "Avanzado" }
            ]

            const plans$ = axios.get(`${urlAPI}/api/v1/productService/Plan`);

            const categories$ = axios.get(`${urlAPI}/api/v1/productService/Category`);
            const activities$ = axios.get(`${urlAPI}/api/v1/activities`);

            const goals$ = axios.get(`${urlAPI}/api/v1/goal`);
            // istanbul ignore next
            await axios
                .all([
                    countries$,
                    typeOfNutrition$,
                    nutAllergieS$,
                    physicalLevel$,
                    activities$,
                    goals$,
                    categories$,
                    plans$,
                    product
                ])
                .then(
                    axios.spread(
                        (cou, typNut, nutAllergies, sportLevel, activities, goals, categories, plan, product) => {
                            setCountriesUP(cou.data);
                            setTypesOfNutritionUP(typNut.data);
                            setNutritionalAllergiesUP(nutAllergies.data);
                            setPhysicalLevels(sportLevel);
                            setActivitiesUp(activities.data);
                            setGoalsUp(goals.data);
                            setCategoriesUp(categories.data);
                            setPlansUp(plan.data);
                            setInitialProduct(product.data);
                        }
                    )
                )
                .catch((err) => {
                    console.err(err);
                });
        } catch (error) {
            console.err("use Create Prodcut", error);
        }
    };
    const changeNewCountry = (countryId) => setNewCountryId(countryId);

    useEffect(() => {


        if (newCountryId === "" && !productLoading) {
            setStatesUP([]);
            setCitiesUP([]);
        } else if (newCountryId) {
            axios
                .get(
                    `${urlAPI}/api/v1/productService/StatesByCountry/${newCountryId}`
                )
                .then((response) => {
                    setStatesUP(response.data);
                    setCitiesUP([]);
                });
        }
    }, [newCountryId]);

    const changeNewState = (stateId) => setNewStateId(stateId);
    useEffect(() => {
        async function getCities() {
            if ((newStateId === "" || newStateId === GuidEmpty) && !productLoading) {

                setCitiesUP([]);
                setTimeout(() => {
                    enabledUserLoading();
                }, 300);
            }
            else
                if (newStateId) {

                    var response = await axios
                        .get(
                            `${urlAPI}/api/v1/productService/CitiesByState/${newStateId}`
                        );

                    setCitiesUP(response.data);
                    setTimeout(() => {
                        enabledUserLoading();
                    }, 250);
                }
        }

        async function enabledUserLoading() {
            setProductLoading(false);
        }
        getCities();
    }, [newStateId]);

    const changeNewCategory = (categoryId) => setNewCategoryId(categoryId);
    useEffect(() => {
        async function getServiceTypes() {
            if ((newCategoryId === "" || newCategoryId === GuidEmpty) && !productLoading) {
                setServiceTypesUP([]);
                setTimeout(() => {
                    enabledUserLoading();
                }, 250);
            }
            else
                if (newCategoryId) {

                    var response = await axios
                        .get(
                            `${urlAPI}/api/v1/productService/ServiceTypeByCategory/${newCategoryId}`
                        );
                    if (newCategoryId === 'be8e2306-8bc9-49cc-8d43-a76820370994') {
                        setEventSelected(true);
                    } else {
                        setEventSelected(false);
                    }

                    setServiceTypesUP(response.data);

                    setTimeout(() => {

                        enabledUserLoading();
                    }, 250);
                }
        }
        // istanbul ignore next
        async function enabledUserLoading() {
            setProductLoading(false);
        }
        getServiceTypes();
    }, [newCategoryId]);
    return {
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
        nutricionalAllergiesUP: nutritionalAllergiesUP,
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
        eventSelected
    };
};