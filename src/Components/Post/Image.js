import PropTypes from 'prop-types'

const Image = ({src, caption}) => {
    return <img src={src} id="dynamic-image-by-user" alt={caption} />
}

export default Image;

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}