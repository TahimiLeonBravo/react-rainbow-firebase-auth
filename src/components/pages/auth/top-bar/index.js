import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AvatarMenu from 'react-rainbow-components/components/AvatarMenu';
import Avatar from 'react-rainbow-components/components/Avatar';
import MenuDivider from 'react-rainbow-components/components/MenuDivider';
import MenuItem from 'react-rainbow-components/components/MenuItem';
import { navigateTo } from '../../../../history';
import { logoutUser } from '../../../../redux/actions/authentication';
import LanguageSelector from '../../../experiences/language-selector';
import PowerIcon from '../../../icons/power';
import PencilIcon from '../../../icons/pencil';
import PersonIcon from '../../../icons/person';
import './styles.css';

function TopBar(props) {
    const {
        className,
        style,
        user,
        logoutUser,
    } = props;

    const getContainerClassNames = () => classnames('rainbow-auth-firebase-auth_top-bar', className);

    return (
        <section className={getContainerClassNames()} style={style}>
            <Link to="/home">
                <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="rainbow-auth-firebase-auth_logo" />
            </Link>
            <div className="rainbow-auth-firebase_top-bar-content">
                <LanguageSelector />
                <AvatarMenu
                    src={user.photoURL}
                    icon={<PersonIcon />}
                    assistiveText={user.displayName}
                    menuAlignment="right"
                    menuSize="small"
                    avatarSize="large"
                    className="rainbow-auth-firebase_avatar-menu"
                    title={user.displayName}>
                    <li className="rainbow-auth-firebase_avatar-menu_user">
                        <Avatar
                            src={user.photoURL}
                            icon={<PersonIcon />}
                            assistiveText={user.displayName}
                            title={user.displayName}
                            size="medium" />
                        <div className="rainbow-auth-firebase_avatar-menu_user-detail">
                            <p className="rainbow-auth-firebase_avatar-menu_user-name">{user.displayName}</p>
                            <p className="rainbow-auth-firebase_avatar-menu_user-email">{user.getEmail()}</p>
                        </div>
                    </li>
                    <MenuDivider variant="space" />
                    <MenuItem
                        onClick={() => navigateTo('profile')}
                        label={<FormattedMessage id="authenticated.profile.edit" defaultMessage="Edit profile" />}
                        icon={<PencilIcon />}
                        iconPosition="left" />
                    <MenuItem
                        label={<FormattedMessage id="authenticated.exp.logout" defaultMessage="Logout" />}
                        onClick={logoutUser}
                        icon={<PowerIcon />}
                        iconPosition="left" />
                </AvatarMenu>
            </div>
        </section>
    );
}

TopBar.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object,
    logoutUser: PropTypes.func,
};

TopBar.defaultProps = {
    className: undefined,
    style: {},
    user: {},
    logoutUser: () => {},
};

function stateToProps(state) {
    const { authentication } = state;
    return {
        user: authentication.toJS().user,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        logoutUser,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(TopBar);
