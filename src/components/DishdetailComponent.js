import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOPen: false
        };
      }

      handleSubmit(values) {
          this.toggleModal();
          this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }


      render() {
        return(
          <div>
          <Button outline onClick = {this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                 <Row classname = "form-group">
                     <Label htmlFor = "rating" md = {12}>Rating</Label>
                     <Col>
                      <Control.select md = {12} model=".rating" id = "rating" name = "rating" className = "form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Control.select>
                      </Col>
                 </Row>
                 <Row className="form-group">
                     <Label htmlFor="name" md={12}>Your Name</Label>
                     <Col >
                         <Control.text model=".author" id="author" name="autjor"
                             placeholder="Your Name"
                             className="form-control"
                             validators={{ minLength: minLength(3), maxLength: maxLength(15)}}/>
                             <Errors
                                 className="text-danger"
                                 model=".author"
                                 show="touched"
                                 messages={{
                                     minLength: 'Must be greater than 2 characters',
                                     maxLength: 'Must be 15 characters or less'
                                 }} />
                     </Col>
                 </Row>
                 <Row className="form-group">
                     <Label htmlFor="comment" md={12}>Comment</Label>
                     <Col>
                         <Control.textarea model=".comment" id="comment" name="comment"
                             rows="6"
                             className="form-control" />
                     </Col>
                 </Row>
                 <Row className="form-group">
                     <Col md={12}>
                         <Button type="submit" color="primary">Submit</Button>
                     </Col>
                 </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
          </div>
        );

        }
  }

function RenderComments({comments, addComment, dishId})
  {

      const cmnts = comments.map(comment =>
      {

        return(
          <li>
            <p>
              {comment.comment}
            </p>
            <p>-- {comment.author},
            {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(comment.date))}</p>
            </li>

        );
    });

    return(
      <div  className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className='list-unstyled'>
                    {cmnts}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </ul>
      </div>
    );
  }

function RenderDish({dish})
  {
    if (dish != null)
    {
      return (
      <div  className="col-12 col-md-5 m-1">
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
      </div>
            );
     }
     else
      return(
          <div></div>
            );
  }

const Dishdetail = (props) => {
    if (props.dish == null)
    {
      return (<div></div>);
    }
    else
    {
          return(
            <div class = "container">
              <div className = "row">
                <Breadcrumb>
                  <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className = "col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
                </div>
              </div>
              <div className='row'>
                <RenderDish dish = {props.dish} />
                <RenderComments comments = {props.comments}
                  addComment={props.addComment}
                  dishId={props.dish.id}/>
              </div>
            </div>
          );
      }
    }


export default Dishdetail;
