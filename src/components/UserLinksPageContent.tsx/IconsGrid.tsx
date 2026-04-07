import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { IconCanvas } from "./IconCanvas";
import { db } from "../../firebase";
import { UserLinkOption, VisitLocationData } from "../../pages/UserLinksPage";

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

      const mailtoIndex = itemData.url.indexOf("mailto:")
      const url = mailtoIndex !== -1
        ? itemData.url.slice(mailtoIndex)
        : itemData.url

      window.open(url, "_blank")
      handleSaveClickMetric(itemData)

    }
  }

  const handleSaveClickMetric = async (itemData: UserLinkOption) => {
    if (uid) {

      try {
        const userRef = doc(db, "users", uid);

        const clickData = {
          ...itemData,
          clickedAt: new Date().toISOString(),
          device: window.navigator.userAgent,
          location: visitLocation ?? null
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
