import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import MergeRequestItem                          from './MergeRequest';


class MergeRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mergeRequests:  [],
            projects:  []
        };
    }

    getApiRequest() {
        const { projects } = this.props;

        console.log(projects)

        return {
            id:     `gitlab.projectstMergeRequests.${ projects }`,
            params: { projects }
        };
    }

    onApiData({ projects, mergeRequests }) {
        console.log('-----')

        console.log(mergeRequests)
        this.setState({ projects, mergeRequests });
    }

    render() {
        const { projects, mergeRequests } = this.state;

        return (
            <div>
                <div className="widget__header">
                    MergeRequests
                    <span className="widget__header__count">
                        {mergeRequests.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {mergeRequests.map(mr => (<MergeRequestItem mergeRequests={mergeRequests}/>))}
                </div>
            </div>
        );
    }
}

MergeRequests.propTypes = {
    projects: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(MergeRequests.prototype, ListenerMixin);
reactMixin(MergeRequests.prototype, Mozaik.Mixin.ApiConsumer);


export default MergeRequests;
