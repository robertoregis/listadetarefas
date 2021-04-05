
import React, { Component } from 'react';
import Form from './Form';

// Importando o CSS
import './Main.css';

export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1,
    };

    componentDidMount() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas'));
        if(!tarefas) return;
        this.setState({ tarefas });
    }

    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state;
        if(tarefas === prevState.tarefas) return;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // função para criar tarefas
    handleSubmit = (e) => {
        e.preventDefault();
        const { tarefas, index } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();

        if(tarefas.indexOf(novaTarefa) !== -1) return;
        const novasTarefas = [...tarefas];
        
        if(index === -1) {
            // criando a tarefa
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: '',
            });
        } else { // vou editar a tarefa
            novasTarefas[index] = novaTarefa;

            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
                novaTarefa: '',
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value
        })
    }

    // função para editar
    handleEdit = (e, index) => {
        const { tarefas } = this.state; 
        this.setState({
            index,
            novaTarefa: tarefas[index],
        })
    }

    // função para deletar tarefa
    handleDelete = (e, index) => {
        const { tarefas } = this.state;
        const novasTarefas = [...tarefas];
        novasTarefas.splice(index, 1);

        this.setState({
        tarefas: [...novasTarefas],
        });
    }

    render() {
        const { novaTarefa, tarefas } = this.state;

        return (
            <div className='main'>

                <h1>Lista de tarefas</h1>

                <Form 
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />

                <ul className='tarefas'>
                    {tarefas.map((tarefa, index) => (
                        <li key={tarefa}>
                            {tarefa}
                            <span className="icons">
                                <h1 onClick={(e) => this.handleEdit(e, index)}
                                className="edit">X</h1>
                                <h1
                                className="delete" 
                                onClick={(e) => this.handleDelete(e, index)}
                                >V</h1>
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
        );
    }
} 