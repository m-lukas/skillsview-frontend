import React, { Component } from 'react';
import PropTypes from 'prop-types';

//message component for inline errors in forms
const InlineError = ({ text }) => (
    <span style={{ color: "#ae5856" }}>
        {text}
    </span>
);

InlineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InlineError;