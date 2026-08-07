import { featureListForGroup, featureState } from "../data";
import { BackLink } from "./screens/BackLink";
import {
  ManagerList,
  ManagerDetail,
  ManagerTrade,
  ManagerProspectus,
  ManagerStatement,
  ManagerRespond,
  ManagerSettle,
} from "./screens/ManagerScreens";
import {
  InvestorMarket,
  InvestorFundDetail,
  InvestorRatingCard,
  InvestorSubscribe,
  InvestorPortfolio,
  InvestorFeedback,
} from "./screens/InvestorScreens";
import { FundRank, MgrRank, InvRank, Overlay } from "./screens/LeaderboardScreens";
import { ExtView, ExtRating } from "./screens/ExternalScreens";

const GROUP_LABEL = { manager: "經理人面板", investor: "投資人面板", leaderboard: "排行榜", external: "外部評議" };

// 對應原本的 renderFeatureDetail：依 group/id 找出對應功能定義與開放狀態，再路由到正確畫面元件
export function FeatureDetail({ activeFeature, day, isReadonly, ratings, onSetStar, onClose }) {
  const { group, id } = activeFeature;
  const list = featureListForGroup(group);
  const feat = list.find((f) => f.id === id);
  const st = featureState(feat, day, isReadonly);
  const editable = st === "open";

  let body = <div className="card">尚未實作</div>;

  if (group === "manager") {
    if (id === "list") body = <ManagerList />;
    if (id === "detail") body = <ManagerDetail editable={editable} />;
    if (id === "trade") body = <ManagerTrade editable={editable} day={day} />;
    if (id === "prospect") body = <ManagerProspectus editable={editable} />;
    if (id === "statement") body = <ManagerStatement editable={editable} />;
    if (id === "respond") body = <ManagerRespond editable={editable} day={day} />;
    if (id === "settle") body = <ManagerSettle />;
  } else if (group === "investor") {
    if (id === "market") body = <InvestorMarket />;
    if (id === "detail2") body = <InvestorFundDetail />;
    if (id === "rating") body = <InvestorRatingCard editable={editable} ratings={ratings} onSetStar={onSetStar} />;
    if (id === "subscribe") body = <InvestorSubscribe editable={editable} />;
    if (id === "portfolio") body = <InvestorPortfolio />;
    if (id === "feedback") body = <InvestorFeedback />;
  } else if (group === "leaderboard") {
    if (id === "fundrank") body = <FundRank />;
    if (id === "mgrrank") body = <MgrRank />;
    if (id === "invrank") body = <InvRank />;
    if (id === "overlay") body = <Overlay />;
  } else if (group === "external") {
    if (id === "extview") body = <ExtView />;
    if (id === "extrating") body = <ExtRating editable={editable} />;
  }

  return (
    <>
      <BackLink label={GROUP_LABEL[group] ?? ""} onBack={onClose} />
      {body}
    </>
  );
}
