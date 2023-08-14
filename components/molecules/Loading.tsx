import { containerStyle, loadingText } from "./Loading.style";
import { ImSpinner2 } from 'react-icons/im';

interface ModalProps {
  isOpen: boolean;
}

const Loading: React.FC<ModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={containerStyle}>
      <div className={loadingText}>
        <ImSpinner2 /> Loading
      </div>
    </div>
  );
}

export default Loading;
