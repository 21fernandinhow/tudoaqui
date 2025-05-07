import { useState } from "react";
import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";

interface UserLinksPageOptionsMenuProps {
    isPreview: boolean | undefined
    uid: string
}

export const UserLinksPageOptionsMenu = ({ isPreview, uid }: UserLinksPageOptionsMenuProps) => {
    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
    const { showSnackbar } = useSnackbar();

    const handleShare = () => {
        if(isPreview) return;
        
        const url = window.location.href;
        const message = `Olha só! Criei minha página no tudoaqui.click! \n\n${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleLikeDislike = async (type: "like" | "dislike") => {
        if (!uid || isPreview) return;

        try {  
            const userRef = doc(db, "users", uid);

            const incrementValue = 
                type === "dislike" && localStorage.getItem("liked") === "dislike"? 1 
                    : type === "dislike" && localStorage.getItem("liked") === "like" ? -2 
                        : type === "like" && localStorage.getItem("liked") === "like" ? -1 
                            : type === "like" && localStorage.getItem("liked") === "dislike" ? 2 
                                : type === "like" ? 1 : -1;

            await setDoc(userRef, { likes: increment(incrementValue) }, { merge: true });

            if(localStorage.getItem("liked") !== type){
                localStorage.setItem("liked", type);
            } else {
                localStorage.removeItem("liked");
            }

        } catch (error) {
            console.error("Erro ao dar like:", error);
            showSnackbar("Erro ao dar " + type);
        }
    };

    return (
        <div 
        className={`user-links-page-options-menu ${isOptionsMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
        >
            <SlOptionsVertical className="user-links-page-options-menu-icon" />

            {isOptionsMenuOpen &&
                <>
                    <FiShare onClick={handleShare} />

                    {localStorage.getItem("liked") === "like" ? 
                        <BiSolidLike onClick={() => handleLikeDislike("like")}/> : <BiLike onClick={() => handleLikeDislike("like")}/>
                    }

                    {localStorage.getItem("liked") === "dislike" ? 
                        <BiSolidDislike onClick={() => handleLikeDislike("dislike")}/> : <BiDislike onClick={() => handleLikeDislike("dislike")}/>
                    }
                </>
            }
        </div>
    );
};
