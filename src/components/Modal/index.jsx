import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import style from './modal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { modalAnimation } from '../../animation';

export function Modal(props) {
  const dispatch = useDispatch();
  const { data: { type, header, text, actions, icon }, onDelete } = props;
  const error = useSelector((state) => state.error.error)

  function onCloseModal() {
    dispatch(setModalType(null));
    dispatch(setErrorAction(null));
  }

  function onSubmitModal() {
    if (onDelete && typeof onDelete === 'function') {
      onDelete();
    }
    onCloseModal();
  }

  return (
    <AnimatePresence>
      <>
        <div className={style.overlay} role="button" tabIndex={0} onClick={onCloseModal} onKeyDown={onCloseModal} />
        <motion.div {...modalAnimation} className={style.modal}>
          <div className={style.modal__container}>
            <div className={style.modal__header}>
              <h3 className={style.modal__title}>{header}</h3>
            </div>
            <div className={style.modal__text}>
              {icon && <div className={style.modal__icon}>
                {icon}
              </div>}
              {type !== 'buy' && <p>{text || error}</p>}
            </div>
            {actions && actions(onCloseModal, onSubmitModal, style.modal__btns)}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

Modal.defaultProps = {
  data: {
    type: '',
    header: '',
    text: '',
    actions: null,
  },
};

Modal.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    header: PropTypes.string,
    text: PropTypes.string,
    actions: PropTypes.func,
  }),
};