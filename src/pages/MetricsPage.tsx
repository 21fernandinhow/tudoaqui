import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useUserData } from "../contexts/UserDataContext";
import { getPremiumStatus } from "../utils/getPremiumStatus";
import { Footer } from "../components/Footer";
import { getUserMetrics, ReceivedClicksData, UserMetrics, ViewLinksPageData } from "../utils/getUserMetrics";
import { DashboardStat } from "../components/Charts/DashboardStat";
import { LineGraph } from "../components/Charts/LineGraph";
import { ListChart } from "../components/Charts/ListChart";
import { BarHorizontalGraph } from "../components/Charts/BarHorizontalGraph";
import { checkDeviceType } from "../utils/checkDeviceType";
import { ComparativeChart } from "../components/Charts/ComparativeChart";
import { FaMobile } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";
import { LoadingPage } from "./LoadingPage";
import { GoToPremiumButton } from "../components/GoToPremiumButton";

const formatMetricsForActivityGraph = (metrics: { receivedClicks: ReceivedClicksData[], views: ViewLinksPageData[] }) => {
    function countByDate<T extends Record<string, any>>(items: T[], dateKey: keyof T) {
        return items.reduce((acc, item) => {
            const rawDate = item[dateKey];
            if (typeof rawDate !== "string") return acc;

            const date = new Date(rawDate).toISOString().split("T")[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }

    const viewCounts = countByDate(metrics.views, "visitedAt");
    const clickCounts = countByDate(metrics.receivedClicks, "clickedAt");

    const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });

    const result = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const isoDate = date.toISOString().split("T")[0];
        const weekDay = formatter.format(date); // Ex: "qui.", "sex."
        result.push({
            date: weekDay.charAt(0).toUpperCase() + weekDay.slice(1),
            visits: viewCounts[isoDate] || 0,
            clicks: clickCounts[isoDate] || 0,
        });
    }

    return result;
};

const formatMetricsForLocationChart = (views: ViewLinksPageData[]) => {
    const locationsCount: Record<string, number> = {};

    views.forEach((view) => {
        if (!view.location) return;

        const label = `${view.location.city} - ${view.location.country}`;
        locationsCount[label] = (locationsCount[label] || 0) + 1;
    });

    return Object.entries(locationsCount).map(([location, count]) => ({
        name: location,
        value: count,
    }));
};

const formatDevicesDataForComparativeChart = (views: ViewLinksPageData[], clicks: ReceivedClicksData[]) => {

    const mobile = { views: 0, clicks: 0, clickRate: 0, percentageOfViews: 0 }
    const desktop = { views: 0, clicks: 0, clickRate: 0, percentageOfViews: 0 }

    views.forEach((view) => {
        if (!view.device) return;

        const typeOfDevice = checkDeviceType(view.device)
        if (typeOfDevice === "mobile") {
            mobile.views = mobile.views + 1
        } else {
            desktop.views = desktop.views + 1
        }
    });

    clicks.forEach((click) => {
        if (!click.device) return;

        const typeOfDevice = checkDeviceType(click.device)
        if (typeOfDevice === "mobile") {
            mobile.clicks = mobile.clicks + 1
        } else {
            desktop.clicks = desktop.clicks + 1
        }
    });


    mobile.clickRate = mobile.clicks / mobile.views * 100
    desktop.clickRate = desktop.clicks / desktop.views * 100

    mobile.percentageOfViews = mobile.views / (mobile.views + desktop.views) * 100
    desktop.percentageOfViews = desktop.views / (mobile.views + desktop.views) * 100

    return [
        {
            label: "Mobile",
            value: mobile.percentageOfViews.toFixed(0),
            icon: <FaMobile />,
            obs: `Clickrate: ${mobile.clickRate.toFixed(0)} %`
        },
        {
            label: "Desktop",
            icon: <MdComputer />,
            value: desktop.percentageOfViews.toFixed(0),
            obs: `Clickrate: ${desktop.clickRate.toFixed(0)} %`
        }
    ]
};

const MetricsPage = () => {
    const { user, loading } = useUserData();
    const [metrics, setMetrics] = useState<UserMetrics | null>(null)
    const [isPremium, setIsPremium] = useState(false);
    const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)

    const verifyIsPremium = async (uid: string) => {
        const answer = await getPremiumStatus(uid);
        setIsPremium(answer);
    };

    const fetchMetrics = async (uid: string) => {
        const data = await getUserMetrics(uid);
        setMetrics(data);
        setIsLoadingMetrics(false);
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
                <LoadingPage />
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

                {user && <GoToPremiumButton />}

                <div className="container">
                    <h2>Métricas</h2>

                    <div className="stats-list">
                        <DashboardStat value={metrics?.views?.length ?? 0} label={"Total de Visitas"} color="primary" />
                        <DashboardStat value={metrics?.likes ?? 0} label={"Likes"} color="terciary" />
                        <DashboardStat value={metrics?.dislikes ?? 0} label={"Dislikes"} color="primary" />
                        <DashboardStat value={metrics?.receivedClicks?.length ?? 0} label={"Total de Cliques"} color="terciary" />
                        <DashboardStat
                            value={
                                metrics?.receivedClicks.length && metrics?.views.length ?
                                    metrics?.receivedClicks.length / metrics?.views.length * 100 : 0
                            }
                            label={"ClickRate"}
                            showInPercentage
                            color="secondary"
                        />
                    </div>

                    {metrics &&
                        <LineGraph
                            title="Atividade"
                            data={formatMetricsForActivityGraph({ receivedClicks: metrics.receivedClicks, views: metrics.views })}
                            xKey="date"
                            lines={[
                                { key: "visits", color: "#ef529c", name: "Visitas" },
                                { key: "clicks", color: "#ef4523", name: "Cliques" },
                            ]}
                        />
                    }

                    <div className="charts-row">
                        <ListChart title={"Links mais clickados"} isPremium={isPremium} data={metrics?.receivedClicks ?? null} />
                        <ListChart title={"De onde vieram seus visitantes"} keyField={"origin"} isPremium={isPremium} data={metrics?.views ? metrics.views.map(item => ({ origin: item.origin })) : null} />
                    </div>

                    <BarHorizontalGraph
                        title="Localização dos visitantes"
                        data={metrics?.views ? formatMetricsForLocationChart(metrics?.views).sort((a, b) => b.value - a.value).slice(0, 10) : null}
                        isPremium={isPremium}
                    />

                    <ComparativeChart
                        title="Dispositivos dos Visitantes"
                        data={formatDevicesDataForComparativeChart(metrics?.views ?? [], metrics?.receivedClicks ?? [])}
                        isPremium={isPremium}
                    />

                </div>
                
            </div>

            <Footer />
        </>
    );
};

export default MetricsPage
