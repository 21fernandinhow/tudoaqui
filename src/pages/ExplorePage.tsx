import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { UserPagePreview } from "../components/UserPagePreview";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Footer } from "../components/Footer";
import { LoadingPage } from "./LoadingPage";
import { DonateButton } from "../components/DonateButton";

interface User {
    id: string;
    userUrl?: string;
    score: number;
}


const ExplorePage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const blackList = ["mariasilva_"];

    const fetchUsers = async () => {
        try {
            const usersRef = collection(db, "users");
            const querySnapshot = await getDocs(usersRef);

            const fetchedUsers = querySnapshot.docs
                .map((doc) => {
                    const data = doc.data();
                    const userUrl = data.userLinksPageData?.userUrl;

                    const views = data.views?.length || 0;
                    const likes = data.likes || 0;
                    const dislikes = data.dislikes || 0;

                    const score = views + likes * 50 - dislikes * 100;

                    return {
                        id: doc.id,
                        score,
                        userUrl,
                    };
                })
                .filter(
                    (user) =>
                        typeof user.userUrl === "string" &&
                        user.userUrl.length > 0 &&
                        !blackList.includes(user.userUrl)
                )
                .sort((a, b) => b.score - a.score);

            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Header />

            <DonateButton />

            <div id="explore-page" className="container">

                <h2>Explorar</h2>
                <p>
                    Conheça os perfis que estão se destacando no <strong>tudoaqui</strong>. <br />
                    Gente como você, criando páginas únicas e cheias de personalidade.
                </p>

                {loading ? <LoadingPage /> : users.length > 0 ?

                    <>
                        <div className="grid-container">
                            {paginatedUsers.map((user) => (
                                <UserPagePreview
                                    key={user.id}
                                    url={"https://tudoaqui.click/" + user.userUrl}
                                    title={user.userUrl || ""}
                                />
                            ))}

                            <div className="create-your-page-cta">
                                <h3>O que está esperando? Faça o seu também!</h3>
                                <a href="/config" className="btn">Vamos lá! ✨</a>
                            </div>
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className="btn"
                                >
                                    ← Anterior
                                </button>

                                <span>
                                    Página {currentPage} de {totalPages}
                                </span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className="btn"
                                >
                                    Próxima →
                                </button>
                            </div>
                        )}
                    </>

                    :

                    <div className="loading-page">
                        <h3>Erro ao carregar :/</h3>
                    </div>
                }

            </div>

            <Footer />
        </>
    );
};

export default ExplorePage;