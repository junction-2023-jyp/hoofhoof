// Modal.tsx
import React from 'react';
import * as S from './style';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const modalOverlayStyle = {
    display: 'block',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  const modalContentStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '0 45px',
    borderRadius: '20px',
    width: '822px',
    zIndex: 1001,
    backgroundBlendMode: 'color-dodge, normal',
    backdropFilter: 'blur(40px)',
  };

  const modalCloseButtonStyle = {
    position: 'absolute',
    top: '24px',
    right: '24px',
    backgroundColor: 'black',
    width: '32px',
    height: '32px',
    padding: 0,
    cursor: 'pointer',
  };

  const modalTopWrapStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const modalTopTextWrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const modalHeaderStyle = {
    fontFamily: 'Pretendard Variable',
    fontSize: '44px',
    fontStyle: 'normal',
    color: 'black',
    marginTop: '34px',
    marginBottom: '18px',
  };

  const modalBodyTextStyle = {
    fontFamily: 'Sanchez',
    fontSize: '22px',
    fontStyle: 'normal',
    color: '#4d3f3f',
    opacity: 0.6,
    lineHeight: '134%',
    textAlign: 'left',
    margin: 0,
  };

  const modalStatsWrapStyle = {
    display: 'flex',
    color: 'black',
    columnGap: '59px',
    marginTop: '50px',
    marginBottom: '38px',
  };

  const modalStatsStyle = {
    display: 'flex',
    columnGap: '14px',
    alignItems: 'center',
  };

  const modalStatsTitleStyle = {
    fontFamily: 'Pretendard Variable',
    fontSize: '16px',
    margin: 0,
  };

  const modalStatsTextStyle = {
    fontFamily: 'Pretendard Variable',
    fontSize: '34px',
    margin: 0,
  };

  const modalImageStyle = {
    width: '199px',
    height: '199px',
    marginTop: '40px',
    marginRight: '22px',
    backgroundColor: 'black',
  };

  const modalDividerStyle = {
    strokeWidth: '1px',
    background: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '1px',
  };

  const modalBottomWrapStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    paddingBottom: '40px',
  };

  const modalEquivalentWrapStyle = {
    display: 'flex',
    columnGap: '35px',
    color: 'black',
    alignItems: 'center',
  };

  const modalEquivalentTitleStyle = {
    fontFamily: 'Pretendard Variable',
    fontSize: '16px',
    fontStyle: 'normal',
    width: '97px',
    textAlign: 'left',
    height: 'fit-content',
    margin: 0,
  };

  const modalEquivalentTextStyle = {
    fontFamily: 'Pretendard Variable',
    fontSize: '19px',
    textAlign: 'left',
    width: '307px',
    margin: 0,
  };

  const modalButtonStyle = {
    backgroundColor: 'black',
    borderRadius: '12px',
    width: '190px',
    height: '64px',
    cursor: 'pointer',
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button style={modalCloseButtonStyle} onClick={onClose} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1
              style={{
                fontFamily: 'Pretendard Variable',
                fontSize: '44px',
                fontStyle: 'normal',
                color: 'black',
                marginTop: '34px',
                marginBottom: '18px',
              }}>
              Congratulations!
            </h1>
            <p
              style={{
                fontFamily: 'Sanchez',
                fontSize: '22px',
                fontStyle: 'normal',
                color: '#4d3f3f',
                opacity: 0.6,
                lineHeight: '134%',
                textAlign: 'left',
                margin: 0,
              }}>
              By cleaning up your inbox today, you've reduced your
              <br />
              digital carbon footprint. Here's how much carbon
              <br />
              emissions you've saved.
            </p>
            <div
              style={{ display: 'flex', color: 'black', columnGap: '59px', marginTop: '50px', marginBottom: '38px' }}>
              <div style={{ display: 'flex', columnGap: '14px', alignItems: 'center' }}>
                <p style={{ fontFamily: 'Pretendard Variable', fontSize: '16px', margin: 0 }}>Now</p>
                <p style={{ fontFamily: 'Pretendard Variable', fontSize: '34px', margin: 0 }}>10 g</p>
              </div>
              <div style={{ display: 'flex', columnGap: '14px', alignItems: 'center' }}>
                <p style={{ fontFamily: 'Pretendard Variable', fontSize: '16px', margin: 0 }}>Total</p>
                <p style={{ fontFamily: 'Pretendard Variable', fontSize: '34px', margin: 0 }}>312 g</p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: '199px',
              height: '199px',
              marginTop: '40px',
              marginRight: '22px',
              backgroundColor: 'black',
            }}
          />
        </div>
        <div style={{ strokeWidth: '1px', background: 'rgba(0, 0, 0, 0.4)', width: '100%', height: '1px' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            paddingBottom: '40px',
          }}>
          <div style={{ display: 'flex', columnGap: '35px', color: 'black', alignItems: 'center' }}>
            <p
              style={{
                fontFamily: 'Pretendard Variable',
                fontSize: '16px',
                fontStyle: 'normal',
                width: '97px',
                textAlign: 'left',
                height: 'fit-content',
                margin: 0,
              }}>
              This is equivalent to
            </p>
            <p
              style={{
                fontFamily: 'Pretendard Variable',
                fontSize: '19px',
                textAlign: 'left',
                width: '307px',
                margin: 0,
              }}>
              producing one medium-sized (150g) beef burger patty
            </p>
          </div>
          <button
            style={{
              backgroundColor: 'black',
              borderRadius: '12px',
              width: '190px',
              height: '64px',
              cursor: 'pointer',
            }}>
            YEEHAH!!!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
