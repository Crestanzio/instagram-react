import PropTypes from "prop-types";

const Footer = ({caption, username}) => {

    return (
        <div className="post-caption">
          <h5>{username}</h5>
          <span>{caption}</span>
        </div>
    )
}

export default Footer;

Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}