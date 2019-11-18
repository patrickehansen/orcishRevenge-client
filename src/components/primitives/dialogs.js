'use strict';
import React from 'react';

import ImportModal from '@material-ui/core/Modal';

export default Modal = function (props) {
  return (
    <ImportModal

    >
      {props.children}
    </ImportModal>
  )
}