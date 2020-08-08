import React, { Component } from 'react'
import axios from 'axios'
import {Alert} from 'reactstrap';

export default class characters extends Component {

        constructor(){
            super();
            this.state = {
                character: [],
                location: '',
                searchCharacter:'',
                error:'',
                visible: false
            }
        }


       async handleSubmit (e){
            e.preventDefault();
            if(!this.state.searchCharacter){
                return this.setState({error:'Por favor ingrese un número válido'})
            }
            const rest = await axios.get(`https://rickandmortyapi.com/api/character/${this.state.searchCharacter}`)
            this.setState({character: rest.data, location: rest.data.location})
        }
        onShowalert()  {
            this.setState({visible: true}, () => {
                window.setTimeout(()=>{
                    this.setState({visible:false})
                }, 2000)
            })
        }

      render() {
 
        const {character, location} =  this.state;
        
       return (
           
         
            <div>
            <div className="container">
                <div className="card border-success text-white bg-success text-center ">
                <div className="card-body">
                <div className="text-align-center">
                    <img src={character.image} alt="" className="card-img-top rounded  mb-3 border border-warning img-fluid w-25 h-25"/>

                 <h3>Nombre: {character.name}</h3>
                  <h5>Localización: {location.name}</h5>
                  <h5>Género: {character.gender}</h5>
                  <h5>Especie: {character.species}</h5>
                   <h5> Estatus: {character.status}</h5>

                         <form onSubmit={(e)=>this.handleSubmit(e)} action="">
                             <div className="form-fluid align-items-center mb-3">
                                 <div className="col-auto ">
                                 <input 
                                  type="text"
                                  name="" 
                                  id="" 
                                  className="form-control form-control-lg mb-3 "
                                  placeholder="Escribe un número del 1 al 100"
                                  onChange={e => this.setState({searchCharacter: e.target.value})}
                                  autoFocus
                                   />
                                 </div>

                                 <div className="col-auto">
                                     <button type="submit" className="btn btn-lg btn-warning"  onClick={()=>{this.onShowalert()}} >Buscar!</button>
                                 </div>
                             </div>
                         </form> 
                    
                           <Alert color="danger" isOpen={this.state.visible}>
                             {this.state.error ? this.state.error:''}
                           </Alert>
                             
                         <div className="card-footer">
                             Desarrollado con &hearts; por Pablo Hernández. 2020
                         </div>
                           
                        </div>
                        
                     </div>
                </div>
            </div>
         </div>
                
           
        )
    }
}
