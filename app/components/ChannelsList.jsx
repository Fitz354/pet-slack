import React from 'react';
import { Modal } from 'react-bootstrap';
import cn from 'classnames';
import NewChannelForm from './NewChannelForm.jsx';
import { channelsSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { currentChannelId, uiState: { activeModal }, channelCreatingState } = state;
  const props = {
    channels: channelsSelector(state),
    currentChannelId,
    activeModal,
    channelCreatingState,
  };

  return props;
};

@connect(mapStateToProps)
export default class ChannelsList extends React.Component {
  handleShowNewChannel = () => {
    this.props.showModalNewChannel();
  }

  handleCloseModal = () => {
    this.props.closeModal();
  }

  switchChannel = id => (e) => {
    e.preventDefault();
    this.props.switchChannel({ id });
  };

  renderModalNew = () => {
    const { channelCreatingState, activeModal } = this.props;

    return (
      <Modal show={activeModal === 'newChannel'} onHide={this.handleCloseModal} className="new-channel-modal">
        <Modal.Header>
          <Modal.Title>New channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewChannelForm />
          {channelCreatingState === 'failed'
            && <div className="alert alert-danger mt-3" role="alert">Connection error</div>}
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    const { userName, channels, currentChannelId } = this.props;

    return (
      <div className="channels-list d-flex flex-column  h-100">
        <div className="user-name pl-3 pr-3">
          <p className="h3 text-white">{userName}</p>
        </div>
        <div className="channels-manage pb-3">
          <div className="nav flex-column nav-pills mb-3">
            {channels.map(({ id, name }) => {
              const channelClass = cn({
                'nav-link': true,
                'text-white': true,
                active: id === currentChannelId,
              });

              return <a onClick={this.switchChannel(id)}
                className={channelClass} href="#" key={id}>{`# ${name}`}</a>;
            })}
          </div>
          <button onClick={this.handleShowNewChannel}
            type="button" className="show-new-channel-modal-btn btn btn-primary ml-3">new</button>
          {this.renderModalNew()}
        </div>
      </div>
    );
  }
}
