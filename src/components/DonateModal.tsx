import { Modal } from "./Modal";
import DonateQRCode from "../assets/donate-qrcode.png";
import { useSnackbar } from "../contexts/SnackbarContext";

interface DonateModalProps {
    isOpen: boolean
    onClose: () => void
}

export const DonateModal = ({isOpen, onClose}: DonateModalProps) => {

    const { showSnackbar } = useSnackbar();

    const pixCopyPaste = "00020126580014BR.GOV.BCB.PIX013648f4b53c-7dfb-438a-bbb9-0afb81850c7e5204000053039865802BR5925Fernando Carvalho de Oliv6009SAO PAULO62140510CMcrmkQxqk63046E01";

    const handleCopyPix = async () => {
        await navigator.clipboard.writeText(pixCopyPaste);
        showSnackbar("Código PIX copiado!");
    };

    return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showCloseButton
            >
                <div className="donate-modal-content">
                    <h3>Apoie o TudoAqui 💖</h3>

                    <p>
                        O TudoAqui é um projeto independente, com atenção a cada detalhe.
                    </p>

                    <p>
                        Se essa plataforma te ajuda de alguma forma, uma doação via PIX é uma forma direta de
                        apoiar sua continuidade.
                    </p>

                    <hr className="custom-hr-secondary" />

                    <div className="pix-area">
                        <h4>Doe qualquer valor</h4>
                        <p>Escaneie o QR Code abaixo ou use o PIX copia e cola.</p>
                        <img
                            src={DonateQRCode}
                            alt="QR Code PIX para doação"
                            className="donate-qrcode"
                            width={160}
                            height={160}
                        />

                        <textarea
                            readOnly
                            value={pixCopyPaste}
                            onClick={(e) => e.currentTarget.select()}
                            rows={6}
                        />

                        <button className="btn secondary" onClick={handleCopyPix}>
                            Copiar código PIX
                        </button>
                    </div>
                </div>
            </Modal>
    );
};