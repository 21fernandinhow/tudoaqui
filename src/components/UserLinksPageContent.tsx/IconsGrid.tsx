import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserLinkOption } from "../UserConfigForm";
import { IconCanvas } from "./IconCanvas";
import { db } from "../../firebase";
import { VisitLocationData } from "../../pages/UserLinksPage";

interface IconsGridProps {
  icons: UserLinkOption[];
  activateFloating: boolean
  isPreview?: boolean
  uid: string
  visitLocation?: VisitLocationData
}

export const IconsGrid = ({ icons, activateFloating, isPreview, uid, visitLocation }: IconsGridProps) => {

  const handleClickIcon = (itemData: UserLinkOption) => {
    if (!isPreview) {

      window.open(itemData.url, "_blank")
      handleSaveClickMetric(itemData)

    }
  }

  const handleSaveClickMetric = async (itemData: UserLinkOption) => {
    if (uid) {

      try {
        const userRef = doc(db, "users", uid);

        const clickData = {
          ...itemData,
          clickedAt: new Date(),
          device: window.navigator.userAgent,
          location: visitLocation
        }

        await updateDoc(userRef, { receivedClicks: arrayUnion(clickData) });
      } catch (error) {
        console.error("Erro ao registrar clique nas métricas!", error);
      }

    }
  };

  return (
    <div className="icons-grid">
      {icons.map((item, index) => (
        <IconCanvas
          key={index}
          iconUrl={item.icon ?? ""}
          onClick={() => handleClickIcon(item)}
          label={item.label}
          activateFloating={activateFloating}
        />
      ))}
    </div>
  );
}
