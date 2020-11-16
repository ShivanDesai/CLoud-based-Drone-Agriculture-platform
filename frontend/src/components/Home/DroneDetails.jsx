import React, { Component } from "react";

import { Card, Button,Accordion } from "react-bootstrap";


import {  Form } from "react-bootstrap";

import { connect } from "react-redux";
import { updateDrone } from "../_actions/droneActions";


class DroneDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      size: "",
      type: "",
      description: "",
      image:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e,drone_id) => {
    //prevent page from refresh
    e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });

      const data = {
        name: this.state.name,
        size: this.state.size,
        type: this.state.type,
        description: this.state.description,
        id:drone_id
      };

      this.props.updateDrone(data);
    
  };
  render() {
   const dronedetails = this.props.location.state;
   var imageuri = null;

   [dronedetails].map(dronedetails => 
   imageuri ="data:image/png;base64," + dronedetails.image
   )

  // console.log(dronedetails);
  
   return(
       <div>
        {[dronedetails].map(dronedetails => <div>
          <Accordion>
        <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
          <Card.Title>{dronedetails.name}</Card.Title>
          <Card.Text>
            <p>Drone Description - {dronedetails.description} </p>
            <p>Drone Name - {dronedetails.name} </p>
            <p>Drone Size - {dronedetails.size} </p>
            <p>Drone Type - {dronedetails.type} </p>
            <p>Drone Image -  <img src={imageuri} alt="drone"/> </p>
          </Card.Text>
        
          </Card.Body>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Update Drone
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <Form>
                <h2>Update Drone</h2>
                <hr />
            
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  /></Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    name="type"
                    value={this.state.dronetype}
                    onChange={this.handleChange}
                  /></Form.Group>
                 
                  
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={this.state.size}
                    onChange={this.handleChange}
                  />
                  
                </Form.Group>
               
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  /></Form.Group>

    
              <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleSubmit(e,dronedetails.drone_id)}>
                Update Drone
              </Button>
              <br />
            </Form>
                  
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Delete Drone
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Card.Text><h4>Are you sure you want to delete this drone from the catalog?</h4></Card.Text>

                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          </div>)}
       </div>
   )
   
  }
}

const mapStateToProps = (state) => ({
  store: state.storeState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { updateDrone })(DroneDetails);