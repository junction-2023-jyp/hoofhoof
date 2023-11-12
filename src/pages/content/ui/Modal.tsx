import BigHorse from '@root/src/assets/icons/big-horse';
import CloseButton from '@root/src/assets/icons/close-button';

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
  // /public/background_modal.png
  const modalContentStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backdropFilter: 'blur(40px)',
    backgroundImage: 'url("/public/background_modal.png")',
    // backgroundImage:
    //   'url("https://raw.githubusercontent.com/Nahee-Park/server-client/assets/81923229/99b98746-6929-405f-a218-988decc5b967")',
    padding: '0 45px',
    borderRadius: '20px',
    width: '822px',
    zIndex: 1001,
    // backgroundBlendMode: 'color-dodge, normal',
    background: '#E7D4CC',
  };

  const modalCloseButtonStyle = {
    position: 'absolute',
    top: '24px',
    right: '24px',
    backgroundColor: 'transparent',
    width: '32px',
    height: '32px',
    padding: 0,
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
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
    borderRadius: '12px',
    width: '190px',
    height: '64px',
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontWeight: 600,
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button style={modalCloseButtonStyle} onClick={onClose}>
          <CloseButton />
        </button>
        <div style={modalTopWrapStyle}>
          <div style={modalTopTextWrapStyle}>
            <h1 style={modalHeaderStyle}>Congratulations!</h1>
            <p style={modalBodyTextStyle}>
              By cleaning up your inbox today, you've reduced your
              <br />
              digital carbon footprint. Here's how much carbon
              <br />
              emissions you've saved.
            </p>
            <div style={modalStatsWrapStyle}>
              <div style={modalStatsStyle}>
                <p style={modalStatsTitleStyle}>Now</p>
                <p style={modalStatsTextStyle}>10 g</p>
              </div>
              <div style={modalStatsStyle}>
                <p style={modalStatsTitleStyle}>Total</p>
                <p style={modalStatsTextStyle}>312 g</p>
              </div>
            </div>
          </div>
          <div style={modalImageStyle}>
            <BigHorse />
          </div>
        </div>
        <div style={modalDividerStyle} />
        <div style={modalBottomWrapStyle}>
          <div style={modalEquivalentWrapStyle}>
            <p style={modalEquivalentTitleStyle}>This is equivalent to</p>
            <p style={modalEquivalentTextStyle}>producing one medium-sized (150g) beef burger patty</p>
          </div>
          <button style={modalButtonStyle} onClick={onClose}>
            YEEHAH!!!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
