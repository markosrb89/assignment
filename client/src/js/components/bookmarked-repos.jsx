import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Container from "./common/container";
import { fetchBookmarkedRepos, removeBookmark } from "../redux/modules/repositories";

class BookmarkedRepos extends Component {
    constructor(props) {
        super(props);

        this.onRemoveClick = this.onRemoveClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchBookmarkedRepos())
            .catch(error => {
                throw error;
            });
    }

    onRemoveClick(id) {
        return () => {
            const { dispatch } = this.props;
            dispatch(removeBookmark(id))
                .catch(error => {
                    throw error;
                });
        }
    }

    render() {
        const { repositories } = this.props;

        if (repositories.loading) {
            return (<i className="fa fa-spinner fa-spin repositories-spinner" />)
        }

        return (
            <Container>
                <div className="repositories">
                    {
                        repositories.loading ?
                            (<i className="fa fa-spinner fa-spin repositories-spinner" />) :
                            repositories.bookmarked.map((repo, index) => {
                                return (
                                    <div key={index} className="repositories__item">
                                        <p><span>Name:</span> {repo.name}</p>
                                        <p><span>Owner Name:</span> {repo.ownerName}</p>
                                        <p><span>Forks:</span> {repo.forks}</p>
                                        <p><span>Stars:</span> {repo.stars}</p>
                                        <div 
                                            className="repositories__item-remove"
                                            onClick={this.onRemoveClick(repo._id)}
                                        >
                                            <i className="fas fa-times-circle"></i>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </Container>
        );
    }
}

BookmarkedRepos.propTypes = {
    dispatch: PropTypes.func.isRequired,
    repositories: PropTypes.object
};

const mapStateToProps = state => ({
    repositories: state.repositories
});

export default connect(mapStateToProps)(BookmarkedRepos);