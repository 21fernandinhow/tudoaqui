import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";
import { getPremiumStatus } from "../utils/getPremiumStatus";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";
import { getUserMetrics, UserMetrics } from "../utils/getUserMetrics";
import { DashboardStat } from "../components/DashboardStat";

export const MetricsPage = () => {
    const { user, loading } = useUserData();
    const [metrics, setMetrics] = useState<UserMetrics | null>(null)
    const [isPremium, setIsPremium] = useState(false);
    const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)

    const verifyIsPremium = async (uid: string) => {
        const answer = await getPremiumStatus(uid);
        console.log(answer)
        setIsPremium(answer);
    };

    const fetchMetrics = async (uid: string) => {
        const data = await getUserMetrics(uid);
        setMetrics(data);
        setIsLoadingMetrics(false);
        console.log(data)
    };

    useEffect(() => {
        if (user) {
            verifyIsPremium(user.uid)
            fetchMetrics(user.uid)
        };
    }, [user]);

    if (loading || isLoadingMetrics)
        return (
            <>
                <Header />
                <div className="loading-page">
                    <Loader />
                </div>
                <Footer />
            </>
        );

    if (!loading && !user) window.location.href = "/";

    if (!loading && !metrics) return (
        <>
            <Header />
            <div className="loading-page">
                <h2>Erro ao buscar métricas. Tente novamente mais tarde</h2>
            </div>
            <Footer />
        </>
    )

    return (
        <>
            <Header />

            <div id="metrics-page">
                <div className="container">
                    <h2>Métricas</h2>
                    <div className="stats-list">
                        <DashboardStat value={metrics?.views?.length ?? 0} label={"Total de Visitas"} color="primary"/>
                        <DashboardStat value={metrics?.likes ?? 0} label={"Likes"} color="terciary"/>
                        <DashboardStat value={metrics?.dislikes ?? 0} label={"Dislikes"} color="primary"/>
                        <DashboardStat value={metrics?.receivedClicks?.length ?? 0} label={"Total de Cliques"} color="terciary"/>
                        <DashboardStat
                            value={
                                metrics?.receivedClicks.length && metrics?.views.length ?
                                    parseFloat(`${metrics?.receivedClicks.length / metrics?.views.length}`) : 0
                            }
                            label={"Clickrate"}
                            showInPercentage
                            color="secondary"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};
