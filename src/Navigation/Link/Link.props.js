import PropTypes from "prop-types";

export default {
    to: PropTypes.string,
    navigation: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ])
};
