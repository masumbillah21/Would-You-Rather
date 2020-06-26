import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddingQuestion } from '../actions/shared';

class AddQuestion extends Component {
    
    state = { 
        optOne: '',
        optTwo: '',
        isBack: false
    }

    handleOptionChange = (e) => {
        const optValue = e.target.value
        this.setState(
            {
                [e.target.name] : optValue
            }
       )
        console.log('optOne', this.state.optOne)
        console.log('optTwo', this.state.optTwo)
    }
   
    handleSubmit = (e) => {
        e.preventDefault()
        const { optOne, optTwo} = this.state
        this.props.addQuestion(optOne, optTwo)
        this.setState({
            isBack: true,
            optOne: '',
            optTwo: ''
        })
    }
    render() {
        const { isBack, optOne, optTwo } = this.state
        const { users, authedUser } = this.props

        if(isBack || !authedUser){
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <div className="row justify-content-center my-5">
                    <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>{users[authedUser].name} 
                            <span className="float-right">ID: {authedUser}</span></h4>
                            <img className="mx-auto d-block"
                                style={{marginTop: 20, width: 300}}
                                src={users[authedUser].avatarURL} 
                                alt={users[authedUser].name} />
                            
                        </div>                         
                        <form onSubmit={this.handleSubmit}>
                            <div className="card-body">
                                <h2>Would you rather...</h2>
                                <hr/>                            
                                <div className="form-group">                                    
                                    <input type="text" 
                                    className="form-control" 
                                    name="optOne"
                                    placeholder="Option one..."
                                    onChange={this.handleOptionChange}/>
                                </div>
                                <div className="form-group">                                    
                                    <input type="text" 
                                    className="form-control" 
                                    name="optTwo"
                                    placeholder="Option two..."
                                    onChange={this.handleOptionChange}/>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" 
                                    className="btn btn-primary btn-block" 
                                    disabled={optOne === '' || optTwo === ''}>Submit</button>
                                
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps({ users, authedUser } ){    
    return {
        users,
        authedUser
    }
}

function mapDispatchToProps(dispatch){
    return {
        addQuestion: (optOne, optTwo) => {
            dispatch(handleAddingQuestion(optOne, optTwo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);