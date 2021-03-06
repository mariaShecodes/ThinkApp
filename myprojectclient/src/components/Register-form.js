import React, { Component } from 'react'
import Services  from '../services/patient.services'

import { Link } from 'react-router-dom'
import { Form, Col } from 'react-bootstrap'

import '../styles/patient-form.css'


class NewRegister extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            dateCreated: '',
            role: 'REGISTER',
            context: '',
            imageUrl: '',
            think: '',
            feel: '',
            doing: '',
            happen: '',
            patient: JSON.parse(localStorage.getItem('userID')),  // Obtenemos el id del profesional a través de local storage
        }
        this.service = new Services()
    }
    
    handleChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { title, dateCreated, role, context, imageUrl, think, feel, doing, happen, patient } = this.state

        this.service.newRegister( title, dateCreated, role, context, imageUrl, think, feel, doing, happen, patient )  //.newRegister lo coge del Services import
            .then( x => {
                this.props.closeModal()
                this.props.updateRegisterList()
            })
            .catch(err => console.log({err}))
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.service.handleUpload(uploadData)
            .then(response => this.setState({ imageUrl: response.data.secure_url }))
            .catch(err => console.log(err))
    }

    // handleAudioUpload = url => {

    //     console.log("This is the Blob ",url)
       
    //     let uploadData = new FormData();
    //     uploadData.append("blob", url);

    //     this.services.handleAudioUpload(uploadData)
    //         .then(response => this.setState({ ...this.state, audio: response.secure_url }))
    //         .catch(err => console.log(err))
    // }



    render() {

        return (
            <>
            <h4>Añadir nuevo registro</h4>

            <hr></hr>

            <form onSubmit={this.handleSubmit}>
                <Form.Group controlId="input-title">
                    <Form.Label className="title input-linea">Título</Form.Label>
                    <Form.Control name="title" type="text" className="form-control" id="input-title" onChange={this.handleChangeInput} placeholder="Título del autorregistro" />
                </Form.Group>

                <Form.Group  controlId="input-date">
                    <Form.Label className="title input-linea">Fecha</Form.Label>
                    <Form.Control name="dateCreated" type="date" className="form-control" id="input-date" onChange={this.handleChangeInput}/>
                </Form.Group>
   
                <div className="form-group">
                    <label htmlFor="input-context">¿Dónde estoy?</label>
                    <input name="context" type="text" className="form-control" id="input-context" onChange={this.handleChangeInput} />
                </div>
                <div className="form-group">
                        <label htmlFor="input-img">Imagen del lugar</label>
                        <input name="imageUrl" type="file" className="form-control" id="input-img" onChange={this.handleFileUpload} />
                </div>
                <div className="form-group">
                    <label htmlFor="input-think">¿Qué pienso?</label>
                    <input name="think" type="text-area" className="form-control" id="input-think" onChange={this.handleChangeInput} />
                </div>
                <div className="form-group">
                     <label>¿Cómo me siento? </label>
                     <br></br>
                     <select name="feel" id="input-feel" selected={this.state.feel} onChange={this.handleChangeInput} >
                         <option disabled selected value>Select an option</option>
                         <option value="Feliz">Feliz</option>
                         <option value="Estresado/a" >Estresado/a</option>
                         <option value="Indiferente" >Indiferente</option>
                         <option value="Preocupado/a" >Preocupado/a</option>
                         <option value="Triste" >Triste</option>
                         <option value="Aburrido/a">Aburrido/a</option>
                         <option value="Furioso/a">Furioso/a</option>
                         <option value="Cansado/a">Cansado/a</option>
                         <option value="Genial">Genial</option>
                    </select> 
                </div>
                <div className="form-group">
                    <label htmlFor="input-doing">¿Qué hago?</label>
                    <textarea name="doing" type="text-area" className="form-control" id="input-doing" onChange={this.handleChangeInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="input-happen">¿Qué pasa después?</label>
                    <textarea name="happen" type="text-area" className="form-control" id="input-happen" onChange={this.handleChangeInput} />
                </div>

                <div className="btn-options">
                    <button type="submit" className="btn btn-info btn-sm">Crear</button>
                    <Link  to="/patient/area" className="btn btn-info btn-sm" onClick={this.props.closeModal}>Cerrar</Link>
                </div>
            </form>
        </>
           
        )
    }
}
export default NewRegister