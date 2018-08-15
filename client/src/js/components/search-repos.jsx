import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Container from "./common/container";
import { fetchRepos, bookmarkRepo } from "../redux/modules/repositories";

class SearchRepos extends Component {
    constructor(props) {
        super(props);

        this.state = { searchTerm: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        const { value } = event.target;
        const { dispatch } = this.props;
        this.setState({ searchTerm: value });

        if (value.length >= 3) {
            dispatch(fetchRepos(value))
                .catch(error => {
                    throw error;
                });
        }
    }

    handleChange(id) {
        return (event) => {
            const { checked } = event.target;
            const { dispatch } = this.props;
            dispatch(bookmarkRepo(id, checked))
                .catch(error => {
                    throw error;
                });
        }
    }

    render() {
        const { repositories } = this.props;
        const { searchTerm } = this.state;

        return (
            <Container>
                <input
                    className="container__input"
                    type="text"
                    value={searchTerm}
                    placeholder="Search Repositories"
                    onChange={this.handleValueChange}
                />
                <div className="repositories">
                    {
                        repositories.loading ?
                            (<i className="fa fa-spinner fa-spin repositories-spinner" />) :
                            repositories.data.map((repo, index) => {
                                return (
                                    <div key={index} className="repositories__item">
                                        <p><span>Name:</span> {repo.name}</p>
                                        <p><span>Owner Name:</span> {repo.ownerName}</p>
                                        <p><span>Forks:</span> {repo.forks}</p>
                                        <p><span>Stars:</span> {repo.stars}</p>
                                        <input
                                            className="repositories__item-checkbox"
                                            id={repo._id}
                                            name={repo.name}
                                            checked={repo.bookmarked}
                                            type="checkbox"
                                            onChange={this.handleChange(repo._id)}
                                        />
                                        <label htmlFor={repo._id}></label>
                                    </div>
                                )
                            })
                    }
                </div>
            </Container>
        );
    }
}

SearchRepos.propTypes = {
    dispatch: PropTypes.func.isRequired,
    repositories: PropTypes.object
};

const mapStateToProps = state => ({
    repositories: state.repositories
});

export default connect(mapStateToProps)(SearchRepos);