import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, CardColumns
} from 'reactstrap';
import { Link } from "react-router-dom";


const PostCard = ({ postList, showHandler}) => {

  return (
    <div className="communityCardClass">
        <CardColumns>
            {
                postList.map((val, idx) =>  (
                    <PostCardInfo item = {postList[idx].fieldValueMap} ></PostCardInfo>
                ))
            }
        </CardColumns>
      </div>
  );
};

const PostCardInfo = ({item, id}) => {
  let post_name =  '';
  return (
    
      <Card>
        {
              Object.keys(item).map(function(key){
                if (key == 'post_name'){
                  post_name = item[key];
                }
              })
            }
          <CardHeader tag="h6">{post_name}</CardHeader>
          <CardBody>
            {
              Object.keys(item).map(function(key){
                // convert key to label
                var label = key.split('_').join(' ');
                label = label[0].toUpperCase() + label.slice(1);

                return <CardText>{label}: {item[key]}</CardText>
              })
            }
          </CardBody>
      </Card> 
    
  );
};

export default PostCard;