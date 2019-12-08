import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PostField from './PostField';
import { Redirect } from "react-router-dom";


class CreatePostType extends Component {

    constructor( props ) {
        super();
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.addNewField = this.addNewField.bind(this);
        this.postFieldChangeHandler = this.postFieldChangeHandler.bind(this);
        this.postFieldDeleteHandler = this.postFieldDeleteHandler.bind(this);
        this.createPostTypeHandler = this.createPostTypeHandler.bind(this);

    
        this.state = {
          
          community : props.location.props.community,
          form: {
            name:'',
            explanation:'',
            postFieldSet : [{  
                            required : false,
                            fieldLabel : '',
                            fieldType : '',
                            explanation : '' 
                        }]
          },
          result : '',
          showCommunityHome : false
        }
      }

    createPostTypeHandler = event => {
    
      event.preventDefault();

      let communitydata = this.state.community;
      let postType =  this.state.form;
      communitydata.postTypeSet.push(postType);

    
      const requestbody = {
        "community" :  this.state.community
      }


      const url = "/saveCommunity";

      fetch(url, {  method: "POST", 
                    body: JSON.stringify(requestbody), 
                    headers:{ "Content-Type": "application/json" } 
                  })
                  .then( response => response.json())
                  .then(   result  => {  this.setState({
                                                        ...this.state,
                                                        community : result.response.community
                                                    });
                                        this.redirectToCommunityHome();
                                      }
                  );
      // result.response buradaki response response objelerinin içerisindeki attribute name  
      
      var message = `Post type is added successfully.` ;

      console.log(message);

    
    }

    inputChangeHandler = event => {
        // event.target returns the <input/> component 
        // you should merge state !!!!
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          form : {
            ...this.state.form,
            [name]: value
          }
        });
    }

    addNewField = event  => {
        this.setState(
            {
                form : {
                    ...this.state.form,
                    postFieldSet : [ 
                                    ...this.state.form.postFieldSet,
                                    {  
                                        required : false,
                                        fieldLabel : '',
                                        fieldType : 'TEXT',
                                        explanation : '' 
                                    }
                                ]
                }
            }
        );
    }

    postFieldChangeHandler = event => {

        // event.target returns the <input/> component 
        // you should merge state !!!!
        const id = event.target.dataset.id;
        const name = event.target.dataset.name;
        const value = event.target.value;

        const updatedPostFieldSet = [...this.state.form.postFieldSet];
        updatedPostFieldSet[id][name] = value;

        this.setState({
          form : {
            ...this.state.form,
            postFieldSet : updatedPostFieldSet,       
          }
        });
     
    }

    postFieldDeleteHandler = event => {

        // event.target returns the <input/> component 
        // you should merge state !!!!
        const id = event.target.dataset.id;

        const postFieldSet = [...this.state.form.postFieldSet];

        postFieldSet.splice(id, 1);
    

        this.setState({
          form : {
            ...this.state.form,
            postFieldSet : postFieldSet     
          }
        });   
    }

    redirectToCommunityHome (){
      this.setState({
        ...this.state,
        showCommunityHome : true
      })
    }
  


  render(){

    let postFieldSet = this.state.form.postFieldSet;

    const communityHome = (<Redirect to={{  pathname : "/communityHome",
                                            props : {
                                              community : this.state.community
                                            }
                                          }}/>);

    const createPostType = (
        <Form onSubmit =  {this.createPostTypeHandler}>
          <FormGroup row>
            <Label  sm={12} size="lg">Community Post Type</Label>
          </FormGroup>
          <FormGroup row>
            <Label for = "postTypeInp" sm={4} size="md">Post Type Name</Label>
            <Col sm={8}>
              <Input id = "postTypeInp" type = "text" 
                    name = "name" 
                    value = {this.state.form.postTypeName} 
                    onChange = {this.inputChangeHandler}></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={12} size="md"> Why people use this post type ?</Label>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input id = "postTypeDescInp" type = "textarea" 
                    name = "explanation" 
                    value = {this.state.form.communityDescription} 
                    onChange = {this.inputChangeHandler}></Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={12}>
              <Button onClick = {this.addNewField} color="secondary"> Add New Field </Button>  
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} size="md"> Required </Label>
            <Label sm={3} size="md"> Field Label </Label>
            <Label sm={3} size="md"> Data Type </Label>
            <Label sm={3} size="md"> Explanation </Label>
          </FormGroup>
          {
              postFieldSet.map((val, idx) =>  (
                <PostField
                        idx = {idx}
                        postFieldArr = {postFieldSet}
                        postFieldChangeHandler = {this.postFieldChangeHandler}
                        postFieldDeleteHandler = {this.postFieldDeleteHandler}
                />
              ))  
          }
           <Button color = "success" >Create Post Type</Button>  
          
        </Form>
  
      );

      return (this.state.showCommunityHome ? communityHome : createPostType);
  }
}
export default CreatePostType;






