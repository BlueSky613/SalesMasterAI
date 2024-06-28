import React from 'react';

export default function FeedbackMessage(props) {
    return (
        <div id={props.id} style={{opacity: props.opacity}}>
            <h2>{props.title}</h2>
            <p id={props.textId}>{props.comment}</p>
        </div>
    )
}
