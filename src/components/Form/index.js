import React from 'react';

import './Form.css';

export default function Form(props) {
    return (
        <form onSubmit={props.handleSubmit} 
        className="form" action='#'>
            <input onChange={props.handleChange} 
            type='text' value={ props.novaTarefa } />
            <button type='submit'>
            X
            </button>
        </form>
    );
}
