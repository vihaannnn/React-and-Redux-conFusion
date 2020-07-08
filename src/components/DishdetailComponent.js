import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class Dishdetail extends Component
{
  renderComments(comments)
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
                    month: 'long',
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
                </ul>
      </div>
    );
  }

  renderDish(dish)
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

  render()
  {
    if (this.props.dish == null)
    {
      return (<div></div>);
    }
    else
    {
          return(
            <div className='row'>
            {this.renderDish(this.props.dish)}
            {this.renderComments(this.props.dish.comments)}
            </div>
          );
      }
    }
}

export default Dishdetail;
