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

    const { showSnackbar } = useSnackbar();

    const storageLikeDislikeKey = `liked-${window.location.pathname.slice(1)}`;
    
    const [liked, setLiked] = useState<"like" | "dislike" | null>(localStorage.getItem(storageLikeDislikeKey) as "like" | "dislike" | null);
    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

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
                type === "dislike" && liked === "dislike"? 1 
                    : type === "dislike" && liked === "like" ? -2 
                        : type === "like" && liked === "like" ? -1 
                            : type === "like" && liked === "dislike" ? 2 
                                : type === "like" ? 1 : -1;

            await setDoc(userRef, { likes: increment(incrementValue) }, { merge: true });

            if(liked !== type){
                localStorage.setItem(storageLikeDislikeKey, type);
                setLiked(type);
            } else {
                localStorage.removeItem(storageLikeDislikeKey);
                setLiked(null);
            }

        } catch (error) {
            console.error("Erro ao dar like:", error);
            showSnackbar("Erro ao dar " + type);
        }
    };

    return (
        <div className={`user-links-page-options-menu ${isOptionsMenuOpen ? 'open' : ''}`} >
            
            <SlOptionsVertical className="user-links-page-options-menu-icon" onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}/>
            
            {isOptionsMenuOpen &&
                <>
                    <FiShare onClick={handleShare} />

                    {liked === "like" ? 
                        <BiSolidLike onClick={() => handleLikeDislike("like")}/> : <BiLike onClick={() => handleLikeDislike("like")}/>
                    }

                    {liked === "dislike" ? 
                        <BiSolidDislike onClick={() => handleLikeDislike("dislike")}/> : <BiDislike onClick={() => handleLikeDislike("dislike")}/>
                    }
                </>
            }

        </div>
    );
};
