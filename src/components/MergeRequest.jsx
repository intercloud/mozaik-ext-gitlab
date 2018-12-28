import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class MergeRequestItem extends Component {
    render() {
        const { mergerRequest } = this.props;


        const cssClasses = `list__item`;

        return (
            <div className={cssClasses}>
                <a href={`${''}/builds/${mergerRequest.id}`} target="_blank">
                    #{mergerRequest.id}
                </a>
                <span className="label__group">
                    <span className="label__addon">title</span>
                    <span className="label">{mergerRequest.title}</span>
                </span>
                <span className="label__group">
                    <span className="label__addon">upvotes</span>
                    <span className="label">{mergerRequest.upvotes}</span>
                </span>
                &nbsp;
                <span className="travis__build-history__item__message">{mergerRequest.upvotes}</span>
                <br />
                {mergerRequest.created_at && (
                    <time className="list__item__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(created_at.created_at).fromNow()}
                    </time>
                )}
            </div>
        );
    }
}

MergeRequestItem.displayName = 'MergeRequestItem';

MergeRequestItem.propTypes = {
    project: PropTypes.shape({
        web_url: PropTypes.string.isRequired
    }).isRequired,
    build: PropTypes.shape({
        id:          PropTypes.number.isRequired,
        status:      PropTypes.string.isRequired,
        finished_at: PropTypes.string,
        commit:      PropTypes.shape({
            message: PropTypes.string.isRequired
        })
    }).isRequired
};


export default MergeRequestItem;
