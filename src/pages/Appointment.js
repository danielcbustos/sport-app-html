import React, { useRef } from 'react';
// import { Dropdown } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
//import swal from "sweetalert";
import Select from 'react-select';

import { IMAGES } from '../constants/theme';
import Header from '../layouts/Header';
import { Link } from 'react-router-dom';

const options = [
    { value: '0', label: 'Select Service' },
    { value: '1', label: 'Strength Center' },
    { value: '2', label: 'Fitness' },
    { value: '3', label: 'Muscle Bar' },
]

const Appointment = () => {
    const form = useRef();
	const sendEmail = (e) => {
		e.preventDefault();
		//emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
		emailjs.sendForm('service_gfykn6i', 'template_iy1pb0b', e.target, 'HccoOtZS6GHw-N-m6')
		  .then((result) => {
			  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  });
		  e.target.reset()
		  //swal('Good job!', 'We have received your message successfully.Thanks for Contact.', "success");
	};
    return (
        <>
            <div className="page-wraper">

                <Header />
                <div className="page-content bg-white">
                    <section className="appointment-page" data-text="HEALTH" style={{backgroundImage: "url("+ IMAGES.BgAppoint +")"}}>
                        <div className="container">
                            <div className="section-head">
                                <span className="sub-title">Get in Touch</span>
                                <h2 className="title">Registrate a  <span>SPORTAPP</span></h2>
                            </div>
                            <form className="appointment-form dzForm" ref={form} onSubmit={sendEmail}>
                                
                                <p className="appointment-text">
                                    Hola, Mi Nombre es{"  "}
                                    <input name="dzFirstName" required type="text" className="form-control" placeholder="Nombre" /> {" "}
                                    y estoy buscando
                                    <Select 
                                        options={options} 
                                        defaultValue={options[0]}
                                        isSearchable = {false}
                                        
                                        className="custom-react-select ms-2"
                                    />
                                   
                                   Ponte en contacto con nosotros en {" "}
                                    <input name="dzEmail" required type="text"  className="form-control" placeholder="Tu  correo electrónico aquí"/> {" "}
                                    !
                                </p>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />{" "}
                                    <label className="form-check-label" for="flexCheckDefault">Por la presente acepto todos los términos y condiciones.</label>
                                </div>
                                <button name="submit" type="submit" value="Submit" className="btn btn-primary btn-lg btn-skew"><span>Agendar</span></button>
                            </form>
                        </div>
                    </section>
                </div>
                <footer className="site-footer style-1 bg-img-fix footer-action" id="footer">
                    <div className="footer-bottom">
                        <div className="text-center"> 
                            <span className="copyright-text">Copyright © 2024 <Link to="https://uniandes.edu.co/" target="_blank" rel="noreferrer" >Grupo-13</Link>. Todos  los derechos reservados</span> 
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Appointment;