import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



function RenderComments({comments})
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
            <div className='row'>
            <RenderDish dish = {props.dish} />
            <RenderComments comments = {props.dish.comments} />
            </div>
            </div>
          );
      }
    }


export default Dishdetail;
