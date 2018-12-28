import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class MergeRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects:  null,
        };
    }

    getApiRequest() {
        const { projects } = this.props;

        return {
            id:     `gitlab.projectstMergeRequests.${ projects }`,
            params: { projects }
        };
    }

    onApiData({ project, mergeRequests }) {
        this.setState({ project, mergeRequests });
    }

    render() {
        const { project, mergeRequests } = this.state;

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
                    {mergeRequests.map(mr => (<div>{mr.title}</div>))}
                </div>
            </div>
        );
    }
}

MergeRequests.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(MergeRequests.prototype, ListenerMixin);
reactMixin(MergeRequests.prototype, Mozaik.Mixin.ApiConsumer);


export default MergeRequests;
